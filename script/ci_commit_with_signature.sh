#!/bin/bash

while getopts ":T:A:R:B:P:F:D:h:b:" opt; do
    case $opt in
        T)
            # 通过 GitHub GraphQL API 进行身份验证的 TOKEN
            # TOKEN for authentication via the GitHub GraphQL API
            TOKEN="$OPTARG" ;;
        A)
            # 自定义 GraphQL API 端点
            # Customize GraphQL API endpoints
            GRAPHQL_API_URL="$OPTARG" ;;
        R)
            # GitHub GraphQL API 请求带有所有者的远程仓库名称
            # Remote repository name with owner requested by the GitHub GraphQL API
            repoNwo="$OPTARG" ;;
        B)
            # GitHub GraphQL API 请求的远程仓库目标分支名称
            # The name of the target branch of the remote repository requested by the GitHub GraphQL API
            branch="$OPTARG" ;;
        P)
            # 远程仓库目标分支上最后一次提交的 SHA。
            # 它也是即将创建的提交的父提交的 SHA。
            # The SHA of the last commit on the target branch of the remote repository.
            # It is also the SHA of the parent commit of the commit about to be created.
            parentSHA="$OPTARG" ;;
        F)
            # 通过 GitHub GraphQL API 提交, 新增或修改的文件的路径（相对于存储库根）的数组
            # Array of paths (relative to the repository root) to new or modified files for commits via the GitHub GraphQL API
            #
            # 使用逗号和或空格作为分隔符，将参数分割为数组，默认值为空字符串
            # Split parameters into arrays using commas and or spaces as separators, defaults to empty string
            IFS=', ' read -ra changed_files <<< "$OPTARG" ;;
        D)
            # 通过 GitHub GraphQL API 提交, 删除的文件的路径（相对于存储库根）的数组
            # Array of paths (relative to the repository root) to deleted files for commits via the GitHub GraphQL API
            IFS=', ' read -ra deleted_files <<< "$OPTARG" ;;
        h)
            # 通过 GitHub GraphQL API 提交的提交消息标题行
            # Commit message head line committed via GitHub GraphQL API
            message_headline="$OPTARG" ;;
        b)
            # 通过 GitHub GraphQL API 提交的提交消息正文
            # Commit message body committed via GitHub GraphQL API
            message_body="$OPTARG" ;;
        \?)
           echo "无效的选项: -$OPTARG" >&2; exit 1 ;;
    esac
done


export GITHUB_TOKEN="${TOKEN:-$GITHUB_TOKEN}"
# export GITHUB_API_URL="${GITHUB_API_URL:-$GITHUB_API_URL}"
export GITHUB_GRAPHQL_URL="${GRAPHQL_API_URL:-$GITHUB_GRAPHQL_URL}"

# 生成签名（兼容 PAT 和 GitHub Actions）
# Generate Signature (Compatible with PAT and GitHub Actions)
signature() {
    if [[ $GITHUB_TOKEN == ghp_* ]]; then
        # https://github.blog/2021-04-05-behind-githubs-new-authentication-token-formats/
        # 'ghp_'开头的是 GitHub 个人访问令牌
        # What starts with 'ghp_' is the GitHub personal access token

        res=$(gh api /user 2>/dev/null || echo '{"login":"gh-actions","id":0}')
    else
        bot="${APP_SLUG:-github-actions}[bot]"
        res=$(gh api "/users/${bot}" 2>/dev/null || echo '{"login":"gh-actions","id":0}')
    fi

    login=$(jq -r .login <<< "$res")
    name=$(jq -r '.name // empty' <<< "$res")
    id=$(jq -r .id <<< "$res")
    echo "Signed-off-by: ${name:-$login} <$id+$login@users.noreply.github.com>"
}

message_body="${message_body:+$message_body\n}$(signature)"

# 处理文件修改并构建 fileChanges.additions 数组（用 jq）
# Process file modifications and build the fileChanges.additions array (using jq)
additions_json='[]'
for file_path in "${changed_files[@]}"; do
    # 获取文件内容的 base64 编码（强制单行）
    contents=$(base64 -w0 < "$file_path" 2>/dev/null || base64 < "$file_path" | tr -d '\n')
    # 使用 jq 追加数组元素，自动转义 path 和 contents
    additions_json=$(echo "$additions_json" | jq --arg path "$file_path" --arg content "$contents" \
        '. + [{"path": $path, "contents": $content}]')
done

# 处理文件删除并构建 fileChanges.deletions 数组（用 jq）
# Process file deletion and build the fileChanges.deletions array (using jq)
deletions_json='[]'
for file_path in "${deleted_files[@]}"; do
    deletions_json=$(echo "$deletions_json" | jq --arg path "$file_path" \
        '. + [{"path": $path}]')
done

# 使用 jq 生成完整的 GraphQL 请求 JSON
graphql_request=$(jq -n \
    --arg query 'mutation ($input: CreateCommitOnBranchInput!) {
        createCommitOnBranch(input: $input) {
            commit { oid, url }
        }
    }' \
    --arg repo "$repoNwo" \
    --arg branch "$branch" \
    --arg headline "$message_headline" \
    --arg body "$message_body" \
    --arg parent "$parentSHA" \
    --argjson additions "$additions_json" \
    --argjson deletions "$deletions_json" \
    '{
        query: $query,
        variables: {
            input: {
                branch: {
                    repositoryNameWithOwner: $repo,
                    branchName: $branch
                },
                message: {
                    headline: $headline,
                    body: $body
                },
                fileChanges: {
                    additions: $additions,
                    deletions: $deletions
                },
                expectedHeadOid: $parent
            }
        }
    }')

echo "$graphql_request" | gh api graphql --input - | jq -r '
    if .data?.createCommitOnBranch?.commit?.url then
        "✅ 请求成功，SHA: \(.data.createCommitOnBranch.commit.oid)\nURL: \(.data.createCommitOnBranch.commit.url)"
    else
        if .errors then
            "❌ 错误列表:\n" + ([.errors[].message] | join("\n- "))
        else
            "⚠️ 未知响应格式: \(.)"
        end
    end'

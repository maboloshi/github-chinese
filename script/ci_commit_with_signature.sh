#!/bin/bash

while getopts ":T:R:B:P:F:D:h:b:" opt; do
    case $opt in
        T)
            # 通过 GitHub GraphQL API 进行身份验证的 TOKEN
            # TOKEN for authentication via the GitHub GraphQL API
            TOKEN=$OPTARG
            ;;
        R)
            # GitHub GraphQL API 请求带有所有者的远程仓库名称
            # Remote repository name with owner requested by the GitHub GraphQL API
            repoNwo=$OPTARG
            ;;
        B)
            # GitHub GraphQL API 请求的远程仓库目标分支名称
            # The name of the target branch of the remote repository requested by the GitHub GraphQL API
            branch=$OPTARG
            ;;
        P)
            # 远程仓库目标分支上最后一次提交的 SHA。
            # 它也是即将创建的提交的父提交的 SHA。
            # The SHA of the last commit on the target branch of the remote repository.
            # It is also the SHA of the parent commit of the commit about to be created.
            parentSHA=$OPTARG
            ;;
        F)
            # 通过 GitHub GraphQL API 提交, 新增或修改的文件的路径（相对于存储库根）的数组
            # Array of paths (relative to the repository root) to new or modified files for commits via the GitHub GraphQL API
            IFS=', ' read -ra changed_files <<< "${OPTARG:-}"
            # 使用逗号和或空格作为分隔符，将参数分割为数组，默认值为空字符串
            # Split parameters into arrays using commas and or spaces as separators, defaults to empty string
            ;;
        D)
            # 通过 GitHub GraphQL API 提交, 删除的文件的路径（相对于存储库根）的数组
            # Array of paths (relative to the repository root) to deleted files for commits via the GitHub GraphQL API
            IFS=', ' read -ra deleted_files <<< "${OPTARG:-}"
            ;;
        h)
            # 通过 GitHub GraphQL API 提交的提交消息标题行
            # Commit message head line committed via GitHub GraphQL API
            message_headline=$OPTARG
            ;;
        b)
            # 通过 GitHub GraphQL API 提交的提交消息正文
            # Commit message body committed via GitHub GraphQL API
            message_body=$OPTARG
            ;;
        \?)
           echo "无效的选项: -$OPTARG" >&2
           exit 1
           ;;
    esac
done

if [[ -z $TOKEN ]]; then
  TOKEN=$GITHUB_TOKEN
fi

if [[ -z $GITHUB_URL ]]; then
  GITHUB_URL="https://api.github.com"
fi

function set_dco_signature {
    if [[ $TOKEN == ghp_* ]]; then
        # https://github.blog/2021-04-05-behind-githubs-new-authentication-token-formats/
        # 'ghp_'开头的是 GitHub 个人访问令牌

        response=$(curl -s -H "Authorization: token $TOKEN" $GITHUB_URL/user)
    elif [[ $APP_SLUG ]]; then
        CommitBot=$APP_SLUG
    else
        CommitBot="github-actions"
    fi

    if [[ $CommitBot ]]; then
        response=$(curl -s -H "Authorization: token $TOKEN" "$GITHUB_URL/users/$CommitBot\[bot\]")
    fi

    CommitBot=$(echo $response | jq -r '.login')
    id=$(echo $response | jq -r '.id')
    echo "Signed-off-by: $CommitBot <$id+$CommitBot@users.noreply.github.com>"
}

message_body="${message_body:+$message_body\n}$(set_dco_signature)"

# 处理文件修改并构建 fileChanges 部分中 additions 的 JSON 字符串
# Process the file changes and build the JSON string of `additions` in the `fileChanges` section
changed_files_json=""
for file_path in "${changed_files[@]}"; do
    changed_files_json+="{
            \"path\": \"$file_path\",
            \"contents\": \"$(base64 < "$file_path")\"
          },
          "
done
changed_files_json="${changed_files_json%,
          }"  # 移除最后一个逗号及换行符和空格
              # Remove last comma and line breaks and spaces

# 处理文件删除并构建 fileChanges 部分中 deletions 的 JSON 字符串
# Process the file deletions and build the JSON string of `deletions` in the `fileChanges` section
deleted_files_json=""
for file_path in "${deleted_files[@]}"; do
    deleted_files_json+="{
            \"path\": \"$file_path\",
          },
          "
done
deleted_files_json="${deleted_files_json%,
          }"  # 移除最后一个逗号及换行符和空格
              # Remove last comma and line breaks and spaces

# 构建 GraphQL 请求的 JSON 字符串
# Construct JSON string for GraphQL request
graphql_request='{
  "query": "mutation ($input: CreateCommitOnBranchInput!) {
    createCommitOnBranch(input: $input) {
      commit {
        url
      }
    }
  }",
  "variables": {
    "input": {
      "branch": {
        "repositoryNameWithOwner": "'"$repoNwo"'",
        "branchName": "'"$branch"'"
      },
      "message": {
        "headline": "'"$message_headline"'",
        "body": "'"$message_body"'"
      },
      "fileChanges": {
        "additions": [
          '"$changed_files_json"'
        ],
        "deletions": [
          '"$deleted_files_json"'
        ]
      },
      "expectedHeadOid": "'"$parentSHA"'"
    }
  }
}'

# 将请求数据写入 request.json 文件
# Write the request data to the `request.json` file
echo "$graphql_request" > request.json

# 发送 GraphQL 请求并解析结果
# Send GraphQL requests and parse the results
if [[ -z $GITHUB_GRAPHQL_URL ]]; then
  GITHUB_GRAPHQL_URL="https://api.github.com/graphql"
fi

response=$(curl "$GITHUB_GRAPHQL_URL" --silent \
  --write-out '%{stderr}HTTP status: %{response_code}\n\n' \
  -H "Authorization: bearer $TOKEN" \
  --data @request.json)

# Print the results
url=$(echo "$response" | jq -r '.data.createCommitOnBranch.commit.url')
if [ "$url" != "null" ]; then
  echo "请求成功，URL为: $url"
  exit 0
else
  error=$(echo "$response" | jq -r '.errors[0].message')
  echo "请求失败，错误信息为: $error"
  exit 1
fi

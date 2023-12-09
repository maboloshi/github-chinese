#!/bin/bash

while getopts ":T:R:B:P:F:D:h:b:" opt; do
    case $opt in
        T)
            TOKEN=$OPTARG
            ;;
        R)
            repoNwo=$OPTARG
            ;;
        B)
            branch=$OPTARG
            ;;
        P)
            parentSHA=$OPTARG
            ;;
        F)
            # 使用逗号和或空格作为分隔符，将参数分割为数组，默认值为空字符串
            IFS=', ' read -ra changed_files <<< "${OPTARG:-}"
            ;;
        D)
            IFS=', ' read -ra deleted_files <<< "${OPTARG:-}"
            ;;
        h)
            message_headline=$OPTARG
            ;;
        b)
            message_body=$OPTARG
            ;;
        \?)
           echo "无效的选项: -$OPTARG" >&2
           exit 1
           ;;
    esac
done

# 处理文件修改并构建 fileChanges 部分中 additions 的 JSON 字符串
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

# 处理文件删除并构建 fileChanges 部分中 deletions 的 JSON 字符串
deleted_files_json=""
for file_path in "${deleted_files[@]}"; do
    deleted_files_json+="{
            \"path\": \"$file_path\",
          },
          "
done
deleted_files_json="${deleted_files_json%,
          }"  # 移除最后一个逗号及换行符和空格

# 构建 GraphQL 请求的 JSON 字符串
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
echo "$graphql_request" > request.json

# 发送 GraphQL 请求并解析结果
if [[ -z $GITHUB_GRAPHQL_URL ]]; then
  GITHUB_GRAPHQL_URL="https://api.github.com/graphql"
fi

response=$(curl "$GITHUB_GRAPHQL_URL" --silent \
  --write-out '%{stderr}HTTP status: %{response_code}\n\n' \
  -H "Authorization: bearer $TOKEN" \
  --data @request.json | jq)

# 打印结果
url=$(echo "$response" | jq -r '.data.createCommitOnBranch.commit.url')
if [ "$url" != "null" ]; then
  echo "请求成功，URL为: $url"
  exit 0
else
  error=$(echo "$response" | jq -r '.errors[0].message')
  echo "请求失败，错误信息为: $error"
  exit 1
fi


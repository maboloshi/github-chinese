#!/bin/bash

TOKEN=$1
repoNwo=$2
branch=$(git rev-parse --abbrev-ref HEAD) # 或 git rev-parse HEAD
file_path=$3
encoded_file_content=$(base64 < "$file_path")
message_headline=$4
message_body=$5
expectedHeadOid=$(git rev-parse HEAD)

curl $GITHUB_GRAPHQL_URL --silent \
     --write-out '%{stderr}HTTP status: %{response_code}\n\n' \
     -H "Authorization: bearer $TOKEN" \
     --data @- <<GRAPHQL | jq
{
  "query": "mutation (\$input: CreateCommitOnBranchInput!) {
    createCommitOnBranch(input: \$input) {
      commit {
        url
      }
    }
  }",
  "variables": {
    "input": {
      "branch": {
        "repositoryNameWithOwner": "$repoNwo",
        "branchName": "$branch"
      },
      "message": {
        "headline": "$message_headline",
        "body": "$message_body"
      },
      "fileChanges": {
        "additions": [
          {
            "path": "$file_path",
            "contents": "$encoded_file_content"
          }
        ]
      },
      "expectedHeadOid": "$expectedHeadOid"
    }
  }
}
GRAPHQL

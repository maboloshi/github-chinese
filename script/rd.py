import re

def remove_duplicates(file_path):
    # 读取文件内容
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # 匹配所有 "static" 部分
    static_matches = re.finditer(r'"static": \{([\s\S]*?)\}', content)
    if not static_matches:
        print('未找到 "static" 部分。')
        return

    new_content = content  # 用于存储整体替换后的内容
    for match in static_matches:
        static_content = match.group(1)
        lines = static_content.split('\n')

        seen = set()  # 用于存储已出现的键名
        unique_lines = []  # 存储去重后的行

        # 遍历每一行，检查重复
        for line in lines:
            stripped_line = line.strip()
            if stripped_line and not stripped_line.startswith('//'):  # 排除注释和空行
                key_match = re.match(r'"(.*?)":', stripped_line)  # 提取键名
                if key_match:
                    key = key_match.group(1)
                    if key in seen:
                        print(f'重复项：{key}')
                        continue
                    seen.add(key)
            unique_lines.append(line)  # 保留非重复项、注释和空行

        # 将去重后的内容重新组装
        unique_content = '\n'.join(unique_lines)
        new_content = new_content.replace(static_content, unique_content)

    # 写入去重后的文件
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(new_content)
    print('所有重复项已移除并保存至文件。')


if __name__ == "__main__":
    # 文件路径
    file_path = './locals.js'  # 替换为你的文件路径
    remove_duplicates(file_path)
from rag.config import DATA_DIR
import os.path
import json
from pathlib import Path
from rag.index.markdown_to_text import markdown_to_text



def process_file(root_dir, file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
        markdown_array = file.readlines()
        markdown_string=''.join(markdown_array)
        context= markdown_to_text(markdown_string)
        relative_path = os.path.relpath(file_path, root_dir)
        return {
            "path": relative_path,
            "context": context,
        }


def explore_directory(root_dir):
    result = []
    for foldername, subfolders, filenames in os.walk(root_dir):
        for filename in filenames:
            file_path = os.path.join(foldername, filename)
            if file_path.endswith('.md'):
                result.append(process_file(root_dir, file_path))
    return result


def main():
    folder_path = os.getenv('QDRANT_PATH')+"/qdrant-landing/content/articles/"
    output_file = Path(DATA_DIR) / "md_files.json"

    files_data = explore_directory(folder_path)

    with open(output_file, 'w', encoding='utf-8') as json_file:
        json.dump(files_data, json_file, indent=2)


if __name__ == "__main__":
    main()
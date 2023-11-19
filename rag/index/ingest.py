import os.path
from rag.index.markdown_to_text import markdown_to_text
from rag.config import QDRANT_URL, QDRANT_API_KEY, QDRANT_RAG_COLLECTION_NAME
from qdrant_client import QdrantClient


def upload(data):
    qdrant_client = QdrantClient(
        QDRANT_URL,
        api_key=QDRANT_API_KEY,
    )
    collection_name = QDRANT_RAG_COLLECTION_NAME
    print(f"Storing data in the collection: {collection_name} file: {data['metadata'][0]['path']}")
    qdrant_client.add(
        collection_name=collection_name,
        documents=data['documents'],
        metadata=data['metadata'],
    )

def splitter(document_string, chunk_size, chunk_overlap):
    chunks = []
    start = 0
    while start < len(document_string):
        end = start + chunk_size
        chunk = document_string[start:end]
        chunks.append(chunk)
        start += chunk_size - chunk_overlap
    return chunks

def process_file(root_dir, file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
        markdown_array = file.readlines()
        markdown_string=''.join(markdown_array)
        documents_string= markdown_to_text(markdown_string)
        documents = splitter(documents_string, chunk_size = 2000,
        chunk_overlap = 200)
        relative_path = os.path.relpath(file_path, root_dir)
        return {
            "metadata": [{"path":relative_path}]*len(documents),
            "documents": documents,
        }

def explore_directory(root_dir):
    for foldername, subfolders, filenames in os.walk(root_dir):
        for filename in filenames:
            file_path = os.path.join(foldername, filename)
            if file_path.endswith('.md'):
                data=process_file(root_dir, file_path)
                upload(data)
    return "success"

def main():
    folder_path = os.getenv('QDRANT_PATH')+"/qdrant-landing/content/"
    res = explore_directory(folder_path)
    print(res)

if __name__ == "__main__":
    main()

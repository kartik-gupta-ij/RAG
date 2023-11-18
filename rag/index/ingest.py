from pathlib import Path
from qdrant_client import QdrantClient
import json

from rag.config import QDRANT_URL, QDRANT_API_KEY, DATA_DIR, QDRANT_RAG_COLLECTION_NAME


def encode_and_upload():
    qdrant_client = QdrantClient(
        QDRANT_URL,
        api_key=QDRANT_API_KEY,
    )

    collection_name = QDRANT_RAG_COLLECTION_NAME
    input_file = Path(DATA_DIR) / "md_files.json"

    if not input_file.exists():
        raise RuntimeError(f"File {input_file} does not exist. Skipping")

    docs = []
    metadata = []
    with open(input_file, 'r') as json_file:
        data = json.load(json_file)
      
        for item in data:
            docs.append(item['context'])
            metadata.append({
                "path": item['path'],
            })
           
    print(f"Storing data in the collection {collection_name}")
    qdrant_client.add(
        collection_name=collection_name,
        documents=docs,
        metadata=metadata,
    )

if __name__ == '__main__':
    encode_and_upload()
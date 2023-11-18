import json
from typing import List
from qdrant_client import QdrantClient
from openai import OpenAI

from rag.config import QDRANT_URL, QDRANT_API_KEY, QDRANT_RAG_COLLECTION_NAME



class Searcher:

    def __init__(self):
        self.collection_name = QDRANT_RAG_COLLECTION_NAME
        self.client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

    def search(self, question, limit=5) -> List[dict]:
        contextArray = self.client.query(
                collection_name=self.collection_name,
                query_text=question,
                limit=limit,
            )
        return contextArray




class LLMQuery:

    def __init__(self):
        self.searcher = Searcher()
        self.OpenAIclient = OpenAI()

    def query(self, question, limit=5) -> dict:
        contextArray = self.searcher.search(question, limit=limit)
        
        context = "\n".join(r.document for r in contextArray)
        metaprompt = f"""
        You are a scientist working in a lab. You are asked a question by a colleague.
        Answer the following question using the provided context.
        If you can't find the answer, do not pretend you know it, but answer "I don't know".

        Question: {question.strip()}

        Context:
        {context.strip()}

        Answer:
        """

        response = self.OpenAIclient.chat.completions.create(model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": metaprompt},
        ],
        timeout=10.0)

        return({
            "answer":response.choices[0].message.content,
            "context":contextArray
        })
    


if __name__ == '__main__':
    question = "what is ethidium bromide?"

    searcher = LLMQuery()

    res = searcher.query(question)
    for hit in res:
        print(json.dumps(hit))
from fastapi import FastAPI

from rag.querier import LLMQuery


app = FastAPI()

rag_querier=LLMQuery()




@app.get("/api/search")
async def search(question: str):
    return {
        "result": rag_querier.query(question)
    }
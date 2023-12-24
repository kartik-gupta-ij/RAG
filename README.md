
# Rag demo 
## With Qdrant + OpenAI + FastAPI

This repository contains a code for rag demo in qdrant. [demo](https://rag.qdrant.tech).

The demo is based on the vector search engine [Qdrant](https://github.com/qdrant/qdrant).

## Requirements
Install python requirements:

```
pip install poetry
poetry install
```

You will also need [Docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/)

## Quick Start

To launch this demo locally you will need to prepare data first.

The source of the original data is https://github.com/qdrant/landing_page/tree/master/qdrant-landing/content

```bash
# Download data and prepare it for the demo
sh tools/download_and_index.sh
```

This script will download the data and index it in the Qdrant engine.

## Launch the demo

After that you can launch the demo:

```bash
# Launch the demo
docker-compose up -d
```
or 

for local development (backend + frontend)
```bash
# Launch the demo
sh tools/launch.sh

```

for local development (backend only)
```bash
# Launch the demo (backend only)
uvicorn rag.service:app --reload  
```
for local development (frontend only)
```bash
# Launch the demo (frontend only)
cd frontend
pnpm install
pnpm dev
```






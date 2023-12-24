#!/usr/bin/env bash

set -e

# Ensure current path is project root
cd "$(dirname "$0")/../"


uvicorn rag.service:app --reload &
cd frontend && pnpm i && pnpm run dev
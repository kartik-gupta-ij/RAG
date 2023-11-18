#!/usr/bin/env bash

set -e

QDRANT_PATH=$1

QDRANT_PATH=$(realpath $QDRANT_PATH)

# Get path to this script
SCRIPT_PATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
ROOT_PATH=$SCRIPT_PATH/..


python -m rag.index.markdown_to_json

# python -m rag.index.ingest

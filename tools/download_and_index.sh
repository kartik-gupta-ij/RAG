#!/usr/bin/env bash

set -e

# Ensure current path is project root
cd "$(dirname "$0")/../"

git clone https://github.com/qdrant/landing_page.git data/qdrant

QDRANT_PATH=data/qdrant bash -x tools/index_docs.sh data/qdrant

rm -rf data/qdrant

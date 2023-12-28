#!/usr/bin/env bash
rsync -avP --exclude='venv' \
           --exclude='__pycache__' \
           --exclude='frontend' \
           --exclude='.idea' \
           --exclude='local_cache' \
           --exclude='.venv' \
           --exclude='.git' \
           --exclude='data/qdrant' \
           . $1:/mnt/RAG/
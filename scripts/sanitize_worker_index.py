#!/usr/bin/env python3
"""Remove ingestion-only filesystem metadata from a Worker RAG index."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

PRIVATE_METADATA_KEYS = {"file_path", "raw_path", "normalized_path"}
FORBIDDEN_PATH_MARKERS = ("/Users/", "/home/", "\\Users\\")


def remove_private_fields(value: Any) -> Any:
    if isinstance(value, dict):
        return {
            key: remove_private_fields(item)
            for key, item in value.items()
            if key not in PRIVATE_METADATA_KEYS
        }
    if isinstance(value, list):
        return [remove_private_fields(item) for item in value]
    return value


def sanitize(path: Path) -> None:
    payload: dict[str, Any] = json.loads(path.read_text(encoding="utf-8"))
    chunks = payload.get("chunks")
    if not isinstance(chunks, list):
        raise ValueError("index must contain a chunks list")

    payload = remove_private_fields(payload)
    for chunk in payload["chunks"]:
        if chunk.get("metadata") == {}:
            chunk.pop("metadata")

    serialized = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    if any(marker in serialized for marker in FORBIDDEN_PATH_MARKERS):
        raise ValueError("sanitized index still contains an absolute home-directory path")

    path.write_text(serialized + "\n", encoding="utf-8")


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: sanitize_worker_index.py PATH", file=sys.stderr)
        return 2
    sanitize(Path(sys.argv[1]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

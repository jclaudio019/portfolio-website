import test from "node:test";
import assert from "node:assert/strict";
import index from "../src/worker_index.json" with { type: "json" };

const serialized = JSON.stringify(index);

test("published RAG index excludes local filesystem metadata", () => {
    assert.equal(serialized.includes("/Users/"), false);
    assert.equal(serialized.includes("/home/"), false);
    assert.equal(serialized.includes("\\Users\\"), false);
    assert.equal(serialized.includes('"file_path"'), false);
    assert.equal(serialized.includes('"raw_path"'), false);
    assert.equal(serialized.includes('"normalized_path"'), false);

    for (const chunk of index.chunks) {
        const metadata = chunk.metadata || {};
        assert.equal(Object.hasOwn(metadata, "file_path"), false);
        assert.equal(Object.hasOwn(metadata, "raw_path"), false);
        assert.equal(Object.hasOwn(metadata, "normalized_path"), false);
    }
});

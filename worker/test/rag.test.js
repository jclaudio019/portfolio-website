import test from "node:test";
import assert from "node:assert/strict";
import { experienceCategory, exploreUrl } from "../src/rag.js";

test("links unpublished backtesting evidence to GitHub with coursework scope", () => {
    const repository = "https://github.com/jclaudio019/backtesting-system";
    const chunk = {
        document_id: "project::backtesting-system::README.md",
        source_type: "project",
        source_url: repository,
        repo_url: repository,
        heading_path: "Backtesting System",
    };

    assert.equal(exploreUrl(chunk), repository);
    assert.equal(
        experienceCategory(chunk.source_type, chunk.heading_path, chunk.document_id),
        "coursework"
    );
});
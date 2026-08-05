# Warehouse In-Progress Detail Design

## Goal

Present the Warehouse Club Market Expansion project honestly as unfinished work without implying that analysis, methodology, findings, or recommendations already exist.

## Page Structure

The project card remains unchanged and continues to show the `In progress` badge.

The Warehouse project detail page will contain only:

1. The existing project header, summary, `In progress` badge, cover image, image caption, and GitHub link.
2. The verified business problem already stored in the project data.
3. A final `In progress` section stating: “This project is in progress. This page will be updated as the research and analysis develop.”

The Warehouse detail page will not render project metrics, solution, dataset, methodology, findings, business implications, conclusion, next steps, limitations, technologies, or next-project navigation while its status is `In progress`.

Completed project pages remain unchanged.

## Implementation

`ProjectDetail` will use the existing `project.status` value to select the short in-progress presentation. No new route, page component, content schema, dependency, or chart will be added.

## Verification

A focused route-rendering test will verify that the Warehouse page shows its business problem and final in-progress message while omitting completed-case-study sections. Existing tests will continue to verify the badge, routes, and completed project behavior. The full test suite, production build, and live Cloudflare page will be checked before completion.

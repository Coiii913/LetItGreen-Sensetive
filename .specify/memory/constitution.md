<!--
Version change: 1.0.0 → 1.0.1
List of modified principles: Sustainable Focus → Sustainability-first Marketplace; User-Centric Design → Mobile-first Accessible Experience; Test-First Development → Verified Integration & Stability; API-First Design → Service Contract & Resilience; Performance Optimization → Responsible AI Augmentation
Added sections: Responsible AI Augmentation, explicit service resilience and local persistence
Removed sections: none
Templates requiring updates: ✅ updated /Users/coiii913/Desktop/newgreen/.specify/templates/tasks-template.md (tests mandatory)
Follow-up TODOs: none
-->
# Green Market Constitution

## Core Principles

### Documentation Language
All project documentation (.md files like spec.md, plan.md, tasks.md) must be written in **Chinese (中文)** for team accessibility. Code files (.js, .jsx, .css) and code comments remain in **English**.

### Sustainability-first Marketplace
Every feature must advance reuse, reduce waste, and make carbon savings visible. Product design and data modeling must prioritize second-hand value, local reuse, and environmental impact over novelty.

### Mobile-first Accessible Experience
UI must render as a compact mobile marketplace, remain navigable on small screens, and use accessible semantic controls, alt text, and clear tap targets. All new pages and components must keep content legible, interactive, and responsive.

### Service Contract & Resilience
Frontend and backend must communicate through explicit API contracts; endpoints should be stable, validated, and fall back gracefully when AI or network services fail. Data flows must be predictable and recoverable, with client state synced from API responses and persisted locally when appropriate.

### Responsible AI Augmentation
AI is an assistive layer, not a requirement for core functionality. AI-powered search, description enhancement, and vision analysis must degrade cleanly to deterministic fallback logic and preserve user trust by avoiding opaque behavior.

### Verified Integration & Stability
Testing is mandatory for core app flows, including item listing, search, favorites/cart state, routing, and API contracts. Changes must be validated by both automated tests and code review before release.

## Technology Stack
React + Vite + React Router compose the UI. Leaflet powers map-based discovery. Axios handles browser API requests. Server-side logic runs on Node.js + Express, with in-memory item data, OpenAI/Deepseek AI endpoints, Tesseract OCR, Sharp image heuristics, and OpenStreetMap geocoding fallback. LocalStorage persists favorites and cart state.

## Development Workflow
Use Git feature branches and PR-based review. Keep component logic separated from state/context and API integration. Document feature user stories, API contracts, and acceptance criteria in specs. Ensure templates and PR descriptions reference this constitution.

## Governance
This constitution is the project source of truth. All architectural decisions, templates, and implementation plans must align with it. Amendments require team review, documentation of the change, and a patch version update. PR reviewers must verify compliance with core principles and test coverage.

**Version**: 1.0.1 | **Ratified**: 2026-05-11 | **Last Amended**: 2026-05-11

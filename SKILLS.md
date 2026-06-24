# 🛠️ Project Skills & Technology Stack

This document outlines the core technologies, architectural patterns, and coding conventions used in this repository. 
**Note for AI Assistants (Copilot, Claude, Codex):** Please strictly adhere to these technologies and conventions when generating code, refactoring, or suggesting improvements.

## 1. Core Technologies
* **Framework:** Nuxt 4 (SSR/SSG capabilities, Auto-imports, File-based routing)
* **UI/Component Library:** Vue 3 & Quasar Framework v2
* **Language:** TypeScript (Strict typing preferred)
* **Styling:** Quasar CSS Variables & Utility Classes

## 2. Architecture & Patterns
* **Nuxt Extensibility:** Utilizing Nuxt Layers (e.g., `layers/layer-one`) for modular and scalable project structure.
* **Component Paradigm:** Vue 3 Composition API exclusively.
* **State Management:** Nuxt `useState` or Pinia (if integrated).
<!-- * **API Integration:** Nuxt 4 native `$fetch` and `useAsyncData` / `useFetch` for SSR-friendly data fetching. -->
* **API Integration:** Centralized API fetching using the custom `useApi` composable (`api` instance) with strict TypeScript generic response mapping.

## 3. 🤖 AI Code Generation Guidelines
When assisting with code generation in this project, AI agents must follow these rules:
1. **Composition API:** Always use `<script setup lang="ts">`. Do not use Options API.
2. **Quasar Components:** Prefer native Quasar components (e.g., `<q-btn>`, `<q-card>`, `<q-input>`) over raw HTML when building UIs.
3. **TypeScript:** Ensure all props, emits, and API responses have proper TypeScript interfaces/types defined. Avoid using `any`.
4. **Auto-imports:** Rely on Nuxt 4's auto-import feature for Vue APIs (`ref`, `computed`, `watch`) and custom composables. Do not manually import them unless necessary.
5. **Layer Structure:** When creating new domains or large features, consider placing them in the appropriate Nuxt Layer rather than the root directory.

## 4. Infrastructure & DevOps
* **Containerization:** Docker & Docker Compose.
* **Environments:** Managed via standard `docker-compose.yml` (Dev) and `docker-compose-PROD.yml` (Production).
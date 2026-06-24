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
4. **Auto-imports:** Rely on Nuxt's auto-import feature for Vue APIs and custom composables like `useApi`.
5. **Layer Structure:** When creating new domains or large features, consider placing them in the appropriate Nuxt Layer rather than the root directory.
6. **API Fetching Pattern:** Do NOT use native `$fetch` or `useFetch` directly for backend API communications. Always use the custom `api` client wrapped inside a `try-catch` block for robust error handling.

*Standard API Call Pattern:*
```typescript
try {
  const data = await api<ApiResponse<Permission>>('/api/permission', {
    method: 'GET',
  })
} catch (error) {
  console.error('Failed to fetch data', error)
}
```
7. **Props Declaration:** Always use reactive destructuring with default values for `defineProps`. DO NOT use the `withDefaults` compiler macro.

*Standard Props Pattern:*
```typescript
   const { count = 0, message = 'hello' } = defineProps<{
     count?: number
     message?: string
   }>()
```
8. **Emits Declaration:** Always use type-based declaration with tuple syntax for defineEmits. DO NOT use runtime array or object syntax.

*Standard Emits Pattern:*
```typescript
const emit = defineEmits<{
     'on-close': []
     change: [id: number]
     update: [value: string]
   }>()
```
9. **SFC Block Order:** Strictly order Vue Single-File Component blocks as follows:
 a. `<script setup lang="ts">`
 b. `<template>`
 c. `<style scoped>` (if styling is necessary)
10. **Styling & Dark Mode:** When writing custom styles, always consider dark mode support. Use `<style scoped lang="scss">` and apply dark mode overrides by targeting the `body.body--dark` class. Rely on CSS variables for color values.

*Standard Dark Mode Styling Pattern:*
```scss
<style scoped lang="scss">
    .text-holder {
      background-color: var(--dark-100);
    }

    body.body--dark {
      .text-holder {
        background-color: var(--dark-900);
      }
    }
</style>
```

## 4. Infrastructure & DevOps
* **Containerization:** Docker & Docker Compose.
* **Environments:** Managed via standard `docker-compose.yml` (Dev) and `docker-compose-PROD.yml` (Production).


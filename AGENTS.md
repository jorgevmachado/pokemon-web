<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Instructions
## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Sass (SCSS)
- react-icons
- Yarn
- Node.js v24.14.1

The goal is to keep the codebase **clean, scalable, typed, reusable, and easy to maintain**.

---

## General Rules
When generating code for this project, always follow these rules:

1. **Use TypeScript strictly**
    - Always type props, function parameters, return values, hooks, and state.
    - Avoid `any` unless explicitly requested.
    - Prefer `type` for component props and UI structures.
    - Prefer `interface` only when extension is needed.

2. **Prefer functional React components**
    - Use arrow functions for components.
    - Do not generate class components.

3. **Keep components small and reusable**
    - Break down large components into smaller ones.
    - Avoid mixing too much logic and UI in the same file.

4. **Use clean and readable code**
    - Use meaningful variable and function names.
    - Avoid overly complex abstractions unless necessary.
    - Favor simplicity over cleverness.

5. **Follow Next.js conventions**
    - Use App Router patterns unless otherwise specified.
    - Prefer server components when no client-side interactivity is needed.
    - Use `"use client"` only when necessary.

---
## Folder and File Conventions

Follow these conventions whenever creating files or suggesting structure.

### Preferred folder structure
```txt
src/
  app/
  components/
    ui/
    layout/
    common/
  features/
  hooks/
  lib/
  services/
  types/
  utils/
  styles/
```

### Skill Intent

- **write-guide**: enforce clean writing, naming, readability, and maintainable code structure
- **architecture-patterns**: enforce scalable architecture, separation of concerns, modular design, and file organization
- **frontend-patterns**: enforce frontend best practices for React, Next.js, UI composition, hooks, styling, and component patterns

### Priority Order

When multiple rules overlap, follow this priority:

1. architecture-patterns
2. frontend-patterns
3. write-guide

Always preserve existing business rules while improving structure, readability, and maintainability.
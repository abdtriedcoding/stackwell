<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project Guidelines for Agentic Coding

This document outlines the essential commands and code style guidelines for agents operating within this repository.

## 1. Build, Lint, Test, and Format Commands

### General Commands

- **Install Dependencies**: `npm install`
- **Development Server**: `npm run dev` (Starts the Next.js development server)
- **Build Project**: `npm run build` (Builds the Next.js application for production)
- **Start Production Server**: `npm run start` (Starts the Next.js production server after building)
- **Lint Code**: `npm run lint` (Runs ESLint to check for code quality and style issues)
- **Format Code**: `npm run format` (Formats code using Prettier across `**/*.{js,jsx,ts,tsx,json,css,md}` files)

### Pre-commit Hooks (Husky & lint-staged)

- A `pre-commit` hook is configured using Husky and `lint-staged`.
- Before each commit, `lint-staged` will automatically:
  - Run `npm run lint --fix` and `npm run format` on staged `*.{js,jsx,ts,tsx}` files.
  - Run `npm run format` on staged `*.{json,css,md}` files.
- **Commits will be blocked if unfixable ESLint errors or formatting issues exist in staged files.**

## 2. Code Style Guidelines

Adherence to these guidelines ensures consistency, readability, and maintainability across the codebase.

### Imports

- **Absolute Imports**: Prefer absolute imports using the `@/` alias for modules within the `src` directory. This is configured in `tsconfig.json`.
  - **Good**: `import { Button } from '@/components/ui/button';`
  - **Bad**: `import { Button } from '../../components/ui/button';`
- **Ordering**: Group imports by type:
  1.  Node.js built-in modules
  2.  Third-party libraries
  3.  Project components/utilities
  4.  Relative imports
  - Separate groups with a blank line.

### Formatting

- **Prettier**: The project uses Prettier for consistent code formatting. Run `npm run format` to automatically format your code.
  - Configuration is in `.prettierrc.json`:
    - `semi`: `true` (Add semicolons at the end of statements)
    - `singleQuote`: `true` (Use single quotes instead of double quotes)
    - `tabWidth`: `2` (Indent using 2 spaces)
    - `trailingComma`: `all` (Add trailing commas wherever valid in ES5, TypeScript, and flow)
    - `printWidth`: `100` (Wrap lines longer than 100 characters)
- **ESLint**: ESLint is used for code quality and style enforcement. Run `npm run lint` to identify issues. The `pre-commit` hook will attempt to fix fixable issues automatically.
- **Indentation**: Use 2 spaces for indentation.

### Types (TypeScript)

- **Strictness**: The `tsconfig.json` is configured for strict type checking (`"strict": true`). Always use explicit types where possible, especially for function parameters, return values, and complex object structures.
- **Interfaces vs. Types**: Use `type` aliases for simpler types and unions, and `interface` for object shapes, especially when they might be extended.
- **Any**: Avoid using `any` unless absolutely necessary and with a clear justification.
- **Generics**: Use generics to create reusable and type-safe components/functions.

### Naming Conventions

- **Variables and Functions**: Use `camelCase`.
  - **Good**: `const userName = 'John Doe';`, `function calculateSum(a: number, b: number): number { ... }`
  - **Bad**: `const user_name = 'John Doe';`, `function CalculateSum(...) { ... }`
- **Components**: Use `PascalCase`.
  - **Good**: `function UserProfileCard() { ... }`, `const PrimaryButton = () => { ... }`
  - **Bad**: `function userProfileCard() { ... }`, `const primary_button = () => { ... }`
- **Files**: Use `kebab-case` for component files and directories (e.g., `user-profile-card.tsx`). Use `camelCase` for utility files (e.g., `mathUtils.ts`).

### Error Handling

- **Try/Catch**: Use `try...catch` blocks for handling synchronous and asynchronous errors where appropriate.
- **Error Propagation**: Propagate errors up the call stack until they can be handled meaningfully (e.g., displaying a user-friendly message or logging).
- **Custom Errors**: Define custom error classes for specific application errors to provide more context.

## 3. Cursor/Copilot Rules

No specific Cursor rules (`.cursor/rules/`, `.cursorrules`) or Copilot rules (`.github/copilot-instructions.md`) were found in this repository. Therefore, follow general best practices and the established project guidelines above.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read `convex/_generated/ai/guidelines.md` first** for important guidelines on how to correctly use Convex APIs and patterns. The file contains rules that override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running `npx convex ai-files install`.

<!-- convex-ai-end -->

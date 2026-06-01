# AGENTS.md

Purpose: this file defines default operating rules for AI coding agents working in this repository.

## How Agents Should Use This File

- Read this file at task start, then read the relevant source files.
- Treat this document as the default policy for code changes in this repo.
- If explicit user instructions conflict with this file, user instructions win.
- If nested AGENTS.md files exist deeper in the tree, the nearest one to changed files takes precedence.

## Repository Scope

- This repository currently behaves as a single app project (`urlshortener-nextjs-app`), not a multi-package turborepo.
- Use one consistent set of standards unless future subprojects add nested AGENTS.md files.

## Project Identity

- Project: urlshortener-nextjs-app
- Stack: Next.js App Router, React 19, TypeScript (strict), Tailwind CSS v4, Clerk auth, Drizzle ORM with Neon
- Package manager: pnpm
- Runtime: Node.js (modern LTS recommended)

## Source of Truth

Agents should follow existing repository configuration and patterns before introducing new ones.

- TypeScript config: tsconfig.json
- Lint config: eslint.config.mjs
- Auth middleware: proxy.ts
- Database entrypoint: db/index.ts
- App routes and layout: app/

If a user request conflicts with this file, user instructions win.

## Directory Conventions

- app/: App Router pages, layouts, route segments
- db/: database client and schema definitions
- public/: static assets

Use existing alias paths where appropriate:

- @/* resolves to project root paths (configured in tsconfig.json)

## Coding Standards

### 1) Keep Changes Minimal and Scoped

- Avoid broad refactors unless explicitly requested.
- Do not reformat unrelated files.

### 2) Architecture and Framework Patterns (Layered/Clean Architecture)

- Keep Next.js App Router structure.
- Follow a layered architecture (clean architecture style) for feature implementation.
- Prefer Server Components by default.
- Add client components only when browser-only APIs or interactive state require it.
- Never query the database from React components.
- Enforce this flow for feature work: UI -> Server Action or route handler -> service -> repository -> database.
- Prefer Next.js Server Actions by default for UI-to-server calls.
- Use route handlers when an explicit API endpoint is required.
- Keep database access in repository modules that use db/index.ts.
- Services should hold business logic and call repositories, not the other way around.

### 3) TypeScript Quality

- Maintain strict TypeScript compatibility.
- Avoid any unless unavoidable and justified.
- Prefer explicit typing at boundaries (function params, return types, exported APIs).

### 4) Authentication and Authorization

- Keep Clerk integration intact.
- Do not weaken route protection in proxy.ts.
- Public routes must be explicit and minimal.

### 5) Database and Data Access

- Use Drizzle patterns already present in repo.
- Do not hardcode connection strings, secrets, or credentials.
- Read configuration from environment variables.

### 6) UI and Styling

- Use Shadcn and Tailwind utilities consistent with existing style.
- Prioritize Shadcn components first; create custom components only when no suitable Shadcn option exists.
- Reference `.agents/skills/shadcn/SKILL.md` for shadcn workflows and `.agents/skills/shadcn/mcp.md` when using shadcn MCP tooling.
- Keep accessibility in mind for interactive elements.
- Do not introduce a new design system unless requested.

## Dependencies

- Prefer existing dependencies over adding new packages.
- Add a dependency only if needed for the requested outcome.
- If a new dependency is added, keep it focused and explain why.

## Build, Lint, and Validation Commands

- Install deps: `pnpm install`
- Dev server: `pnpm dev`
- Lint: `pnpm lint`
- Build: `pnpm build`
- Start production build: `pnpm start`

## Testing Instructions

- There is currently no dedicated `pnpm test` script in `package.json`.
- For behavior changes, validate with lint and build at minimum.
- If you add non-trivial logic, add tests and wire a test script in `package.json` as part of the same change when feasible.
- If adding tests is out of scope, explicitly note this in the summary.

## Validation Workflow

After meaningful code changes, run checks in this order when feasible:

1. pnpm lint
2. pnpm build (for integration-level validation when needed)

If a command cannot run, report that clearly and explain why.

## Change Safety Rules

- Never commit secrets or tokens.
- Never remove security checks to make code pass.
- Never use destructive git commands unless user explicitly asks.
- Do not modify unrelated files.
- Preserve backward compatibility unless user requests a breaking change.

## Preferred Agent Behavior

1. Read relevant files first.
2. Propose or apply the smallest correct patch.
3. Validate impacted areas.
4. Summarize:

- what changed
- why it changed
- what was validated
- any risks or follow-ups

## PR and Review Expectations

- Changes should be understandable and intentionally scoped.
- Include tests when there is existing test coverage in touched area or when adding non-trivial logic.
- Flag assumptions and unclear requirements early.

## Commit and PR Instructions

- Keep commit messages short, imperative, and scoped to the change.
- Avoid mixing unrelated concerns in one commit or PR.
- PR summaries should include:
  - what changed
  - why the change was needed
  - how it was validated
  - any follow-up work
- Do not claim commands were run if they were not run.

## Security Considerations

- Never commit secrets, API keys, Clerk tokens, or database credentials.
- Use environment variables for sensitive values.
- Do not log sensitive user/auth/database data.
- Keep auth boundaries intact (especially middleware protections in `proxy.ts`).
- Never bypass validation or security checks only to make CI pass.

## Deployment and Environment Notes

- Ensure environment variables required by Clerk and database access are documented when introducing new ones.
- Prefer backward-compatible config changes unless a breaking change is explicitly requested.
- For production-impacting changes, include rollback-aware notes in the summary.

## Notes for Multi-Agent or Subagent Workflows

- Use specialized subagents only for clearly bounded tasks.
- Keep handoffs explicit: include inputs, expected output, and constraints.
- Merge subagent results conservatively and re-validate locally.

# AGENTS.md

## This is a public repository

`confetti-node` is open source and published to npm as `confetti`. Everything here is publicly visible: code, commit
messages, branch names, PR titles and descriptions, issues, and review comments.

Any code, systems, or tools that are not in this repository are private. Do not leak details about them here. This
applies to:

- **Commit messages**
- **PR titles and descriptions**, including cross-links between PRs
- **Code comments, docs, tests, and fixtures**
- **Branch names, issues, and review comments**

In practice:

- Don't mention private repository names, file paths, internal endpoints, class or service names, database tables, or
  implementation details from private code.
- Don't link to private repositories, PRs, issues, or internal tools.
- Don't include customer data, internal hostnames, credentials, tokens, or environment variables.
- Describe changes only in terms of this package and the public Confetti API (e.g. "Add `company` to contacts"),
  not in terms of how or why private code changed.
- If a change depends on private work, write "Requires a corresponding API update" rather than linking to or
  describing that work.

When unsure whether something is OK to include, leave it out.

## Commands

| Command         | Purpose                       |
| --------------- | ----------------------------- |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm test`      | Run tests (Node test runner)  |
| `npm run lint`  | ESLint + `tsc --noEmit`       |

Run `npm run lint` and `npm test` before finishing a task.

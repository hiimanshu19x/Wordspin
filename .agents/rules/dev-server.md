# Dev Server Management

- Treat `npm run dev` (and similar dev server commands) as a **persistent background service**, not a command that needs to finish.
- **Before starting a dev server**, always check whether one is already running (via `manage_task list` or by hitting the server URL with `read_url_content`).
- **Never start the dev server redundantly**. If it's already running, leave it alone.
- **Use `npm run build`** to validate compilation and catch TypeScript errors — not `npm run dev`.

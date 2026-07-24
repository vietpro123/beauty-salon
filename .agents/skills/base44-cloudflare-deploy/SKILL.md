---
name: base44-cloudflare-deploy
description: Instructions and SOP for configuring and deploying Base44 exported React/Vite projects to Cloudflare Workers or Pages as standalone SPAs.
---

# Base44 to Cloudflare Deployment SOP

This skill guides the agent on how to properly adapt a Base44-generated project for standalone deployment on Cloudflare Workers / Pages Assets without encountering blank screens or 405 Method Not Allowed errors.

## Key Principles & Diagnosis

1. **Disable Base44 Telemetry & Edit Plugins**:
   - In `vite.config.js`, set `analyticsTracker: false`, `visualEditAgent: false`, `navigationNotifier: false`, `hmrNotifier: false`.

2. **Deactivate SDK Background Analytics & Wrap Entities Proxy**:
   - In `src/api/base44Client.js`:
     - Call `base44.analytics.cleanup()` and override `base44.analytics.track = () => {}`.
     - When `!appId && !appBaseUrl` (standalone mode), proxy `base44.entities` to return empty fallback promises `list: async () => []`, `filter: async () => []`, `create: async (data) => ({ id: "local", ...data })`.

3. **Safe AuthContext Fallback**:
   - In `src/lib/AuthContext.jsx`, if `!appParams.appId` or app settings API fails, reset `authError` to `null` and finish loading immediately.

4. **SPA Assets Config**:
   - Provide `wrangler.jsonc` in repository root with `assets.not_found_handling: "single-page-application"` and `directory: "./dist"`.

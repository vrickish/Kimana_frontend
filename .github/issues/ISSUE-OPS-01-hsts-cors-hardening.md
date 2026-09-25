### ISSUE-OPS-01: Enforce Strict Transport Security (HSTS) & Restrict Open CORS

**Priority:** High (P1)  
**Labels:** `security`, `devops`, `infra`, `p1`  
**Files:** `next.config.mjs`, `vercel.json`  
**WSTG Reference:** `WSTG-CRYP-01`, `CWE-319`

#### 1. What the Problem Is
1. Wapiti flagged that Strict Transport Security (HSTS) is not explicitly set across tested endpoints:
   ```
   Category: TLS/SSL misconfigurations
   Description: Strict Transport Security (HSTS) is not set
   WSTG Code: WSTG-CRYP-01
   ```
2. Live HTTP probing against `https://kimana-frontend.vercel.app/` also identified a wildcard CORS header on root HTML document responses:
   ```http
   access-control-allow-origin: *
   ```

**Impact:**
- Missing explicit HSTS leaves users susceptible to SSL-stripping and man-in-the-middle attacks when accessing the site via unencrypted links (`http://`) before redirecting.
- Wildcard CORS on HTML pages allows unauthorized cross-origin reading or interaction.

#### 2. Technical Root Cause
The Next.js configuration in `next.config.mjs` does not declare `Strict-Transport-Security`. In addition, Vercel default domain routes return CORS headers if project settings or rewrites specify wildcard origins.

#### 3. Step-by-Step Resolution Guide
1. In `next.config.mjs`, declare the strict HSTS header with preload:
   ```javascript
   {
     key: 'Strict-Transport-Security',
     value: 'max-age=63072000; includeSubDomains; preload',
   }
   ```
2. In `vercel.json` (or Vercel project configuration), remove global wildcard CORS on HTML document routes. If CORS is required for partner API routes, scope it strictly to `/api/*`:
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "Strict-Transport-Security",
             "value": "max-age=63072000; includeSubDomains; preload"
           }
         ]
       }
     ]
   }
   ```
3. Prepare the domain for HSTS Preload submission at `https://hstspreload.org/`.

#### 4. Acceptance Criteria
- [ ] `curl -I https://kimana-frontend.vercel.app/` confirms `strict-transport-security: max-age=63072000; includeSubDomains; preload`.
- [ ] `curl -I http://kimana-frontend.vercel.app/` cleanly redirects (308) to HTTPS.
- [ ] HTML page responses do not emit `access-control-allow-origin: *`.

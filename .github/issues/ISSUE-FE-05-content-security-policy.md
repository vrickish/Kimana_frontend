### ISSUE-FE-05: Implement Comprehensive Content Security Policy (CSP) Header

**Priority:** High (P1)  
**Labels:** `security`, `frontend`, `nextjs`, `p1`  
**Files:** `next.config.mjs`, `src/middleware.js`  
**WSTG Reference:** `WSTG-CONF-12`, `OSHP-Content-Security-Policy`

#### 1. What the Problem Is
Wapiti detected that the `Content-Security-Policy` (CSP) header is missing on `https://kimana-frontend.vercel.app/`.

```http
GET / HTTP/1.1
Host: kimana-frontend.vercel.app
```

Without a CSP header, the application lacks defense-in-depth against Cross-Site Scripting (XSS), data injection, unauthorized script execution, and client-side data exfiltration. If an attacker injects a malicious script or a third-party dependency is compromised, arbitrary scripts can run with full access to cookies, localStorage, session state, and DOM elements (such as customer wallet addresses or bank transfer forms).

#### 2. Technical Root Cause
`next.config.mjs` has no headers configured (`const nextConfig = {};`). Next.js does not provide a default Content Security Policy; it must be defined explicitly in `next.config.mjs` or inside Next.js edge middleware.

#### 3. Step-by-Step Resolution Guide
1. Update `next.config.mjs` to configure strict CSP directives compatible with Next.js 16 (App Router), React 19, Tailwind CSS v4, and OGL WebGL rendering:
   ```javascript
   const cspHeader = `
     default-src 'self';
     script-src 'self' 'unsafe-eval' 'unsafe-inline';
     style-src 'self' 'unsafe-inline';
     img-src 'self' blob: data: https:;
     font-src 'self' data: https:;
     connect-src 'self' https://* wss://*;
     object-src 'none';
     base-uri 'self';
     form-action 'self';
     frame-ancestors 'none';
     upgrade-insecure-requests;
   `.replace(/\s{2,}/g, ' ').trim();

   const nextConfig = {
     async headers() {
       return [
         {
           source: '/(.*)',
           headers: [
             {
               key: 'Content-Security-Policy',
               value: cspHeader,
             },
           ],
         },
       ];
     },
   };

   export default nextConfig;
   ```
2. Test that all routes (`/`, `/dashboard`, `/exchange`, `/login`, `/onboarding/*`) load without CSP violation errors in the browser console.

#### 4. Acceptance Criteria
- [ ] `Content-Security-Policy` header is present on all HTTP responses.
- [ ] No browser console errors regarding blocked scripts, styles, or WebGL resources.
- [ ] `frame-ancestors 'none'` blocks unauthorized framing.

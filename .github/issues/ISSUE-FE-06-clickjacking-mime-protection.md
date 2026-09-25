### ISSUE-FE-06: Implement Anti-Clickjacking & MIME-Sniffing Defense Headers

**Priority:** Medium (P2)  
**Labels:** `security`, `frontend`, `nextjs`, `p2`  
**Files:** `next.config.mjs`  
**WSTG Reference:** `OSHP-X-Frame-Options`, `OSHP-X-Content-Type-Options`, `CWE-1021`, `CWE-79`

#### 1. What the Problem Is
Wapiti identified two missing security headers on `https://kimana-frontend.vercel.app/`:
1. `X-Frame-Options is not set` (Clickjacking Protection)
2. `X-Content-Type-Options is not set` (MIME Type Confusion)

**Impact:**
- **Clickjacking:** Without `X-Frame-Options: DENY`, attackers can embed `kimana-frontend.vercel.app` inside an iframe on an external domain and trick authenticated users into initiating transactions, modifying KYC documents, or authorizing actions via UI redressing.
- **MIME Sniffing:** Without `X-Content-Type-Options: nosniff`, browsers may execute malicious HTML/JS payloads hidden within non-executable content types (e.g. image uploads, SVGs, text files).

#### 2. Technical Root Cause
The Next.js configuration in `next.config.mjs` lacks an HTTP security headers declaration. Default Vercel deployments do not attach these headers automatically.

#### 3. Step-by-Step Resolution Guide
In `next.config.mjs`, declare the recommended OWASP defense headers:

```javascript
/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'X-XSS-Protection',
    value: '0',
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

#### 4. Acceptance Criteria
- [ ] `curl -I https://kimana-frontend.vercel.app/` returns `X-Frame-Options: DENY`.
- [ ] `curl -I https://kimana-frontend.vercel.app/` returns `X-Content-Type-Options: nosniff`.
- [ ] Attempting to embed the site inside an external iframe fails with frame denial error in the browser console.

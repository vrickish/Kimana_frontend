### ISSUE-FE-07: Remediate Internal Route & System Path Disclosure (`/dev/tokens`)

**Priority:** Medium (P2)  
**Labels:** `security`, `frontend`, `nextjs`, `p2`  
**Files:** `src/features/landing/components/LandingFooter.jsx:78`, `app/dev/tokens/page.js`, `src/middleware.js`  
**WSTG Reference:** `WSTG-ERRH-01`, `CWE-200`, `CWE-209`, `WASC-13`

#### 1. What the Problem Is
Wapiti flagged an information disclosure finding:
```
Category: Information Disclosure - Full Path
Description: Response contains potential system path: /dev/tokens
WSTG Code: WSTG-ERRH-01
```

**Root Cause:**
1. In `src/features/landing/components/LandingFooter.jsx:78`, there is an active link to an internal preview page:
   ```jsx
   <Link href="/dev/tokens" className="hover:opacity-100 transition-opacity">Design Tokens</Link>
   ```
2. The route `/dev/tokens` is an internal preview page (`app/dev/tokens/page.js`):
   `// Dev-only token preview — proves the Tailwind config renders correctly.`
3. In production, this route is accessible to anyone at `https://kimana-frontend.vercel.app/dev/tokens`.
4. Automated scanners flag `/dev/*` as potential Unix filesystem / device node path disclosure (`/dev/...`).

#### 2. Step-by-Step Resolution Guide

1. **Remove Link in Landing Page Footer:**
   In `src/features/landing/components/LandingFooter.jsx`, remove the `/dev/tokens` link from production or render it only in development mode:
   ```jsx
   {process.env.NODE_ENV !== 'production' && (
     <li>
       <Link href="/dev/tokens" className="hover:opacity-100 transition-opacity">Design Tokens</Link>
     </li>
   )}
   ```
2. **Gate `/dev/*` Routes in Production:**
   Add Next.js middleware in `src/middleware.js` to return 404 for `/dev/*` in production:
   ```javascript
   import { NextResponse } from 'next/server';

   export function middleware(request) {
     const { pathname } = request.nextUrl;
     if (pathname.startsWith('/dev') && process.env.NODE_ENV === 'production') {
       return new NextResponse(null, { status: 404 });
     }
     return NextResponse.next();
   }

   export const config = {
     matcher: ['/dev/:path*'],
   };
   ```
3. Alternatively, if design tokens should remain public documentation, migrate the route to `/brand/tokens` or `/docs/tokens` and remove dev comments.

#### 3. Acceptance Criteria
- [ ] In production, accessing `https://kimana-frontend.vercel.app/dev/tokens` returns a 404 Not Found.
- [ ] Landing page footer has no visible links to `/dev/*` in production builds.
- [ ] Re-scanning with Wapiti confirms 0 findings under Information Disclosure.

/** @type {import('next').NextConfig} */

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

const securityHeaders = [
  // 1. Content Security Policy (ISSUE-FE-05)
  {
    key: 'Content-Security-Policy',
    value: cspHeader,
  },
  // 2. Anti-Clickjacking Protection (ISSUE-FE-06)
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // 3. MIME-Type Sniffing Protection (ISSUE-FE-06)
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // 4. Referrer Policy (ISSUE-FE-06)
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // 5. Permissions Policy (ISSUE-FE-06)
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  // 6. Disable legacy XSS Auditor (ISSUE-FE-06)
  {
    key: 'X-XSS-Protection',
    value: '0',
  },
  // 7. Strict Transport Security (ISSUE-OPS-01)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
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

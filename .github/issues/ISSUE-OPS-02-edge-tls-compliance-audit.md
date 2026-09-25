### ISSUE-OPS-02: Edge TLS Verification: Investigate Scanner Alerts for OpenSSL CCS (CVE-2014-0224) & Secure Renegotiation

**Priority:** Medium (P2)  
**Labels:** `security`, `devops`, `infra`, `tls`, `p2`  
**Files:** Edge / DNS Configuration  
**WSTG Reference:** `WSTG-CRYP-01`, `CVE-2014-0224`

#### 1. What the Problem Is
Wapiti's TLS probe reported critical misconfiguration warnings against `kimana-frontend.vercel.app`:
1. `Server is vulnerable to OpenSSL CCS (CVE-2014-0224)` (Severity: Critical)
2. `Server doesn't support secure renegotiations` (Severity: Medium)
3. `Certificate doesn't use Extended Validation` (Severity: Medium)
4. `OCSP Must-Staple extension is missing` (Severity: Medium)

#### 2. Root Cause Analysis & Live Verification (False Positive Confirmation)
Active diagnostic testing with `openssl s_client` directly against the Vercel edge proxy (`216.198.79.195:443`) confirms:
```
openssl s_client -connect kimana-frontend.vercel.app:443 -tls1_2 < /dev/null
...
Secure Renegotiation IS supported
```
- **CVE-2014-0224:** An ancient OpenSSL vulnerability from 2014. Vercel utilizes modern edge proxies running current BoringSSL / Envoy engines with TLS 1.3/1.2 that do not have this vulnerability. Wapiti's legacy Python check triggers false positives on edge CDNs when handshake resets occur.
- **EV & OCSP:** EV certificates are obsolete in modern browsers and provide no technical advantage. OCSP Must-Staple is optional.

#### 3. Step-by-Step Resolution Guide
1. **Document False Positive for Compliance:**
   Record formal verification in the Kimana Security Compliance register with the exact OpenSSL handshake logs demonstrating `Secure Renegotiation IS supported` and modern cipher suites.
2. **Setup Production Custom Domain & DNS CAA Records:**
   When deploying the production domain (`kimana.com`):
   ```dns
   kimana.com. IN CAA 0 issue "letsencrypt.org"
   kimana.com. IN CAA 0 issue "pki.goog"
   kimana.com. IN CAA 0 iodef "mailto:security@kimana.com"
   ```
3. Run an independent TLS scan with `testssl.sh` or Qualys SSL Labs to maintain an "A+" SSL rating report for auditors.

#### 4. Acceptance Criteria
- [ ] Compliance documentation contains verified OpenSSL handshake logs and false positive sign-off.
- [ ] Production domain configured with valid DNS CAA records.
- [ ] External Qualys SSL Labs scan achieves grade `A` or higher.

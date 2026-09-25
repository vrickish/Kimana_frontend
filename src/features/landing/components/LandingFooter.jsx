import Link from 'next/link';
import { LogoWithWordmark } from '../../../components/ui/Logo';
import { footerDisclaimer } from '../../../copy';

export function LandingFooter() {
  return (
    <footer
      className="border-t py-16"
      style={{
        backgroundColor: 'var(--color-surface-1)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link href="/">
              <LogoWithWordmark />
            </Link>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Premium financial infrastructure made simple for African businesses. Cross-border payments, transparent FX, and business-ready records.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mt-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </div>
          </div>

          {/* Navigation Link Columns */}
          <div className="md:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-5">
            {/* Product */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Product
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <li>
                  <a href="#payment-certainty" className="hover:opacity-100 transition-opacity">Cross-Border FX</a>
                </li>
                <li>
                  <a href="#product" className="hover:opacity-100 transition-opacity">Business Console</a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:opacity-100 transition-opacity">Payment Tracking</a>
                </li>
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Solutions
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <li>
                  <a href="#solutions" className="hover:opacity-100 transition-opacity">African SMEs</a>
                </li>
                <li>
                  <a href="#solutions" className="hover:opacity-100 transition-opacity">Import & Export</a>
                </li>
                <li>
                  <a href="#working-capital" className="hover:opacity-100 transition-opacity">Working Capital</a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Resources
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <li>
                  <a href="#why-kimana" className="hover:opacity-100 transition-opacity">Why Kimana</a>
                </li>
                {process.env.NODE_ENV !== 'production' && (
                  <li>
                    <Link href="/dev/tokens" className="hover:opacity-100 transition-opacity">Design Tokens (Dev)</Link>
                  </li>
                )}
                <li>
                  <Link href="/dashboard" className="hover:opacity-100 transition-opacity">Customer Portal</Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Company
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <li>
                  <a href="#proof-bar" className="hover:opacity-100 transition-opacity">Product Principles</a>
                </li>
                <li>
                  <a href="#proof-bar" className="hover:opacity-100 transition-opacity">Security & KYB</a>
                </li>
                <li>
                  <Link href="/onboarding/business-details" className="hover:opacity-100 transition-opacity">Onboarding</Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Legal
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <li>
                  <span className="hover:opacity-100 cursor-pointer transition-opacity">Privacy Policy</span>
                </li>
                <li>
                  <span className="hover:opacity-100 cursor-pointer transition-opacity">Terms of Service</span>
                </li>
                <li>
                  <span className="hover:opacity-100 cursor-pointer transition-opacity">CBN Regulations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}>
          <p>© {new Date().getFullYear()} Kimana Technology Limited. All rights reserved.</p>
          <p className="text-center sm:text-right">{footerDisclaimer}</p>
        </div>
      </div>
    </footer>
  );
}

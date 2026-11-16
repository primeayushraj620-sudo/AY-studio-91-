import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { STUDIO_INFO, buildWhatsAppUrl } from '../data/studioData';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Showreel', href: '#showreel' },
  { label: 'Plans', href: '#plans' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const primaryHref = buildWhatsAppUrl(
    'Hello AY STUDIO 91, I want to start a video editing project.'
  );

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-[#09090B]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-8 px-6 lg:px-10">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
        >
          AY STUDIO <span className="text-purple-400">91</span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 text-zinc-300 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#9333EA] px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#7E22CE] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
          >
            Start a Project
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-200 transition-colors hover:border-zinc-700 hover:text-white md:hidden focus-visible:outline-2 focus-visible:outline-purple-400"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-zinc-800 bg-[#0D0D11] px-6 py-4 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center text-sm font-medium text-zinc-200 transition-colors hover:text-purple-400"
              >
                {link.label}
              </a>
            ))}
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#9333EA] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7E22CE]"
            >
              Chat on WhatsApp ({STUDIO_INFO.phoneDisplay})
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

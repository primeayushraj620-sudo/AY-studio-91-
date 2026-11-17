import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, MessageCircle } from 'lucide-react';
import { STUDIO_INFO, buildWhatsAppUrl } from '../data/studioData';

export function ContactFooter() {
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (!linkCopied) return;
    const timer = window.setTimeout(() => setLinkCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [linkCopied]);

  const handleCopyWebsiteLink = async () => {
    try {
      const publicUrl = `${window.location.origin}${window.location.pathname}`;
      await navigator.clipboard.writeText(publicUrl);
      setLinkCopied(true);
    } catch {
      setLinkCopied(false);
    }
  };

  const discussHref = buildWhatsAppUrl(
    'Hello AY STUDIO 91, I want to discuss a video editing order.'
  );
  const floatHref = buildWhatsAppUrl(
    'Hello AY STUDIO 91, I need video editing.'
  );

  return (
    <>
      <section id="contact" className="bg-[#09090B] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-zinc-800 bg-[#111115] p-8 sm:p-10 lg:grid-cols-12 lg:p-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium tracking-wide text-purple-400">
                Direct Studio Desk
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
                Let&apos;s create something amazing
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-300">
                Contact us directly on WhatsApp to share your raw footage, align on pacing and visual references, and confirm delivery timelines.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={discussHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#9333EA] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#7E22CE] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
                >
                  Chat &amp; Order on WhatsApp
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyWebsiteLink}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/60 px-5 py-3 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-purple-400/60 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
                >
                  {linkCopied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                      Website Link Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-purple-400" aria-hidden="true" />
                      Copy Website Link
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-medium text-zinc-400">Studio</dt>
                  <dd className="mt-0.5 font-display text-base font-semibold text-white">
                    {STUDIO_INFO.brand}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-zinc-400">Owner &amp; Lead Editor</dt>
                  <dd className="mt-0.5 text-base font-medium text-zinc-100">
                    {STUDIO_INFO.owner}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-zinc-400">WhatsApp Direct</dt>
                  <dd className="mt-0.5 font-mono text-base font-medium text-purple-300 tabular-nums">
                    {STUDIO_INFO.phoneDisplay}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800/80 bg-[#09090B] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 text-xs text-zinc-400 sm:flex-row sm:items-center lg:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-zinc-200">{STUDIO_INFO.brand}</span>
            <span aria-hidden="true">·</span>
            <span>© 2026 All Rights Reserved</span>
            <span aria-hidden="true">·</span>
            <span>Owner: {STUDIO_INFO.owner}</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#services" className="transition-colors hover:text-white">
              Services
            </a>
            <a href="#showreel" className="transition-colors hover:text-white">
              Showreel
            </a>
            <a href="#plans" className="transition-colors hover:text-white">
              Plans
            </a>
            <a href="#contact" className="transition-colors hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Compact Floating WhatsApp Button (keeps combined mobile sticky height <= 15%) */}
      <a
        href={floatHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chat with AY STUDIO 91"
        className="fixed right-4 bottom-4 z-30 inline-flex h-10 items-center gap-2 rounded-full bg-[#16A34A] px-4 text-xs font-semibold text-white shadow-lg transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#15803D] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span>WhatsApp Chat</span>
      </a>
    </>
  );
}

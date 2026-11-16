import { ArrowRight, MessageSquare } from 'lucide-react';
import { STUDIO_INFO, buildWhatsAppUrl } from '../data/studioData';
import { ResilientImage } from './ResilientImage';

const STUDIO_METRICS = [
  { label: 'Starter Package', value: '₹799', detail: 'Clean cuts, audio & HD export' },
  { label: 'Premium Package', value: '₹1,499', detail: 'Cinema grade, VFX & Full HD' },
  { label: 'Turnaround', value: '24–72 hrs', detail: 'Fast delivery per project scope' },
  { label: 'Direct Workflow', value: '1-on-1', detail: `With founder ${STUDIO_INFO.owner}` },
];

export function HeroSection() {
  const whatsappChatUrl = buildWhatsAppUrl(
    'Hello AY STUDIO 91, I want video editing.'
  );

  return (
    <section
      id="home"
      className="border-b border-zinc-800/70 bg-[#09090B] pt-10 pb-14 lg:pt-14 lg:pb-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Typographic Hierarchy */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-xs font-medium tracking-wide text-purple-400">
              {STUDIO_INFO.brand} · Post-Production &amp; Editing Studio
            </p>

            <h1 className="mt-4 font-display text-[clamp(2.5rem,4.5vw,4rem)] font-bold leading-[1.06] tracking-tight text-white [text-wrap:balance]">
              Your Video. <span className="text-purple-400">Our Creativity.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              We craft crisp Instagram Reels, long-form YouTube edits, cinematic color grades, and brand promotional videos built for modern audience retention.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#plans"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#9333EA] px-6 py-3 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#7E22CE] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
              >
                Explore Plans
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/60 px-5 py-3 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-purple-400/60 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
              >
                <MessageSquare className="h-4 w-4 text-purple-400" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: Dominant 16:9 Studio Frame */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-zinc-800 bg-[#111115] sm:min-h-[360px]">
              <ResilientImage
                src={STUDIO_INFO.heroImage}
                alt="AY STUDIO 91 color grading and video editing workstation"
                fallbackTitle="AY STUDIO 91 Color & Edit Suite"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-[#09090B]/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 px-5 py-4 text-xs text-zinc-300">
                <span className="font-medium text-zinc-100">
                  Editing &amp; Color Suite
                </span>
                <span className="font-mono tabular-nums text-zinc-400">
                  4K · Rec.709 · 60fps
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Studio Strip Below Split */}
        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-zinc-800/80 pt-8 lg:mt-14 lg:grid-cols-4 lg:gap-8">
          {STUDIO_METRICS.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-xs font-medium text-zinc-400">{item.label}</p>
              <p className="font-display text-2xl font-bold tracking-tight text-white tabular-nums">
                {item.value}
              </p>
              <p className="text-xs leading-relaxed text-zinc-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ArrowUpRight } from 'lucide-react';
import { STUDIO_SERVICES, type ServiceCategory } from '../data/studioData';

interface ServicesSectionProps {
  onSelectService: (category: ServiceCategory) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="services" className="border-b border-zinc-800/70 bg-[#09090B] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-purple-400">
              Post-Production Capabilities
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
              Editing services built for creators and brands
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400">
            Every project goes through structured rough cuts, rhythm pacing, color grading, and loudness-balanced audio export.
          </p>
        </div>

        {/* Asymmetric 3-column bento layout */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {STUDIO_SERVICES.map((service) => (
            <article
              key={service.id}
              className={`group flex flex-col justify-between rounded-2xl border border-zinc-800/90 bg-[#111115] p-6 transition-colors duration-200 hover:border-purple-500/50 sm:p-7 ${
                service.spanWide ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
                  <span className="font-mono text-xs font-medium text-purple-400 tabular-nums">
                    {service.number}.
                  </span>
                  <span className="font-mono text-xs text-zinc-400 tabular-nums">
                    Turnaround: {service.turnaround}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-white">
                  {service.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
                  {service.description}
                </p>

                {/* Clean unboxed metadata list with typographic separators */}
                <p className="mt-4 text-xs text-zinc-400">
                  {service.deliverables.join(' · ')}
                </p>
              </div>

              <div className="mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectService(service.category)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold text-purple-400 transition-colors duration-150 hover:text-purple-300 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
                >
                  Request {service.category} Edit
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

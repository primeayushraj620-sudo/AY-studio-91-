import { useEffect, useState } from 'react';
import { ArrowUpRight, Eye, X } from 'lucide-react';
import {
  SHOWREEL_PROJECTS,
  buildWhatsAppUrl,
  type ServiceCategory,
  type ShowreelProject,
} from '../data/studioData';
import { ResilientImage } from './ResilientImage';

type FilterOption = 'All' | ServiceCategory;

const FILTER_OPTIONS: FilterOption[] = [
  'All',
  'Reels',
  'YouTube',
  'Cinematic',
  'Promotional',
];

interface ShowreelSectionProps {
  onSelectFromShowreel: (category: ServiceCategory) => void;
}

export function ShowreelSection({ onSelectFromShowreel }: ShowreelSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [selectedProject, setSelectedProject] = useState<ShowreelProject | null>(
    null
  );

  const visibleProjects =
    activeFilter === 'All'
      ? SHOWREEL_PROJECTS
      : SHOWREEL_PROJECTS.filter((project) => project.category === activeFilter);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="showreel" className="border-b border-zinc-800/70 bg-[#09090B] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-purple-400">
              Selected Cuts &amp; Grading Styles
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
              Visual styles across formats
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter showreel by category"
            className="flex flex-wrap items-center gap-1 rounded-xl border border-zinc-800 bg-[#111115] p-1"
          >
            {FILTER_OPTIONS.map((option) => {
              const isActive = activeFilter === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setActiveFilter(option)}
                  aria-pressed={isActive}
                  className={`min-h-[36px] rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-purple-400 ${
                    isActive
                      ? 'bg-[#9333EA] text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Media-First Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => {
            const isFeatured = activeFilter === 'All' && index === 1;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedProject(project)}
                className={`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#111115] text-left transition-colors duration-200 hover:border-purple-500/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    isFeatured ? 'aspect-[16/9] lg:aspect-[21/10]' : 'aspect-[4/3]'
                  }`}
                >
                  <ResilientImage
                    src={project.image}
                    alt={project.imageAlt}
                    fallbackTitle={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B]/95 via-[#09090B]/35 to-transparent"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="font-medium text-purple-300">
                        {project.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{project.format}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{project.duration}</span>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between gap-4">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                        {project.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-300 transition-colors group-hover:text-white whitespace-nowrap shrink-0">
                        <Eye className="h-3.5 w-3.5 text-purple-400" aria-hidden="true" />
                        Inspect
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Project Lightbox Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#111115]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-zinc-800 px-6 py-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                <span className="font-semibold text-purple-400">
                  {selectedProject.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedProject.format}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{selectedProject.duration}</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project preview"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="aspect-[16/10] bg-black lg:col-span-7 lg:aspect-auto">
                <ResilientImage
                  src={selectedProject.image}
                  alt={selectedProject.imageAlt}
                  fallbackTitle={selectedProject.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between p-6 lg:col-span-5">
                <div>
                  <h3
                    id="lightbox-project-title"
                    className="font-display text-2xl font-bold tracking-tight text-white"
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                    {selectedProject.summary}
                  </p>

                  <dl className="mt-6 space-y-3 border-t border-zinc-800 pt-5 text-xs">
                    <div>
                      <dt className="font-medium text-zinc-400">Color Pipeline</dt>
                      <dd className="mt-0.5 text-zinc-200">{selectedProject.colorPipeline}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-zinc-400">Audio &amp; Sound Design</dt>
                      <dd className="mt-0.5 text-zinc-200">{selectedProject.soundDesign}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-zinc-400">Recommended Tier</dt>
                      <dd className="mt-0.5 font-medium text-purple-300">
                        {selectedProject.recommendedPlan}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-7 flex flex-col gap-2.5">
                  <a
                    href={buildWhatsAppUrl(
                      `Hello AY STUDIO 91, I want to book an edit in the style of "${selectedProject.title}" (${selectedProject.category}).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#9333EA] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#7E22CE]"
                  >
                    Order Similar Style on WhatsApp
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      const category = selectedProject.category;
                      setSelectedProject(null);
                      onSelectFromShowreel(category);
                    }}
                    className="inline-flex min-h-[42px] items-center justify-center rounded-lg border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-purple-400/60 hover:text-white"
                  >
                    Configure Custom Brief
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

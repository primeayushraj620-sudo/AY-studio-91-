import { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import {
  PRICING_PLANS,
  buildWhatsAppUrl,
  type ServiceCategory,
} from '../data/studioData';

type PlanChoice = 'Starter Plan (₹799)' | 'Premium Plan (₹1,499)' | 'Custom Package Quote';

interface PlansSectionProps {
  selectedCategory: ServiceCategory;
  onCategoryChange: (category: ServiceCategory) => void;
  selectedPlanChoice: PlanChoice;
  onPlanChoiceChange: (choice: PlanChoice) => void;
}

const CATEGORIES: ServiceCategory[] = ['Reels', 'YouTube', 'Cinematic', 'Promotional'];
const FOOTAGE_LENGTHS = ['Under 5 mins raw', '5–20 mins raw', '20+ mins / multi-cam'];

export function PlansSection({
  selectedCategory,
  onCategoryChange,
  selectedPlanChoice,
  onPlanChoiceChange,
}: PlansSectionProps) {
  const [clientName, setClientName] = useState('');
  const [footageLength, setFootageLength] = useState(FOOTAGE_LENGTHS[0]);
  const [projectNotes, setProjectNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const composedMessage = [
    `Hello AY STUDIO 91,`,
    clientName.trim() ? `Name: ${clientName.trim()}` : null,
    `Selected Plan: ${selectedPlanChoice}`,
    `Service Type: ${selectedCategory} Editing`,
    `Raw Footage: ${footageLength}`,
    projectNotes.trim() ? `Project Brief: ${projectNotes.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const whatsappUrl = buildWhatsAppUrl(composedMessage);

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(composedMessage);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const handleWhatsAppLaunch = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (selectedPlanChoice === 'Custom Package Quote' && !clientName.trim()) {
      event.preventDefault();
      setNameError('Please enter your name or channel name for a custom quote.');
      return;
    }
    setNameError('');
  };

  return (
    <section id="plans" className="border-b border-zinc-800/70 bg-[#09090B] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-purple-400">
            Transparent Packages
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
            Video editing plans
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Choose a ready-to-order plan for immediate WhatsApp booking, or tailor your exact project scope below.
          </p>
        </div>

        {/* Two Pricing Tiers */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {PRICING_PLANS.map((plan) => (
            <article
              key={plan.id}
              className={`flex flex-col justify-between rounded-2xl p-7 sm:p-8 ${
                plan.popular
                  ? 'border border-purple-500/70 bg-[#14101C]'
                  : 'border border-zinc-800 bg-[#111115]'
              }`}
            >
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                    {plan.name}
                  </h3>
                  {plan.badgeText && (
                    <span className="text-xs font-semibold text-purple-400 whitespace-nowrap shrink-0">
                      {plan.badgeText}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold tracking-tight text-white tabular-nums sm:text-5xl">
                    {plan.priceLabel}
                  </span>
                  <span className="text-xs text-zinc-400">per project</span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {plan.subtitle}
                </p>

                <ul className="mt-6 space-y-3 border-t border-zinc-800/80 pt-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-zinc-200"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-purple-400"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={buildWhatsAppUrl(plan.whatsappPrefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 ${
                    plan.popular
                      ? 'bg-[#9333EA] text-white hover:bg-[#7E22CE]'
                      : 'bg-zinc-100 text-zinc-950 hover:bg-white'
                  }`}
                >
                  Order Now
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onPlanChoiceChange(
                      plan.id === 'starter'
                        ? 'Starter Plan (₹799)'
                        : 'Premium Plan (₹1,499)'
                    );
                    document
                      .getElementById('order-builder')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-zinc-700 px-4 py-2.5 text-xs font-medium text-zinc-200 transition-colors hover:border-purple-400/60 hover:text-white whitespace-nowrap shrink-0"
                >
                  Customize Brief
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Interactive Custom Brief & WhatsApp Order Builder */}
        <div
          id="order-builder"
          className="mt-10 rounded-2xl border border-zinc-800 bg-[#111115] p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                Need a custom editing package or tailored brief?
              </h3>
              <p className="mt-1.5 text-sm text-zinc-400">
                Configure your video format and notes below to send a structured order directly to Yash Biswas on WhatsApp.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="block text-xs font-medium text-zinc-300">
                    1. Select Plan or Custom Quote
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(
                      [
                        'Starter Plan (₹799)',
                        'Premium Plan (₹1,499)',
                        'Custom Package Quote',
                      ] as PlanChoice[]
                    ).map((planOpt) => {
                      const active = selectedPlanChoice === planOpt;
                      return (
                        <button
                          key={planOpt}
                          type="button"
                          onClick={() => {
                            onPlanChoiceChange(planOpt);
                            setNameError('');
                          }}
                          className={`min-h-[38px] rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                            active
                              ? 'border-purple-500 bg-purple-500/15 text-purple-200'
                              : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                          }`}
                        >
                          {planOpt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300">
                    2. Service Category
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => {
                      const active = selectedCategory === category;
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => onCategoryChange(category)}
                          className={`min-h-[38px] rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                            active
                              ? 'border-purple-500 bg-purple-500/15 text-purple-200'
                              : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                          }`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="client-name"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Your Name / Channel
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      value={clientName}
                      onChange={(e) => {
                        setClientName(e.target.value);
                        if (nameError) setNameError('');
                      }}
                      placeholder="e.g. Rohan / Studio Creator"
                      className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-[#09090B] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
                    />
                    {nameError && (
                      <p className="mt-1.5 text-xs text-rose-400" role="alert">
                        {nameError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="footage-length"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      Raw Footage Length
                    </label>
                    <select
                      id="footage-length"
                      value={footageLength}
                      onChange={(e) => setFootageLength(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-[#09090B] px-3.5 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"
                    >
                      {FOOTAGE_LENGTHS.map((len) => (
                        <option key={len} value={len}>
                          {len}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="project-notes"
                    className="block text-xs font-medium text-zinc-300"
                  >
                    Editing Style or Reference Notes (Optional)
                  </label>
                  <textarea
                    id="project-notes"
                    rows={3}
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    placeholder="Share reference pacing, music vibe, deadline, or Google Drive link availability..."
                    className="mt-1.5 w-full rounded-lg border border-zinc-800 bg-[#09090B] px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Live Message Preview & Action */}
            <div className="flex flex-col justify-between rounded-xl bg-[#09090B] p-5 lg:col-span-5">
              <div>
                <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                  <span className="text-xs font-medium text-zinc-300">
                    WhatsApp Order Preview
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-400 transition-colors hover:text-purple-300"
                  >
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    {copied ? 'Copied' : 'Copy Text'}
                  </button>
                </div>

                <pre className="mt-4 whitespace-pre-wrap font-mono text-xs leading-relaxed text-zinc-300">
                  {composedMessage}
                </pre>
              </div>

              <div className="mt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppLaunch}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#9333EA] px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#7E22CE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
                >
                  Send Order on WhatsApp
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <p className="mt-2.5 text-center text-xs text-zinc-400">
                  Opens WhatsApp chat with +91 8871613206
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

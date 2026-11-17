/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ShowreelSection } from './components/ShowreelSection';
import { PlansSection } from './components/PlansSection';
import { ContactFooter } from './components/ContactFooter';
import type { ServiceCategory } from './data/studioData';

type PlanChoice =
  | 'Starter Plan (₹799)'
  | 'Premium Plan (₹1,499)'
  | 'Custom Package Quote';

export default function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory>('Reels');
  const [selectedPlanChoice, setSelectedPlanChoice] = useState<PlanChoice>(
    'Premium Plan (₹1,499)'
  );

  useEffect(() => {
    const publicUrl = `${window.location.origin}${window.location.pathname}`;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = publicUrl;

    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = publicUrl;
  }, []);

  const handleSelectBriefCategory = (category: ServiceCategory) => {
    setSelectedCategory(category);
    document
      .getElementById('order-builder')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection onSelectService={handleSelectBriefCategory} />
        <ShowreelSection onSelectFromShowreel={handleSelectBriefCategory} />
        <PlansSection
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedPlanChoice={selectedPlanChoice}
          onPlanChoiceChange={setSelectedPlanChoice}
        />
        <ContactFooter />
      </main>
    </div>
  );
}

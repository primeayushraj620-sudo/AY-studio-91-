export type ServiceCategory = 'Reels' | 'YouTube' | 'Cinematic' | 'Promotional';

export interface StudioService {
  id: string;
  number: string;
  category: ServiceCategory;
  title: string;
  description: string;
  deliverables: string[];
  turnaround: string;
  spanWide?: boolean;
}

export interface ShowreelProject {
  id: string;
  title: string;
  category: ServiceCategory;
  format: string;
  duration: string;
  aspectClass: string;
  image: string;
  imageAlt: string;
  summary: string;
  colorPipeline: string;
  soundDesign: string;
  recommendedPlan: string;
}

export interface PricingPlan {
  id: 'starter' | 'premium';
  name: string;
  price: number;
  priceLabel: string;
  badgeText?: string;
  popular?: boolean;
  subtitle: string;
  features: string[];
  whatsappPrefill: string;
}

export const STUDIO_INFO = {
  brand: 'AY STUDIO 91',
  owner: 'Yash Biswas',
  phoneDisplay: '+91 8871613206',
  whatsappNumber: '918871613206',
  heroImage: '/src/assets/images/hero_editing_suite_1794856524978.jpg',
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const STUDIO_SERVICES: StudioService[] = [
  {
    id: 'reels',
    number: '01',
    category: 'Reels',
    title: 'Reels & Short-Form Editing',
    description:
      'High-retention Instagram Reels and YouTube Shorts structured around strong 3-second hooks, beat-synced pacing, and kinetic captions.',
    deliverables: ['9:16 Vertical Mastering', 'Beat-Synced Cuts', 'Motion Subtitles'],
    turnaround: '24–48 hrs',
    spanWide: true,
  },
  {
    id: 'youtube',
    number: '02',
    category: 'YouTube',
    title: 'YouTube Long-Form Editing',
    description:
      'Cohesive storytelling for creators and educators with clean A-roll tightening, B-roll layering, chapter markers, and intro hooks.',
    deliverables: ['16:9 HD / 4K Export', 'B-Roll & Graphics', 'Audio Leveling'],
    turnaround: '48–72 hrs',
  },
  {
    id: 'cinematic',
    number: '03',
    category: 'Cinematic',
    title: 'Cinematic Color & Motion',
    description:
      'Film-inspired color grading, speed-ramped transitions, atmospheric sound design, and polished visual rhythm for standout visuals.',
    deliverables: ['Custom Color Grade', 'SFX & Risers', 'Speed Ramps'],
    turnaround: '48–72 hrs',
  },
  {
    id: 'promotional',
    number: '04',
    category: 'Promotional',
    title: 'Promotional & Brand Videos',
    description:
      'Sharp product commercials, founder stories, and social ad creatives engineered to present your brand with clarity and authority.',
    deliverables: ['Multi-Ratio Exports', 'Brand Typography', 'Ad Hook Variations'],
    turnaround: '2–4 days',
    spanWide: true,
  },
];

export const SHOWREEL_PROJECTS: ShowreelProject[] = [
  {
    id: 'urban-twilight-reel',
    title: 'After Hours Lookbook Cut',
    category: 'Reels',
    format: '9:16 Vertical',
    duration: '00:28',
    aspectClass: 'aspect-[4/3]',
    image: '/src/assets/images/reel_fashion_cut_1794856524839.jpg',
    imageAlt: 'Streetwear model walking across wet twilight pavement with cool violet cinema color grade',
    summary:
      'Fast-paced fashion reel built on rhythmic match cuts, subtle optical speed ramps, and cool twilight color separation.',
    colorPipeline: 'Cool Slate & Violet Split-Tone LUT',
    soundDesign: 'Layered foley footsteps, cloth whooshes & sub-bass drop',
    recommendedPlan: 'Starter Plan (₹799)',
  },
  {
    id: 'alpine-dusk-film',
    title: 'Alpine Passage Short Film',
    category: 'Cinematic',
    format: '2.39:1 Anamorphic',
    duration: '01:45',
    aspectClass: 'aspect-[16/9]',
    image: '/src/assets/images/cinematic_film_grade_1794856525826.jpg',
    imageAlt: 'Winding mountain road at blue hour dusk with warm headlights cutting through mist',
    summary:
      'Moody travel and automotive short featuring blue-hour shadow retention, warm headlight halation, and seamless ambient transitions.',
    colorPipeline: 'Film Emulation Curve · Teal Shadows & Amber Highlights',
    soundDesign: 'Stereo engine swells, wind ambience & orchestral stems',
    recommendedPlan: 'Premium Plan (₹1,499)',
  },
  {
    id: 'studio-director-essay',
    title: 'Creator Studio Breakdown',
    category: 'YouTube',
    format: '16:9 Full HD',
    duration: '12:14',
    aspectClass: 'aspect-[4/3]',
    image: '/src/assets/images/youtube_creator_frame_1794856525206.jpg',
    imageAlt: 'Creative director speaking in a concrete studio under soft directional window light',
    summary:
      'Long-form documentary video essay edited for uninterrupted viewer flow, clean dialogue compression, and subtle screen callouts.',
    colorPipeline: 'Natural Skin-Tone Balance & Neutral Contrast',
    soundDesign: 'Dialogue EQ, room tone cleanup & low-bed underscore',
    recommendedPlan: 'Premium Plan (₹1,499)',
  },
  {
    id: 'precision-audio-spot',
    title: 'Cinema & Sound Launch Spot',
    category: 'Promotional',
    format: '16:9 & 9:16',
    duration: '00:45',
    aspectClass: 'aspect-[4/3]',
    image: '/src/assets/images/commercial_product_ad_1794856525456.jpg',
    imageAlt: 'Matte black cinema prime lens and studio headphones on dark volcanic slate',
    summary:
      'High-contrast product launch edit combining macro reveal cuts, crisp kinetic typography, and punchy commercial sound design.',
    colorPipeline: 'High-Contrast Studio Black & Specular Roll-off',
    soundDesign: 'Tactile mechanical clicks, metallic risers & master mix',
    recommendedPlan: 'Premium Plan (₹1,499)',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Plan',
    price: 799,
    priceLabel: '₹799',
    subtitle: 'Ideal for clean Reels, Shorts, and straightforward creator edits.',
    features: [
      'Basic video editing',
      'Clean cuts and transitions',
      'Background music',
      'Basic color correction',
      'HD export',
    ],
    whatsappPrefill:
      'Hello AY STUDIO 91, I want to order the Starter Plan for Rs 799.',
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 1499,
    priceLabel: '₹1,499',
    badgeText: 'Most Popular',
    popular: true,
    subtitle: 'Full creative post-production for high-impact Reels, YouTube, and brand spots.',
    features: [
      'Advanced video editing',
      'Cinematic color grading',
      'Premium transitions',
      'Effects and sound design',
      'Full HD export',
    ],
    whatsappPrefill:
      'Hello AY STUDIO 91, I want to order the Premium Plan for Rs 1499.',
  },
];

import { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "sewer-cleaning-jetting",
    title: "Sewer Cleaning & Jetting",
    description:
      "High-pressure water jetting and comprehensive blockage removal for municipal and industrial systems.",
    icon: "Wrench",
    features: [
      "Municipal Mainline Cleaning",
      "CCTV Pipeline Inspections",
    ],
    category: "sewerage",
    featured: true,
    longDescription:
      "Our high-pressure water jetting service uses advanced Euro-6 compliant jetting units capable of clearing even the most stubborn blockages. Combined with state-of-the-art CCTV pipeline inspection technology, we diagnose and resolve issues with surgical precision, minimizing disruption to your operations.",
  },
  {
    slug: "desludging-grease-tank",
    title: "Desludging & Grease Tank",
    description:
      "Professional desludging services for septic tanks, grease traps, and industrial waste containment systems.",
    icon: "Droplets",
    features: [
      "Scheduled Desludging Programs",
      "Grease Trap / Tank Cleaning",
      "Waste Disposal & Compliance",
    ],
    category: "sewerage",
    longDescription:
      "Regular desludging is critical for maintaining operational efficiency and regulatory compliance. Our specialized tankers and trained technicians handle everything from routine grease trap cleaning to large-scale industrial sludge removal, with full environmental compliance documentation.",
  },
  {
    slug: "sludge-tank-maintenance",
    title: "Sludge Tank Maintenance",
    description:
      "Comprehensive maintenance programs for industrial sludge tanks and wastewater containment systems.",
    icon: "Container",
    features: [
      "Preventative Planning",
      "Structural Integrity Checks",
      "24/7 Facility Support",
    ],
    category: "sewerage",
  },
  {
    slug: "pump-repairs-panel",
    title: "Pump Repairs & Panel Box",
    description:
      "Expert repair and maintenance of sewage pumps, control panels, and electrical systems.",
    icon: "Zap",
    features: [
      "Emergency Pump Replacement",
      "Control Panel Diagnostics",
      "Preventative Maintenance",
    ],
    category: "machinery",
  },
  // {
  //   slug: "pipe-plumbing-works",
  //   title: "Pipe & Plumbing Works",
  //   description:
  //     "Complete pipe repair, replacement, and plumbing solutions for commercial and industrial facilities.",
  //   icon: "Wrench",
  //   features: [
  //     "Sewer & Grease Pipe Cleaning",
  //     "Pipe Breakage / Leakage Repair",
  //     "New Pipe Installation",
  //   ],
  //   category: "civil",
  // },
  // {
  //   slug: "wiring-renovations-civil",
  //   title: "Wiring, Renovations & Civil Works",
  //   description:
  //     "Expert commercial and residential renovations delivered with architectural precision, including wiring, waterproofing, and road works.",
  //   icon: "Building2",
  //   features: [
  //     "Wiring Solutions",
  //     "Waterproofing",
  //     "Road Works",
  //     "Interior Retrofit",
  //   ],
  //   category: "civil",
  //   longDescription:
  //     "Our civil engineering team manages complex waterproofing and road works to ensure long-term structural integrity. From commercial wiring upgrades to full-scale renovations, we bring the same precision engineering approach to every project.",
  // },
  {
    slug: "hygiene-services",
    title: "Hygiene Services",
    description:
      "Comprehensive facility hygiene solutions including sanitary disposal, air freshener systems, and consumables management.",
    icon: "Sparkles",
    features: [
      "Sanitary Bins & Disposal",
      "Urinal Sanitizers",
      "Air Freshener Systems",
      "Dust Mat Carpets",
      "Tissue Dispensers",
      "Hand Soap Systems",
    ],
    category: "hygiene",
  },
  {
    slug: "emergency-response",
    title: "Emergency Response",
    description:
      "24/7 rapid response for critical infrastructure failures, pipe breakages, and sewerage emergencies.",
    icon: "Siren",
    features: [
      "Pipe Breakage / Leakage",
      "Clogged Pipes / Toilets",
    ],
    category: "emergency",
  },
];

export const servicesByCategory = {
  sewerage: services.filter((s) => s.category === "sewerage"),
  civil: services.filter((s) => s.category === "civil"),
  hygiene: services.filter((s) => s.category === "hygiene"),
  emergency: services.filter((s) => s.category === "emergency"),
  machinery: services.filter((s) => s.category === "machinery"),
};

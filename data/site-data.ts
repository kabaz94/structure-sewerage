import { Certification, Client, Stat, Testimonial, NavLink, FooterColumn } from "@/types";

export const stats: Stat[] = [
  { value: 30, suffix: "+", label: "Years of Experience" },
  { value: 5000, suffix: "+", label: "Projects Completed" },
  { value: 350, suffix: "+", label: "Clients Served" },
  { value: 50, suffix: "+", label: "Service Units" },
  { value: 99.9, suffix: "%", label: "Client Satisfaction", isDecimal: true },
  { value: 24, suffix: "/7", label: "Emergency Response" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Structure Sewerage has been our trusted partner for over a decade. Their response time and technical expertise are unmatched in the industry.",
    author: "Ahmad Razak",
    role: "Facilities Director",
    company: "Tesco Malaysia",
  },
  {
    quote:
      "The team's professionalism and attention to regulatory compliance made our STP upgrade seamless. Highly recommended for any commercial infrastructure project.",
    author: "Sarah Chen",
    role: "Operations Manager",
    company: "Aeon Big",
  },
  {
    quote:
      "Their emergency response team saved us from a major disruption. Within 45 minutes of our call, they had a full crew on site resolving the issue.",
    author: "Dr. Mohd Fauzi",
    role: "Campus Director",
    company: "Sri KDU Schools",
  },
];

export const certifications: Certification[] = [
  {
    name: "CEPSTPO",
    standard: "Quality Management",
    icon: "ShieldCheck",
    image: "/images/certificates/indah-water.png",
  },
  {
    name: "IWK",
    standard: "Safety Standard",
    icon: "Building2",
    image: "/images/certificates/cidb.png",
  },
  {
    name: "SPAN",
    standard: "Environmental",
    icon: "Leaf",
    image: "/images/certificates/span.png",
  },
  {
    name: "CIDB",
    standard: "Construction Excellence",
    icon: "HardHat",
  },
];

export const clients: Client[] = [
  { name: "McDonald's", logo: "/images/clients/mcdonalds.png" },
  { name: "Sogo", logo: "/images/clients/sogo.png" },
  { name: "Politeknik", logo: "/images/clients/politeknik.png" },
  { name: "Berjaya", logo: "/images/clients/berjaya.png" },
  { name: "4Fingers", logo: "/images/clients/4finger.png" },
  { name: "Russian Embassy", logo: "/images/clients/russian-embassy.jpg" },
];

export const navLinks: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Sewerage Maintenance", href: "/services/sewer-cleaning-jetting" },
      { label: "Desludging", href: "/services/desludging-grease-tank" },
      { label: "Emergency Response", href: "/services/emergency-response" },
      { label: "Hygiene Services", href: "/services/hygiene-services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Compliance", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
];

import { NavLink, FooterColumn } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Services", href: "/services" },

  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      {
        label: "Sewerage Maintenance",
        href: "/services/sewer-cleaning-jetting",
      },
      { label: "Desludging", href: "/services/desludging-grease-tank" },
      {
        label: "Emergency Response",
        href: "/services/emergency-response",
      },
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

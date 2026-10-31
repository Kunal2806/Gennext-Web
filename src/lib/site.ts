export const CONTACT = {
  email: "info@gennextit.com",
  phone: { href: "tel:+917840079095", label: "+91-78400 79095" },
} as const;

export const LEGAL_ENTITY = "Gennext IT Management and Consulting Private Limited";

export const OFFICES = {
  india: {
    label: "India Office",
    lines: ["H-213, First Floor, Sector 63", "Noida (UP) - 201305"],
  },
  dubai: {
    label: "Dubai Office",
    entity: "Trois Con International FZC",
    lines: ["SAIF Office, R3-07/A", "PO Box 8692, Sharjah, UAE"],
  },
} as const;

export const SERVICE_ROUTES = [
  { href: "/services/it-advisory", label: "IT Advisory and Consulting" },
  { href: "/services/it-audits", label: "IT Audits" },
  {
    href: "/services/web-application-development-and-maintenance",
    label: "Web Application Development And Maintenance",
  },
  { href: "/services/mobile-applications", label: "Mobile Applications" },
  { href: "/services/others", label: "Others" },
  { href: "/services/web-development", label: "Web Development" },
] as const;

export const SERVICE_GROUPS = [
  {
    heading: "IT Consultancy",
    links: [
      { href: "/services/it-advisory", label: "IT Advisory and Consulting" },
      { href: "/services/it-audits", label: "IT Audits" },
    ],
  },
  {
    heading: "Application Development",
    links: [
      {
        href: "/services/web-application-development-and-maintenance",
        label: "Web Application Development And Maintenance",
      },
      { href: "/services/mobile-applications", label: "Mobile Applications" },
      { href: "/services/others", label: "Others" },
    ],
  },
  {
    heading: "Corporate Training",
    links: [{ href: "/services/web-development", label: "Web Development" }],
  },
] as const;

export const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/gennextit/", label: "Facebook" },
  { href: "https://x.com/gennext_it", label: "Twitter" },
  { href: "https://www.linkedin.com/company/gennext-it-solutions/about/", label: "LinkedIn" },
] as const;
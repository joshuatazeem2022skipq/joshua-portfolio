import type {
  AchievementItem,
  EducationItem,
  ExperienceItem,
  PersonalInfo,
  ProjectItem,
  SkillItem,
  StatItem,
} from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Joshua Tazeem",
  firstName: "Joshua",
  lastName: "Tazeem",
  title: "Software Architect | Full-Stack System Design",
  tagline: "Event-driven microservices · Reliability · Performance",
  summary:
    "I am a Software Architect with a robust expertise in designing event-driven microservice architectures that prioritize reliability and performance. With four years of experience, I focus on building scalable solutions and implementing DevOps best practices. My key achievements include significantly reducing incident detection latency and enhancing system uptime, demonstrating my dedication to creating efficient software solutions.",
  phone: "+92 303 5300569",
  email: "joshuatazeem@yahoo.com",
  location: "Faisalabad, Pakistan",
  yearsOfExperience: 4,
  socials: [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/joshua-tazeem-4a147b239",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/joshuatazeem2022skipq",
      icon: "github",
    },
    {
      label: "Email",
      href: "mailto:joshuatazeem@yahoo.com",
      icon: "email",
    },
    {
      label: "Phone",
      href: "tel:+923035300569",
      icon: "phone",
    },
    {
      label: "Location",
      href: "https://maps.google.com/?q=Faisalabad,Pakistan",
      icon: "location",
    },
  ],
};

export const experiences: ExperienceItem[] = [
  {
    id: "visibility-bots",
    company: "Visibility Bots",
    role: "Software Architect – Platform Engineering",
    period: "01/2025 – Present",
    startDate: "2025-01",
    endDate: "Present",
    description: "A company that develops IoT-based solutions",
    responsibilities: [
      "Architected event-driven microservices backend (Node.js, MQTT) for device telemetry ingestion with Redis pub/sub inter-service messaging — achieved 99.7% uptime and reduced incident detection to under 2 minutes",
      "Engineered write/read separation pattern scaling ingestion services independently from query services, eliminating bottlenecks in real-time dashboard synchronization via WebSocket",
      "Designed cross-platform React component library with platform-agnostic business logic layer, consumed by web dashboard and React Native mobile app — reduced code duplication by 60% and achieved synchronized feature parity",
      "Established distributed tracing with correlation IDs, circuit breaker patterns for external dependencies, and graceful degradation strategies maintaining core functionality during partial failures",
    ],
    technologies: [
      "Node.js",
      "MQTT",
      "Redis",
      "WebSocket",
      "React",
      "React Native",
      "Microservices",
      "IoT",
    ],
  },
  {
    id: "autorobos",
    company: "Autorobos",
    role: "Software Engineer – Full-Stack Architecture",
    period: "03/2023 – 12/2024",
    startDate: "2023-03",
    endDate: "2024-12",
    description: "Robotic solutions and enterprise software platform",
    responsibilities: [
      "Led Next.js migration with hybrid rendering strategy (SSR for personalized dashboards, SSG for marketing, API routes for backend) — improved page load times by 50% (4.2s → 2.1s)",
      "Decomposed monolithic application into bounded microservices with API gateway for routing and authentication, implementing Redis caching and PostgreSQL read replicas — reduced response time by 50% (800ms → 400ms)",
      "Architected infrastructure-as-code deployment: Docker containerization with blue-green deployments and automated health-check rollback — achieved 99.5% availability SLA and reduced deployment time from 45 to 8 minutes",
    ],
    technologies: [
      "Next.js",
      "SSR",
      "SSG",
      "API Gateway",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Microservices",
    ],
  },
  {
    id: "tzl-dynamics",
    company: "TZL Dynamics",
    role: "Software Engineer – Technical Leadership",
    period: "02/2023 – 07/2024",
    startDate: "2023-02",
    endDate: "2024-07",
    description: "Remote — Web solutions and platform development",
    responsibilities: [
      "Optimized full-stack performance: backend connection pooling with prepared statements, frontend React Window virtualization with progressive image loading, multi-layer caching (database, API, CDN) — reduced end-to-end latency by 63% (7s → 2.6s)",
      "Established technical leadership: led Agile ceremonies, conducted architectural reviews, mentored 2 junior engineers on full-stack patterns — achieved 95% test coverage and reduced production incidents by 40%",
    ],
    technologies: [
      "React",
      "CDN",
      "Caching",
      "Agile",
      "Performance Optimization",
    ],
  },
  {
    id: "aiksol",
    company: "AikSol",
    role: "Associate Software Engineer (Frontend) – Application Development",
    period: "07/2021 – 02/2023",
    startDate: "2021-07",
    endDate: "2023-02",
    description: "Software development company offering innovative solutions",
    responsibilities: [
      "Architected full-stack enterprise applications: Node.js/Express API with JWT and RBAC, React TypeScript component library with adapter pattern for third-party integrations — reduced development time by 30% across CRM and e-commerce platforms",
      "Optimized MongoDB data layer with aggregation pipelines, strategic indexing, and schema normalization patterns — improved dashboard query performance by 70% (5s → 1.5s) while maintaining data consistency",
    ],
    technologies: [
      "Node.js",
      "Express",
      "JWT",
      "React",
      "TypeScript",
      "MongoDB",
      "CRM",
      "Payment Gateways",
    ],
  },
];

export const education: EducationItem[] = [
  {
    id: "nuces-fast",
    institution:
      "National University of Computer and Emerging Sciences (NUCES-FAST)",
    degree: "Bachelor of Science in Electrical Engineering",
    field: "Computer Engineering",
    location: "Islamabad, Pakistan",
    period: "08/2018 – 11/2022",
    startDate: "2018-08",
    endDate: "2022-11",
  },
];

export const skills: SkillItem[] = [
  { name: "React", category: "Frontend", level: 95 },
  { name: "Next.js", category: "Frontend", level: 92 },
  { name: "TypeScript", category: "Languages", level: 90 },
  { name: "HTML", category: "Frontend", level: 95 },
  { name: "Redux", category: "Frontend", level: 85 },
  { name: "Node.js", category: "Backend", level: 93 },
  { name: "REST", category: "Backend", level: 92 },
  { name: "JWT", category: "Backend", level: 88 },
  { name: "API Gateway", category: "Backend", level: 88 },
  { name: "Microservices", category: "Backend", level: 92 },
  { name: "React Native", category: "Mobile", level: 85 },
  { name: "IoT", category: "Cloud", level: 88 },
  { name: "CDN", category: "Cloud", level: 82 },
  { name: "PostgreSQL", category: "Database", level: 88 },
  { name: "MongoDB", category: "Database", level: 87 },
  { name: "Redis", category: "Database", level: 90 },
  { name: "Caching", category: "Database", level: 90 },
  { name: "Docker", category: "DevOps", level: 88 },
  { name: "GitHub", category: "DevOps", level: 90 },
  { name: "Agile", category: "Practices", level: 90 },
  { name: "CRM", category: "Practices", level: 80 },
  { name: "Payment Gateways", category: "Practices", level: 80 },
  { name: "IDS", category: "Practices", level: 75 },
  { name: "Electrical Engineering", category: "Practices", level: 85 },
];

/** Case studies derived strictly from work experience on the resume. */
export const projects: ProjectItem[] = [
  {
    id: "iot-telemetry-platform",
    title: "IoT Telemetry & Platform Engineering",
    company: "Visibility Bots",
    description:
      "Event-driven microservices backend for device telemetry ingestion with Redis pub/sub messaging, write/read separation, and a cross-platform React component library shared by web and React Native.",
    role: "Software Architect – Platform Engineering",
    period: "01/2025 – Present",
    features: [
      "Event-driven microservices with Node.js and MQTT",
      "Redis pub/sub inter-service messaging",
      "Write/read separation for independent scaling",
      "Real-time dashboard sync via WebSocket",
      "Cross-platform React + React Native component library",
      "Distributed tracing, circuit breakers, and graceful degradation",
    ],
    technologies: [
      "Node.js",
      "MQTT",
      "Redis",
      "WebSocket",
      "React",
      "React Native",
      "IoT",
    ],
    category: "Platform Architecture",
    metrics: [
      "99.7% uptime",
      "Incident detection under 2 minutes",
      "60% less code duplication",
    ],
  },
  {
    id: "enterprise-platform-migration",
    title: "Enterprise Platform Migration & Microservices",
    company: "Autorobos",
    description:
      "Led Next.js hybrid rendering migration and decomposed a monolithic application into bounded microservices with API gateway, Redis caching, PostgreSQL read replicas, and Docker blue-green deployments.",
    role: "Software Engineer – Full-Stack Architecture",
    period: "03/2023 – 12/2024",
    features: [
      "Next.js SSR / SSG / API routes hybrid strategy",
      "Monolith decomposition into bounded microservices",
      "API gateway for routing and authentication",
      "Redis caching and PostgreSQL read replicas",
      "Docker blue-green deployments with health-check rollback",
    ],
    technologies: [
      "Next.js",
      "API Gateway",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Microservices",
    ],
    category: "Full-Stack Architecture",
    metrics: [
      "50% faster page loads (4.2s → 2.1s)",
      "50% lower response time (800ms → 400ms)",
      "99.5% availability SLA",
      "Deploy time 45 → 8 minutes",
    ],
  },
  {
    id: "performance-leadership",
    title: "Full-Stack Performance & Technical Leadership",
    company: "TZL Dynamics",
    description:
      "End-to-end performance optimization across backend pooling, React Window virtualization, progressive images, and multi-layer caching — paired with Agile leadership and mentoring.",
    role: "Software Engineer – Technical Leadership",
    period: "02/2023 – 07/2024",
    features: [
      "Backend connection pooling with prepared statements",
      "React Window virtualization",
      "Progressive image loading",
      "Multi-layer caching (database, API, CDN)",
      "Agile ceremonies and architectural reviews",
      "Mentored 2 junior engineers",
    ],
    technologies: ["React", "CDN", "Caching", "Agile"],
    category: "Performance",
    metrics: [
      "63% lower latency (7s → 2.6s)",
      "95% test coverage",
      "40% fewer production incidents",
    ],
  },
  {
    id: "enterprise-crm-ecommerce",
    title: "Enterprise CRM & E-commerce Applications",
    company: "AikSol",
    description:
      "Full-stack enterprise applications with Node.js/Express JWT + RBAC APIs, React TypeScript component libraries, and a MongoDB data layer optimized for dashboard performance.",
    role: "Associate Software Engineer (Frontend) – Application Development",
    period: "07/2021 – 02/2023",
    features: [
      "Node.js/Express API with JWT and RBAC",
      "React TypeScript component library",
      "Adapter pattern for third-party integrations",
      "MongoDB aggregation pipelines and indexing",
      "Schema normalization for data consistency",
    ],
    technologies: [
      "Node.js",
      "Express",
      "JWT",
      "React",
      "TypeScript",
      "MongoDB",
      "CRM",
      "Payment Gateways",
    ],
    category: "Enterprise Applications",
    metrics: [
      "30% faster development across CRM & e-commerce",
      "70% faster dashboard queries (5s → 1.5s)",
    ],
  },
];

export const achievements: AchievementItem[] = [
  {
    id: "high-performance-reliability",
    title: "High-Performance System Design and Reliability",
    description:
      "Achieved a sustained uptime of 99.7% for the telemetry platform while minimizing incident response time, showcasing a commitment to high-performance system design.",
  },
];

export const stats: StatItem[] = [
  { label: "Years Experience", value: "4", suffix: "+" },
  { label: "Roles Delivered", value: "4" },
  { label: "Peak Uptime", value: "99.7", suffix: "%" },
  { label: "Technologies", value: String(skills.length), suffix: "+" },
];

export const typingPhrases = [
  "Software Architect",
  "Full-Stack System Design",
  "Event-Driven Microservices",
  "Platform Engineering",
  "DevOps & Reliability",
];

export const skillCategories = [
  "Frontend",
  "Backend",
  "Mobile",
  "Cloud",
  "Database",
  "DevOps",
  "Languages",
  "Practices",
] as const;

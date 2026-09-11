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
  title: "Software Architect | Full-Stack System Design | SaaS & Platform Engineering",
  tagline: "Event-driven microservices · Real-time systems · Practical AI/LLM integration",
  summary:
    "Full-Stack Software Architect who designs and scales production web and mobile platforms end to end. Focused on event-driven microservices, real-time systems, and practical AI/LLM integration, including a RAG-powered chatbot built into an industrial automation platform. Known for keeping systems reliable in production, speeding up deployment pipelines, and guiding teams through architecture reviews and hands-on mentorship.",
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
    description: "Industrial IoT platform & real-time automation solutions",
    responsibilities: [
      "Architected event-driven Node.js microservices with OpenRemote for device telemetry ingestion and Redis pub/sub for inter-service communication, achieving continuous fault-tolerant availability and upgraded platform reliability.",
      "Engineered write/read separation pattern scaling ingestion services independently from query services, eliminating bottlenecks in real-time dashboard synchronization via WebSocket.",
      "Designed cross-platform React component library with platform-agnostic business logic layer, consumed by web dashboard and React Native mobile app.",
      "Integrated an AI chatbot with Retrieval-Augmented Generation (RAG) into an industrial automation platform, enabling users to interact with application/domain knowledge through an LLM-powered interface.",
    ],
    technologies: [
      "Node.js",
      "OpenRemote",
      "Redis pub/sub",
      "WebSocket",
      "React",
      "React Native",
      "AI/LLM (RAG)",
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
    description: "Robotic solutions and enterprise automation platform",
    responsibilities: [
      "Led a Next.js migration using SSR for personalized dashboards, SSG for marketing pages and API routes for backend functionality.",
      "Decomposed a monolithic application into bounded microservices behind an API gateway for routing and authentication, with Redis caching and PostgreSQL read replicas.",
      "Architected infrastructure-as-code deployment: Docker containerization with blue-green deployments and automated health-check rollbacks, achieving robust enterprise SLA availability and significantly improved deployment pipeline velocity.",
    ],
    technologies: [
      "Next.js",
      "SSR / SSG",
      "API Gateway",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Microservices",
      "CI/CD",
    ],
  },
  {
    id: "tzl-dynamics",
    company: "TZL Dynamics",
    role: "Software Engineer – Technical Leadership",
    period: "02/2023 – 07/2024",
    startDate: "2023-02",
    endDate: "2024-07",
    description: "Remote, evening shift — Web solutions & high-performance platform development",
    responsibilities: [
      "Optimized full-stack performance: backend connection pooling with prepared statements, frontend React Window virtualization with progressive image loading, multi-layer caching (database, API, CDN).",
      "Established technical leadership: led Agile ceremonies, conducted architectural reviews, mentored junior engineers on scalable full-stack patterns and test-driven architecture.",
    ],
    technologies: [
      "React",
      "React Window",
      "PostgreSQL",
      "Connection Pooling",
      "CDN",
      "Caching",
      "Agile",
      "Architecture Reviews",
    ],
  },
  {
    id: "aiksol",
    company: "AikSol",
    role: "Associate Software Engineer (Frontend)",
    period: "07/2021 – 02/2023",
    startDate: "2021-07",
    endDate: "2023-02",
    description: "Software development company offering innovative enterprise solutions",
    responsibilities: [
      "Architected full-stack enterprise applications: Node.js/Express API with JWT and RBAC, React TypeScript component library with adapter pattern for third-party integrations, accelerating development velocity and cross-platform feature delivery across CRM and e-commerce platforms.",
      "Optimized MongoDB data layer with aggregation pipelines, strategic indexing, and schema normalization patterns, achieving upgraded dashboard query throughput and improved response latency while maintaining data consistency.",
    ],
    technologies: [
      "Node.js",
      "Express",
      "JWT / RBAC",
      "React",
      "TypeScript",
      "MongoDB",
      "CRM",
      "Payment Gateways (Stripe & Paypal)",
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

export const skillCategories = [
  "Frontend",
  "Backend",
  "AI/LLM",
  "Data & Infrastructure",
  "Platform & Integrations",
  "Engineering",
] as const;

export const skills: SkillItem[] = [
  // Frontend
  { name: "Next.js", category: "Frontend", level: 95 },
  { name: "React", category: "Frontend", level: 95 },
  { name: "React Native", category: "Frontend", level: 90 },
  { name: "TypeScript", category: "Frontend", level: 93 },
  { name: "Redux Toolkit", category: "Frontend", level: 88 },
  { name: "Three.js", category: "Frontend", level: 86 },

  // Backend
  { name: "Node.js", category: "Backend", level: 94 },
  { name: "Express", category: "Backend", level: 92 },
  { name: "REST APIs", category: "Backend", level: 95 },
  { name: "API Gateway", category: "Backend", level: 90 },
  { name: "WebSockets", category: "Backend", level: 91 },

  // AI/LLM
  { name: "AI Chatbots", category: "AI/LLM", level: 93 },
  { name: "LLM API Integration", category: "AI/LLM", level: 94 },
  { name: "Retrieval-Augmented Generation (RAG)", category: "AI/LLM", level: 92 },
  { name: "AI-powered Application Features", category: "AI/LLM", level: 90 },

  // Data & Infrastructure
  { name: "PostgreSQL", category: "Data & Infrastructure", level: 91 },
  { name: "Redis", category: "Data & Infrastructure", level: 93 },
  { name: "MongoDB / Mongoose", category: "Data & Infrastructure", level: 89 },
  { name: "GraphQL", category: "Data & Infrastructure", level: 86 },
  { name: "CI/CD & Docker", category: "Data & Infrastructure", level: 89 },
  { name: "Multi-layer Caching", category: "Data & Infrastructure", level: 92 },
  { name: "CDN Acceleration", category: "Data & Infrastructure", level: 87 },

  // Platform & Integrations
  { name: "JWT Authentication", category: "Platform & Integrations", level: 94 },
  { name: "Role-Based Access Control (RBAC)", category: "Platform & Integrations", level: 93 },
  { name: "CRM Integrations", category: "Platform & Integrations", level: 88 },
  { name: "Payment Gateways (Stripe & Paypal)", category: "Platform & Integrations", level: 90 },
  { name: "Third-Party APIs & Adapters", category: "Platform & Integrations", level: 92 },

  // Engineering
  { name: "Performance Optimization", category: "Engineering", level: 95 },
  { name: "Scalability & Microservices", category: "Engineering", level: 94 },
  { name: "Debugging & Distributed Tracing", category: "Engineering", level: 92 },
  { name: "Testing & QA", category: "Engineering", level: 90 },
  { name: "Agile & Technical Leadership", category: "Engineering", level: 92 },
];

/** Case studies derived directly from the verified production roles on the new resume. */
export const projects: ProjectItem[] = [
  {
    id: "iot-telemetry-platform",
    title: "IoT Telemetry & Industrial AI Platform",
    company: "Visibility Bots",
    description:
      "Architected event-driven microservices for device telemetry ingestion using OpenRemote and Redis pub/sub, engineered write/read separation for real-time WebSocket sync, built a shared React/React Native library, and integrated a RAG-powered industrial AI chatbot.",
    role: "Software Architect – Platform Engineering",
    period: "01/2025 – Present",
    image: "/images/projects/visibility-bots.jpg",
    statusBadge: "Live Telemetry & RAG Active",
    features: [
      "Event-driven Node.js microservices with OpenRemote device telemetry ingestion",
      "Redis pub/sub inter-service communication delivering resilient real-time message brokering and fault tolerance",
      "Write/read separation pattern eliminating real-time dashboard WebSocket bottlenecks",
      "Cross-platform React + React Native shared component library with decoupled logic",
      "RAG-powered AI chatbot allowing users to interact with industrial domain knowledge",
    ],
    technologies: [
      "Node.js",
      "OpenRemote",
      "Redis pub/sub",
      "WebSocket",
      "React",
      "React Native",
      "AI / RAG",
      "Microservices",
    ],
    category: "Platform Architecture & AI",
    metrics: [
      "Continuous High Availability SLA",
      "Rapid Automated Incident Detection",
      "Extensive Cross-Platform Code Reusability",
      "Optimized Real-Time RAG Inference",
    ],
  },
  {
    id: "enterprise-platform-migration",
    title: "Enterprise Next.js Migration & Microservices Decomposition",
    company: "Autorobos",
    description:
      "Led end-to-end migration to Next.js using hybrid rendering (SSR/SSG/API routes) and decomposed a monolithic application into bounded microservices behind an API gateway with Redis caching, PostgreSQL read replicas, and Docker blue-green deployments.",
    role: "Software Engineer – Full-Stack Architecture",
    period: "03/2023 – 12/2024",
    image: "/images/projects/autorobos.jpg",
    statusBadge: "Fault-Tolerant Blue-Green Cluster",
    features: [
      "Next.js SSR for personalized dashboards, SSG for marketing, and API routes",
      "Monolith decomposition into bounded microservices behind an API gateway",
      "API gateway managing secure authentication, routing, and load distribution",
      "Redis caching layer and PostgreSQL read replicas optimizing query latency and database read scalability",
      "Infrastructure-as-code Docker blue-green deployments with automated health checks",
    ],
    technologies: [
      "Next.js",
      "API Gateway",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Microservices",
      "CI/CD",
    ],
    category: "Full-Stack Architecture",
    metrics: [
      "Optimized Page Rendering & Load Speeds",
      "Significantly Improved Network Latency",
      "Enterprise High-Availability SLA",
      "Streamlined Zero-Downtime Deployment Pipeline",
    ],
  },
  {
    id: "performance-leadership",
    title: "Full-Stack Performance Optimization & Technical Leadership",
    company: "TZL Dynamics",
    description:
      "Engineered comprehensive full-stack optimizations covering backend connection pooling, frontend React Window virtualization with progressive image loading, and multi-tier caching, while leading Agile ceremonies and mentoring engineers.",
    role: "Software Engineer – Technical Leadership",
    period: "02/2023 – 07/2024",
    image: "/images/projects/tzl-dynamics.jpg",
    statusBadge: "High-Throughput Streaming Verified",
    features: [
      "Backend connection pooling with prepared statements for database throughput",
      "Frontend React Window virtualization with progressive image rendering",
      "Multi-layer caching strategy spanning database, API gateway, and CDN",
      "Agile leadership: sprint planning, architectural design reviews, and backlog grooming",
      "Mentorship of junior engineers in scalable full-stack patterns and automated testing",
    ],
    technologies: [
      "React",
      "React Window",
      "PostgreSQL",
      "Multi-tier Caching",
      "CDN",
      "Agile Leadership",
    ],
    category: "Performance & Leadership",
    metrics: [
      "Substantially Improved Execution Latency",
      "Comprehensive Automated Test Coverage",
      "Marked Reduction in Production Incidents",
      "Upgraded Team Architecture Standards",
    ],
  },
  {
    id: "enterprise-crm-ecommerce",
    title: "Enterprise CRM & Multi-Gateway E-Commerce Architecture",
    company: "AikSol",
    description:
      "Architected full-stack enterprise platforms with Node.js/Express JWT + RBAC APIs, reusable React TypeScript component libraries utilizing adapter patterns for integrations, and an optimized MongoDB aggregation data layer.",
    role: "Associate Software Engineer (Frontend)",
    period: "07/2021 – 02/2023",
    image: "/images/projects/aiksol.jpg",
    statusBadge: "Stripe & PayPal Multi-Gateway Online",
    features: [
      "Enterprise Node.js/Express API secured with JWT and role-based access control (RBAC)",
      "Modular React TypeScript component library with adapter pattern for third-party integrations",
      "Seamless payment gateway integration supporting both Stripe and PayPal",
      "MongoDB aggregation pipelines and schema normalization patterns",
      "Strategic indexing optimizing dashboard analytics query latency and throughput",
    ],
    technologies: [
      "Node.js",
      "Express",
      "JWT / RBAC",
      "React",
      "TypeScript",
      "MongoDB",
      "Stripe & PayPal",
    ],
    category: "Enterprise Applications",
    metrics: [
      "Accelerated Feature Delivery Velocity",
      "Optimized Aggregation Query Latency",
      "Upgraded RBAC Security & Access Control",
    ],
  },
];

export const achievements: AchievementItem[] = [
  {
    id: "high-performance-reliability",
    title: "High-Performance System Design and Reliability",
    description:
      "Architected the telemetry platform for continuous high availability, seamless scalability, and rapid incident response, demonstrating commitment to robust enterprise system design.",
  },
  {
    id: "industrial-ai-rag",
    title: "Industrial AI & LLM Retrieval-Augmented Generation",
    description:
      "Successfully integrated an LLM chatbot with RAG into an industrial automation platform, enabling enterprise users to query real-time domain and application knowledge.",
  },
];

export const stats: StatItem[] = [
  { label: "Architecture", value: "Scalable", suffix: " Systems" },
  { label: "Performance", value: "Optimized", suffix: " Latency" },
  { label: "Reliability", value: "Continuous", suffix: " Uptime" },
  { label: "Delivery", value: "Upgraded", suffix: " Velocity" },
];

export const typingPhrases = [
  "Software Architect",
  "Full-Stack System Design",
  "SaaS & Platform Engineering",
  "Event-Driven Microservices",
  "Practical AI / LLM & RAG Systems",
  "High Availability & Scalable Architecture",
];

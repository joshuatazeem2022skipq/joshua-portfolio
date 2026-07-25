export interface SocialLink {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "email" | "phone" | "location";
}

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  tagline: string;
  summary: string;
  phone: string;
  email: string;
  location: string;
  yearsOfExperience: number;
  socials: SocialLink[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
}

export interface SkillItem {
  name: string;
  category:
    | "Frontend"
    | "Backend"
    | "Mobile"
    | "Cloud"
    | "Database"
    | "DevOps"
    | "Languages"
    | "Practices";
  level: number;
  years?: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  company: string;
  description: string;
  role: string;
  features: string[];
  technologies: string[];
  category: string;
  period: string;
  github?: string;
  live?: string;
  metrics?: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
}

export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
}

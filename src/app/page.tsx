import { GalaxySceneLazy } from "@/features/galaxy/GalaxySceneLazy";
import { JourneyNav } from "@/components/layout/JourneyNav";
import { HeroSection } from "@/features/sections/HeroSection";
import { AboutSection } from "@/features/sections/AboutSection";
import { SkillsSection } from "@/features/sections/SkillsSection";
import { ExperienceSection } from "@/features/sections/ExperienceSection";
import { ProjectsSection } from "@/features/sections/ProjectsSection";
import { ResumeSection } from "@/features/sections/ResumeSection";
import { ContactSection } from "@/features/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <GalaxySceneLazy />
      <JourneyNav />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}

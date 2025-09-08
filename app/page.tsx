import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { AIChatbotSection } from "@/components/ai-chatbot-section";
import { ResumeSection } from "@/components/resume-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <AIChatbotSection />
        <ResumeSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t border-border/50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">
              © 2025 Glenn Dalbey. Built with Next.js, TypeScript, and AI assistance.
            </p>
            <p className="text-sm">
              Specializing in AI, Machine Learning, and Data Science Solutions
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
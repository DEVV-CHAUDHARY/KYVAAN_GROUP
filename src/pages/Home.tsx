import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import CategoryMarquee from "../components/CategoryMarquee";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import MapSection from "../components/MapSection";
import ProjectShowcase from "../components/ProjectShowcase";
import TreeExperience from "../components/TreeExperience";
import { getProjectIndex } from "../data/projects";
import {
  AboutSection,
  IntroSection,
  PhilosophySection,
  VisualStory,
} from "../components/StorySections";

export default function Home({ onOpenProject }: { onOpenProject: (slug: string) => void }) {
  const location = useLocation();
  const state = (location.state ?? null) as {
    project?: string;
    highlight?: string;
    scrollTo?: string;
  } | null;

  /** Bridge: the tree and map can drive the sticky showcase. */
  const jumpRef = useRef<((i: number) => void) | null>(null);
  const handleReady = useCallback((fn: (i: number) => void) => {
    jumpRef.current = fn;
  }, []);

  // when returning from a project, align the showcase to that project
  useEffect(() => {
    if (!state?.highlight) return;
    const i = getProjectIndex(state.highlight);
    if (i >= 0) jumpRef.current?.(i);
  }, [state?.highlight]);

  useEffect(() => {
    document.title = "KYVAAN Group — Real Estate · Architecture · Permanence";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "KYVAAN Group creates considered real estate — places with identity, lasting value and a distinctly human scale. Explore the KYVAAN ecosystem, projects and locations."
      );
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <Hero onExplore={scrollTo} />
      <CategoryMarquee />
      <IntroSection />
      <TreeExperience onOpenProject={onOpenProject} activeSlug={state?.highlight} />
      <ProjectShowcase onOpenProject={onOpenProject} onReady={handleReady} />
      <PhilosophySection />
      <VisualStory />
      <AboutSection />
      <MapSection onOpenProject={onOpenProject} />
      <ContactSection preselect={state?.project} />
      <Footer />
    </main>
  );
}

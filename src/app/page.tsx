import { ConceptSection } from "@/components/home/concept-section";
import { EffectSection } from "@/components/home/effect-section";
import { FeatureSection } from "@/components/home/feature-section";
import { HeroSection } from "@/components/home/hero-section";
import { LineupSection } from "@/components/home/lineup-section";
import { PersonaSection } from "@/components/home/persona-section";
import { StoresSection } from "@/components/home/stores-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ConceptSection />
      <PersonaSection />
      <EffectSection />
      <LineupSection />
      <FeatureSection />
      <StoresSection />
    </main>
  );
}

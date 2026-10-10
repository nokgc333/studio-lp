import { ConceptSection } from "@/components/home/concept-section";
import { HeroSection } from "@/components/home/hero-section";
import { PersonaSection } from "@/components/home/persona-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ConceptSection />
      <PersonaSection />
    </main>
  );
}

import { HeroSection } from "@/components/home/hero-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { PromptPreviewSection } from "@/components/home/prompt-preview-section";
import { FeaturedResponsesSection } from "@/components/home/featured-responses-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <PromptPreviewSection />
      <FeaturedResponsesSection />
      <CTASection />
    </>
  );
}

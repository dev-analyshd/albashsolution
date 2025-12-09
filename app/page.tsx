import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { MarketplacePreview } from "@/components/home/marketplace-preview"
import { HowItWorks } from "@/components/home/how-it-works"
import { StatsSection } from "@/components/home/stats-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <MarketplacePreview />
      <HowItWorks />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}

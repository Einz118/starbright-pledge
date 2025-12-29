import { Helmet } from "react-helmet-async";
import { StarField } from "@/components/StarField";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { PollutionJourneySection } from "@/components/PollutionJourneySection";
import { ConstellationSection } from "@/components/ConstellationSection";
import { StorySection } from "@/components/StorySection";
import { LearnSection } from "@/components/LearnSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { ActionSection } from "@/components/ActionSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>The Obscured Sky | A Starkeeper&apos;s Quest</title>
        <meta 
          name="description" 
          content="Become a Starkeeper and restore the fading constellations. An interactive STEAM experience connecting plastic pollution, air quality, and light pollution to the disappearing night sky. For students ages 10-18." 
        />
        <meta name="keywords" content="plastic pollution, light pollution, stars for kids, STEAM project, microplastics, astronomy education, constellation activity, environmental education, starkeeper" />
        <meta property="og:title" content="The Obscured Sky - A Starkeeper's Quest" />
        <meta property="og:description" content="Restore the fading constellations by combating plastic, air, and light pollution. An immersive educational experience." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://theobscuredsky.org" />
      </Helmet>

      <div className="relative min-h-screen bg-background overflow-hidden">
        <StarField />
        <Navigation />
        
        <main>
          <HeroSection />
          <PollutionJourneySection />
          <ConstellationSection />
          <StorySection />
          <LearnSection />
          <ShowcaseSection />
          <ActionSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
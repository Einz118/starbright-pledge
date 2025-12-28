import { Helmet } from "react-helmet-async";
import { StarField } from "@/components/StarField";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
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
        <title>The Fading Stars Project | When Stars Disappear, Our Plastic is the Reason</title>
        <meta 
          name="description" 
          content="An interactive STEAM experience connecting the 7 stars of Ursa Minor to 7 types of plastic pollution. Discover how plastic and light pollution are stealing the stars from our sky. For students ages 10-18." 
        />
        <meta name="keywords" content="plastic pollution, light pollution, stars for kids, STEAM project, microplastics, astronomy education, constellation activity, environmental education" />
        <meta property="og:title" content="The Fading Stars Project" />
        <meta property="og:description" content="When Stars Disappear, Our Plastic is the Reason. An immersive educational experience." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fadingstars.org" />
      </Helmet>

      <div className="relative min-h-screen bg-background overflow-hidden">
        <StarField />
        <Navigation />
        
        <main>
          <HeroSection />
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

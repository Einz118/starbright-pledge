import { Star, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative py-12 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-star-glow" />
            <span className="font-display font-bold text-foreground">The Fading Stars Project</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#constellation" className="hover:text-foreground transition-colors">Constellation</a>
            <a href="#story" className="hover:text-foreground transition-colors">Story</a>
            <a href="#learn" className="hover:text-foreground transition-colors">Learn</a>
            <a href="#action" className="hover:text-foreground transition-colors">Take Action</a>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-pollution fill-pollution" />
            <span>for the stars</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            A STEAM education project connecting astronomy, environmental science, and art. 
            Designed for students ages 10-18.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Keywords: plastic pollution, light pollution, stars for kids, STEAM project, microplastics, astronomy education
          </p>
        </div>
      </div>
    </footer>
  );
};

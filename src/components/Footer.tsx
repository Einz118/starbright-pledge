import { Star, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative py-12 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-star-glow" />
            <span className="font-display font-bold text-foreground">The Obscured Sky</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#constellation" className="hover:text-foreground transition-colors">Lost Dipper</a>
            <a href="#learn" className="hover:text-foreground transition-colors">Library</a>
            <a href="#showcase" className="hover:text-foreground transition-colors">Impact</a>
            <a href="#action" className="hover:text-foreground transition-colors">Take Action</a>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-hope fill-hope" />
            <span>for the stars</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            A Starkeeper&apos;s Quest — STEAM education connecting astronomy, environmental science, and action. Ages 10-18.
          </p>
        </div>
      </div>
    </footer>
  );
};
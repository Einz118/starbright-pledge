import { motion } from "framer-motion";
import { ChevronDown, Sparkles, BookOpen } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-star-glow/8 via-transparent to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-gradient-radial from-cosmic-purple/20 via-transparent to-transparent rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Starkeeper badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="starkeeper-badge text-sm font-medium">
            <Sparkles className="w-4 h-4 text-hope" />
            <span className="text-hope">A Starkeeper&apos;s Quest Awaits</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="text-foreground">The </span>
          <span className="text-glow bg-gradient-to-r from-star-glow via-primary to-clean-air bg-clip-text text-transparent">
            Obscured Sky
          </span>
        </motion.h1>

        {/* Narrative voiceover text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed italic">
            &ldquo;For millennia, humans told stories by the stars. But our modern world is writing 
            a new story—one of fading lights. The stars are disappearing, not because they&apos;re gone, 
            but because we&apos;ve put a veil between us and the cosmos.&rdquo;
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-foreground/80 font-display mb-4"
        >
          That veil is made of <span className="text-pollution-amber">plastic</span>, <span className="text-pollution-smog">smoke</span>, and <span className="text-light-glare">wasted light</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-2xl md:text-3xl font-display font-bold text-hope mb-12"
        >
          You are needed, Starkeeper. Begin your quest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#pollution-journey"
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-primary to-clean-air text-primary-foreground font-display font-medium hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105"
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Begin Your Quest
            </span>
          </a>
          <a
            href="#resources"
            className="px-8 py-4 rounded-full glass-card text-foreground font-display font-medium hover:bg-secondary/50 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            For Educators
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
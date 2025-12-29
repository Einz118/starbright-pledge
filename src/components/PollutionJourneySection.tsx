import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Droplets, Wind, Lightbulb, X, Sparkles } from "lucide-react";

interface PollutionHotspot {
  id: string;
  title: string;
  stat: string;
  description: string;
  icon: typeof Droplets;
  color: string;
  bgColor: string;
  position: { top: string; left: string };
}

const pollutionHotspots: PollutionHotspot[] = [
  {
    id: "microplastic",
    title: "Microplastic Veil",
    stat: "Over 10 million tons",
    description: "of plastic enter our oceans yearly, breaking into tiny airborne particles that scatter starlight like a dirty window!",
    icon: Droplets,
    color: "text-purple-400",
    bgColor: "bg-purple-500/30",
    position: { top: "30%", left: "15%" },
  },
  {
    id: "smog",
    title: "Atmospheric Smog",
    stat: "Air pollution creates a haze",
    description: "that bleaches the night sky like fog on a mirror. The tiny particles block and scatter starlight before it reaches your eyes!",
    icon: Wind,
    color: "text-gray-400",
    bgColor: "bg-gray-500/30",
    position: { top: "45%", left: "80%" },
  },
  {
    id: "light",
    title: "Light Glare",
    stat: "~35% of outdoor light",
    description: "is wasted, shining directly UP into the sky! Cities create bright domes that wash out the stars above them.",
    icon: Lightbulb,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/30",
    position: { top: "70%", left: "50%" },
  },
];

export const PollutionJourneySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values for pollution layers - more dramatic
  const microplasticOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.4], [0, 0.6, 0.9]);
  const smogOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.55], [0, 0.5, 0.8]);
  const lightGlareOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.6, 1]);
  const starsOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.7], [1, 0.8, 0.4, 0.1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const statOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

  const selectedHotspot = pollutionHotspots.find(h => h.id === activeHotspot);

  return (
    <section
      id="pollution-journey"
      ref={containerRef}
      className="relative min-h-[250vh]"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-background via-deep-navy to-background">
        {/* Animated stars background */}
        <motion.div
          style={{ opacity: starsOpacity }}
          className="absolute inset-0"
        >
          {/* Bright colorful stars */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                backgroundColor: ['#fff', '#fef08a', '#7dd3fc', '#c4b5fd', '#fda4af'][Math.floor(Math.random() * 5)],
                boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        {/* Microplastic layer - purple shimmer */}
        <motion.div
          style={{ opacity: microplasticOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-purple-400/20 to-pink-500/30" />
          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-300/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Smog layer - grey haze */}
        <motion.div
          style={{ opacity: smogOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-500/50 via-gray-400/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-600/40 via-transparent to-gray-500/30" />
        </motion.div>

        {/* Light glare layer - orange/yellow glow from bottom */}
        <motion.div
          style={{ opacity: lightGlareOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-yellow-500/50 via-orange-400/30 to-transparent" />
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-yellow-400/40 via-orange-300/20 to-transparent blur-2xl" />
          {/* City silhouette hint */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
        </motion.div>

        {/* Title overlay */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute top-1/4 left-0 right-0 text-center z-20"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Watch the <span className="text-yellow-400">Sky</span> Fade
          </h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto px-4">
            Scroll down to see how pollution layers build up and hide the stars!
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-8"
          >
            <Sparkles className="w-8 h-8 text-yellow-400 mx-auto" />
          </motion.div>
        </motion.div>

        {/* Hotspots - MUCH bigger and more colorful */}
        {pollutionHotspots.map((hotspot, index) => (
          <motion.button
            key={hotspot.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.2 }}
            onClick={() => setActiveHotspot(hotspot.id)}
            className="absolute group z-30"
            style={{ top: hotspot.position.top, left: hotspot.position.left }}
          >
            {/* Outer pulse ring */}
            <motion.div
              className={`absolute -inset-4 rounded-full ${hotspot.bgColor}`}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Main button */}
            <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full ${hotspot.bgColor} backdrop-blur-sm border-2 border-current ${hotspot.color} flex items-center justify-center hover:scale-110 transition-all cursor-pointer shadow-lg`}>
              <hotspot.icon className={`w-10 h-10 md:w-12 md:h-12 ${hotspot.color}`} />
            </div>
            {/* Label */}
            <span className={`absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm font-bold ${hotspot.color} whitespace-nowrap bg-background/80 px-3 py-1 rounded-full`}>
              {hotspot.title}
            </span>
          </motion.button>
        ))}

        {/* Final stat display */}
        <motion.div
          style={{ opacity: statOpacity }}
          className="absolute bottom-24 left-0 right-0 text-center z-20 px-4"
        >
          <div className="glass-card-solid inline-block px-8 py-4 rounded-2xl">
            <p className="font-display text-2xl md:text-3xl text-yellow-400 font-bold">
              80% of people can&apos;t see the Milky Way anymore!
            </p>
            <p className="text-muted-foreground mt-2">Because of plastic, smog, and light pollution</p>
          </div>
        </motion.div>

        {/* Scroll progress indicator */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          {['Clear Sky', 'Microplastics', 'Smog', 'Light Glare'].map((label, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-2"
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [i * 0.25, i * 0.25 + 0.1],
                  [0.3, 1]
                ),
              }}
            >
              <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-star' : i === 1 ? 'bg-purple-400' : i === 2 ? 'bg-gray-400' : 'bg-yellow-400'}`} />
              <span className="text-xs text-muted-foreground hidden md:block">{label}</span>
            </motion.div>
          ))}
        </div>

        {/* Hotspot info modal */}
        {selectedHotspot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
            onClick={() => setActiveHotspot(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-solid p-8 max-w-md w-full relative border-2"
              style={{ borderColor: selectedHotspot.id === 'microplastic' ? '#a855f7' : selectedHotspot.id === 'smog' ? '#9ca3af' : '#facc15' }}
            >
              <button
                onClick={() => setActiveHotspot(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className={`w-20 h-20 rounded-full ${selectedHotspot.bgColor} flex items-center justify-center mb-6 mx-auto`}>
                <selectedHotspot.icon className={`w-10 h-10 ${selectedHotspot.color}`} />
              </div>

              <h3 className={`font-display text-2xl font-bold mb-2 text-center ${selectedHotspot.color}`}>
                {selectedHotspot.title}
              </h3>
              <p className="text-foreground font-bold text-lg text-center mb-3">{selectedHotspot.stat}</p>
              <p className="text-muted-foreground text-center text-lg">{selectedHotspot.description}</p>

              <button
                onClick={() => setActiveHotspot(null)}
                className="mt-6 w-full py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
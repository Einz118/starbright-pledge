import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Droplets, Wind, Lightbulb, X } from "lucide-react";

interface PollutionHotspot {
  id: string;
  title: string;
  stat: string;
  description: string;
  icon: typeof Droplets;
  color: string;
  position: { top: string; left: string };
}

const pollutionHotspots: PollutionHotspot[] = [
  {
    id: "microplastic",
    title: "Microplastic Veil",
    stat: "Over 10 million tons",
    description: "of plastic enter our oceans yearly, breaking into airborne particles that scatter starlight.",
    icon: Droplets,
    color: "text-microplastic",
    position: { top: "25%", left: "20%" },
  },
  {
    id: "smog",
    title: "Atmospheric Smog",
    stat: "Air pollution scatters light",
    description: "bleaching the night sky like a dirty lens. PM2.5 particles create a permanent haze.",
    icon: Wind,
    color: "text-pollution-smog",
    position: { top: "50%", left: "75%" },
  },
  {
    id: "light",
    title: "Light Glare",
    stat: "~35% of outdoor light",
    description: "is wasted, shining directly into the sky and creating domes of artificial brightness.",
    icon: Lightbulb,
    color: "text-light-glare",
    position: { top: "75%", left: "35%" },
  },
];

export const PollutionJourneySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values for pollution layers
  const microplasticOpacity = useTransform(scrollYProgress, [0, 0.25, 0.4], [0, 0.5, 0.7]);
  const smogOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.6], [0, 0.4, 0.6]);
  const lightGlareOpacity = useTransform(scrollYProgress, [0.4, 0.65, 0.8], [0, 0.5, 0.8]);
  const starsOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.8], [1, 0.7, 0.4, 0.15]);

  const selectedHotspot = pollutionHotspots.find(h => h.id === activeHotspot);

  return (
    <section
      id="pollution-journey"
      ref={containerRef}
      className="relative min-h-[300vh]"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Stars layer (fades as pollution increases) */}
        <motion.div
          style={{ opacity: starsOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_hsl(45_100%_92%/0.8)_0%,_transparent_0.5%),radial-gradient(circle_at_80%_30%,_hsl(45_100%_92%/0.6)_0%,_transparent_0.4%),radial-gradient(circle_at_40%_60%,_hsl(45_100%_92%/0.7)_0%,_transparent_0.3%),radial-gradient(circle_at_70%_80%,_hsl(45_100%_92%/0.5)_0%,_transparent_0.4%),radial-gradient(circle_at_15%_70%,_hsl(45_100%_92%/0.6)_0%,_transparent_0.35%),radial-gradient(circle_at_90%_50%,_hsl(45_100%_92%/0.7)_0%,_transparent_0.45%),radial-gradient(circle_at_50%_10%,_hsl(195_100%_75%/0.8)_0%,_transparent_0.5%),radial-gradient(circle_at_30%_40%,_hsl(45_100%_92%/0.5)_0%,_transparent_0.3%)]"
        />

        {/* Microplastic layer */}
        <motion.div
          style={{ opacity: microplasticOpacity }}
          className="absolute inset-0 microplastic-layer pollution-layer animate-drift"
        />

        {/* Smog layer */}
        <motion.div
          style={{ opacity: smogOpacity }}
          className="absolute inset-0 smog-layer pollution-layer"
        />

        {/* Light glare layer */}
        <motion.div
          style={{ opacity: lightGlareOpacity }}
          className="absolute inset-0 light-glare-layer pollution-layer"
        />

        {/* Content overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              The <span className="text-pollution-amber">Fading</span> Sky
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Scroll to watch the pollution layers build. Click the hotspots to learn about each threat.
            </p>
          </motion.div>

          {/* Hotspots */}
          {pollutionHotspots.map((hotspot) => (
            <motion.button
              key={hotspot.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setActiveHotspot(hotspot.id)}
              className="absolute group"
              style={{ top: hotspot.position.top, left: hotspot.position.left }}
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full glass-card flex items-center justify-center ${hotspot.color} hover:scale-110 transition-all cursor-pointer`}>
                <hotspot.icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {hotspot.title}
              </span>
              {/* Pulse ring */}
              <div className={`absolute inset-0 rounded-full border-2 ${hotspot.color.replace('text-', 'border-')} opacity-50 animate-ping`} />
            </motion.button>
          ))}

          {/* Stat display at bottom */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.5, 0.8], [0, 1]) }}
            className="absolute bottom-20 left-0 right-0 text-center"
          >
            <p className="font-display text-xl md:text-2xl text-pollution-amber">
              80% of humanity can no longer see the Milky Way
            </p>
          </motion.div>
        </div>

        {/* Hotspot info modal */}
        {selectedHotspot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setActiveHotspot(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-solid p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setActiveHotspot(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className={`w-16 h-16 rounded-full glass-card flex items-center justify-center ${selectedHotspot.color} mb-4`}>
                <selectedHotspot.icon className="w-8 h-8" />
              </div>

              <h3 className="font-display text-2xl font-bold mb-2">{selectedHotspot.title}</h3>
              <p className="text-foreground font-medium mb-2">{selectedHotspot.stat}</p>
              <p className="text-muted-foreground">{selectedHotspot.description}</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
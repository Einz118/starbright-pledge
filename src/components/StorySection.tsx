import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const storyPoints = [
  {
    year: "Ancient Times",
    title: "A Sky Full of Stars",
    description: "Our ancestors gazed upon 2,500+ visible stars. The Milky Way stretched across the sky, guiding travelers and inspiring myths.",
    stat: "2,500+ stars visible",
  },
  {
    year: "1879",
    title: "The Electric Age Begins",
    description: "Thomas Edison's light bulb changed everything. Cities began to glow, and slowly, the stars started to fade from urban skies.",
    stat: "First electric streetlights",
  },
  {
    year: "1950s",
    title: "The Plastic Revolution",
    description: "Mass plastic production began. Convenient and cheap, it quickly filled our lives—and our environment.",
    stat: "2M tons/year produced",
  },
  {
    year: "Today",
    title: "The Crisis Point",
    description: "80% of humanity can no longer see the Milky Way. Microplastics fill our air, light pollution blankets our cities, and the stars continue to disappear.",
    stat: "80% can't see Milky Way",
  },
  {
    year: "Tomorrow",
    title: "The Choice is Ours",
    description: "We can still reclaim the night sky. Every plastic we refuse, every light we dim, brings us closer to the stars.",
    stat: "7 actions = 1 star saved",
  },
];

export const StorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="story" ref={containerRef} className="relative py-32 px-6">
      {/* Background gradient */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-pollution/5 via-transparent to-transparent pointer-events-none"
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            A <span className="text-pollution">Darkening</span> Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From ancient skies to modern smog—the story of how we lost our connection to the cosmos.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-star-glow via-pollution to-hope" />

          {storyPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary transform -translate-x-1/2 z-10" />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <span className="text-primary font-mono text-sm">{point.year}</span>
                <h3 className="font-display text-2xl font-bold mt-1 mb-2">{point.title}</h3>
                <p className="text-muted-foreground mb-3">{point.description}</p>
                <span className="inline-block px-3 py-1 rounded-full glass-card text-sm text-star-glow">
                  {point.stat}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { plasticTypes, constellationLines } from "@/data/plasticTypes";
import { X, AlertTriangle, Recycle, Wind } from "lucide-react";

export const ConstellationSection = () => {
  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const [visitedStars, setVisitedStars] = useState<Set<number>>(new Set());

  const handleStarClick = (id: number) => {
    setSelectedStar(id);
    setVisitedStars((prev) => new Set([...prev, id]));
  };

  const getStarOpacity = (id: number) => {
    if (visitedStars.size === 0) return 1;
    return visitedStars.has(id) ? 0.3 : 1;
  };

  const selectedPlastic = plasticTypes.find((p) => p.id === selectedStar);

  return (
    <section id="constellation" className="relative min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            The <span className="text-primary">Plastic</span> Constellation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click on each star of Ursa Minor to discover which plastic type is stealing its light.
            Watch as the constellation fades with each revelation.
          </p>
        </motion.div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {plasticTypes.map((plastic) => (
            <div
              key={plastic.id}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                visitedStars.has(plastic.id)
                  ? "bg-pollution"
                  : "bg-star-glow/50"
              }`}
            />
          ))}
        </div>

        <div className="relative aspect-square max-w-3xl mx-auto">
          {/* SVG for constellation lines */}
          <svg className="absolute inset-0 w-full h-full">
            {constellationLines.map(([from, to], index) => {
              const fromStar = plasticTypes[from];
              const toStar = plasticTypes[to];
              const bothVisited = visitedStars.has(fromStar.id) && visitedStars.has(toStar.id);
              
              return (
                <motion.line
                  key={index}
                  x1={`${fromStar.position.x}%`}
                  y1={`${fromStar.position.y}%`}
                  x2={`${toStar.position.x}%`}
                  y2={`${toStar.position.y}%`}
                  className="constellation-line"
                  style={{
                    opacity: bothVisited ? 0.1 : 0.4,
                  }}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                />
              );
            })}
          </svg>

          {/* Stars */}
          {plasticTypes.map((plastic, index) => (
            <motion.button
              key={plastic.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: getStarOpacity(plastic.id), 
                scale: 1,
              }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                opacity: { duration: 1 }
              }}
              onClick={() => handleStarClick(plastic.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer ${
                visitedStars.has(plastic.id) ? "pollution-glow" : "glow-effect"
              }`}
              style={{
                left: `${plastic.position.x}%`,
                top: `${plastic.position.y}%`,
              }}
            >
              <div
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full transition-all duration-500 ${
                  visitedStars.has(plastic.id)
                    ? "bg-pollution/60"
                    : "bg-star star-twinkle"
                } ${plastic.id === 1 ? "w-10 h-10 md:w-12 md:h-12" : ""}`}
              />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {plastic.starName}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Dimming message */}
        {visitedStars.size > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 text-pollution font-display"
          >
            {visitedStars.size} of 7 stars fading... 
            {visitedStars.size === 7 && " The constellation is nearly invisible."}
          </motion.p>
        )}
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {selectedPlastic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedStar(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-8 max-w-lg w-full relative"
            >
              <button
                onClick={() => setSelectedStar(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full bg-pollution pollution-glow" />
                <span className="text-sm text-pollution font-medium">
                  Plastic #{selectedPlastic.id}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold mb-1">
                {selectedPlastic.name}
              </h3>
              <p className="text-primary font-mono text-sm mb-4">
                {selectedPlastic.code} • Star: {selectedPlastic.starName}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Recycle className="w-5 h-5 text-hope mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Common Uses</p>
                    <p className="text-sm text-muted-foreground">{selectedPlastic.commonUse}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-pollution mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Environmental Impact</p>
                    <p className="text-sm text-muted-foreground">{selectedPlastic.impact}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Wind className="w-5 h-5 text-smog mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">How It Fades the Stars</p>
                    <p className="text-sm text-muted-foreground">{selectedPlastic.pollutionFact}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm">
                    <span className="text-pollution font-medium">Recycling Rate: </span>
                    <span className="text-muted-foreground">{selectedPlastic.recyclingRate}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

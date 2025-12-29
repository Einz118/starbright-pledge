import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { plasticTypes, constellationLines } from "@/data/plasticTypes";
import { X, AlertTriangle, Recycle, Wind, Sparkles, Check, Lock } from "lucide-react";
import { toast } from "sonner";

export const ConstellationSection = () => {
  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const [freedStars, setFreedStars] = useState<Set<number>>(new Set());
  const [pledgedStars, setPledgedStars] = useState<Set<number>>(new Set());
  const [modalStep, setModalStep] = useState<1 | 2 | 3>(1);

  const handleStarClick = (id: number) => {
    setSelectedStar(id);
    setModalStep(1);
  };

  const handlePledge = (id: number) => {
    setPledgedStars((prev) => new Set([...prev, id]));
    setModalStep(3);
    
    // After a delay, free the star
    setTimeout(() => {
      setFreedStars((prev) => new Set([...prev, id]));
      toast.success(`${plasticTypes[id - 1].starName} is freed!`, {
        description: "The star shines brighter thanks to your pledge.",
        icon: <Sparkles className="w-4 h-4 text-hope" />,
      });
    }, 500);
  };

  const getStarState = (id: number) => {
    if (freedStars.has(id)) return "freed";
    return "trapped";
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
            Recover the <span className="text-primary">Lost Dipper</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The 7 stars of Ursa Minor are trapped within the 7 types of plastic. 
            Click each star to learn its story, then pledge to free it.
          </p>
        </motion.div>

        {/* Progress indicator */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <span className="text-sm text-muted-foreground">Stars Freed:</span>
          <div className="flex gap-2">
            {plasticTypes.map((plastic) => (
              <div
                key={plastic.id}
                className={`w-4 h-4 rounded-full transition-all duration-500 ${
                  freedStars.has(plastic.id)
                    ? "bg-hope hope-glow"
                    : "bg-pollution-amber/40"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-hope">{freedStars.size}/7</span>
        </div>

        <div className="relative aspect-square max-w-3xl mx-auto">
          {/* SVG for constellation lines */}
          <svg className="absolute inset-0 w-full h-full">
            {constellationLines.map(([from, to], index) => {
              const fromStar = plasticTypes[from];
              const toStar = plasticTypes[to];
              const bothFreed = freedStars.has(fromStar.id) && freedStars.has(toStar.id);
              
              return (
                <motion.line
                  key={index}
                  x1={`${fromStar.position.x}%`}
                  y1={`${fromStar.position.y}%`}
                  x2={`${toStar.position.x}%`}
                  y2={`${toStar.position.y}%`}
                  className="constellation-line"
                  style={{
                    opacity: bothFreed ? 0.8 : 0.2,
                    stroke: bothFreed ? "hsl(var(--star-glow))" : "hsl(var(--star) / 0.3)",
                    strokeWidth: bothFreed ? 2 : 1,
                  }}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                />
              );
            })}
          </svg>

          {/* Stars */}
          {plasticTypes.map((plastic, index) => {
            const state = getStarState(plastic.id);
            const isFreed = state === "freed";

            return (
              <motion.button
                key={plastic.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleStarClick(plastic.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{
                  left: `${plastic.position.x}%`,
                  top: `${plastic.position.y}%`,
                }}
              >
                {/* Plastic shell (hidden when freed) */}
                {!isFreed && (
                  <motion.div
                    className="absolute inset-0 w-12 h-12 md:w-16 md:h-16 -translate-x-1/4 -translate-y-1/4 rounded-lg bg-gradient-to-br from-pollution-amber/30 to-pollution-red/20 border border-pollution-amber/40"
                    animate={{ rotate: [0, 3, -3, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-pollution-amber/60" />
                  </motion.div>
                )}

                {/* Star core */}
                <div
                  className={`relative w-6 h-6 md:w-8 md:h-8 rounded-full transition-all duration-500 ${
                    isFreed
                      ? "bg-star star-twinkle glow-effect"
                      : "bg-star/30"
                  } ${plastic.id === 1 ? "w-10 h-10 md:w-12 md:h-12" : ""} ${
                    isFreed ? "animate-star-free" : ""
                  }`}
                />
                
                {/* Star name label */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {plastic.starName}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Status message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          {freedStars.size === 0 && (
            <p className="text-muted-foreground">Click a star to begin freeing the constellation...</p>
          )}
          {freedStars.size > 0 && freedStars.size < 7 && (
            <p className="text-hope font-display">
              {freedStars.size} star{freedStars.size > 1 ? "s" : ""} freed! Keep going, Starkeeper.
            </p>
          )}
          {freedStars.size === 7 && (
            <p className="text-2xl text-hope font-display font-bold animate-pulse">
              The Little Dipper shines again! You are a true Starkeeper.
            </p>
          )}
        </motion.div>
      </div>

      {/* Info Modal with 3 steps */}
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
              className="glass-card-solid p-8 max-w-lg w-full relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedStar(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Step indicator */}
              <div className="flex gap-2 mb-6">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      modalStep >= step ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                ))}
              </div>

              {/* Step 1: Star & Plastic Info */}
              {modalStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-full ${freedStars.has(selectedPlastic.id) ? "bg-hope hope-glow" : "bg-pollution-amber pollution-glow"}`} />
                    <div>
                      <span className="text-sm text-muted-foreground">Star: {selectedPlastic.starName}</span>
                      <p className="text-xs text-pollution-amber">Trapped in Plastic #{selectedPlastic.id}</p>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold mb-1">
                    {selectedPlastic.name}
                  </h3>
                  <p className="text-primary font-mono text-sm mb-4">{selectedPlastic.code}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <Recycle className="w-5 h-5 text-hope mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{selectedPlastic.commonUse}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-pollution-amber mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{selectedPlastic.impact}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setModalStep(2)}
                    className="w-full py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    See How It Fades the Stars
                  </button>
                </motion.div>
              )}

              {/* Step 2: Pollution explanation */}
              {modalStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Wind className="w-8 h-8 text-pollution-smog" />
                    <h3 className="font-display text-xl font-bold">How It Obscures the Sky</h3>
                  </div>

                  <div className="glass-card p-4 mb-4">
                    <p className="text-foreground">{selectedPlastic.pollutionFact}</p>
                  </div>

                  <div className="bg-pollution-amber/10 border border-pollution-amber/30 rounded-xl p-4 mb-6">
                    <p className="text-sm">
                      <span className="text-pollution-amber font-medium">Recycling Rate: </span>
                      <span className="text-foreground">{selectedPlastic.recyclingRate}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => setModalStep(3)}
                    disabled={pledgedStars.has(selectedPlastic.id)}
                    className="w-full py-3 rounded-full bg-hope text-background font-medium hover:bg-hope/90 transition-colors disabled:opacity-50"
                  >
                    {pledgedStars.has(selectedPlastic.id) ? "Already Pledged!" : "Make a Pledge to Free This Star"}
                  </button>
                </motion.div>
              )}

              {/* Step 3: Pledge */}
              {modalStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  {pledgedStars.has(selectedPlastic.id) ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="w-20 h-20 rounded-full bg-hope/20 flex items-center justify-center mx-auto mb-4"
                      >
                        <Check className="w-10 h-10 text-hope" />
                      </motion.div>
                      <h3 className="font-display text-2xl font-bold text-hope mb-2">
                        {selectedPlastic.starName} is Free!
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        You pledged: &ldquo;{selectedPlastic.pledge}&rdquo;
                      </p>
                      <div className="glass-card p-4 mb-6">
                        <Sparkles className="w-5 h-5 text-star mx-auto mb-2" />
                        <p className="text-sm text-foreground font-medium">Starkeeper Fact</p>
                        <p className="text-sm text-muted-foreground">{selectedPlastic.pledgeFact}</p>
                      </div>
                      <button
                        onClick={() => setSelectedStar(null)}
                        className="px-8 py-3 rounded-full glass-card text-foreground font-medium hover:bg-secondary/50 transition-colors"
                      >
                        Continue Your Quest
                      </button>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-12 h-12 text-hope mx-auto mb-4" />
                      <h3 className="font-display text-2xl font-bold mb-2">
                        Free {selectedPlastic.starName}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        To release this star, make a simple pledge:
                      </p>
                      <div className="glass-card p-4 mb-6">
                        <p className="text-lg text-foreground font-medium">&ldquo;{selectedPlastic.pledge}&rdquo;</p>
                      </div>
                      <button
                        onClick={() => handlePledge(selectedPlastic.id)}
                        className="w-full py-3 rounded-full bg-hope text-background font-medium hover:bg-hope/90 transition-colors flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-5 h-5" />
                        I Pledge
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
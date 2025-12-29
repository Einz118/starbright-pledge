import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { plasticTypes, constellationLines } from "@/data/plasticTypes";
import { X, AlertTriangle, Recycle, Sparkles, Check, Lock, Star, PartyPopper } from "lucide-react";
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
    
    setTimeout(() => {
      setFreedStars((prev) => new Set([...prev, id]));
      toast.success(`${plasticTypes[id - 1].starName} is FREE!`, {
        description: "The star shines brighter thanks to your pledge!",
        icon: <PartyPopper className="w-4 h-4 text-yellow-400" />,
      });
    }, 500);
  };

  const selectedPlastic = plasticTypes.find((p) => p.id === selectedStar);

  return (
    <section id="constellation" className="relative min-h-screen py-20 px-6 overflow-hidden">
      {/* Colorful background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cosmic-purple/20 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
      
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
          </motion.div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-yellow-400">Rescue</span> the Little Dipper!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The 7 stars of Ursa Minor are trapped in plastic! 
            <span className="text-primary font-bold"> Click each star</span> to learn about it, 
            then make a pledge to set it free!
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-muted-foreground">Stars Rescued:</span>
            <span className="text-lg font-bold text-yellow-400">{freedStars.size} / 7</span>
          </div>
          <div className="h-4 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400"
              initial={{ width: 0 }}
              animate={{ width: `${(freedStars.size / 7) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {freedStars.size === 7 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-yellow-400 font-bold mt-2"
            >
              🎉 Amazing! You saved them all! 🎉
            </motion.p>
          )}
        </div>

        {/* Constellation container */}
        <div className="relative aspect-[4/3] max-w-4xl mx-auto">
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
          
          {/* SVG for constellation lines */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#fb7185" />
              </linearGradient>
            </defs>
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
                  stroke={bothFreed ? "url(#lineGradient)" : "rgba(255,255,255,0.2)"}
                  strokeWidth={bothFreed ? 4 : 2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: index * 0.15 }}
                  style={{
                    filter: bothFreed ? "drop-shadow(0 0 8px rgba(96, 165, 250, 0.8))" : "none",
                  }}
                />
              );
            })}
          </svg>

          {/* Stars */}
          {plasticTypes.map((plastic, index) => {
            const isFreed = freedStars.has(plastic.id);

            return (
              <motion.button
                key={plastic.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                onClick={() => handleStarClick(plastic.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{
                  left: `${plastic.position.x}%`,
                  top: `${plastic.position.y}%`,
                }}
              >
                {/* Plastic cage (when trapped) */}
                {!isFreed && (
                  <motion.div
                    className="absolute -inset-4 md:-inset-5"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div 
                      className="w-full h-full rounded-xl border-2 border-dashed opacity-60"
                      style={{ borderColor: plastic.color }}
                    />
                  </motion.div>
                )}

                {/* Lock icon when trapped */}
                {!isFreed && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background flex items-center justify-center z-10"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Lock className="w-3 h-3 text-muted-foreground" />
                  </motion.div>
                )}

                {/* Star core */}
                <motion.div
                  className={`relative rounded-full transition-all duration-500 ${
                    plastic.id === 1 ? "w-14 h-14 md:w-16 md:h-16" : "w-10 h-10 md:w-12 md:h-12"
                  }`}
                  style={{
                    backgroundColor: isFreed ? plastic.color : `${plastic.color}40`,
                    boxShadow: isFreed 
                      ? `0 0 30px ${plastic.color}, 0 0 60px ${plastic.color}40` 
                      : `0 0 10px ${plastic.color}40`,
                  }}
                  animate={isFreed ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{ scale: 1.2 }}
                >
                  {/* Inner glow */}
                  <div 
                    className="absolute inset-2 rounded-full"
                    style={{
                      background: `radial-gradient(circle, white 0%, ${plastic.color} 70%)`,
                      opacity: isFreed ? 0.8 : 0.3,
                    }}
                  />
                </motion.div>
                
                {/* Star name label */}
                <motion.span 
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs md:text-sm font-bold whitespace-nowrap px-2 py-1 rounded-full"
                  style={{ 
                    color: plastic.color,
                    backgroundColor: `${plastic.color}20`,
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {plastic.starName}
                </motion.span>

                {/* Click hint on hover */}
                <motion.span
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 whitespace-nowrap"
                >
                  Click to {isFreed ? "learn more" : "rescue!"}
                </motion.span>
              </motion.button>
            );
          })}
        </div>

        {/* Encouragement text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-12"
        >
          {freedStars.size === 0 && (
            <p className="text-lg text-muted-foreground animate-pulse">
              👆 Click any star to start your rescue mission!
            </p>
          )}
          {freedStars.size > 0 && freedStars.size < 7 && (
            <p className="text-lg text-primary font-bold">
              {freedStars.size === 1 ? "Great start!" : "Keep going!"} You&apos;ve rescued {freedStars.size} star{freedStars.size > 1 ? "s" : ""}! 
              <span className="text-muted-foreground font-normal"> ({7 - freedStars.size} more to go!)</span>
            </p>
          )}
          {freedStars.size === 7 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card-solid inline-block px-8 py-4 rounded-2xl"
            >
              <p className="text-2xl font-display font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                🌟 You&apos;re a TRUE Starkeeper! 🌟
              </p>
              <p className="text-muted-foreground mt-2">The Little Dipper shines bright again!</p>
            </motion.div>
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
            className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStar(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-solid p-6 md:p-8 max-w-md w-full relative overflow-hidden border-2"
              style={{ borderColor: selectedPlastic.color }}
            >
              {/* Colorful top accent */}
              <div 
                className="absolute top-0 left-0 right-0 h-2"
                style={{ background: `linear-gradient(90deg, ${selectedPlastic.color}, transparent)` }}
              />

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
                    className="h-2 flex-1 rounded-full transition-all"
                    style={{
                      backgroundColor: modalStep >= step ? selectedPlastic.color : 'rgba(255,255,255,0.1)',
                    }}
                  />
                ))}
              </div>

              {/* Step 1: Star & Plastic Info */}
              {modalStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: freedStars.has(selectedPlastic.id) ? selectedPlastic.color : `${selectedPlastic.color}40`,
                        boxShadow: `0 0 20px ${selectedPlastic.color}60`,
                      }}
                    >
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold" style={{ color: selectedPlastic.color }}>
                        {selectedPlastic.starName}
                      </h3>
                      <p className="text-sm text-muted-foreground">Trapped in Plastic #{selectedPlastic.id}: {selectedPlastic.code}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                      <Recycle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-foreground">What is it used for?</p>
                        <p className="text-sm text-muted-foreground">{selectedPlastic.commonUse}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10">
                      <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-foreground">The Problem</p>
                        <p className="text-sm text-muted-foreground">{selectedPlastic.impact}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setModalStep(2)}
                    className="w-full py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
                    style={{ backgroundColor: selectedPlastic.color, color: '#000' }}
                  >
                    How does it hide the stars? →
                  </button>
                </motion.div>
              )}

              {/* Step 2: Pollution explanation */}
              {modalStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="text-center mb-6">
                    <div className="inline-block p-4 rounded-full bg-purple-500/20 mb-4">
                      <Sparkles className="w-10 h-10 text-purple-400" />
                    </div>
                    <h3 className="font-display text-xl font-bold">The Starlight Stealer</h3>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 mb-4">
                    <p className="text-foreground text-lg">{selectedPlastic.pollutionFact}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 mb-6">
                    <p className="text-sm">
                      <span className="text-red-400 font-bold">😢 Recycling Rate: </span>
                      <span className="text-foreground">{selectedPlastic.recyclingRate}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => setModalStep(3)}
                    disabled={pledgedStars.has(selectedPlastic.id)}
                    className="w-full py-4 rounded-full font-bold text-lg transition-all hover:scale-105 bg-gradient-to-r from-green-400 to-cyan-400 text-background disabled:opacity-50"
                  >
                    {pledgedStars.has(selectedPlastic.id) ? "✓ Already Rescued!" : "🌟 Rescue This Star! 🌟"}
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
                        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: `${selectedPlastic.color}30` }}
                      >
                        <Check className="w-12 h-12" style={{ color: selectedPlastic.color }} />
                      </motion.div>
                      <h3 className="font-display text-2xl font-bold mb-2" style={{ color: selectedPlastic.color }}>
                        {selectedPlastic.starName} is FREE! 🎉
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Your pledge: &ldquo;{selectedPlastic.pledge}&rdquo;
                      </p>
                      <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 mb-6">
                        <p className="text-sm text-foreground font-bold mb-1">⭐ Starkeeper Fact:</p>
                        <p className="text-sm text-muted-foreground">{selectedPlastic.pledgeFact}</p>
                      </div>
                      <button
                        onClick={() => setSelectedStar(null)}
                        className="px-8 py-3 rounded-full glass-card text-foreground font-bold hover:bg-secondary/50 transition-colors"
                      >
                        Continue Rescuing Stars! →
                      </button>
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-16 h-16 mx-auto mb-4" style={{ color: selectedPlastic.color }} />
                      </motion.div>
                      <h3 className="font-display text-2xl font-bold mb-2">
                        Free {selectedPlastic.starName}!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Make this simple promise:
                      </p>
                      <div 
                        className="p-4 rounded-xl mb-6 border-2"
                        style={{ 
                          backgroundColor: `${selectedPlastic.color}10`,
                          borderColor: `${selectedPlastic.color}50`,
                        }}
                      >
                        <p className="text-xl text-foreground font-bold">&ldquo;{selectedPlastic.pledge}&rdquo;</p>
                      </div>
                      <button
                        onClick={() => handlePledge(selectedPlastic.id)}
                        className="w-full py-4 rounded-full font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                        style={{ backgroundColor: selectedPlastic.color, color: '#000' }}
                      >
                        <Sparkles className="w-6 h-6" />
                        I Promise! Set the Star Free!
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
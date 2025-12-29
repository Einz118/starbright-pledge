import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Download, Share2, Star, Lightbulb, ShoppingBag, Droplets, Leaf, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";

const pledges = [
  { id: 1, text: "Skip the plastic straw", icon: Droplets },
  { id: 2, text: "Bring a reusable bag", icon: ShoppingBag },
  { id: 3, text: "Turn off unnecessary lights at night", icon: Lightbulb },
  { id: 4, text: "Choose products with less packaging", icon: Leaf },
  { id: 5, text: "Share this project with 3 friends", icon: Users },
  { id: 6, text: "Look at the stars tonight", icon: Star },
];

export const ActionSection = () => {
  const [completedPledges, setCompletedPledges] = useState<Set<number>>(new Set());

  const togglePledge = (id: number) => {
    const newPledges = new Set(completedPledges);
    if (newPledges.has(id)) {
      newPledges.delete(id);
    } else {
      newPledges.add(id);
      toast.success("Pledge made! You're becoming a Starkeeper ⭐");
    }
    setCompletedPledges(newPledges);
  };

  const handleDownload = () => {
    toast.success("Starkeeper Kit download starting...", {
      description: "Check your downloads folder!"
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "The Obscured Sky",
        text: "Become a Starkeeper and help restore the fading constellations!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <section id="action" className="relative py-32 px-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-hope/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-hope font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Your Turn to Shine</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Become a <span className="text-hope">Starkeeper</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Small actions create big change. Take the pledge and help bring back the stars.
          </p>
        </motion.div>

        {/* Pledges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {pledges.map((pledge, index) => (
            <motion.button
              key={pledge.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => togglePledge(pledge.id)}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all text-left ${
                completedPledges.has(pledge.id)
                  ? "bg-hope/20 border border-hope/50"
                  : "glass-card hover:bg-secondary/50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  completedPledges.has(pledge.id)
                    ? "bg-hope text-background"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {completedPledges.has(pledge.id) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <pledge.icon className="w-5 h-5" />
                )}
              </div>
              <span className={`font-medium ${completedPledges.has(pledge.id) ? "text-hope" : "text-foreground"}`}>
                {pledge.text}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Progress */}
        {completedPledges.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="font-display text-lg text-hope">
              {completedPledges.size} of {pledges.length} pledges made!
              {completedPledges.size === pledges.length && " 🌟 You're a true Starkeeper!"}
            </p>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-hope text-background font-display font-medium hover:bg-hope/90 transition-all hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Download Starkeeper Kit
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full glass-card text-foreground font-display font-medium hover:bg-secondary/50 transition-all hover:scale-105"
          >
            <Share2 className="w-5 h-5" />
            Share This Project
          </button>
        </motion.div>

        {/* Kit contents */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            The Starkeeper Kit includes: Classroom activity guides • DIY constellation crafts from recycled materials • 
            Printable infographics • Discussion prompts • Certificate template
          </p>
        </motion.div>
      </div>
    </section>
  );
};

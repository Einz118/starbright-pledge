import { motion } from "framer-motion";
import { Play, FileText, Lightbulb, Wind, Recycle, Eye, Heart } from "lucide-react";
import { useState } from "react";

const infographics = [
  {
    id: 1,
    title: "The Plastic Lifecycle",
    description: "From production to airborne microplastics—how plastic travels from factory to atmosphere.",
    icon: Recycle,
    color: "text-hope",
  },
  {
    id: 2,
    title: "Light Pollution 101",
    description: "How artificial lights scatter into the atmosphere, creating a dome of wasted energy.",
    icon: Lightbulb,
    color: "text-pollution",
  },
  {
    id: 3,
    title: "Air Quality & Stars",
    description: "PM2.5, smog, and particulates—the science of how pollutants scatter starlight.",
    icon: Wind,
    color: "text-smog",
  },
  {
    id: 4,
    title: "Recycling Myths",
    description: "What really happens to your recycling? Busting common misconceptions.",
    icon: FileText,
    color: "text-primary",
  },
  {
    id: 5,
    title: "Restore the Night",
    description: "Positive actions that can bring back star visibility in your community.",
    icon: Eye,
    color: "text-star-glow",
  },
];

const videos = [
  {
    id: 1,
    title: "A Star's Story: Where Did All the Stars Go?",
    description: "An animated journey following a curious star who wonders why fewer humans can see it each year.",
    duration: "4:30",
    thumbnail: "cartoon",
  },
  {
    id: 2,
    title: "Plastic Patrol: Becoming a Starkeeper",
    description: "Join our young host to learn 7 easy ways to reduce plastic and light pollution at home and school.",
    duration: "5:15",
    thumbnail: "live",
  },
];

export const LearnSection = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <section id="learn" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Learn & <span className="text-primary">Explore</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dive deeper into the science behind our fading skies with infographics and videos designed for curious minds.
          </p>
        </motion.div>

        {/* Infographics Grid */}
        <div className="mb-20">
          <h3 className="font-display text-2xl font-bold mb-8 flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            Infographic Gallery
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infographics.map((info, index) => (
              <motion.div
                key={info.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:bg-secondary/30 transition-all group cursor-pointer"
              >
                <info.icon className={`w-10 h-10 ${info.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h4 className="font-display text-lg font-bold mb-2">{info.title}</h4>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div>
          <h3 className="font-display text-2xl font-bold mb-8 flex items-center gap-3">
            <Play className="w-6 h-6 text-primary" />
            Educational Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="glass-card overflow-hidden group cursor-pointer"
                onClick={() => setActiveVideo(video.id)}
              >
                <div className="relative aspect-video bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/40 transition-all group-hover:scale-110">
                    <Play className="w-8 h-8 text-primary fill-primary" />
                  </div>
                  <span className="absolute bottom-4 right-4 text-sm text-muted-foreground bg-background/60 px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-6">
                  <h4 className="font-display text-lg font-bold mb-2">{video.title}</h4>
                  <p className="text-sm text-muted-foreground">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Video Modal placeholder */}
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="glass-card p-8 max-w-2xl w-full text-center"
            >
              <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold mb-2">Coming Soon!</h3>
              <p className="text-muted-foreground mb-4">
                Our educational videos are currently in production. Check back soon!
              </p>
              <button
                onClick={() => setActiveVideo(null)}
                className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

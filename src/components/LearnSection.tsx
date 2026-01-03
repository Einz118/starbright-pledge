import { motion, AnimatePresence } from "framer-motion";
import { Play, FileText, X, ZoomIn } from "lucide-react";
import { useState } from "react";

// Import infographic images
import airQualityStars from "@/assets/infographics/air-quality-stars.jpg";
import lightPollution101 from "@/assets/infographics/light-pollution-101.jpg";
import recyclingMyths from "@/assets/infographics/recycling-myths.jpg";
import plasticLifecycle from "@/assets/infographics/plastic-lifecycle.jpg";

// Import videos
import starsStoryVideo from "@/assets/videos/stars-story.mp4";
import plasticPatrolVideo from "@/assets/videos/plastic-patrol.mp4";

const infographics = [
  {
    id: 1,
    title: "The Plastic Lifecycle",
    subtitle: "From Product to the Air We Breathe",
    description: "Discover how plastic breaks down into microplastics and enters our atmosphere.",
    image: plasticLifecycle,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    title: "Light Pollution 101",
    subtitle: "When the Night is No Longer Dark",
    description: "Learn how artificial light escapes into the sky and creates the 'skyglow' effect.",
    image: lightPollution101,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 3,
    title: "Air Quality & Stars",
    subtitle: "When the Sky Becomes a Dirty Lens",
    description: "Understand how PM2.5 and air pollution scatter starlight and dim our view.",
    image: airQualityStars,
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 4,
    title: "Recycling Myths",
    subtitle: "Why Good Intentions Are Not Always Enough",
    description: "Uncover the truth about what really happens to plastic after we recycle.",
    image: recyclingMyths,
    color: "from-emerald-500 to-teal-600",
  },
];

const videos = [
  {
    id: 1,
    title: "A Star's Story: Where Did All the Stars Go?",
    description: "An animated journey following a curious star who wonders why fewer humans can see it each year.",
    duration: "4:30",
    thumbnail: "cartoon",
    videoSrc: starsStoryVideo,
  },
  {
    id: 2,
    title: "Plastic Patrol: Becoming a Starkeeper",
    description: "Join our young host to learn 7 easy ways to reduce plastic and light pollution at home and school.",
    duration: "5:15",
    thumbnail: "live",
    videoSrc: plasticPatrolVideo,
  },
];

export const LearnSection = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [selectedInfographic, setSelectedInfographic] = useState<number | null>(null);

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infographics.map((info, index) => (
              <motion.div
                key={info.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                onClick={() => setSelectedInfographic(info.id)}
              >
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={info.image} 
                    alt={info.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${info.color} mb-3`}>
                    Infographic {info.id}
                  </div>
                  <h4 className="font-display text-xl font-bold text-white mb-1">{info.title}</h4>
                  <p className="text-sm text-white/80 mb-2">{info.subtitle}</p>
                  <p className="text-sm text-white/60 line-clamp-2">{info.description}</p>
                </div>
                
                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-100 scale-75">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
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
                <div className="relative aspect-video bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
                  {video.videoSrc && (
                    <video
                      src={video.videoSrc}
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover"
                      onLoadedMetadata={(e) => {
                        const videoEl = e.currentTarget;
                        videoEl.currentTime = 1; // Show frame at 1 second
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  <div className="relative z-10 w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/40 transition-all group-hover:scale-110">
                    <Play className="w-8 h-8 text-primary fill-primary" />
                  </div>
                  <span className="absolute bottom-4 right-4 text-sm text-white/90 bg-black/60 px-2 py-1 rounded z-10">
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

        {/* Infographic Modal */}
        <AnimatePresence>
          {selectedInfographic && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedInfographic(null)}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                onClick={() => setSelectedInfographic(null)}
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={infographics.find(i => i.id === selectedInfographic)?.image}
                alt={infographics.find(i => i.id === selectedInfographic)?.title}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Modal */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setActiveVideo(null)}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                onClick={() => setActiveVideo(null)}
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
              
              {(() => {
                const video = videos.find(v => v.id === activeVideo);
                if (video?.videoSrc) {
                  return (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="w-full max-w-4xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <video
                        src={video.videoSrc}
                        controls
                        autoPlay
                        className="w-full rounded-lg shadow-2xl"
                      />
                      <p className="text-center text-white/80 mt-4 font-display text-lg">
                        {video.title}
                      </p>
                    </motion.div>
                  );
                } else {
                  return (
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="glass-card p-8 max-w-2xl w-full text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="font-display text-2xl font-bold mb-2">Coming Soon!</h3>
                      <p className="text-muted-foreground mb-4">
                        This educational video is currently in production. Check back soon!
                      </p>
                      <button
                        onClick={() => setActiveVideo(null)}
                        className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                      >
                        Close
                      </button>
                    </motion.div>
                  );
                }
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

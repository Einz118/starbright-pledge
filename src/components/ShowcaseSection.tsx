import { motion } from "framer-motion";
import { Users, Star, School, Trophy } from "lucide-react";

const stats = [
  { label: "Students Reached", value: "500+", icon: Users },
  { label: "Workshops Held", value: "12", icon: School },
  { label: "Stars 'Saved'", value: "2,100+", icon: Star },
  { label: "Awards Won", value: "3", icon: Trophy },
];

const galleryImages = [
  { id: 1, title: "Constellation Installation", description: "Recycled plastic LED sculpture" },
  { id: 2, title: "Workshop in Action", description: "Students building mini constellations" },
  { id: 3, title: "Night Sky Exhibit", description: "Immersive pollution visualization" },
  { id: 4, title: "Community Event", description: "Stargazing night with families" },
];

export const ShowcaseSection = () => {
  return (
    <section id="showcase" className="relative py-32 px-6">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Project <span className="text-primary">Showcase</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From recycled-plastic installations to hands-on workshops—see how we're bringing 
            the message of fading stars to communities worldwide.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-display text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-video glass-card overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary to-muted" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Star className="w-16 h-16 text-star/30 group-hover:text-star/50 transition-colors" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="font-display text-lg font-bold mb-1">{image.title}</h4>
                <p className="text-sm text-muted-foreground">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-card p-8 md:p-12 text-center"
        >
          <blockquote className="font-display text-xl md:text-2xl text-foreground mb-6 italic">
            "After the workshop, I look at the night sky differently. I never knew my water bottle 
            could be connected to why I can't see as many stars."
          </blockquote>
          <p className="text-muted-foreground">
            — Maya, 14, Workshop Participant
          </p>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-primary font-display font-medium">
              ~80% of students reported improved understanding of pollution's impact
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Github, Linkedin, ArrowUpRight } from "lucide-react";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Request submitted:", formState);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="bracket-label">[ CONNECT / 05 ]</span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2">
            Get In <span className="neon-text">Touch</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Interested in collaborating or talking robots? Let's connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass rounded-xl p-6 glass-hover border border-primary/15 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.10)]">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">rg4883@nyu.edu</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6 glass-hover border border-primary/15 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.10)]">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">New York, USA</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/rajat-gupta-60152125a/", label: "LinkedIn" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 glass rounded-xl p-4 glass-hover flex items-center justify-center gap-3 group border border-primary/15 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.10)]"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-mono text-sm">{social.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="glass rounded-xl p-6 md:p-8 space-y-6 border border-primary/15 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.10)] transition-all duration-300"
          >
            <div>
              <label className="block font-mono text-sm text-muted-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-mono text-sm"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block font-mono text-sm text-muted-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-mono text-sm"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block font-mono text-sm text-muted-foreground mb-2">
                Message
              </label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-mono text-sm resize-none"
                placeholder="Your message..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-mono text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors neon-box"
            >
              <Send className="w-4 h-4" />
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

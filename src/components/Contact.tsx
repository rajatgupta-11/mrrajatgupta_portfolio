import { motion, useInView } from "framer-motion";
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

    const subject = encodeURIComponent(
      `Portfolio Contact — ${formState.name || "No Name"}`
    );

    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );

    window.location.href = `mailto:rg4883@nyu.edu?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 relative">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="bracket-label">[ CONNECT / 05 ]</span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2">
            Get In <span className="neon-text">Touch</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Collaborations, robotics, control systems, or just sharp ideas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Email */}
            <div className="glass rounded-xl p-6 border border-primary/15">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-sm text-muted-foreground">
                    Email
                  </p>
                  <a
                    href="mailto:rg4883@nyu.edu"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    rg4883@nyu.edu
                  </a>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="glass rounded-xl p-6 border border-primary/15">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-sm text-muted-foreground">
                    Location
                  </p>
                  <p className="font-medium">New York, USA</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4">
             <a
  href="https://medium.com/@rajatg2062"
  target="_blank"
  rel="noopener noreferrer"
  className="flex-1 glass rounded-xl p-4 flex items-center justify-center gap-3 border border-primary/15 hover:border-primary/30 transition-all"
>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-muted-foreground"
  >
    <path d="M4.37 7.23c.02-.2 0-.4-.06-.58L3 3.75V3.5h4.75l3.67 8.05L14.66 3.5H19v.25l-1.14 1.1c-.1.08-.15.21-.13.34v8.1c-.02.13.03.26.13.34l1.11 1.1v.25h-5.58v-.25l1.15-1.12c.11-.11.11-.14.11-.34V6.67L11.4 14.9h-.44L7.2 6.67v5.54c-.03.28.06.56.24.78l1.5 1.82v.25H4.5v-.25l1.5-1.82c.18-.22.26-.5.22-.78z" />
  </svg>
  <span className="font-mono text-sm">Medium</span>
  <ArrowUpRight className="w-4 h-4" />
</a>


              <a
                href="https://www.linkedin.com/in/rajat-gupta-60152125a/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glass rounded-xl p-4 flex items-center justify-center gap-3 border border-primary/15 hover:border-primary/30 transition-all"
              >
                <Linkedin className="w-5 h-5" />
                <span className="font-mono text-sm">LinkedIn</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Mailto Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="glass rounded-xl p-6 md:p-8 space-y-6 border border-primary/15"
          >
            <div>
              <label className="block font-mono text-sm text-muted-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border focus:border-primary focus:outline-none font-mono text-sm"
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
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border focus:border-primary focus:outline-none font-mono text-sm"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block font-mono text-sm text-muted-foreground mb-2">
                Message
              </label>
              <textarea
                rows={4}
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border focus:border-primary focus:outline-none font-mono text-sm resize-none"
                placeholder="What do you want to build?"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-mono text-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Open Email Client
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

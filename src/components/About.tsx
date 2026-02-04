  import { motion } from "framer-motion";
  import { useInView } from "framer-motion";
  import { useRef } from "react";
  
  export const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
  
    return (
      <section id="about" className="py-24 md:py-32 relative" ref={ref}>
        <div className="section-container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="bracket-label">[ PROFILE / 01 ]</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2">
              About <span className="neon-text">Me</span>
            </h2>
          </motion.div>
  
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-muted-foreground leading-relaxed">
              I’m a mechanical engineering student focused on hands-on design and prototyping.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My work sits at the intersection of mechanics, control theory, and computation. I care about system-level behavior: how dynamics, sensing, actuation, and control interact under real constraints. I enjoy designing, simulating, building, breaking, and refining systems until their behavior matches intent.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I'm highly motivated by failure-driven learning. Most interested in small, high-ownership environments that value autonomy, rapid prototyping, and fast progress, where engineering is hands-on and iterative.
              </p>
            </motion.div>
  
            {/* Philosophy Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass rounded-xl p-6 md:p-8 neon-box"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  <span className="font-mono text-sm text-primary">Beyond Engineering</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
  Outside of engineering, I occasionally write about decision-making, human behavior, and evolutionary constraints.{" "}
  <a
    href="https://medium.com/@YOUR_USERNAME"
    target="_blank"
    rel="noopener noreferrer"
    className="underline underline-offset-4 hover:text-primary transition-colors"
  >
    Writing →
  </a>
</p>

              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

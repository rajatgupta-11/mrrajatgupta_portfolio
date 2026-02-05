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
          I’m a graduate mechanical engineering student working on autonomous systems and product-focused mechanical design. My work sits at the intersection of mechanics, control theory, and electronics. 
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I'm highly motivated by failure-driven learning. Most interested in small, high-ownership environments that value autonomy, rapid prototyping, and fast progress.
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
                  <span className="font-mono text-sm text-primary">Beyond Engineering</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
  Outside of engineering, I occasionally write about decision-making, human behavior, and evolutionary constraints.{" "}
  <a
    href="https://medium.com/@rajatg2062"
    target="_blank"
    rel="noopener noreferrer"
    className="underline underline-offset-4 hover:text-primary transition-colors"
  >
    Read more
  </a>
</p>

              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

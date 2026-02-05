import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { GalaxyBackground } from "./ui/GalaxyBackground";

const roles = [
  "Design",
  "Simulate",
  "Build",
  "Break",
  "Repeat"
];

const GlitchText = ({ text }: { text: string }) => {
  return (
    <span className="inline-block">{text}</span>
  );
};

const ScrambleText = () => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Trigger animation periodically
  useEffect(() => {
    const intervalMs = 1500;
    const id = window.setInterval(() => {
      if (!shouldReduceMotion) {
        setIsAnimating(true);
      } else {
        setIndex((prev) => (prev + 1) % roles.length);
      }
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [shouldReduceMotion]);

  // Handle animation completion
  const handleAnimationComplete = () => {
    setIsAnimating(false);
    setIndex((prev) => (prev + 1) % roles.length);
  };

  const getRole = (offset: number) =>
    roles[(index + offset + roles.length) % roles.length];

  const windowRoles = [
    getRole(-2),
    getRole(-1),
    getRole(0),
    getRole(1),
    getRole(2),
    getRole(3),
  ];

  const ITEM_HEIGHT = "3.5rem"; // Increased spacing

  const getStyle = (i: number) => {
    // i=2 is Center
    if (i === 2) {
      return {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        color: "hsl(var(--primary))",
        y: 0,
        textShadow: "0 0 20px hsl(var(--primary)/0.4)"
      };
    }
    // Neighbors (i=1, i=3)
    if (i === 1 || i === 3) {
      return {
        opacity: 0.3,
        filter: "blur(4px)",
        scale: 0.9,
        color: "hsl(var(--foreground))",
        y: 0,
        textShadow: "none"
      };
    }
    // Far (i=0, i=4)
    if (i === 0 || i === 4) {
      return {
        opacity: 0.05,
        filter: "blur(8px)",
        scale: 0.8,
        color: "hsl(var(--foreground))",
        y: 0,
        textShadow: "none"
      };
    }
    // Offscreen (i=5, etc)
    return {
      opacity: 0,
      filter: "blur(10px)",
      scale: 0.8,
      color: "hsl(var(--foreground))",
      y: 0,
      textShadow: "none"
    };
  };

  return (
    <span className="font-mono inline-flex justify-center w-[32ch] max-w-[90vw] select-none text-primary relative">
      {/* Container height = visible window ~ 5 items * ITEM_HEIGHT */}
      {/* We mask heavily at top/bottom so effectively 3 items are visible, but window is tall */}
      <span
        className={[
          "relative inline-flex flex-col items-center overflow-hidden",
          "h-[18rem]", // Spaced out window
          "[mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]",
          "[-webkit-mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]",
        ].join(" ")}
      >
        <motion.div
          initial={{ y: "0px" }}
          // Move entire list up by one item height
          animate={{ y: isAnimating ? `-${ITEM_HEIGHT}` : "0px" }}
          transition={isAnimating ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }} // duration 0 on reset!
          onAnimationComplete={() => {
            if (isAnimating) handleAnimationComplete();
          }}
          className="flex flex-col items-center will-change-transform"
        >
          {windowRoles.map((role, i) => {
            const currentStyle = getStyle(i);
            const nextStyle = getStyle(i - 1); // We are moving UP, so visual destination is index-1 styling

            return (
              <motion.span
                key={`${role}-${i}`} // Keeping key stable per slot to allow style transition
                style={{ height: ITEM_HEIGHT, lineHeight: ITEM_HEIGHT }}
                animate={isAnimating ? nextStyle : currentStyle}
                transition={isAnimating ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
                className="w-full whitespace-nowrap text-center flex items-center justify-center p-0 m-0"
              >
                {role}
              </motion.span>
            );
          })}
        </motion.div>
      </span>
    </span>
  );
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen pt-[var(--nav-height)] flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <GalaxyBackground />
      <div className="absolute inset-0 grid-pattern opacity-40 dark:opacity-20" />
      <div className="hidden dark:block absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/10 rounded-full blur-[120px] animate-pulse animation-delay-500" />
      </div>

      <div className="section-container relative z-10 flex flex-col items-center text-center">

        {/* Status Line */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 inline-flex max-w-[calc(100vw-2rem)] overflow-hidden rounded-full border border-primary/25 bg-primary/10 px-4 sm:px-6 py-2 sm:py-2.5 backdrop-blur-md shadow-[0_0_24px_hsl(var(--primary)/0.18)]"
        >
          <span className="min-w-0 text-xs sm:text-sm md:text-base font-mono text-primary tracking-[0.12em] sm:tracking-[0.25em] flex items-center gap-2 sm:gap-3 whitespace-nowrap">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.45)]"></span>
            </span>
            <span className="min-w-0 truncate">[ SYSTEMS_ENGINEER / NY_USA ]</span>
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 relative"
        >
          <span className="text-foreground">I'm </span>
          <span className="text-primary">
            <GlitchText text="Rajat" />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-2xl text-lg text-muted-foreground/80 leading-relaxed mb-12"
        >
       I’m a graduate mechanical engineering student who enjoys turning ideas into working hardware. Focused on robotics, controls and hands-on mechanical design. </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a
            href="#work"
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center gap-2">
              Jump to Work
            </span>
          </a>

          <div className="flex items-center gap-4">
            {[
              { icon: Linkedin, href: "https://www.linkedin.com/in/rajat-gupta-60152125a/", label: "LinkedIn" },
              { icon: Mail, href: "#contact", label: "Email" },
            ].map((social, i) => (
              <a
                key={social.label}
                href={social.href}
                className="p-3 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 rounded-full"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Scramble Roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-10 pt-2 text-2xl sm:text-3xl md:text-4xl font-light text-muted-foreground"
        >
          <ScrambleText />
        </motion.div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </section>
  );
};

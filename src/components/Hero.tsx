import { motion, useAnimationControls } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { StarBackground } from "./ui/StarBackground";

const roles = [
  "Systems Engineer",
  "Robotics Architect",
  "Simulation Expert",
  "Drone Pilot",
  "Builder"
];

const GlitchText = ({ text }: { text: string }) => {
  return (
    <span className="inline-block">{text}</span>
  );
};

const ScrambleText = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(roles[0]);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let counter = 0;
    const currentRole = roles[index];

    const scramble = () => {
      if (counter >= currentRole.length + 10) { // Settle
        setDisplayText(currentRole);
        clearInterval(interval);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % roles.length);
        }, 2000); // Wait before next word
        return;
      }

      setDisplayText(
        currentRole
          .split("")
          .map((char, i) => {
            if (i < counter - 5) return char; // Reveal char
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      counter++;
    };

    interval = setInterval(scramble, 50);
    return () => clearInterval(interval);
  }, [index]);

  return <span className="font-mono text-primary">{displayText}</span>;
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <StarBackground />
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
          className="mb-10 overflow-hidden rounded-full border border-primary/25 bg-primary/10 px-6 py-2.5 backdrop-blur-md shadow-[0_0_24px_hsl(var(--primary)/0.18)]"
        >
          <span className="text-sm md:text-base font-mono text-primary tracking-[0.25em] flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.45)]"></span>
            </span>
            [ SYSTEMS_ENGINEER / NY_USA ]
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

        {/* Scramble Roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-3xl font-light text-muted-foreground mb-12 h-8"
        >
          Building <ScrambleText />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-2xl text-lg text-muted-foreground/80 leading-relaxed mb-12"
        >
          Mechanical systems engineer turning complex physics into autonomous reality.
          Specializing in UAV dynamics, control theory, and mechatronic design.
        </motion.p>

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
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
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
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </section>
  );
};

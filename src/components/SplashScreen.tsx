import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { GalaxyBackground } from "./ui/GalaxyBackground";

type SplashScreenProps = {
  onDone: () => void;
  durationMs?: number;
  name?: string;
};

export function SplashScreen({
  onDone,
  durationMs = 2100,
  name = "RAJAT_GUPTA",
}: SplashScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (prefersReducedMotion) {
      const id = window.setTimeout(onDone, 250);
      return () => window.clearTimeout(id);
    }

    const outAt = Math.max(600, durationMs - 450);
    const id1 = window.setTimeout(() => setPhase("out"), outAt);
    const id2 = window.setTimeout(onDone, durationMs);
    return () => {
      window.clearTimeout(id1);
      window.clearTimeout(id2);
    };
  }, [durationMs, onDone, prefersReducedMotion]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="splash"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
        className="fixed inset-0 z-[9999] bg-background text-foreground overflow-hidden"
        aria-label="Loading"
        aria-busy="true"
      >
        {/* Background */}
        <GalaxyBackground quality="low" />
        <div className="absolute inset-0 grid-pattern opacity-35 dark:opacity-25" />
        <div className="absolute inset-0 scanlines opacity-60" />

        <div className="relative h-full w-full flex items-center justify-center">
          <div className="w-full max-w-3xl px-6 text-center">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: 0.45 }}
              className="font-mono text-[11px] sm:text-xs tracking-[0.5em] text-primary/75 mb-6"
            >
              SYSTEM_BOOT / PORTFOLIO_V1
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.35, duration: 0.55, ease: "easeOut" }}
              className="relative"
            >
              <div className="inline-flex flex-col items-center gap-3">
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.45, duration: 0.4 }}
                    className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
                  >
                    {name}
                  </motion.div>

                  {/* subtle sweep */}
                  {!prefersReducedMotion && (
                    <motion.div
                      initial={{ x: "-120%", opacity: 0 }}
                      animate={{ x: "120%", opacity: 1 }}
                      transition={{ delay: 0.55, duration: 1.1, ease: "easeInOut" }}
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm"
                    />
                  )}
                </div>

                <div className="text-sm sm:text-base text-muted-foreground/80">
                  Initializing interface…
                </div>
              </div>
            </motion.div>

            {/* Progress */}
            <div className="mt-10">
              <div className="mx-auto h-2 w-full max-w-xl rounded-full border border-primary/15 bg-background/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: phase === "in" ? "100%" : "100%" }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : durationMs / 1000,
                    ease: "easeInOut",
                  }}
                  className="h-full bg-primary/70"
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.6, duration: 0.3 }}
                className="mt-3 font-mono text-[10px] tracking-[0.35em] text-muted-foreground/70"
              >
                LOADING
              </motion.div>
            </div>
          </div>
        </div>

        {/* Fade out content slightly before exit */}
        {!prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "out" ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute inset-0 bg-background"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}


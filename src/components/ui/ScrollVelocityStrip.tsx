import { useEffect, useMemo, useRef, useState, type ComponentType, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

type StripItem = {
  label: string;
  Icon: ComponentType<{ className?: string }>;
};

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  if (range === 0) return min;
  return ((((v - min) % range) + range) % range) + min;
}

export function ScrollVelocityStrip({
  items,
  baseSpeedPxPerSecond = 55,
}: {
  items: StripItem[];
  baseSpeedPxPerSecond?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const [sequenceWidth, setSequenceWidth] = useState(0);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 6], { clamp: false });

  useEffect(() => {
    const el = sequenceRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      setSequenceWidth(el.getBoundingClientRect().width);
    });
    ro.observe(el);
    setSequenceWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const x = useTransform(baseX, (v) => {
    if (!sequenceWidth) return 0;
    return wrap(-sequenceWidth, 0, v);
  });

  useAnimationFrame((_t, deltaMs) => {
    if (!sequenceWidth) return;
    const v = velocityFactor.get();
    const direction = v < 0 ? -1 : 1;
    const speed = baseSpeedPxPerSecond * (1 + Math.min(7, Math.abs(v)));
    const move = direction * speed * (deltaMs / 1000);
    baseX.set(wrap(-sequenceWidth, 0, baseX.get() - move));
  });

  const rendered = useMemo(() => {
    // include dot separators between items
    const out: ReactNode[] = [];
    items.forEach((it, i) => {
      const key = `${it.label}-${i}`;
      const Icon = it.Icon;
      out.push(
        <span
          key={key}
          className="inline-flex items-center gap-3 sm:gap-4"
        >
          <span
            title={it.label}
            className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-primary/20 bg-background/5 text-primary"
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <span className="inline-flex h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-primary/35" aria-hidden="true" />
        </span>
      );
    });
    return out;
  }, [items]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl border border-primary/15 bg-background/5 backdrop-blur-sm px-4 py-4 sm:px-8 sm:py-7 min-h-[84px] sm:min-h-[104px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      <motion.div
        style={{ x }}
        className="relative flex w-max gap-6 sm:gap-8"
        aria-hidden="true"
      >
        <div ref={sequenceRef} className="flex w-max gap-6 sm:gap-8 items-center">
          {rendered}
        </div>
        {/* duplicate for seamless wrap */}
        <div className="flex w-max gap-6 sm:gap-8 items-center">
          {rendered}
        </div>
      </motion.div>
    </div>
  );
}


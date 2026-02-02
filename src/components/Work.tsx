import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

type FilterType = "all" | "projects" | "professional";

type Project = {
  category: string;
  title: string;
  status: string;
  description: string;
  type: Exclude<FilterType, "all">;
  href: string; // relative to BASE_URL (no leading slash)
  previews: string[]; // relative to BASE_URL (no leading slash)
};

const withBase = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;

const projects: Project[] = [
  {
    category: "LOCOMOTION_RESEARCH",
    title: "18 DOF Hexapod Robotic Platform",
    status: "COMPLETED",
    description: "Designed and built a 6-legged 18-DOF platform under $150. ESP32-based WiFi control and Arduino based multi-joint actuation.",
    type: "projects" as const,
    href: "projects/hexapod.html",
    previews: [
      "projects/assets/images/hexa.png",
      "projects/assets/images/physical-setup-annotated.png",
      "projects/assets/images/original.png",
    ],
  },
  {
    category: "AUTONOMOUS_FLIGHT",
    title: "Autonomous Quadcopter Control with PID Control + RL",
    status: "DEPLOYED",
    description: "Betaflight tuning and PPO reinforcement learning in Isaac Sim with traditional PID architectures for smooth 'man to computer' input transitions.",
    type: "projects" as const,
    href: "projects/drone.html",
    previews: [
      "projects/assets/images/drone_real.png",
      "projects/assets/images/fc.png",
      "projects/assets/images/esc.png",
    ],
  },
  {
    category: "TRAJECTORY_SIM",
    title: "SpinLaunch Inspired Sim & Analysis",
    status: "COMPLETED",
    description: "High fidelity Mujoco & Python simulation framework analysis for kinetic launch systems. Reduced post-release oscillatory hinge loads by 90% and optimized factors like angle of throw and burner phase using ONLY HALF the propellant of a conventional launch",
    type: "projects" as const,
    href: "projects/kinetic.html",
    previews: [
      "projects/assets/images/accelerator.png",
      "projects/assets/images/",
      "projects/assets/images/fuel_graph.png",
    ],
  },
  {
    category: "CONTROL_SYSTEMS",
    title: "Closed Loop Thermal Control",
    status: "COMPLETED",
    description: "Closed-loop evaporative cooling for PV panels. Achieved 5-7°C reduction matching Simulink predictions.",
    type: "projects" as const,
    href: "projects/solar-cooling.html",
    previews: [
      "assets/images/solar.png",
      "projects/assets/images/temp.png",
      "projects/assets/images/experimental-temp-power.png",
    ],
  },
  {
    category: "IOT_FABRICATION",
    title: "NYC Subway Arrival Countdown",
    status: "DEPLOYED",
    description: "Real-time transit telemetry display with fault-tolerant updates and custom-fabricated enclosure.",
    type: "projects" as const,
    href: "projects/subway.html",
    previews: [
      "projects/assets/images/herodisplay.png",
      "projects/assets/images/layout.png",
    ],
  },
  {
    category: "INDUSTRIAL_OPS",
    title: "Emerson | Engineering Work",
    status: "COMPLETED",
    description: "Professional engineering focused on real-world constraints, MOST analysis, and system behavior.",
    type: "professional" as const,
    href: "projects/emerson.html",
    previews: [
      "projects/assets/images/emerson.png",
      "projects/assets/images/most.png",
      "projects/assets/images/valve.png",
    ],
  },
];

const statusColors: Record<string, string> = {
  COMPLETED: "text-green-400",
  ACTIVE_DEV: "text-primary",
  RESEARCH_PHASE: "text-yellow-400",
  VALIDATED: "text-blue-400",
  DEPLOYED: "text-purple-400",
};

export const Work = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.type === filter
  );

  return (
    <section id="work" className="py-24 md:py-32 relative" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="bracket-label">[ MISSION_LOG / 03 ]</span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2">
            Work & <span className="neon-text">Experience</span>
          </h2>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-2 mb-10 flex-wrap"
        >
          {(["all", "projects", "professional"] as FilterType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                filter === tab
                  ? "bg-primary text-primary-foreground neon-box"
                  : "glass hover:bg-surface-2"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const preview =
              project.previews.length > 0
                ? withBase(project.previews[0])
                : null;

            return (
            <motion.a
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              href={withBase(project.href)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open project: ${project.title}`}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl min-h-[240px] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {/* Card chrome */}
              <div className="absolute inset-x-0 top-5 flex items-center justify-center">
                <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.35em] text-primary/80">
                  {project.category}
                </span>
              </div>

              {/* Default content (matches screenshot) */}
              <div className="relative flex flex-col items-center justify-center text-center px-6 py-10 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
                {/* Preview */}
                {preview && (
                  <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-border/50 bg-background/5">
                    <img
                      src={preview}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-[0.98]"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = withBase("placeholder.svg");
                      }}
                    />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-70" />
                  </div>
                )}
                <h3 className="mt-5 text-lg sm:text-xl font-bold leading-snug tracking-tight text-foreground max-w-[20rem]">
                  {project.title}
                </h3>
              </div>

              {/* Hover details overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/35 to-background/90" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end gap-3">
                  <div className="flex items-center gap-3">
                    {preview && (
                      <div className="h-10 w-12 overflow-hidden rounded-xl border border-border/50 bg-background/5">
                        <img
                          src={preview}
                          alt=""
                          className="h-full w-full object-cover opacity-95"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = withBase("placeholder.svg");
                          }}
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-bold leading-snug tracking-tight text-foreground">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">STATUS:</span>
                    <span className={`font-mono text-xs ${statusColors[project.status] ?? "text-muted-foreground"}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download, FileText, Briefcase, GraduationCap } from "lucide-react";
import { GalaxyBackground } from "./ui/GalaxyBackground";

const RESUME_PDF_URL = `${import.meta.env.BASE_URL}resume.pdf`;
const RESUME_VIEW_URL = `${import.meta.env.BASE_URL}resume.html`;

const experience = [
  {
    title: "",
    company: "LawgicHub AI",
    period: "Sept 2024 to present",
    description: "an AI-driven legal technology startup focused on intelligent document and case management. Leading system-level architecture planning and workflow design for AI-assisted document ingestion, analysis, drafting, and revision.",
  },
];

const experience = [
  {
    title: "Mechanical Engineer Intern",
    company: "Emerson",
    period: "January 2024 to June 2024",
    description: "Engineering focused on real-world constraints, MOST analysis, and system behavior optimization.",
  },
];

const education = [
  {
    degree: "Mechanical Engineering",
    institution: "University",
    focus: "Controls, Dynamics & Robotics",
  },
];

export const Resume = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resume" className="py-24 md:py-32 relative bg-surface-1 overflow-hidden" ref={ref}>
      <GalaxyBackground />
      <div className="absolute inset-0 grid-pattern opacity-35 dark:opacity-25" />
      <div className="hidden dark:block absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="hidden dark:block absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/10 rounded-full blur-[120px] animate-pulse animation-delay-500" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl"
        >
          <span className="bracket-label">[ DOCUMENTATION / 04 ]</span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2">
            <span className="neon-text">Resume</span>
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            A quick snapshot of experience and education. For full technical details, grab the PDF.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Download Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-card/60 backdrop-blur-xl p-6 md:p-8 h-full flex flex-col justify-between">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div className="rounded-2xl border border-border/50 bg-background/5 p-3">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <span className="font-mono text-[11px] tracking-widest text-muted-foreground/80">
                    PDF_EXPORT
                  </span>
                </div>

                <h3 className="text-xl font-semibold mt-5">Full Resume</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Download the complete resume with detailed project descriptions and technical specifications.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Experience", "Projects", "Skills"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/60 bg-background/5 px-3 py-1 text-[11px] font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-8 space-y-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={RESUME_VIEW_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl border border-primary/20 bg-background/5 text-primary font-mono text-sm inline-flex items-center justify-center gap-2 hover:border-primary/35 hover:bg-primary/10 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  View Resume
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={RESUME_PDF_URL}
                  rel="noreferrer"
                  download
                  className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-mono text-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-[0_0_22px_hsl(var(--primary)/0.25)]"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </motion.a>
                <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
                  Tip: place your file at <span className="font-mono text-muted-foreground">public/resume.pdf</span>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Experience & Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Experience */}
            <div className="rounded-2xl border border-primary/15 bg-card/60 backdrop-blur-xl p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.10)]">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-border/50 bg-background/5 p-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-mono text-lg font-medium">Experience</h3>
                </div>
                <span className="font-mono text-[11px] tracking-widest text-muted-foreground/70">
                  TIMELINE
                </span>
              </div>

              <div className="relative pl-10">
                {/* Rail */}
                <div className="absolute left-4 top-1 bottom-1 w-px bg-primary/15" />
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={isInView ? { height: "100%", opacity: 1 } : {}}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className="absolute left-4 top-1 w-px bg-gradient-to-b from-primary via-primary/70 to-transparent"
                />

                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <motion.div
                      key={`${exp.company}-${exp.title}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                      className="relative"
                    >
                      {/* Content */}
                      <div className="rounded-xl bg-background/5 p-4 sm:p-5">
                        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
                          <div>
                            <h4 className="font-semibold leading-snug">{exp.title}</h4>
                            <p className="text-primary font-mono text-sm">{exp.company}</p>
                          </div>
                          <p className="text-muted-foreground text-sm">{exp.period}</p>
                        </div>
                        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="rounded-2xl border border-primary/15 bg-card/60 backdrop-blur-xl p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.10)]">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-border/50 bg-background/5 p-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-mono text-lg font-medium">Education</h3>
                </div>
                <span className="font-mono text-[11px] tracking-widest text-muted-foreground/70">
                  DETAILS
                </span>
              </div>

              <div className="relative pl-10">
                {/* Rail */}
                <div className="absolute left-4 top-1 bottom-1 w-px bg-primary/15" />
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={isInView ? { height: "100%", opacity: 1 } : {}}
                  transition={{ duration: 1.1, ease: "easeOut", delay: 0.05 }}
                  className="absolute left-4 top-1 w-px bg-gradient-to-b from-primary via-primary/70 to-transparent"
                />

                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <motion.div
                      key={`${edu.institution}-${edu.degree}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="relative"
                    >
                      {/* Content */}
                      <div className="rounded-xl bg-background/5 p-4 sm:p-5">
                        <h4 className="font-semibold leading-snug">{edu.degree}</h4>
                        <p className="text-primary font-mono text-sm">{edu.institution}</p>
                        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                          Focus: {edu.focus}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

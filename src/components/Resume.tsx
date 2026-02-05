import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download, FileText, Briefcase, GraduationCap } from "lucide-react";
import { GalaxyBackground } from "./ui/GalaxyBackground";

const RESUME_PDF_URL = `${import.meta.env.BASE_URL}base_resume.pdf`;
const RESUME_VIEW_URL = `${import.meta.env.BASE_URL}resume.html`;

const experience = [
  {
    title: "Systems & Product Strategy",
    company: "LawgicHub AI",
    period: "2024 – Present",
    summary: "Working on system-level thinking and workflow structure for a multi-agent legal AI platform.",
  },
  {
    title: "Mechanical Engineer, Intern",
    company: "Emerson",
    period: "January 2024 – June 2024",
    summary:
      "Worked on optimizing the butterfly valve assembly cell throughput using PMTS.",
  },
  {
    title: "HVAC Engineer, Intern",
    company: "Shapoorji Pallonji Group · Mumbai, India",
    period: "January 2023 – June 2023",
    summary:
      "Performed heat load calculations, developed BOQs, and designed HVAC piping schematics for the New Delhi Railway Station project.",
  },
  
];

const education = [
  {
    degree: "M.S. Mechanical Engineering",
    institution: "New York University · Tandon School of Engineering, USA",
  },
  {
    degree: "B.Tech Mechatronics Engineering (Minor: Digital Marketing)",
    institution: "Manipal Institute of Technology, India",
  },
];

export const Resume = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="resume"
      ref={ref}
      className="py-24 md:py-32 relative bg-surface-1 overflow-hidden"
    >
      <GalaxyBackground />

      <div className="section-container relative z-10 max-w-5xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <span className="bracket-label">[ DOCUMENTATION / 04 ]</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2">
              <span className="neon-text">Resume</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md">
              Experience and Education at a glance
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={RESUME_VIEW_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-background/5 text-primary font-mono text-sm hover:bg-primary/10 transition-colors"
            >
              <FileText className="w-4 h-4" />
              View Resume
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={RESUME_PDF_URL}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-mono text-sm hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </motion.a>
          </div>
        </motion.div>

        {/* EXPERIENCE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-primary/15 bg-card/60 backdrop-blur-xl p-6 md:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-5 h-5 text-primary" />
            <h3 className="font-mono text-lg">Experience</h3>
          </div>

          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-primary/30 pl-4">
                <div className="flex flex-wrap justify-between gap-2">
                  <div>
                    <h4 className="font-semibold">{exp.title}</h4>
                    <p className="text-primary font-mono text-sm">{exp.company}</p>
                  </div>
                  <p className="text-muted-foreground text-sm">{exp.period}</p>
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  {exp.summary}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* EDUCATION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-primary/15 bg-card/60 backdrop-blur-xl p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h3 className="font-mono text-lg">Education</h3>
          </div>

          <div className="space-y-6">
            {education.map((edu, i) => (
              <div key={i} className="border-l-2 border-primary/30 pl-4">
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-primary font-mono text-sm">
                  {edu.institution}
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  Focus: {edu.focus}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

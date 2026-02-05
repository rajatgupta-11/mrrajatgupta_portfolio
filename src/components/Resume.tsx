import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download, FileText, Briefcase, GraduationCap } from "lucide-react";
import { GalaxyBackground } from "./ui/GalaxyBackground";

const RESUME_PDF_URL = `${import.meta.env.BASE_URL}base_resume.pdf`;
const RESUME_VIEW_URL = `${import.meta.env.BASE_URL}resume.html`;

const experience = [
  {
    title: "Mechanical Engineer Intern",
    company: "Emerson",
    period: "January 2024 – June 2024",
    description:
      "Worked on industrial mechanical systems with emphasis on real-world constraints, MOST analysis, tolerance-driven design decisions, and system-level behavior under operational loads.",
  },
  {
    title: "HVAC Engineer Intern",
    company: "Shapoorji Pallonji Group, Mumbai, India",
    period: "January 2023 – June 2023",
    description:
      "Performed heat load calculations, developed BOQs, and designed HVAC piping schematics for the New Delhi Railway Station project.",
  },
  {
    title: "Systems & Product Strategy (Non-Engineering)",
    company: "LawgicHub AI",
    period: "2024 – Present",
    description:
      "Non-coding role focused on system-level thinking, workflow design, and product direction for a multi-agent legal AI platform.",
  },
];

const education = [
  {
    degree: "M.S. Mechanical Engineering",
    institution: "New York University, Tandon School of Engineering, USA",
    focus: "Controls, Dynamics, Robotics, Fabrication",
  },
  {
    degree: "B.Tech Mechatronics Engineering (Minor: Digital Marketing)",
    institution: "Manipal Institute of Technology, India",
    focus: "Mechatronics, Embedded Systems, Mechanical Design",
  },
];

export const Resume = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="resume"
      className="py-24 md:py-32 relative bg-surface-1 overflow-hidden"
      ref={ref}
    >
      <GalaxyBackground />

      <div className="section-container relative z-10">
        {/* Header */}
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
          <p className="text-muted-foreground mt-3">
            Mechanical engineering background with systems, controls, and
            real-world hardware focus.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Resume Download */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-primary/15 bg-card/60 backdrop-blur-xl p-6 md:p-8 h-full flex flex-col justify-between">
              <div>
                <FileText className="w-7 h-7 text-primary" />
                <h3 className="text-xl font-semibold mt-4">Full Resume</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  PDF with detailed experience, projects, and technical depth.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={RESUME_VIEW_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center py-3 rounded-xl border border-primary/20 text-primary font-mono text-sm hover:bg-primary/10"
                >
                  View Resume
                </a>
                <a
                  href={RESUME_PDF_URL}
                  download
                  className="block text-center py-3 rounded-xl bg-primary text-primary-foreground font-mono text-sm hover:bg-primary/90"
                >
                  <Download className="inline w-4 h-4 mr-2" />
                  Download PDF
                </a>
              </div>
            </div>
          </div>

          {/* Experience + Education */}
          <div className="lg:col-span-8 space-y-6">
            {/* Experience */}
            <div className="rounded-2xl border border-primary/15 bg-card/60 backdrop-blur-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-5 h-5 text-primary" />
                <h3 className="font-mono text-lg">Experience</h3>
              </div>

              <div className="space-y-5">
                {experience.map((exp, i) => (
                  <div key={i} className="rounded-xl bg-background/5 p-4">
                    <div className="flex justify-between flex-wrap gap-2">
                      <div>
                        <h4 className="font-semibold">{exp.title}</h4>
                        <p className="text-primary font-mono text-sm">
                          {exp.company}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {exp.period}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="rounded-2xl border border-primary/15 bg-card/60 backdrop-blur-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="font-mono text-lg">Education</h3>
              </div>

              <div className="space-y-5">
                {education.map((edu, i) => (
                  <div key={i} className="rounded-xl bg-background/5 p-4">
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-primary font-mono text-sm">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Focus: {edu.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

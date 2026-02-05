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
      "Engineering focused on physical system behavior, MOST analysis, and constraint-driven optimization in industrial environments.",
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
      "Non-coding role focused on system architecture thinking, workflow design, and cross-domain reasoning for a multi-agent legal AI platform.",
  },
];

const education = [
  {
    degree: "MS Mechanical Engineering",
    institution: "New York University Tandon School of Engineering, USA",
  },
  {
    degree: "B.Tech Mechatronics Engineering (Minor in Digital Marketing)",
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
          <p className="text-muted-foreground mt-

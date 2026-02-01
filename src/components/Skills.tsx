import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Code, Settings, Bot, Wrench } from "lucide-react";
import { GalaxyBackground } from "./ui/GalaxyBackground";
import { ScrollVelocityStrip } from "./ui/ScrollVelocityStrip";
import {
  SiAnsys,
  SiArduino,
  SiCss3,
  SiDassaultsystemes,
  SiEspressif,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { TbBinaryTree2, TbLetterC, TbMathFunction } from "react-icons/tb";

const skillCategories = [
  {
    icon: Cpu,
    title: "Design & Simulation",
    skills: ["SolidWorks", "AutoCAD", "Fusion 360", "Simulink", "ANSYS Mechanical"],
  },
  {
    icon: Code,
    title: "Programming & Physics",
    skills: ["Python", "MATLAB", "C", "MuJoCo", "Isaac Sim", "Betaflight"],
  },
  {
    icon: Settings,
    title: "Control & Embedded",
    skills: ["Arduino", "Raspberry Pi", "ESP32"],
  },
  {
    icon: Bot,
    title: "Robotics & Autonomy",
    skills: ["UAV platforms", "Multi-DOF mechanisms", "Sensor integration", "RL (PPO)"],
  },
  {
    icon: Wrench,
    title: "Prototyping",
    skills: ["CNC machining", "3D printing", "Hydraulics", "Tolerance analysis"],
  },
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative bg-surface-1 overflow-hidden" ref={ref}>
      {/* Background accent */}
      <GalaxyBackground />
      <div className="absolute inset-0 grid-pattern opacity-35 dark:opacity-30" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="bracket-label">[ CAPABILITIES / 02 ]</span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2">
            <span className="neon-text">Skills</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-6 glass-hover group border border-primary/15 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.10)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-mono text-sm font-medium">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-mono text-muted-foreground bg-surface-2 rounded-full border border-border hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Based Velocity */}
        <div className="mt-12">
          <ScrollVelocityStrip
            items={[
              { label: "Python", Icon: SiPython },
              { label: "MATLAB", Icon: TbMathFunction },
              { label: "C", Icon: TbLetterC },
              { label: "TypeScript", Icon: SiTypescript },
              { label: "JavaScript", Icon: SiJavascript },
              { label: "React", Icon: SiReact },
              { label: "HTML", Icon: SiHtml5 },
              { label: "CSS", Icon: SiCss3 },
              { label: "Node.js", Icon: SiNodedotjs },
              { label: "Arduino", Icon: SiArduino },
              { label: "ESP32", Icon: SiEspressif },
              { label: "Simulink", Icon: TbBinaryTree2 },
              { label: "ANSYS", Icon: SiAnsys },
              { label: "SolidWorks", Icon: SiDassaultsystemes },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

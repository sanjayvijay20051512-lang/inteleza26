import React, { useState } from "react";
import { motion } from "motion/react";
import { Compass, Eye, Target, Sparkles, Building2, Cpu, Milestone } from "lucide-react";

export const AboutSection: React.FC = () => {
  const [activePanel, setActivePanel] = useState<string>("vision");

  const getSystemAdvisor = (panelId: string) => {
    switch (panelId) {
      case "vision":
      case "mission":
        return {
          name: "AI System 'Aegis'",
          role: "TACTICAL EXPEDITION LEAD",
          emoji: "🤖",
          tip: "Establishing telemetry... Building a digital vanguard requires clear long-range vision and strategic computational models.",
        };
      case "college":
      case "objectives":
        return {
          name: "Coordinator 'Aletheia'",
          role: "ACADEMIC ADVISOR",
          emoji: "🏛️",
          tip: "The Inteleza '26 central database is online. Connect your algorithms to standard IEEE frameworks for maximum compatibility.",
        };
      case "department":
        return {
          name: "Core Sentry Protocol",
          role: "SECURITY BLOCKCHAIN COMMAND",
          emoji: "🛡️",
          tip: "Quantum security parameters are verified. Neural networks are shielded under a multi-node cryptographic firewall.",
        };
      case "theme":
      default:
        return {
          name: "Chrono-Nav Engine",
          role: "COGNITIVE NAVIGATION BOT",
          emoji: "🌀",
          tip: "Inteleza represents a continuous state-space. Prepare to initialize your system parameters and exceed industry paradigms.",
        };
    }
  };

  const panels = [
    {
      id: "vision",
      label: "VISION",
      icon: <Eye className="w-5 h-5" />,
      title: "Vision of the Horizon",
      subtitle: "Charting coordinates into the unknown",
      content: "To establish a nexus where cognitive human intellect unites with infinite computational horizons, cultivating generation-defining innovators who command the systems of tomorrow.",
    },
    {
      id: "mission",
      label: "MISSION",
      icon: <Target className="w-5 h-5" />,
      title: "Our Tactical Mission",
      subtitle: "Accelerating learning curves & hardware mastery",
      content: "Empowering young developers and futuristic engineers with full-stack capabilities, quantum reasoning, AI integration, and robust mechanical structures through state-of-the-art interactive labs and high-stakes arenas.",
    },
    {
      id: "objectives",
      label: "OBJECTIVES",
      icon: <Milestone className="w-5 h-5" />,
      title: "Core Objectives",
      subtitle: "What we set out to achieve",
      content: "Providing a competitive launchpad for 6+ technical and non-technical fields. Cultivating raw multi-disciplinary collaboration, rewarding extreme logical efficiency, and expanding peer-to-peer knowledge networks.",
    },
    {
      id: "college",
      label: "ORGANIZER",
      icon: <Building2 className="w-5 h-5" />,
      title: "Inteleza '26 Organizer",
      subtitle: "Presented by Innovision Association",
      content: "Hosted by the visionary student association Innovision, conducting the prestigious state-level symposium Inteleza '26.",
    },
    {
      id: "department",
      label: "DEPARTMENT",
      icon: <Cpu className="w-5 h-5" />,
      title: "Artificial Intelligence & Data Science",
      subtitle: "The pioneers of next-gen intelligent systems",
      content: "This symposium is conducted exclusively by the Department of Artificial Intelligence and Data Science. The department focuses on the absolute frontier of computational intelligence, including deep learning networks, data engineering, predictive modeling, and agentic AI architectures.",
    },
    {
      id: "theme",
      label: "THEME",
      icon: <Sparkles className="w-5 h-5" />,
      title: "Theme: The Gateway to Infinity",
      subtitle: "Innovation meeting the boundless void",
      content: "The Gateway represents a portal through which classical computing and thinking evaporate, replaced by infinite state-spaces, continuous learning algorithms, and deep architectural wonders.",
    },
  ];

  return (
    <section id="about" className="relative min-h-screen py-24 px-6 overflow-hidden flex items-center">
      {/* CRYSTAL HALL BACKGROUND DECORATIONS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Light Beams */}
        <div className="absolute top-0 bottom-0 left-[20%] w-[1.5px] bg-gradient-to-t from-transparent via-cyan-400/20 to-transparent animate-pulse" />
        <div className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-gradient-to-t from-transparent via-purple-400/10 to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-0 bottom-0 left-[80%] w-[2px] bg-gradient-to-t from-transparent via-cyan-400/15 to-transparent animate-pulse" style={{ animationDelay: "2.5s" }} />

        {/* Floating Crystal Vectors (Glassmorphic Diamonds) */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [15, 30, 15],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
          }}
          className="absolute top-28 left-8 w-16 h-32 border border-cyan-400/20 bg-cyan-950/10 backdrop-blur-sm rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.1)] rounded-sm"
        >
          <div className="w-10 h-20 border border-purple-500/10 bg-purple-950/5 rotate-12" />
        </motion.div>

        <motion.div
          animate={{
            y: [30, -30, 30],
            rotate: [-10, -25, -10],
            scale: [1.1, 0.95, 1.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
          className="absolute bottom-28 right-8 w-24 h-48 border border-purple-400/20 bg-purple-950/10 backdrop-blur-sm -rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.1)] rounded-sm"
        >
          <div className="w-16 h-32 border border-cyan-500/10 bg-cyan-950/5 rotate-12" />
        </motion.div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto z-10">
        {/* SECTION HEADER */}
        <div className="text-center md:text-left mb-16">
          <span className="text-cyan-400 font-mono tracking-[0.25em] text-xs uppercase font-semibold block mb-2">
            INTELECTUAL NEXUS
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-sans uppercase tracking-tight text-white">
            ABOUT THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">SYMPOSIUM</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-sans font-light mt-4 max-w-xl leading-relaxed">
            Step into the central floating crystal hall where innovation, vision, and academics align to create a flawless digital dimension.
          </p>
        </div>

        {/* Floating Interactive Crystal Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* PANEL SELECTION RAIL (LEFT COLUMN) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {panels.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePanel(p.id)}
                className={`group w-full flex items-center justify-between p-4 rounded-xl text-left font-sans font-bold text-sm tracking-widest transition-all duration-300 relative overflow-hidden uppercase ${
                  activePanel === p.id
                    ? "text-cyan-300 bg-cyan-950/40 border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                    : "text-slate-400 bg-slate-950/20 border border-white/5 hover:text-white hover:border-cyan-500/20 hover:bg-cyan-950/10"
                }`}
                id={`about-tab-${p.id}`}
              >
                {/* Visual hover background sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none" />

                <div className="flex items-center gap-3 relative z-10">
                  <div
                    className={`p-2 rounded-lg border transition-colors duration-300 ${
                      activePanel === p.id ? "bg-cyan-950/50 border-cyan-400/40" : "bg-slate-900/40 border-white/5"
                    }`}
                  >
                    {p.icon}
                  </div>
                  <span>{p.label}</span>
                </div>
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activePanel === p.id ? "bg-cyan-400 scale-125" : "bg-slate-600 group-hover:bg-cyan-500"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* COGNITIVE SYSTEM ADVISOR (CENTER COLUMN) */}
          <div className="lg:col-span-3 space-y-4 bg-slate-950/30 border border-purple-500/10 p-5 rounded-xl backdrop-blur-xl relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-purple-400/30 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-purple-400/30 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-purple-400/30 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-purple-400/30 rounded-br-lg pointer-events-none" />

            <div>
              <span className="text-[8px] font-mono tracking-widest text-purple-400 uppercase block mb-1">
                INTELEZA AI CHANNELS
              </span>
              <h4 className="text-sm font-black font-sans text-white uppercase tracking-wide">
                SYSTEM <span className="text-purple-400">ADVISORS</span>
              </h4>
            </div>

            {/* Holographic Projection */}
            <div className="p-4 rounded-xl bg-purple-950/15 border border-purple-400/10 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-slate-900 border border-purple-500/20 flex items-center justify-center text-3xl mb-3 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                {getSystemAdvisor(activePanel).emoji}
              </div>
              <h5 className="text-xs font-bold text-white uppercase font-sans tracking-wide">
                {getSystemAdvisor(activePanel).name}
              </h5>
              <span className="text-[8px] font-mono text-purple-400 uppercase tracking-widest mt-0.5">
                {getSystemAdvisor(activePanel).role}
              </span>
            </div>

            {/* Direct advice bubble */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
              <p className="text-yellow-300 italic font-sans text-[11px] leading-relaxed">
                "{getSystemAdvisor(activePanel).tip}"
              </p>
            </div>
          </div>

          {/* ACTIVE CRYSTAL HALL PANEL DISPLAY (RIGHT COLUMN) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 opacity-70 blur-xl pointer-events-none" />

            <div className="relative min-h-[350px] p-6 md:p-8 rounded-2xl bg-slate-950/45 border border-white/5 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Inner glowing corner lines (Holographic HUD grid effect) */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 rounded-br-xl pointer-events-none" />

              {/* Gridlines overlay */}
              <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {panels.map(
                (p) =>
                  activePanel === p.id && (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col h-full justify-between"
                    >
                      <div>
                        {/* Title Display */}
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-400/10 to-purple-600/10 border border-cyan-400/20 text-cyan-400">
                            {p.icon}
                          </div>
                          <div>
                            <h3 className="text-lg md:text-xl font-sans font-extrabold text-white tracking-wide uppercase">
                              {p.title}
                            </h3>
                            <p className="text-[10px] md:text-xs font-mono text-cyan-400/70 uppercase tracking-widest mt-0.5">
                              {p.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Divider Line */}
                        <div className="h-[1px] w-full bg-gradient-to-r from-cyan-400/20 via-purple-400/10 to-transparent my-4" />

                        {/* Descriptive content */}
                        <p className="text-slate-300 font-sans font-light text-xs md:text-sm leading-relaxed tracking-wide">
                          {p.content}
                        </p>
                      </div>

                      {/* Decal System Status */}
                      <div className="mt-8 flex justify-between items-center text-[10px] font-mono text-slate-500 border-t border-white/5 pt-4">
                        <span>DATA_ARRAY: {p.id.toUpperCase()}_STRUCT_OK</span>
                        <span className="flex items-center gap-1.5 text-cyan-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          COGNITIVE LINK: ACTIVE
                        </span>
                      </div>
                    </motion.div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

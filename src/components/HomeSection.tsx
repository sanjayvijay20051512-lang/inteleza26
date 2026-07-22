import React, { useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Calendar, Compass, Layers, Trophy, Cpu, Users, ArrowRight, Play } from "lucide-react";
import { STATS } from "../data";

interface HomeSectionProps {
  onNavigate: (sectionId: string) => void;
}

// Subcomponent: Animated Ticking Counter
const CounterItem: React.FC<{ value: number; label: string; suffix: string; icon: string }> = ({
  value,
  label,
  suffix,
  icon,
}) => {
  const [count, setCount] = useState(0);
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000; // 2s duration
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = duration / frameRate;
    const increment = value / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isInView, value]);

  // Select appropriate icon
  const renderIcon = () => {
    const iconClass = "w-6 h-6 text-cyan-400";
    switch (icon) {
      case "Layers":
        return <Layers className={iconClass} />;
      case "Trophy":
        return <Trophy className={iconClass} />;
      case "Cpu":
        return <Cpu className={iconClass} />;
      case "Users":
        return <Users className={iconClass} />;
      default:
        return <Compass className={iconClass} />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/40 border border-white/5 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:border-cyan-500/20 transition-all duration-300"
    >
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />
      <div className="mb-3 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
        {renderIcon()}
      </div>
      <span className="text-3xl md:text-4xl font-sans font-black tracking-tight text-white mb-1">
        {formatNumber(count)}
        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-extrabold font-mono">
          {suffix}
        </span>
      </span>
      <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-slate-400 uppercase text-center mt-1">
        {label}
      </span>
    </div>
  );
};

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown timer to Aug 28, 2026
  useEffect(() => {
    const targetDate = new Date("2026-08-28T09:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center py-20 px-6 overflow-hidden">
      {/* Background Parallax Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* HOLOGRAM LOGO WATERMARK IN BACKGROUND */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.09] pointer-events-none select-none z-0">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.04, 1],
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 45, ease: "linear" },
              scale: { repeat: Infinity, duration: 12, ease: "easeInOut" },
            }}
            className="w-[280px] h-[280px] md:w-[550px] md:h-[550px] text-cyan-400"
          >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Outer orbit circle */}
              <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
              {/* Middle complex tech dial */}
              <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="1.5" strokeDasharray="40 10 20 5" />
              <circle cx="100" cy="100" r="68" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              {/* Inner geometric lines / crosshairs */}
              <line x1="100" y1="8" x2="100" y2="192" stroke="currentColor" strokeWidth="0.25" opacity="0.3" />
              <line x1="8" y1="100" x2="192" y2="100" stroke="currentColor" strokeWidth="0.25" opacity="0.3" />
              {/* Hexagonal nodes */}
              <polygon points="100,42 150,71 150,129 100,158 50,129 50,71" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" />
              {/* Rotating inner tech wheel */}
              <circle cx="100" cy="100" r="32" stroke="currentColor" strokeWidth="2" strokeDasharray="5 20" />
              {/* Center elegant stylized 'I' logo representing Innovision & Inteleza */}
              <path
                d="M90,75 L110,75 M100,75 L100,125 M90,125 L110,125 M92,90 L108,90 M92,110 L108,110"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="100" cy="100" r="4" fill="currentColor" />
            </svg>
          </motion.div>
        </div>
        {/* PARALLAX CITY VECTORS BACKGROUND */}
        <div className="absolute bottom-0 inset-x-0 h-[400px] opacity-[0.12] bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.2),transparent_70%)]">
          {/* Cybernetic geometric grids forming city skyscrapers outline */}
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-cyan-950/20 to-transparent flex justify-around items-end overflow-hidden">
            {[180, 220, 150, 290, 260, 190, 210, 250, 170, 280].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}px` }}
                className="w-10 bg-gradient-to-t from-cyan-500/20 to-transparent border-t border-x border-cyan-400/20 rounded-t-sm relative shadow-[0_0_20px_rgba(6,182,212,0.05)]"
              >
                {/* Horizontal grid stripes representing tower floors */}
                <div className="absolute inset-x-0 top-4 h-[1px] bg-cyan-400/10" />
                <div className="absolute inset-x-0 top-12 h-[1px] bg-cyan-400/10" />
                <div className="absolute inset-x-0 top-20 h-[1px] bg-cyan-400/10" />
                <div className="absolute inset-x-0 top-28 h-[1px] bg-cyan-400/10" />
                {/* Glowing light indicator on top */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
            ))}
          </div>
        </div>

        {/* Moving Clouds */}
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
          className="absolute top-1/3 left-0 w-[500px] h-[150px] bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 110, ease: "linear" }}
          className="absolute top-2/3 right-0 w-[600px] h-[180px] bg-gradient-to-r from-transparent via-purple-500/3 to-transparent blur-3xl pointer-events-none"
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center z-10 text-center">
        {/* EVENT TAG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-400/20 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.1)] mb-6 text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase"
        >
          <Calendar className="w-3.5 h-3.5" />
          AUGUST 28, 2026 • NEXUS FLOATING CAMPUS
        </motion.div>

        {/* HERO COGNITIVE CREDENTIALS (LARGE DEPARTMENT & ASSOCIATION) */}
        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-purple-950/40 border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.25)] mb-4"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
            <span className="text-xs sm:text-sm md:text-base font-mono font-black tracking-[0.35em] text-purple-300 uppercase">
              INNOVISION ASSOCIATION
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-2xl md:text-4xl font-extrabold font-sans tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-100 to-white uppercase text-center max-w-4xl leading-tight drop-shadow-[0_0_20px_rgba(6,182,212,0.3)] mb-4"
          >
            DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE
          </motion.h3>
        </div>

        {/* HERO TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black font-sans uppercase tracking-tight text-white leading-none mb-4"
        >
          THE GATEWAY TO
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-yellow-400 bg-clip-text text-transparent font-black drop-shadow-[0_0_35px_rgba(6,182,212,0.25)]">
            INTELEZA '26
          </span>
        </motion.h2>

        {/* COUNTDOWN TIMER COMPONENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {[
            { label: "DAYS", val: timeLeft.days },
            { label: "HOURS", val: timeLeft.hours },
            { label: "MINS", val: timeLeft.minutes },
            { label: "SECS", val: timeLeft.seconds },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-2xl bg-slate-950/50 border border-white/5 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.05)]">
                <span className="text-3xl md:text-4xl font-sans font-black tracking-tight text-white">
                  {item.val.toString().padStart(2, "0")}
                </span>
                {/* Border neon outline */}
                <div className="absolute inset-0 rounded-2xl border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300" />
              </div>
              <span className="text-[9px] md:text-xs font-mono tracking-widest font-bold text-cyan-400 mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA HERO BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-5"
        >
          <button
            onClick={() => onNavigate("events")}
            className="group px-8 py-4 rounded-full font-sans font-bold tracking-widest text-sm text-black bg-gradient-to-r from-cyan-400 to-cyan-200 uppercase hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center gap-2"
          >
            EXPLORE EVENTS
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>

          <button
            onClick={() => onNavigate("registration")}
            className="group px-8 py-4 rounded-full font-sans font-bold tracking-widest text-sm text-white uppercase border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-950/20 active:scale-95 transition-all duration-300 flex items-center gap-2 bg-slate-950/20 backdrop-blur-md"
          >
            REGISTER NOW
            <Play className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* STATS MATRIX SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-20"
        >
          {STATS.map((stat) => (
            <CounterItem
              key={stat.id}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              icon={stat.icon}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

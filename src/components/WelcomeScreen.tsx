import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Compass, Bot, Terminal, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onEnter: () => void;
  onChargeProgress: (prog: number) => void;
  isWarping: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter, onChargeProgress, isWarping }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSlammed, setIsSlammed] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [accessGranted, setAccessGranted] = useState(false);

  const ROBOT_DIALOGUES = [
    "GREETINGS, CREATIVE INTELLECT. I AM INTELEZA-BOT v2.6.",
    "COGNITIVE INTERFACE INITIALIZED SUCCESSFULLY.",
    "DEPARTMENT OF AI & DS WELCOMES YOU TO OUR DIGITAL ARENA.",
    "OUR CAMPUS VENUE: ARASU ENGINEERING COLLEGE, KUMBAKONAM.",
    "ALL 6 PREMIUM EVENTS ARE FULLY CONFIGURED & SECURE.",
    "TAP MY QUANTUM CORE SENSOR TO TRIGGER THE SPECIAL AI DESIGN MAGIC!"
  ];

  const MAGIC_PARTICLES = [
    { id: 1, angle: 0, delay: 0, color: "text-cyan-400" },
    { id: 2, angle: 30, delay: 0.08, color: "text-purple-400" },
    { id: 3, angle: 60, delay: 0.04, color: "text-yellow-400" },
    { id: 4, angle: 90, delay: 0.12, color: "text-cyan-300" },
    { id: 5, angle: 120, delay: 0.06, color: "text-purple-300" },
    { id: 6, angle: 150, delay: 0.1, color: "text-blue-400" },
    { id: 7, angle: 180, delay: 0.02, color: "text-yellow-300" },
    { id: 8, angle: 210, delay: 0.14, color: "text-emerald-400" },
    { id: 9, angle: 240, delay: 0.05, color: "text-cyan-400" },
    { id: 10, angle: 270, delay: 0.11, color: "text-purple-500" },
    { id: 11, angle: 300, delay: 0.07, color: "text-yellow-500" },
    { id: 12, angle: 330, delay: 0.13, color: "text-cyan-500" },
  ];

  useEffect(() => {
    if (!isLoaded || accessGranted) return;
    const interval = setInterval(() => {
      setDialogueIndex((prev) => (prev + 1) % ROBOT_DIALOGUES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isLoaded, accessGranted]);

  // Simulate premium quantum loading
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const step = Math.floor(Math.random() * 8) + 4;
      current = Math.min(100, current + step);
      setLoadingProgress(current);
      onChargeProgress(current);

      if (current === 100) {
        clearInterval(interval);
        setTimeout(() => setIsLoaded(true), 600);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onChargeProgress]);

  const speakWelcome = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Welcome to Inteleza 2k26");
      utterance.pitch = 1.0;
      utterance.rate = 0.95;
      utterance.volume = 1.0;

      const speak = () => {
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => 
          v.name.includes("Google US English") || 
          v.name.includes("Microsoft David") || 
          v.lang.includes("en-US") || 
          v.lang.includes("en-GB")
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          speak();
          window.speechSynthesis.onvoiceschanged = null;
        };
      } else {
        speak();
      }
    }
  };

  useEffect(() => {
    if (isLoaded) {
      // Trigger the high-tech robotic voice welcome greeting
      speakWelcome();
    }
  }, [isLoaded]);

  const handleSlamWatch = () => {
    if (isWarping || isSlammed) return;
    setIsSlammed(true);
    setAccessGranted(true);
    setTimeout(() => {
      onEnter();
    }, 950); // Timing matches perfectly with the shockwave expansion
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 md:px-6 py-8 md:py-12 select-none overflow-hidden bg-black z-50">
      {/* Cinematic emerald/cyan grid overlay and volumetric lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(2,8,13,0.96))] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* TOP HEADER BAR */}
      <div className="relative w-full max-w-7xl flex justify-between items-center z-10 px-2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Compass className="w-4 h-4 text-white animate-spin-slow" />
          </div>
          <span className="font-sans font-bold tracking-widest text-xs md:text-sm bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
            INTELEZA '26 ENTRY
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center gap-4 text-[10px] md:text-xs font-mono text-cyan-400"
        >
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            CORE: ONLINE
          </span>
        </motion.div>
      </div>

      {/* CORE LOADING CHAMBER */}
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col justify-center items-center w-full max-w-md z-10 px-4"
          >
            {/* Spinning cyan matrix rings around a central power icon */}
            <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-double border-blue-500/40"
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute w-12 h-12 rounded-full bg-cyan-500/10 blur-xl"
              />
              <Zap className="w-8 h-8 text-cyan-400 animate-pulse relative z-10" />
            </div>

            {/* Status indicator */}
            <h2 className="text-[10px] md:text-xs font-mono tracking-widest text-cyan-400/80 uppercase mb-3 text-center">
              Calibrating Data Portal Core
            </h2>

            {/* Glowing glass slider */}
            <div className="w-full h-2 rounded-full bg-slate-900 border border-cyan-500/15 overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.05)]">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-400 to-purple-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Loading text percentage */}
            <span className="text-lg md:text-xl font-mono text-cyan-300 font-bold mt-4 tracking-wider">
              {loadingProgress}%
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="gateway-welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 flex flex-col justify-center items-center text-center z-10 w-full max-w-4xl px-4 mt-4 md:mt-0"
          >
            {/* LOGO AND TITLE */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative mb-4 md:mb-6 flex flex-col items-center justify-center"
            >
              <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full opacity-10 blur-3xl animate-pulse" />

              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex flex-col items-center gap-2 mb-4"
              >
                <div className="px-5 py-1.5 rounded-full bg-purple-950/45 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <span className="text-[10px] md:text-xs font-mono font-black tracking-[0.3em] text-purple-300 uppercase block">
                    INNOVISION ASSOCIATION
                  </span>
                </div>
                <h2 className="text-sm md:text-lg font-sans font-extrabold tracking-[0.2em] text-cyan-400 uppercase text-center max-w-2xl leading-relaxed drop-shadow-[0_2px_10px_rgba(6,182,212,0.25)]">
                  DEPARTMENT OF ARTIFICIAL INTELLIGENCE & DATA SCIENCE
                </h2>
              </motion.div>

              <motion.h1
                initial={{ letterSpacing: "0.12em", opacity: 0 }}
                animate={{ letterSpacing: "0.22em", opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="text-4xl md:text-8xl font-black font-sans text-white uppercase tracking-widest drop-shadow-[0_0_40px_rgba(6,182,212,0.4)] mt-1 mb-3"
              >
                inteleza <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent font-mono text-3xl md:text-6xl align-super font-black shadow-glow">'26</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-slate-400 text-[10px] md:text-xs tracking-[0.25em] font-mono font-light max-w-xl leading-relaxed uppercase border-t border-white/5 pt-3"
              >
                THE GATEWAY TO INFINITY • STATE-LEVEL TECHNICAL SYMPOSIUM
              </motion.p>
            </motion.div>

            {/* STUNNING CLASSY ROBOT WELCOMING INTERFACE */}
            <div className="flex flex-col items-center justify-center w-full max-w-xl my-4 md:my-6 p-5 md:p-8 rounded-3xl bg-slate-950/70 border border-cyan-500/15 backdrop-blur-3xl shadow-[0_0_50px_rgba(6,182,212,0.1)] relative overflow-hidden">
              {/* Outer decorative tech corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/40" />
              
              {/* Hologram Chamber Ambient Light */}
              <div className="absolute top-4 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

              {/* 1. CLASSY SINGLE ROBOT VISUALIZER & EXCLUSIVELY CLICKABLE TRIGGER */}
              <div className="relative flex flex-col items-center justify-center my-4 md:my-6 w-full">
                
                {/* Sonic expansion shockwave on click */}
                {isSlammed && (
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0.9, borderWidth: "8px" }}
                    animate={{ scale: 4.8, opacity: 0, borderWidth: "1px" }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="absolute w-32 h-32 md:w-36 md:h-36 rounded-full border border-cyan-400 z-20 pointer-events-none"
                  />
                )}

                {/* Additional purple high-energy magic expansion ring */}
                {isSlammed && (
                  <motion.div
                    initial={{ scale: 0.2, opacity: 1, rotate: 0 }}
                    animate={{ scale: 3.8, opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute w-32 h-32 md:w-36 md:h-36 rounded-full border border-dashed border-purple-500 z-20 pointer-events-none"
                  />
                )}

                {/* Magic explosion sparks shooting outwards 360-degrees */}
                {isSlammed && MAGIC_PARTICLES.map((p) => {
                  const rad = (p.angle * Math.PI) / 180;
                  const travelDistance = window.innerWidth < 768 ? 140 : 230;
                  const targetX = Math.cos(rad) * travelDistance;
                  const targetY = Math.sin(rad) * travelDistance;
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                      animate={{ 
                        x: targetX, 
                        y: targetY, 
                        opacity: [1, 1, 0], 
                        scale: [0.5, 1.5, 0],
                        rotate: [0, p.angle * 2.5]
                      }}
                      transition={{ 
                        duration: 0.95, 
                        delay: p.delay, 
                        ease: "easeOut" 
                      }}
                      className={`absolute z-30 pointer-events-none ${p.color}`}
                    >
                      {p.id % 3 === 0 ? (
                        <Sparkles className="w-5 h-5 drop-shadow-[0_0_8px_currentColor]" />
                      ) : p.id % 3 === 1 ? (
                        <span className="font-mono text-[9px] md:text-xs font-black tracking-widest drop-shadow-[0_0_6px_currentColor]">{"{AI}"}</span>
                      ) : (
                        <Bot className="w-4 h-4 drop-shadow-[0_0_6px_currentColor]" />
                      )}
                    </motion.div>
                  );
                })}

                {/* The Interactive Robot Body itself */}
                <motion.div
                  animate={isSlammed ? { 
                    scale: [1, 1.25, 0.75, 0], 
                    rotate: [0, -15, 30, -360],
                    opacity: [1, 1, 0.8, 0]
                  } : { 
                    y: [0, -6, 0],
                    scale: isHovered ? 1.05 : 1
                  }}
                  transition={isSlammed ? { duration: 0.95, ease: "easeInOut" } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 cursor-pointer flex flex-col items-center bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-md rounded-full p-4 md:p-6 border border-cyan-500/10 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] transition-all duration-300"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={handleSlamWatch}
                >
                  {/* Robot SVG - Fully responsive using tailwind sizing */}
                  <svg className="w-24 h-24 md:w-36 md:h-36 drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]" viewBox="0 0 200 200">
                    <defs>
                      <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0b1528" />
                        <stop offset="50%" stopColor="#050a14" />
                        <stop offset="100%" stopColor="#020408" />
                      </linearGradient>
                      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#020617" />
                        <stop offset="50%" stopColor="#082f49" />
                        <stop offset="100%" stopColor="#020617" />
                      </linearGradient>
                      <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Outer Orbit / Digital Matrix Rings */}
                    <circle cx="100" cy="100" r="92" stroke="rgba(6,182,212,0.1)" strokeWidth="1" strokeDasharray="3 4" />
                    <circle cx="100" cy="100" r="82" stroke="rgba(168,85,247,0.15)" strokeWidth="1.5" strokeDasharray="15 6" className="animate-spin-slow" />
                    <circle cx="100" cy="100" r="72" stroke="rgba(234,179,8,0.12)" strokeWidth="1" strokeDasharray="6 30" className="animate-spin-reverse" />

                    {/* Floating Mech Shoulder Guards / Collar */}
                    <path d="M 45,160 Q 100,185 155,160 L 140,185 Q 100,195 60,185 Z" fill="url(#chassisGrad)" stroke="rgba(168,85,247,0.25)" strokeWidth="1.5" />
                    <path d="M 65,155 Q 100,165 135,155 L 125,162 Q 100,168 75,162 Z" fill="#0c4a6e" opacity="0.6" />

                    {/* High-tech Mech Neck joints */}
                    <rect x="88" y="132" width="24" height="24" rx="4" fill="#0f172a" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" />
                    <line x1="94" y1="138" x2="106" y2="138" stroke="#22d3ee" strokeWidth="1.5" />
                    <line x1="94" y1="144" x2="106" y2="144" stroke="#eab308" strokeWidth="1.5" />

                    {/* Floating Jet-ears / Quantum Nodes */}
                    <path d="M 24,80 C 24,80 14,92 14,102 C 14,112 24,120 24,120 Z" fill="url(#chassisGrad)" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" />
                    <circle cx="19" cy="100" r="3" fill="#22d3ee" className="animate-pulse" />
                    
                    <path d="M 176,80 C 176,80 186,92 186,102 C 186,112 176,120 176,120 Z" fill="url(#chassisGrad)" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" />
                    <circle cx="181" cy="100" r="3" fill="#22d3ee" className="animate-pulse" />

                    {/* Golden Antenna Mast */}
                    <line x1="100" y1="45" x2="100" y2="15" stroke="#eab308" strokeWidth="2.5" />
                    <circle cx="100" cy="15" r="5" fill="#eab308" className="animate-ping" style={{ animationDuration: '2s' }} />
                    <circle cx="100" cy="15" r="4" fill="#eab308" />

                    {/* Main Robot Chassis Head */}
                    <rect x="36" y="42" width="128" height="96" rx="48" fill="url(#chassisGrad)" stroke="rgba(6,182,212,0.35)" strokeWidth="2" />
                    
                    {/* Glowing Internal Neural Brain Structure */}
                    <ellipse cx="100" cy="58" rx="28" ry="12" fill="url(#brainGlow)" />
                    {/* Neural nodes inside head (connecting back to neural theme) */}
                    <g opacity="0.85">
                      <line x1="88" y1="58" x2="100" y2="52" stroke="#a855f7" strokeWidth="1" />
                      <line x1="100" y1="52" x2="112" y2="58" stroke="#a855f7" strokeWidth="1" />
                      <line x1="88" y1="58" x2="100" y2="64" stroke="#a855f7" strokeWidth="1" />
                      <line x1="100" y1="64" x2="112" y2="58" stroke="#a855f7" strokeWidth="1" />
                      <line x1="100" y1="52" x2="100" y2="64" stroke="#a855f7" strokeWidth="0.8" />
                      
                      <circle cx="88" cy="58" r="2.5" fill="#22d3ee" />
                      <circle cx="100" cy="52" r="2.5" fill="#a855f7" />
                      <circle cx="112" cy="58" r="2.5" fill="#22d3ee" />
                      <circle cx="100" cy="64" r="2.5" fill="#eab308" />
                    </g>

                    {/* High-Contrast Cyber Visor Screen */}
                    <rect x="48" y="74" width="104" height="46" rx="18" fill="url(#visorGrad)" stroke="#06b6d4" strokeWidth="1.75" />

                    {/* Tactical Grid Overlay inside visor */}
                    <line x1="48" y1="88" x2="152" y2="88" stroke="rgba(6,182,212,0.12)" strokeWidth="1" />
                    <line x1="48" y1="97" x2="152" y2="97" stroke="rgba(6,182,212,0.12)" strokeWidth="1" />
                    <line x1="48" y1="106" x2="152" y2="106" stroke="rgba(6,182,212,0.12)" strokeWidth="1" />
                    <line x1="74" y1="74" x2="74" y2="120" stroke="rgba(6,182,212,0.12)" strokeWidth="1" />
                    <line x1="100" y1="74" x2="100" y2="120" stroke="rgba(6,182,212,0.12)" strokeWidth="1" />
                    <line x1="126" y1="74" x2="126" y2="120" stroke="rgba(6,182,212,0.12)" strokeWidth="1" />

                    {/* Scanning Matrix bar */}
                    <motion.line 
                      x1="52" 
                      y1="78" 
                      x2="148" 
                      y2="78" 
                      stroke="#22d3ee" 
                      strokeWidth="2" 
                      opacity="0.8"
                      animate={{ y: [0, 36, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Custom interactive opti-electronic eye modules */}
                    {isHovered ? (
                      <>
                        {/* Analysis Matrix View - Target lock eyes on hover */}
                        <path d="M 68,97 L 76,91 L 84,97 L 76,103 Z" fill="none" stroke="#eab308" strokeWidth="2" className="drop-shadow-[0_0_5px_#eab308]" />
                        <circle cx="76" cy="97" r="1.5" fill="#ffffff" />

                        <path d="M 116,97 L 124,91 L 132,97 L 124,103 Z" fill="none" stroke="#eab308" strokeWidth="2" className="drop-shadow-[0_0_5px_#eab308]" />
                        <circle cx="124" cy="97" r="1.5" fill="#ffffff" />
                        
                        {/* HUD calibration markers */}
                        <rect x="94" y="94" width="12" height="6" rx="1" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.7" />
                      </>
                    ) : (
                      <>
                        {/* Deep Cyber Cyan Optic Cores */}
                        <circle cx="76" cy="97" r="7" fill="#020617" stroke="#22d3ee" strokeWidth="2" />
                        <circle cx="76" cy="97" r="3.5" fill="#22d3ee" className="drop-shadow-[0_0_4px_#22d3ee]" />
                        <circle cx="74" cy="95" r="1" fill="#ffffff" />

                        <circle cx="124" cy="97" r="7" fill="#020617" stroke="#22d3ee" strokeWidth="2" />
                        <circle cx="124" cy="97" r="3.5" fill="#22d3ee" className="drop-shadow-[0_0_4px_#22d3ee]" />
                        <circle cx="122" cy="95" r="1" fill="#ffffff" />
                      </>
                    )}

                    {/* Cheek ventilation and plate patterns */}
                    <rect x="52" y="121" width="12" height="4" rx="1" fill="#0c4a6e" opacity="0.6" />
                    <rect x="136" y="121" width="12" height="4" rx="1" fill="#0c4a6e" opacity="0.6" />
                  </svg>

                  {/* Cyber Acoustic Soundwave Level Indicator */}
                  <div className="flex gap-1 items-center justify-center mt-3 h-4">
                    {[...Array(9)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: isHovered ? [4, 16, 4] : [4, 10, 4] }}
                        transition={{
                          duration: 0.5 + (i * 0.12),
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className={`w-1 rounded-full ${i % 2 === 0 ? "bg-cyan-400" : "bg-purple-500"} opacity-70`}
                        style={{ height: "6px" }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Dynamic Call-To-Action Indicator */}
              {accessGranted && (
                <div className="z-10 mt-1 mb-4 text-center">
                  <span className="text-[10px] md:text-xs font-mono text-cyan-400 uppercase tracking-[0.25em] animate-pulse font-semibold">
                    ⚡ SYNAPSE CONNECTION ESTABLISHED ⚡
                  </span>
                </div>
              )}

              {/* 2. CLASSY AI DIALOGUE TERMINAL */}
              <div className="w-full mt-2 px-4 py-3 rounded-xl bg-slate-900/80 border border-cyan-500/10 flex items-start gap-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-pulse" />
                <Terminal className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 text-left">
                  <span className="text-[8px] font-mono text-cyan-500/80 uppercase block tracking-widest font-semibold mb-1">
                    [INTELEZA-CORE ASSISTANT TERMINAL]
                  </span>
                  <div className="min-h-[36px] flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={accessGranted ? "granted" : dialogueIndex}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 6 }}
                        transition={{ duration: 0.3 }}
                        className="text-[11px] font-mono text-slate-200 leading-normal"
                      >
                        {accessGranted 
                          ? "ACCESS GRANTED! SYNAPSE CONVERGENCE DETECTED. COMMENCING DIGITAL TRANSFORMATION REALIGNMENT IN 3... 2... 1..." 
                          : ROBOT_DIALOGUES[dialogueIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
                {/* Little pulsing indicator to indicate text typing/ready */}
                <span className="w-1.5 h-3 bg-cyan-400 animate-pulse mt-4" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER METRICS AND METADATA */}
      <div className="relative w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 border-t border-cyan-500/10 pt-6 z-10 text-[10px] font-mono text-slate-500 tracking-wider text-center md:text-left">
        <span>© 2026 INNOVISION ASSOCIATION • DEPARTMENT OF AI & DS.</span>
        <div className="flex gap-4">
          <span>PORTAL_LOCK: ACTIVE_STABLE</span>
          <span>SYSTEMS_DENSITY: OPTIMAL</span>
        </div>
      </div>

      {/* CINEMATIC FLASH TO WARP THROUGH THE GATE */}
      {isWarping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, times: [0, 0.4, 0.6, 1] }}
          className="fixed inset-0 bg-cyan-500 z-50 pointer-events-none flex items-center justify-center"
        >
          <div className="text-black text-sm md:text-2xl font-mono font-black tracking-[0.3em] uppercase animate-pulse text-center px-4">
            INITIALIZING INTELEZA '26 INTERFACE...
          </div>
        </motion.div>
      )}
    </div>
  );
};

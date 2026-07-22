import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Rocket,
  Code,
  Cpu,
  Bug,
  HelpCircle,
  Sparkles,
  Camera,
  Gamepad2,
  Map as MapIcon,
  Share2,
  Smile,
  X,
  Clock,
  MapPin,
  Trophy,
  User,
  Phone,
  Layers,
  Sparkle
} from "lucide-react";
import { EVENTS } from "../data";
import { EventDetail } from "../types";

// Icon lookup dictionary
const IconRenderer: React.FC<{ iconName: string; className?: string }> = ({ iconName, className }) => {
  switch (iconName) {
    case "FileText":
      return <FileText className={className} />;
    case "Rocket":
      return <Rocket className={className} />;
    case "Code":
      return <Code className={className} />;
    case "Cpu":
      return <Cpu className={className} />;
    case "BugPlay":
    case "Bug":
      return <Bug className={className} />;
    case "HelpCircle":
      return <HelpCircle className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Camera":
      return <Camera className={className} />;
    case "Gamepad2":
      return <Gamepad2 className={className} />;
    case "Map":
      return <MapIcon className={className} />;
    case "Share2":
      return <Share2 className={className} />;
    case "Smile":
      return <Smile className={className} />;
    default:
      return <Layers className={className} />;
  }
};

// Synthesizer audio engine
const playSound = (type: "click" | "success" | "laser" | "level") => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    const now = audioCtx.currentTime;
    
    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "success") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === "laser") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.12);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "level") {
      osc.type = "square";
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.25);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (e) {
    // Web audio not supported/blocked
  }
};

const EventSandboxWidget: React.FC<{ eventId: string }> = ({ eventId }) => {
  // Widget states
  const [solved, setSolved] = useState(false);
  const [errorText, setErrorText] = useState("");

  // Code Quest State
  const [codeFix1, setCodeFix1] = useState(false); // add colon
  const [codeFix2, setCodeFix2] = useState(false); // double equals

  // Meme Mania State
  const [memeTemplate, setMemeTemplate] = useState(0);
  const [topText, setTopText] = useState("When the code compiles");
  const [bottomText, setBottomText] = useState("but you have no idea why");

  // Tick Tock State
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameTime, setGameTime] = useState(10);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });

  // Papetrix State
  const [selectedDomain, setSelectedDomain] = useState("Artificial Intelligence");
  const [generatedPaper, setGeneratedPaper] = useState<{ title: string; abstract: string } | null>(null);

  const handleCodeQuestCompile = () => {
    playSound("click");
    if (codeFix1 && codeFix2) {
      playSound("success");
      setSolved(true);
      setErrorText("");
    } else {
      playSound("laser");
      setErrorText("SyntaxError: Compilation Failed at line " + (!codeFix1 ? "3: missing ':'" : "4: expected evaluation '==' instead of assignment '='"));
    }
  };

  const generateMemeDraft = () => {
    playSound("level");
    const templates = [
      { top: "Department IT and AIDS Students", bottom: "Creating legendary memes in under 25 minutes!" },
      { top: "My paper presentation slide #3", bottom: "Is just a giant diagram of a neural network I can't explain" },
      { top: "Me solving the sudden death tiebreaker", bottom: "using custom quicksort on paper" }
    ];
    setTopText(templates[memeTemplate].top);
    setBottomText(templates[memeTemplate].bottom);
    setSolved(true);
  };

  const handleStartTickTock = () => {
    playSound("level");
    setScore(0);
    setGameTime(10);
    setGameStarted(true);
    setSolved(false);
    setTargetPos({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 });
  };

  // Tick Tock timer
  React.useEffect(() => {
    if (!gameStarted) return;
    if (gameTime <= 0) {
      setGameStarted(false);
      if (score >= 10) {
        playSound("success");
        setSolved(true);
      } else {
        playSound("laser");
      }
      return;
    }
    const timer = setTimeout(() => {
      setGameTime(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [gameTime, gameStarted, score]);

  const handleTargetClick = () => {
    if (!gameStarted) return;
    playSound("laser");
    const nextScore = score + 1;
    setScore(nextScore);
    if (nextScore >= 10) {
      setGameStarted(false);
      playSound("success");
      setSolved(true);
    } else {
      setTargetPos({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 });
    }
  };

  const handlePapetrixGenerate = () => {
    playSound("success");
    const prefixes = ["Quantum", "Hyper-Dimensional", "Autonomous", "Decentralized", "Heuristic", "Neuromorphic"];
    const mid = ["Machine Learning Protocols", "Data Mining Systems", "Cyber-Defense Vectors", "IoT Telemetry Matrices", "Blockchain Consensus Layers"];
    const suffix = ["for Emerging Galactic Networks", "with Self-Correcting Error Control", "in High-Octane Cloud Environments", "Optimizing Resource Schedulers"];

    const chosenTitle = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${mid[Math.floor(Math.random() * mid.length)]} ${suffix[Math.floor(Math.random() * suffix.length)]}`;
    const chosenAbstract = `This paper introduces a pristine high-performance architecture tailored for ${selectedDomain} fields. By combining modern topological layouts and secure consensus logic, our results yield a 42% throughput enhancement over traditional standard structures under peak system congestion.`;

    setGeneratedPaper({ title: chosenTitle, abstract: chosenAbstract });
    setSolved(true);
  };

  if (eventId === "code-quest") {
    return (
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-cyan-500/20 shadow-inner">
        <h4 className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 flex items-center gap-1.5">
          <Bug className="w-4 h-4 text-cyan-400" />
          SANDBOX INTERACTIVE PRACTICE (CODE QUEST)
        </h4>
        <p className="text-xs text-slate-400 mb-4 font-light">
          Find and resolve the 2 syntax and assignment bugs in this live Python snippet to compile!
        </p>

        {/* Code Block Display */}
        <div className="bg-black/80 rounded-xl p-4 border border-white/5 font-mono text-xs text-emerald-400 leading-relaxed mb-4 relative">
          <div className="absolute top-2 right-2 text-[8px] tracking-widest text-slate-500">PYTHON_CORE</div>
          <div>1: <span className="text-pink-400">def</span> <span className="text-blue-400">find_even</span>(numbers):</div>
          <div>2: &nbsp;&nbsp;&nbsp;&nbsp;evens = []</div>
          <div>
            3: &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">for</span> num <span className="text-pink-400">in</span> numbers
            <span className={codeFix1 ? "text-emerald-400 font-bold" : "bg-red-950/60 text-red-400 px-1 rounded animate-pulse"}>
              {codeFix1 ? ":" : " "}
            </span>
          </div>
          <div>
            4: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">if</span> num % 2 
            <span className={codeFix2 ? "text-emerald-400 font-bold" : "bg-red-950/60 text-red-400 px-1 rounded animate-pulse"}>
              {codeFix2 ? " == " : " = "}
            </span>
            0:
          </div>
          <div>5: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;evens.append(num)</div>
          <div>6: &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">return</span> evens</div>
        </div>

        {/* Control buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => { playSound("click"); setCodeFix1(!codeFix1); }}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
              codeFix1 
                ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" 
                : "bg-slate-950 border-white/10 text-slate-400 hover:border-cyan-500/30"
            }`}
          >
            {codeFix1 ? "✓ Line 3: Fixed (:)" : "Fix Line 3 (Add :)"}
          </button>
          <button
            onClick={() => { playSound("click"); setCodeFix2(!codeFix2); }}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
              codeFix2 
                ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" 
                : "bg-slate-950 border-white/10 text-slate-400 hover:border-cyan-500/30"
            }`}
          >
            {codeFix2 ? "✓ Line 4: Fixed (==)" : "Fix Line 4 (Change = to ==)"}
          </button>
        </div>

        {/* Compile output / feedback */}
        {errorText && (
          <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl font-mono text-[10px] text-red-400 mb-4">
            {errorText}
          </div>
        )}

        {solved ? (
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-center">
            <span className="text-emerald-400 font-sans text-xs font-bold block mb-1">
              🎉 COMPILATION SUCCESSFUL!
            </span>
            <span className="text-[10px] font-mono text-slate-400 block">
              Output: [2, 4, 6] • You are fully prepared to outspeed rivals in Code Quest!
            </span>
          </div>
        ) : (
          <button
            onClick={handleCodeQuestCompile}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-400 hover:to-blue-500 border border-cyan-400/30 text-white hover:text-black font-mono text-xs font-bold uppercase transition-all duration-300 shadow-md"
          >
            COMPILE & TEST SUITE
          </button>
        )}
      </div>
    );
  }

  if (eventId === "meme-mania") {
    return (
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/20 shadow-inner">
        <h4 className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-3 flex items-center gap-1.5">
          <Smile className="w-4 h-4 text-purple-400" />
          SANDBOX LIVE MEME GENERATOR (MEME MANIA)
        </h4>
        <p className="text-xs text-slate-400 mb-4 font-light">
          Type custom developer text to craft a hilarious template draft!
        </p>

        {/* Input Text Form */}
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map(idx => (
              <button
                key={idx}
                onClick={() => { playSound("click"); setMemeTemplate(idx); }}
                className={`py-1 rounded-lg border text-[9px] font-mono transition-all ${
                  memeTemplate === idx 
                    ? "bg-purple-950/40 border-purple-500/40 text-purple-300" 
                    : "bg-black/40 border-white/5 text-slate-400 hover:border-purple-500/20"
                }`}
              >
                Draft Preset {idx + 1}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[8px] font-mono uppercase text-slate-500 mb-1">Top Headline</label>
              <input
                type="text"
                value={topText}
                onChange={(e) => { setTopText(e.target.value); setSolved(true); }}
                className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-xs font-sans text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-[8px] font-mono uppercase text-slate-500 mb-1">Bottom Punchline</label>
              <input
                type="text"
                value={bottomText}
                onChange={(e) => { setBottomText(e.target.value); setSolved(true); }}
                className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-xs font-sans text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Meme Canvas Preview */}
        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-950 to-slate-900 p-6 min-h-[160px] flex flex-col justify-between items-center text-center">
          {/* Custom Meme Background Graphic styling */}
          <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80')" }} />
          <div className="absolute top-2 left-2 text-[8px] font-mono text-purple-500/50">PREVIEW_CANVAS_07</div>
          
          <div className="z-10 font-sans font-black text-white text-sm uppercase tracking-wide px-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] max-w-sm">
            {topText || "INSERT TOP STATEMENT"}
          </div>

          {/* Dummy center character profile */}
          <div className="w-16 h-16 rounded-full border border-purple-500/20 bg-purple-950/30 flex items-center justify-center my-3 relative overflow-hidden">
            <span className="text-2xl font-mono">🤖</span>
            <div className="absolute bottom-0 w-full bg-purple-500/30 text-[8px] text-center font-mono">AIDS_BOT</div>
          </div>

          <div className="z-10 font-sans font-black text-yellow-300 text-xs tracking-wide px-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] max-w-sm">
            {bottomText || "INSERT BOTTOM STATEMENT"}
          </div>
        </div>

        <button
          onClick={generateMemeDraft}
          className="w-full py-2.5 mt-4 rounded-xl bg-purple-950/40 hover:bg-purple-950/80 border border-purple-500/30 text-purple-300 hover:text-white font-mono text-xs font-bold uppercase transition-all duration-300"
        >
          LOAD FUNNY TECH MOTIF PRESET
        </button>
      </div>
    );
  }

  if (eventId === "tick-tock") {
    return (
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/20 shadow-inner">
        <h4 className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-3 flex items-center gap-1.5">
          <Gamepad2 className="w-4 h-4 text-purple-400" />
          SANDBOX MINUTE CHALLENGE SIMULATOR (TICK TOCK)
        </h4>
        <p className="text-xs text-slate-400 mb-4 font-light">
          Test your cognitive focus! Rapidly click the shifting target 10 times before the 10-second timer hits zero!
        </p>

        {/* Gameplay Arena */}
        <div className="relative rounded-xl border border-white/5 bg-black h-48 overflow-hidden">
          {!gameStarted ? (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
              {solved ? (
                <div className="space-y-2">
                  <Trophy className="w-8 h-8 text-yellow-400 mx-auto animate-bounce" />
                  <div className="text-emerald-400 font-bold text-xs">CHALLENGE CLEARED IN TIME!</div>
                  <div className="text-[10px] text-slate-400">Excellent reflexes. You are certified for Tick Tock!</div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Gamepad2 className="w-8 h-8 text-purple-400 mx-auto animate-pulse" />
                  <button
                    onClick={handleStartTickTock}
                    className="px-4 py-2 rounded-lg bg-purple-500 text-white font-mono text-xs font-bold uppercase hover:bg-purple-400 transition-all shadow-md"
                  >
                    START REFLEX TRIAL
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Timing HUD overlay */}
              <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                <span>Score: <strong className="text-purple-400">{score}/10</strong></span>
                <span>•</span>
                <span>Time Left: <strong className="text-red-400">{gameTime}s</strong></span>
              </div>

              {/* Grid backdrop */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-5 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="border border-white" />
                ))}
              </div>

              {/* Shifting target click point */}
              <button
                onClick={handleTargetClick}
                className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600 border-2 border-yellow-300 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (eventId === "papetrix") {
    return (
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-cyan-500/20 shadow-inner">
        <h4 className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3 flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-cyan-400" />
          SANDBOX PAPER BLUEPRINT GENERATOR (PAPETRIX)
        </h4>
        <p className="text-xs text-slate-400 mb-4 font-light">
          Choose an advanced technology category to synthesize a pristine research outline instantly!
        </p>

        {/* Topic dropdown */}
        <div className="flex gap-2.5 mb-4">
          <select
            value={selectedDomain}
            onChange={(e) => { playSound("click"); setSelectedDomain(e.target.value); }}
            className="flex-1 bg-black/60 border border-white/10 rounded-lg p-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="Artificial Intelligence">Artificial Intelligence & Data Science</option>
            <option value="Cybersecurity">Advanced Cybersecurity & Blockchain</option>
            <option value="Information Technology">Information Tech & Cloud Systems</option>
            <option value="IoT & Sensors">IoT & Emerging Tech</option>
          </select>

          <button
            onClick={handlePapetrixGenerate}
            className="px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-sans font-extrabold text-xs uppercase tracking-wider transition-all"
          >
            Synthesize
          </button>
        </div>

        {/* Result rendering */}
        {generatedPaper && (
          <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-cyan-500/20 font-sans text-xs">
            <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1.5">
              <Sparkle className="w-3 h-3 animate-spin" />
              SYNTHESIZED BLUEPRINT SCHEMATIC
            </div>
            
            <div>
              <strong className="text-slate-200 block text-sm uppercase tracking-wide leading-tight">
                {generatedPaper.title}
              </strong>
            </div>

            <div className="text-slate-400 font-light leading-relaxed pl-2 border-l-2 border-cyan-500/30">
              <strong className="text-cyan-300 font-mono text-[10px] block mb-0.5">ABSTRACT BRIEF:</strong>
              {generatedPaper.abstract}
            </div>

            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-500 pt-2 border-t border-white/5">
              <div>📄 Format: IEEE Double-Column</div>
              <div>📊 Presentation slides: 8 slides</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

interface EventsSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<"Technical" | "Non-Technical">("Technical");
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);

  const filteredEvents = EVENTS.filter((e) => e.category === activeTab);

  return (
    <section id="events" className="relative min-h-screen py-24 px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto z-10">
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-mono tracking-[0.25em] text-xs uppercase font-semibold block mb-2">
            CHALLENGE DECK
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-sans uppercase tracking-tight text-white">
            SYMPOSIUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">EVENTS</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-sans font-light mt-4 max-w-xl mx-auto leading-relaxed">
            Enter the logical chambers of cognitive engineering or the cosmic arenas of creativity. Select your vector and dominate.
          </p>
        </div>

        {/* EVENTS LIST GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">

          {/* EVENTS LIST & FILTERS (FULL WIDTH) */}
          <div className="lg:col-span-12 space-y-6">
            {/* TABS SELECTOR */}
            <div className="flex justify-center">
              <div className="inline-flex p-1 rounded-full bg-slate-950/60 border border-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
                <button
                  onClick={() => { playSound("level"); setActiveTab("Technical"); }}
                  className={`px-6 py-2 rounded-full font-sans font-bold text-[10px] tracking-widest uppercase transition-all duration-300 ${
                    activeTab === "Technical"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                  id="tab-technical"
                >
                  TECHNICAL EVENT
                </button>
                <button
                  onClick={() => { playSound("level"); setActiveTab("Non-Technical"); }}
                  className={`px-6 py-2 rounded-full font-sans font-bold text-[10px] tracking-widest uppercase transition-all duration-300 ${
                    activeTab === "Non-Technical"
                      ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                  id="tab-non-technical"
                >
                  NON TECHNICAL EVENT
                </button>
              </div>
            </div>

            {/* EVENTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredEvents.map((event) => (
                <motion.div
                  layout
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => { playSound("click"); setSelectedEvent(event); }}
                  className="group relative cursor-pointer rounded-2xl bg-slate-950/40 border border-white/5 p-6 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:border-cyan-500/20 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card glowing light trail overlay */}
                  <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none -z-10 ${
                    activeTab === "Technical" ? "from-cyan-500/20 to-blue-500/20" : "from-purple-500/20 to-yellow-500/10"
                  }`} />

                  <div>
                    {/* Event Category Flag & Icon */}
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2.5 rounded-xl border ${
                        activeTab === "Technical"
                          ? "bg-cyan-950/30 border-cyan-400/20 text-cyan-400"
                          : "bg-purple-950/30 border-purple-400/20 text-purple-400"
                      }`}>
                        <IconRenderer iconName={event.icon} className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest font-bold text-slate-500 border border-white/5 px-2 py-0.5 rounded-md">
                        {event.category.toUpperCase()}_UNIT
                      </span>
                    </div>

                    {/* Event Title & Subheading */}
                    <h3 className="text-lg font-bold font-sans text-white group-hover:text-cyan-300 transition-colors duration-300 mb-1 tracking-wide uppercase">
                      {event.title}
                    </h3>
                    <p className="text-slate-400 font-sans font-light text-xs leading-relaxed">
                      {event.tagline}
                    </p>
                  </div>

                  {/* Card CTA indicators on bottom */}
                  <div className="mt-6 pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <Sparkle className="w-3 h-3 text-cyan-400" />
                      {event.venue.split(" (")[0]}
                    </span>
                    <span className={`group-hover:text-white group-hover:underline transition-all duration-300 ${
                      activeTab === "Technical" ? "text-cyan-400" : "text-purple-400"
                    }`}>
                      ACCESS SPECS →
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* DETAILED GLASSMORPHIC POPUP MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { playSound("click"); setSelectedEvent(null); }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal body container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-slate-950/85 border border-cyan-500/20 backdrop-blur-2xl p-6 md:p-8 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] max-h-[85vh] overflow-y-auto"
            >
              {/* Corner HUD decorations */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-cyan-400/40 rounded-tl-xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cyan-400/40 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-cyan-400/40 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-cyan-400/40 rounded-br-xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => { playSound("click"); setSelectedEvent(null); }}
                className="absolute top-4 right-4 p-2 rounded-full border border-white/5 hover:border-cyan-500/30 text-slate-400 hover:text-white transition-all duration-300"
                id="close-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Category flag */}
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[9px] font-mono font-bold text-cyan-300 tracking-widest uppercase mb-4">
                {selectedEvent.category} • GATE_UNIT_SEC07
              </div>

              {/* Header Title with Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-xl border ${
                  selectedEvent.category === "Technical"
                    ? "bg-cyan-950/30 border-cyan-400/20 text-cyan-400"
                    : "bg-purple-950/30 border-purple-400/20 text-purple-400"
                }`}>
                  <IconRenderer iconName={selectedEvent.icon} className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-sans font-black uppercase text-white tracking-wide">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-xs font-sans text-slate-400 italic">
                    "{selectedEvent.tagline}"
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px] w-full bg-gradient-to-r from-cyan-400/20 via-purple-400/10 to-transparent my-6" />

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
                    01_MISSION_BRIEF
                  </h4>
                  <p className="text-slate-300 font-sans text-sm font-light leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Objective (if defined) */}
                {selectedEvent.objective && (
                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/10">
                    <h4 className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-1.5">
                      <Sparkle className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      02_MISSION_OBJECTIVE
                    </h4>
                    <p className="text-slate-300 font-sans text-xs font-light leading-relaxed">
                      {selectedEvent.objective}
                    </p>
                  </div>
                )}

                {/* Event Format (if defined) */}
                {selectedEvent.format && selectedEvent.format.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">
                      03_CHALLENGE_STAGES
                    </h4>
                    <div className="space-y-3">
                      {selectedEvent.format.map((step, idx) => (
                        <div 
                          key={idx} 
                          className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3 hover:border-purple-500/20 transition-all duration-300"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-950 border border-purple-500/30 text-purple-400 font-mono text-xs font-black flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <p className="text-slate-300 font-sans text-xs font-light leading-relaxed pt-0.5">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Example Game (if defined, like in TICK TOCK) */}
                {selectedEvent.exampleGame && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/30 to-slate-950/60 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.05)]">
                    <h4 className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-3 flex items-center gap-1.5">
                      <Gamepad2 className="w-4 h-4 text-purple-400" />
                      04_CHALLENGE_SAMPLE (EXAMPLE GAME)
                    </h4>
                    <div className="space-y-3 font-sans text-xs">
                      <div className="text-white font-extrabold text-sm uppercase tracking-wide">
                        🎯 Game Name: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-300">{selectedEvent.exampleGame.title}</span>
                      </div>
                      <div className="text-slate-300 font-light leading-relaxed">
                        <strong className="text-purple-300">Objective:</strong> {selectedEvent.exampleGame.objective}
                      </div>
                      <div className="text-slate-300 font-light">
                        <strong className="text-cyan-300">Materials Given:</strong> {selectedEvent.exampleGame.materials}
                      </div>
                      <div className="p-2.5 rounded-xl bg-yellow-400/5 border border-yellow-500/20 text-yellow-300 font-semibold flex items-center gap-2">
                        <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                        <span>Winning Condition: {selectedEvent.exampleGame.winning}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* INTERACTIVE PLAYGROUND TRAINING WIDGET */}
                <EventSandboxWidget eventId={selectedEvent.id} />

                {/* Rules */}
                <div>
                  <h4 className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
                    {selectedEvent.exampleGame ? "05_COGNITIVE_CODELINES (RULES)" : selectedEvent.format ? "04_COGNITIVE_CODELINES (RULES)" : selectedEvent.objective ? "03_COGNITIVE_CODELINES (RULES)" : "02_COGNITIVE_CODELINES (RULES)"}
                  </h4>
                  <ul className="space-y-2">
                    {selectedEvent.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300 font-sans text-xs font-light leading-relaxed">
                        <span className="text-cyan-400 font-bold mt-0.5">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Logistics (Time, Venue, Prize) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-b border-white/5 py-4 my-6">
                  <div className="flex gap-2 items-center">
                    <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 block">TIME_FRAME</span>
                      <span className="text-xs font-sans font-bold text-slate-300">{selectedEvent.time}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 block">COORDS_VENUE</span>
                      <span className="text-xs font-sans font-bold text-slate-300">{selectedEvent.venue}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 block">GRAND_REWARDS</span>
                      <span className="text-xs font-sans font-bold text-yellow-300">{selectedEvent.prizeDetails.split(" | ")[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Coordinators */}
                <div>
                  <h4 className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
                    {selectedEvent.exampleGame ? "06_FACILITATORS_CHAMBER" : selectedEvent.format ? "05_FACILITATORS_CHAMBER" : selectedEvent.objective ? "04_FACILITATORS_CHAMBER" : "03_FACILITATORS_CHAMBER"} (COORDINATORS)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedEvent.coordinators.map((c, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col justify-between gap-3">
                        <div className="flex gap-2.5 items-start">
                          <User className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-sans font-bold text-slate-100 block">{c.name}</span>
                            <span className="text-[9px] font-mono text-cyan-500/80 tracking-wider block mt-0.5 uppercase">{c.role}_COORDINATOR</span>
                          </div>
                        </div>
                        {c.phone ? (
                          <a
                              href={`tel:${c.phone}`}
                              className="w-full flex items-center justify-center gap-2 px-3 py-2 mt-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-400 text-cyan-400 hover:text-black border border-cyan-400/25 hover:border-transparent text-xs font-mono font-bold tracking-wider transition-all duration-300"
                              title={`Dial ${c.name}`}
                          >
                            <Phone className="w-3.5 h-3.5 animate-pulse" />
                            {c.phone}
                          </a>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-500 italic block mt-1 px-1">
                            ☎️ No Direct Ring (Faculty)
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom register drawer block */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">Registration Fee</span>
                  <span className="text-lg font-sans font-black text-white">{selectedEvent.fee}</span>
                </div>

                <button
                  onClick={() => {
                    playSound("success");
                    setSelectedEvent(null);
                    onNavigate("registration");
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full font-sans font-bold tracking-widest text-xs text-black bg-gradient-to-r from-cyan-400 to-blue-500 uppercase hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  PROCEED TO REGISTER
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Phone, Mail, Navigation, Share2, Compass, Cpu, MessageSquare, Instagram, Youtube, MapPin } from "lucide-react";
import { ChatMessage } from "../types";

export const ContactSection: React.FC = () => {
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      content: "Greetings, voyager! I am A.I.R.A. (Artificial Intelligence Research Assistant). My quantum links are synchronized. Ask me anything about the events, workshops, registration, or venues of inteleza '26!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Map state
  const [selectedSector, setSelectedSector] = useState<string>("sec-07");

  const sectors = [
    { id: "sec-01", name: "COSMO-SEMINAR HALL", desc: "Venue for Paper Presentation. Sector-A", status: "Active" },
    { id: "sec-07", name: "CRYSTALLITE MAIN DECK", desc: "Main Gateway Central Pavilion. Section-G", status: "Optimal" },
    { id: "sec-03", name: "THE HYPERION LABS", desc: "Location of Hackathon and AI Challenge. Incubation Wing", status: "Active" },
    { id: "sec-04", name: "GAMING & PHOTOGRAPHY EXPANSION", desc: "Sector-F Cyber Deck", status: "Optimal" },
  ];

  // Auto scroll chat log internally without shifting the parent window view
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    const cleanText = textToSend.toLowerCase().trim();

    // Direct local answers for instant response to predefined or common questions
    let localReply = "";
    if (cleanText.includes("fee") || cleanText.includes("registration") || cleanText.includes("register") || cleanText.includes("cost") || cleanText.includes("pay")) {
      localReply = "The registration fee for **inteleza '26** is only **₹150 for an All-Access Combo Pass**! This single ticket grants you complete access to all 6 flagship technical and non-technical challenge events. Register today in the **PASS** section above to receive your verified Google Form registration entry!";
    } else if (cleanText.includes("hackathon") || cleanText.includes("hack")) {
      localReply = "The **24-Hour Cosmic Hackathon** is the ultimate technical battlefield of **inteleza '26**. Showcase your engineering prowess by building working prototypes of futuristic tech or space systems. 🥇 **Winner**: Overlord Gaming Trophy & Certificate of Merit. 🥈 **Runner Up**: Runner-Up Medal & Certificate.";
    } else if (cleanText.includes("where") || cleanText.includes("held") || cleanText.includes("venue") || cleanText.includes("location") || cleanText.includes("place") || cleanText.includes("arasu") || cleanText.includes("kumbakonam")) {
      localReply = "The symposium is held at **Arasu Engineering College, Chennai Main Road, Kumbakonam**. Sessions are distributed across specialized sectors: the Cosmo-Seminar Hall (Sector-A), Hyperdrive Computing Terminal (Sector-B), AI Core Deck (Sector-E), and the Glow Auditorium (Sector-D).";
    } else if (cleanText.includes("prize") || cleanText.includes("award") || cleanText.includes("reward") || cleanText.includes("win")) {
      localReply = "We feature a grand **₹1,50,000 Prize Pool** including Elite Shields, Champion Trophies, Custom Swag, and Certificates of Excellence for winners of both Technical and Non-Technical events. Certificates of Merit are awarded to all runner-ups, and participation badges are provided to all registered attendees.";
    }

    if (localReply) {
      setTimeout(() => {
        const assistantMsg: ChatMessage = {
          id: Math.random().toString(),
          role: "assistant",
          content: localReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsTyping(false);
      }, 600);
      return;
    }

    try {
      // Map previous messages to prompt history
      const history = messages
        .filter((m) => m.id !== "init")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history }),
      });

      if (!res.ok) {
        throw new Error("Core energy spike disconnected response.");
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: "A slight electromagnetic storm disrupted my network matrix. Please query again once I stabilize my core.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [
    "What is the registration fee?",
    "Tell me about the Hackathon",
    "Where is the Symposium held?",
    "What are the event prizes?",
  ];

  return (
    <section id="contact" className="relative min-h-screen py-24 px-6 overflow-hidden flex items-center">
      {/* Background neon grid rings */}
      <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full border border-cyan-500/5 animate-pulse pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto z-10">
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-mono tracking-[0.25em] text-xs uppercase font-semibold block mb-2">
            AI COMMUNICATIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-sans uppercase tracking-tight text-white">
            NEXUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">COMMUNICATION</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-sans font-light mt-4 max-w-xl mx-auto leading-relaxed">
            Talk to our central intelligence matrix or reach out to physical coordinators directly via traditional channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* A.I.R.A. INTERACTIVE HOLOGRAM DEVICE (LEFT COLUMN) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-slate-950/40 border border-cyan-500/25 p-6 md:p-8 backdrop-blur-xl shadow-[0_0_35px_rgba(6,182,212,0.06)] relative overflow-hidden">
            {/* Holographic glowing lines */}
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse" />

            <div>
              {/* Hologram Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                    <Bot className="w-5 h-5 animate-bounce" />
                    {/* Pulsing ring around bot */}
                    <div className="absolute inset-0 rounded-xl border border-cyan-400/40 animate-ping opacity-30" />
                  </div>
                  <div>
                    <h3 className="text-sm font-sans font-black text-white uppercase tracking-wider">
                      A.I.R.A. GUIDE BOT
                    </h3>
                    <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      COGNITIVE_CORE_V3.5_ONLINE
                    </span>
                  </div>
                </div>

                <div className="text-[9px] font-mono text-slate-500 bg-slate-900/40 px-3 py-1 rounded-full border border-white/5">
                  LATENCY: 12ms
                </div>
              </div>

              {/* MESSAGE LOG */}
              <div ref={chatContainerRef} className="h-[280px] overflow-y-auto pr-2 space-y-4 border-t border-b border-white/5 py-4 my-4 scrollbar-thin scrollbar-thumb-cyan-500/20">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                  >
                    <div className={`p-2 rounded-xl border flex-shrink-0 ${
                      msg.role === "user"
                        ? "bg-slate-900/30 border-white/5 text-slate-400"
                        : "bg-cyan-950/20 border-cyan-500/20 text-cyan-400"
                    }`}>
                      {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div className={`p-3.5 rounded-2xl text-xs font-sans font-light leading-relaxed ${
                      msg.role === "user"
                        ? "bg-slate-900/70 text-slate-200 rounded-tr-none border border-white/5"
                        : "bg-cyan-950/30 text-cyan-200 rounded-tl-none border border-cyan-500/15"
                    }`}>
                      <p>{msg.content}</p>
                      <span className="text-[8px] font-mono text-slate-500 block text-right mt-1.5 uppercase">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 max-w-[85%] mr-auto">
                    <div className="p-2 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-400">
                      <Bot className="w-3.5 h-3.5 animate-spin" />
                    </div>
                    <div className="p-3 rounded-2xl bg-cyan-950/30 border border-cyan-500/15 text-slate-400 text-xs font-mono animate-pulse">
                      A.I.R.A. is calculating responses...
                    </div>
                  </div>
                )}
              </div>

              {/* QUICK PROMPTS CHIPS */}
              <div className="flex flex-wrap gap-2 mb-4">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p)}
                    className="px-3 py-1.5 rounded-full bg-slate-900/40 hover:bg-cyan-950/30 border border-white/5 hover:border-cyan-500/20 text-[10px] font-sans text-slate-400 hover:text-cyan-300 transition-all duration-300 select-none uppercase tracking-wide"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* CHAT INPUT FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex gap-3"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type orbital coordinate query..."
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-white font-sans text-xs focus:border-cyan-500/30 focus:outline-none transition-colors duration-300"
              />
              <button
                type="submit"
                className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold uppercase hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>

          {/* CHANNELS & INTERACTIVE SEC GRID (RIGHT COLUMN) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* CYBER SHIELD RADAR INTERACTIVE MAP */}
            <div className="relative p-6 rounded-2xl bg-slate-950/40 border border-white/5 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] flex-1 flex flex-col justify-between min-h-[340px]">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-sans font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                    Holographic Campus Sector Radar
                  </h3>
                  <span className="text-[8px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded-md border border-cyan-500/20">
                    STABLE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {sectors.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setSelectedSector(sec.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all duration-300 ${
                        selectedSector === sec.id
                          ? "bg-cyan-950/30 border-cyan-400/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.05)]"
                          : "bg-slate-900/20 border-white/5 text-slate-400 hover:text-white hover:bg-slate-900/40"
                      }`}
                    >
                      <span className="text-[9px] font-mono block tracking-tight uppercase">{sec.id}</span>
                      <span className="text-[10px] font-sans font-bold leading-tight block truncate uppercase">
                        {sec.name.split(" ")[0]} {sec.name.split(" ")[1] || ""}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stylized vector radar visualization */}
              <div className="relative h-32 bg-slate-900/20 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center my-2">
                {/* Sector Radar Rings */}
                <div className="absolute w-24 h-24 rounded-full border border-dashed border-cyan-500/10 animate-spin-slow" />
                <div className="absolute w-16 h-16 rounded-full border border-double border-purple-500/10 animate-spin-reverse" />
                <div className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping" />

                {/* Sweeping radar scanner line */}
                <div className="absolute inset-x-0 h-0.5 bg-cyan-400/10 rotate-45 transform-gpu pointer-events-none" />

                {/* Display active sector coordinates */}
                <div className="absolute bottom-2 inset-x-3 flex justify-between items-center text-[9px] font-mono text-slate-500 bg-slate-950/80 p-1.5 rounded border border-white/5">
                  <span className="truncate">COORDS: Kumbakonam, India - Sector-7</span>
                  <span className="text-cyan-400 truncate font-semibold uppercase">
                    {sectors.find((s) => s.id === selectedSector)?.name}
                  </span>
                </div>
              </div>
            </div>

            {/* QUICK SOCIAL CONNECTS */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://instagram.com/inteleza2026"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl border border-white/5 bg-slate-950/40 text-slate-400 hover:text-white hover:border-pink-500/30 hover:bg-pink-950/10 transition-all duration-300 font-mono text-[10px] uppercase font-bold tracking-wider shadow-md"
              >
                <Instagram className="w-4 h-4 text-pink-500 animate-pulse" />
                INSTAGRAM
              </a>
              <a
                href="https://youtube.com/@inteleza2026"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl border border-white/5 bg-slate-950/40 text-slate-400 hover:text-white hover:border-red-500/30 hover:bg-red-950/10 transition-all duration-300 font-mono text-[10px] uppercase font-bold tracking-wider shadow-md"
              >
                <Youtube className="w-4 h-4 text-red-500 animate-pulse" />
                YOUTUBE
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

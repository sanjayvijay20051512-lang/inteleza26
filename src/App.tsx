import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Menu, X, Rocket, Bot, Sparkles, Instagram, Youtube, Phone, MapPin } from "lucide-react";

// Section imports
import { SpaceCanvas } from "./components/SpaceCanvas";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { HomeSection } from "./components/HomeSection";
import { AboutSection } from "./components/AboutSection";
import { EventsSection } from "./components/EventsSection";
import { RegistrationSection } from "./components/RegistrationSection";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [chargeProgress, setChargeProgress] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Zoom level for Starfield fly-through
  // Start at 1, scale up during warp, then stabilize inside symposium
  const [zoomLevel, setZoomLevel] = useState(1);

  // Smoothly adjust zoomLevel during calibration / loading
  useEffect(() => {
    if (!entered) {
      // Small breathing zoom based on loading progress
      setZoomLevel(1 + chargeProgress * 0.0035);
    }
  }, [chargeProgress, entered]);

  // Handle entry animation warp
  const handleEnterGateway = () => {
    setIsWarping(true);
    // Expand zoom level dramatically to represent portal speed travel
    let currentZoom = zoomLevel;
    const interval = setInterval(() => {
      currentZoom += 0.25;
      setZoomLevel(currentZoom);
      if (currentZoom >= 6) {
        clearInterval(interval);
      }
    }, 40);

    setTimeout(() => {
      setEntered(true);
      setIsWarping(false);
      setZoomLevel(1.1); // Stabilize background zoom
    }, 1500);
  };

  // Track scroll position to update active section & navigation line
  useEffect(() => {
    if (!entered) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;

      // Update scroll progress %
      if (docHeight > 0) {
        setScrollProgress((scrollPosition / docHeight) * 100);
      }

      // Detect active section
      const sections = ["home", "about", "events", "registration", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If section occupies center of viewport
          if (rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.4) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [entered]);

  const handleNavigate = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  const navLinks = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "events", label: "EVENTS" },
    { id: "registration", label: "PASS" },
    { id: "contact", label: "NEXUS" },
  ];

  return (
    <div className="relative min-h-screen text-white bg-black select-none overflow-x-hidden">
      {/* 3D FLOATING SPACE CANVAS (Suspended globally) */}
      <SpaceCanvas zoomLevel={zoomLevel} isInsideSymposium={entered} />

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="portal-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <WelcomeScreen
              onEnter={handleEnterGateway}
              onChargeProgress={setChargeProgress}
              isWarping={isWarping}
            />
          </motion.div>
        ) : (
          <motion.div
            key="symposium-world"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-screen w-full flex flex-col"
          >
            {/* STICKY GLASS NAVIGATION HEADER */}
            <header className="fixed top-0 inset-x-0 h-16 border-b border-white/5 bg-slate-950/40 backdrop-blur-xl z-40 flex items-center justify-between px-6 md:px-12 transition-all duration-300">
              {/* Dynamic scroll progress indicator bar */}
              <div
                style={{ width: `${scrollProgress}%` }}
                className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_1px_10px_rgba(6,182,212,0.5)] transition-all duration-100 pointer-events-none"
              />

              {/* LOGO */}
              <button
                onClick={() => handleNavigate("home")}
                className="flex items-center gap-2 text-left group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center border border-white/10 group-hover:rotate-6 transition-transform duration-300">
                  <Compass className="w-4 h-4 text-white animate-spin-slow" />
                </div>
                <span className="font-sans font-black tracking-[0.2em] text-sm text-white uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-300">
                  inteleza <span className="text-yellow-400 font-mono text-xs shadow-glow">'26</span>
                </span>
              </button>

              {/* DESKTOP NAV */}
              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavigate(link.id)}
                    className={`font-mono text-xs font-bold tracking-widest transition-all duration-300 relative py-1 hover:text-cyan-300 ${
                      activeSection === link.id ? "text-cyan-300" : "text-slate-400"
                    }`}
                  >
                    {link.label}
                    {/* Active highlight dot */}
                    {activeSection === link.id && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                      />
                    )}
                  </button>
                ))}
              </nav>

              {/* CTA SECURE PASS (DESKTOP) */}
              <div className="hidden lg:flex items-center gap-3">
                {/* CTA SECURE PASS */}
                <button
                  onClick={() => handleNavigate("registration")}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full font-sans font-bold tracking-widest text-[10px] text-black bg-gradient-to-r from-cyan-400 to-cyan-200 uppercase hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] cursor-pointer"
                >
                  <Rocket className="w-3.5 h-3.5" />
                  GET PASS
                </button>
              </div>

              {/* MOBILE MENU TOGGLE */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg border border-white/5 text-slate-400 hover:text-white hover:border-cyan-500/20 active:scale-95 transition-all duration-300"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </header>

            {/* MOBILE DROPDOWN DRAWER */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed top-16 inset-x-0 border-b border-white/10 bg-slate-950/95 backdrop-blur-3xl z-30 py-6 px-8 lg:hidden flex flex-col gap-4 shadow-2xl"
                >
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNavigate(link.id)}
                      className={`text-left font-mono font-bold text-xs tracking-widest uppercase py-2.5 border-b border-white/5 hover:text-cyan-400 ${
                        activeSection === link.id ? "text-cyan-300" : "text-slate-400"
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                  <button
                    onClick={() => handleNavigate("registration")}
                    className="w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-xl font-sans font-bold text-xs tracking-widest text-black bg-gradient-to-r from-cyan-400 to-cyan-200 uppercase active:scale-95 transition-all duration-300 shadow-lg"
                  >
                    <Rocket className="w-4 h-4" />
                    GET PASS (₹150)
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SECTIONS LIST CHAMBERS */}
            <main className="flex-1 w-full flex flex-col">
              <HomeSection onNavigate={handleNavigate} />
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none" />

              <AboutSection />
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-400/10 to-transparent pointer-events-none" />

              <EventsSection onNavigate={handleNavigate} />
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none" />

              <RegistrationSection />
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-400/10 to-transparent pointer-events-none" />

              <ContactSection />
            </main>



            {/* FLOATING ACTION HUD ACCESS CHANNELS (RIGHT CORNER) */}
            <div className="fixed bottom-6 right-6 hidden xl:flex items-center gap-3.5 z-30 select-none">
              <button
                onClick={() => handleNavigate("contact")}
                className="group p-3.5 rounded-full bg-slate-950/60 border border-cyan-500/25 text-cyan-400 hover:text-black hover:bg-cyan-400 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center"
                title="Open AI Communications Center"
                id="floating-ai-hud"
              >
                <Bot className="w-5 h-5 animate-pulse" />
              </button>

              <button
                onClick={() => handleNavigate("registration")}
                className="group py-3 px-5 rounded-full bg-slate-950/60 border border-yellow-500/25 text-yellow-500 hover:text-black hover:bg-yellow-400 shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 font-mono text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5"
                title="Get Registration Pass"
                id="floating-pass-hud"
              >
                <Sparkles className="w-4 h-4 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
                GATEWAY PASS
              </button>
            </div>

            {/* SECTIONS FOOTER */}
            <footer className="w-full border-t border-white/5 bg-slate-950/80 py-12 px-6 z-10 flex flex-col items-center gap-6 text-center backdrop-blur-md">
              <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-b border-white/5 pb-8 mb-4">
                {/* Department Info */}
                <div className="space-y-2">
                  <span className="font-mono text-[9px] tracking-widest text-cyan-400 block uppercase">CONDUCTING DEPARTMENT</span>
                  <p className="text-xs text-slate-300 font-sans font-bold uppercase leading-relaxed">
                    Department of Artificial Intelligence & Data Science
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans font-light">
                    Innovision Student Association. Driving cognitive computation breakthroughs.
                  </p>
                </div>

                {/* Physical Address */}
                <div className="space-y-2">
                  <span className="font-mono text-[9px] tracking-widest text-cyan-400 block uppercase">CAMPUS ADDRESS</span>
                  <div className="flex gap-2 items-start text-xs text-slate-300 font-sans leading-relaxed">
                    <MapPin className="w-4 h-4 text-cyan-500/80 flex-shrink-0 mt-0.5" />
                    <span>
                      Arasu Engineering College, Chennai Main Road, Kumbakonam
                    </span>
                  </div>
                </div>

                {/* Hotlines & Socials */}
                <div className="space-y-2">
                  <span className="font-mono text-[9px] tracking-widest text-cyan-400 block uppercase">COMMUNICATIONS</span>
                  <div className="space-y-1 text-xs font-mono">
                    <a href="tel:+919876543210" className="flex gap-2 items-center text-slate-300 hover:text-cyan-400 transition-colors duration-300">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      <span>+91 98765 43210</span>
                    </a>
                    <a href="tel:+918765432109" className="flex gap-2 items-center text-slate-300 hover:text-cyan-400 transition-colors duration-300">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      <span>+91 87654 32109</span>
                    </a>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <a
                      href="https://instagram.com/inteleza2026"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-white/5 bg-slate-900/40 text-slate-400 hover:text-pink-500 hover:border-pink-500/20 transition-all duration-300"
                      title="Follow on Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href="https://youtube.com/@inteleza2026"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-white/5 bg-slate-900/40 text-slate-400 hover:text-red-500 hover:border-red-500/20 transition-all duration-300"
                      title="Subscribe on YouTube"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="font-sans font-extrabold text-sm tracking-[0.25em] text-white uppercase">
                  inteleza <span className="text-yellow-400 font-mono text-xs shadow-glow">'26</span>
                </span>
                <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase">
                  Designed & Compiled inside the AI & Data Science Core • STATE-LEVEL SYMPOSIUM
                </span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

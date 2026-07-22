import React from "react";
import { motion } from "motion/react";
import { CreditCard, FileWarning, QrCode, Sparkles, CheckCircle2, ArrowUpRight, HelpCircle } from "lucide-react";

export const RegistrationSection: React.FC = () => {
  const instructions = [
    "The combo registration fee is ₹150, granting full entry to all Technical, Non-Technical events, and Workshops.",
    "A working laptop is highly recommended for participants of the technical events (papetrix, code quest, and prompt clash).",
    "Participants must present their Google Form email confirmation receipt at sector checkpoints.",
    "Decisions made by the event coordinate panel are absolute and final.",
    "Spot registrations are subject to availability. Pre-registration is highly advised.",
  ];

  const steps = [
    {
      num: "01",
      title: "ACCESS GOOGLE FORM",
      desc: "Click the main gateway link to initialize your credentials form in the verified Google database.",
    },
    {
      num: "02",
      title: "SUBMIT ENTRY DETAILS",
      desc: "Provide your institution name, contact, and preferred events track to construct your profile.",
    },
    {
      num: "03",
      title: "CLAIM COMBOTICKET",
      desc: "Present your digital Google Form email receipt at the campus registration desk to claim physical access tokens.",
    },
  ];

  return (
    <section id="registration" className="relative min-h-screen py-24 px-6 overflow-hidden flex items-center bg-black">
      {/* Background radial energy shield */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.06)_0%,rgba(0,0,0,0)_50%)] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto z-10">
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-mono tracking-[0.25em] text-xs uppercase font-semibold block mb-2">
            REGISTRATION CHAMBER
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-sans uppercase tracking-tight text-white">
            SECURE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500">GATEWAY PASS</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-sans font-light mt-4 max-w-xl mx-auto leading-relaxed">
            Acquire full entry protocols for Inteleza '26. Lock down your coordinates through our direct Google database registration portal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* CORE STATS & INSTRUCTIONS (LEFT PANEL) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* PRICING CARD */}
            <div className="relative p-6 rounded-2xl bg-slate-950/40 border border-yellow-500/20 backdrop-blur-xl shadow-[0_0_30px_rgba(234,179,8,0.03)] overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex gap-4 items-start mb-4">
                <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                  <CreditCard className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 tracking-widest block uppercase">COMBO_PASS_FEE</span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-3xl md:text-4xl font-sans font-black text-white">₹150</span>
                    <span className="text-xs font-mono text-yellow-400/80 uppercase tracking-wider">ALL_INCLUSIVE</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 font-sans font-light text-xs leading-relaxed">
                Unlock total access to all Technical Events, Non-Technical Events, and all interactive workshops with a single flat security fee.
              </p>
            </div>

            {/* DIRECTIVES BOX */}
            <div className="relative p-6 rounded-2xl bg-slate-950/40 border border-white/5 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] flex-1">
              <div className="flex gap-2.5 items-center mb-4">
                <FileWarning className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-sans font-extrabold text-white uppercase tracking-wider">
                  Important Protocols
                </h3>
              </div>
              <ul className="space-y-3.5">
                {instructions.map((ins, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs font-sans font-light text-slate-300 leading-relaxed">
                    <span className="text-cyan-400 font-bold font-mono">0{idx + 1}</span>
                    <span>{ins}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SIMPLIFIED USER-FRIENDLY REGISTRATION STEPS & BUTTON (RIGHT PANEL) */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-60 blur-xl pointer-events-none" />

            <div className="relative h-full p-8 rounded-2xl bg-slate-950/45 border border-white/5 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden">
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase block mb-1">
                    REGISTRATION PATHWAY
                  </span>
                  <h3 className="text-xl font-sans font-black text-white uppercase tracking-wide">
                    HOW TO <span className="text-cyan-400">REGISTER</span>
                  </h3>
                  <p className="text-xs font-sans text-slate-400 leading-relaxed mt-1">
                    Follow these three user-friendly coordinates to claim your official access parameters.
                  </p>
                </div>

                {/* Steps Cards */}
                <div className="space-y-4">
                  {steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 items-start p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/15 hover:bg-slate-900/60 transition-all duration-300"
                    >
                      <div className="text-lg font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                        {step.num}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-sans font-extrabold text-white uppercase tracking-wider">
                          {step.title}
                        </h4>
                        <p className="text-[11px] font-sans font-light text-slate-400 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MASSIVE GLOWING DIRECT GOOGLE FORM REDIRECT BUTTON */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdcXmS7D5fX8E_4zre_77T-B5xI7C5Fv6H_hUu_R-gG0p0fXg/viewform?usp=sf_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-sans font-black text-sm tracking-[0.2em] text-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 uppercase hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-[0_0_35px_rgba(234,179,8,0.3)] text-center cursor-pointer"
                  id="google-form-redirect-btn"
                >
                  <Sparkles className="w-5 h-5 text-black animate-spin-slow" />
                  INITIALIZE REGISTRATION (GOOGLE FORM)
                  <ArrowUpRight className="w-5 h-5 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
                <p className="text-[9px] font-mono text-center text-slate-500 tracking-wider uppercase mt-3">
                  ⚠️ LINK LEADS TO VERIFIED OUTBOUND SECURE REGISTER PROTOCOLS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

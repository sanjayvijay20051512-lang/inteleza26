import { EventDetail, WorkshopDetail, StatItem } from "./types";

export const STATS: StatItem[] = [
  {
    id: "events",
    label: "CHALLENGE EVENTS",
    value: 6,
    suffix: "",
    icon: "Layers",
  },
  {
    id: "google-forms-active",
    label: "GOOGLE FORM REGISTRATIONS",
    value: 154,
    suffix: " Verified",
    icon: "Trophy",
  },
  {
    id: "departments",
    label: "ORGANIZING DEPARTMENT",
    value: 1,
    suffix: " (AI & DS)",
    icon: "Cpu",
  },
  {
    id: "institutions",
    label: "PARTICIPATING COLLEGES",
    value: 45,
    suffix: "+",
    icon: "Users",
  },
];

export const EVENTS: EventDetail[] = [
  // TECHNICAL EVENTS
  {
    id: "papetrix",
    title: "PAPETRIX (Paper Presentation)",
    category: "Technical",
    icon: "FileText",
    tagline: "Unveil futuristic research and ideas at the frontier of technology.",
    description: "Present your groundbreaking theoretical papers, models, or simulation results in front of a distinguished panel of experts and researchers. Bring your best tech concepts and ideas to life.",
    rules: [
      "Each team can have a maximum of 3 participants.",
      "Papers can be related to fields including Artificial Intelligence, Data Science, Information Technology, Cybersecurity, Cloud Computing, IoT, Blockchain, Software Engineering and other emerging technologies.",
      "Time limit: 8 minutes for presentation + 2 minutes Q&A",
      "Participants must bring their presentation in both PPT and PDF formats.",
      "Any form of plagiarism will lead to disqualification."
    ],
    venue: "Cosmo-Seminar Hall (Sector-A)",
    time: "Aug 28, 10:00 AM - 01:00 PM",
    prizeDetails: "🥇 Winner: Elite Shield & Gold Certificate | 🥈 Runner Up: Silver Certificate & Award",
    coordinators: [
      { name: "Santhoshini", role: "Student", phone: "+91 94441 23456" },
      { name: "Kishore Kumar", role: "Student", phone: "+91 98402 34567" }
    ],
    fee: "Free with Combo Pass"
  },
  {
    id: "code-quest",
    title: "code quest",
    category: "Technical",
    icon: "Code",
    tagline: "Outspeed compilation in a time-locked battle of algorithms.",
    description: "Put your algorithmic speed and debugging prowess to the test. Compile, optimize, and clear complex code errors under extreme pressure in this ultimate quest.",
    objective: "Improve participants' coding and debugging skills. Sharpen problem-solving and logical thinking ability through error finding and programming challenges. Encourage teamwork, creativity, and learning in a competitive environment.",
    format: [
      "Round 1: Error Finding (5 Q in Python + 5 Q in C) – 10 min",
      "Round 2: A program will be uploaded into the system. Participants must run the program and fix the errors to produce the correct output – 15 min"
    ],
    rules: [
      "Only single participants are allowed; groups are not permitted.",
      "All rounds are time-bound; no extra time will be given.",
      "Use of mobile phones, calculators, or external help is strictly prohibited.",
      "Only the answers submitted within time will be evaluated.",
      "There is no negative marking.",
      "In case of a tie, a sudden-death coding challenge will decide the winner.",
      "Judges’ and organizers’ decisions will be final."
    ],
    venue: "Hyperdrive Computing Terminal (Sector-B)",
    time: "Aug 28, 01:30 PM - 04:30 PM",
    prizeDetails: "🥇 Winner: Champion Trophy & Certificate | 🥈 Runner Up: Runner Certificate",
    coordinators: [
      { name: "Aaryan Jain N", role: "Student", phone: "+91 95003 45678" },
      { name: "Nishanthini A", role: "Student", phone: "+91 86084 56789" }
    ],
    fee: "Free with Combo Pass"
  },
  {
    id: "prompt-clash",
    title: "prompt clash",
    category: "Technical",
    icon: "Sparkles",
    tagline: "Fine-tune and deploy prompt models in a real-time arena.",
    description: "Show off your generative skills. Formulate strategic prompt pipelines to solve complex system hacks, optimize models, and out-compile your rival prompts under real-time clashing scenarios.",
    rules: [
      "Individual or team of 2.",
      "Access to authorized sandbox Gemini workspaces provided.",
      "Evaluation is strictly quantitative based on LLM output accuracy and stylistic alignment."
    ],
    venue: "AI Core Deck (Sector-E)",
    time: "Aug 28, 11:30 AM - 01:30 PM",
    prizeDetails: "🥇 Winner: AI Champion Shield & Swag | 🥈 Runner Up: Certificate of Excellence",
    coordinators: [
      { name: "Sanjay C", role: "Student", phone: "+91 91505 67890" },
      { name: "Aadhi P", role: "Student", phone: "+91 73586 78901" }
    ],
    fee: "Free with Combo Pass"
  },

  // NON-TECHNICAL EVENTS
  {
    id: "meme-mania",
    title: "MEME MANIA",
    category: "Non-Technical",
    icon: "Smile",
    tagline: "Channel developer humor and AI takeover panic.",
    description: "We are delighted to invite you to participate in Meme Creation, a fun and creative competition organized by the Department of Artificial Intelligence and Data Science and the Department of Information Technology, Arasu Engineering College.",
    objective: "Encourage creativity and humor through digital media. Improve participants' ability to express ideas visually in an engaging way. Promote fun learning and innovation in a competitive environment.",
    rules: [
      "Only registered participants are allowed.",
      "Participants must create a meme on the given topics.",
      "Mobile phones are allowed.",
      "Creation time: 25 minutes.",
      "The selected meme must be submitted in PNG format.",
      "File size should not exceed 7 MB.",
      "File naming format: ParticipantName_CollegeName_EventName.",
      "The output should not offend any religion, political party, or college management.",
      "Participants must use only the given tools.",
      "Use of pre-made templates without modification will lead to disqualification.",
      "Participants must strictly follow the time limit.",
      "The final decision will be made by the coordinator."
    ],
    format: [
      "Batch 1: A group of participants will participate, and their best artwork will be selected.",
      "Batch 2: A group of participants will participate, and their best artwork will be selected."
    ],
    venue: "Online Submission / Main Deck Display",
    time: "Deadline: Aug 28, 11:59 PM",
    prizeDetails: "🥇 Winner: Funniest Creator Shield | 🥈 Runner Up: Certificate of Merit",
    coordinators: [
      { name: "Eaaswar R", role: "Student", phone: "+91 94877 89012" },
      { name: "Dharshini S", role: "Student", phone: "+91 97918 90123" }
    ],
    fee: "Free with Combo Pass"
  },
  {
    id: "think-sync",
    title: "Think & Sync",
    category: "Non-Technical",
    icon: "Share2",
    tagline: "Forge fast mental bridges across unrelated graphic clues.",
    description: "Link disjointed movie frames, scientific symbols, pop-culture icons, and tech corporate logos in a highly interactive fast-fire grid to sync up with your partner.",
    rules: [
      "Teams of 2 members.",
      "Round 1: Rapid-fire slide grid (30 slides).",
      "Round 2: Deductive final round (Double jeopardy rules).",
      "Decisions of the Grand Inquisitor are final."
    ],
    venue: "Glow Auditorium (Sector-D)",
    time: "Aug 28, 02:30 PM - 04:30 PM",
    prizeDetails: "🥇 Winner: Synchrony Laurels & Shield | 🥈 Runner Up: Certificate of Merit",
    coordinators: [
      { name: "B. Sujitha", role: "Student", phone: "+91 98849 01234" },
      { name: "Deenadhayal K", role: "Student", phone: "+91 90430 12345" }
    ],
    fee: "Free with Combo Pass"
  },
  {
    id: "tick-tock",
    title: "TICK TOCK (Minute to Minute)",
    category: "Non-Technical",
    icon: "Gamepad2",
    tagline: "Race against the clock in extreme coordination micro-challenges.",
    description: "Minute to Minute games are fun challenges where participants must complete a task within 60 seconds using simple materials. These games improve speed, focus, and coordination.",
    explanation: "Minute to Minute games are fun challenges where participants must complete a task within 60 seconds using simple materials. These games improve speed, focus, and coordination.",
    rules: [
      "Each challenge lasts 1 minute only.",
      "Use only the given materials.",
      "No extra attempts are allowed.",
      "The task must be completed before time ends."
    ],
    exampleGame: {
      title: "Face the Cookie",
      objective: "Move a cookie from the forehead to the mouth without using hands.",
      materials: "Cookies.",
      winning: "Whoever gets the cookie in their mouth within 1 minute."
    },
    venue: "Hyperion Gaming Deck (Sector-F)",
    time: "Aug 28, 10:00 AM - 01:00 PM",
    prizeDetails: "🥇 Winner: Overlord Gaming Trophy | 🥈 Runner Up: Runner-Up Medal & Certificate",
    coordinators: [
      { name: "K. Kirubalakshmi", role: "Student", phone: "+91 93601 23456" }
    ],
    fee: "Free with Combo Pass"
  }
];

export const WORKSHOPS: WorkshopDetail[] = [
  {
    id: "ws-ai",
    title: "AI & Neural Networks Lab",
    tagline: "Master Edge AI Integration & Agent Frameworks",
    description: "An intensive practical session on training lightweight models, writing prompt engines with Gemini 3.5, and deploying server-side agent chains.",
    syllabus: [
      "Introduction to LLM Agent paradigms",
      "Building system instructions and prompt chaining",
      "Configuring response schemas with structured JSON",
      "Deploying secure Edge AI server middlewares",
    ],
    duration: "4 Hours (Interactive)",
    instructor: "Dr. Evelyn Vance",
    instructorTitle: "Lead AI Scientist, Nexus Systems",
    glowingColor: "rgba(59, 130, 246, 0.5)", // Blue glow
  },
  {
    id: "ws-quantum",
    title: "Quantum Sandbox",
    tagline: "Build & Simulate Your First Quantum Circuits",
    description: "Dive straight into qubit superpositions, entanglement, and quantum gate programming using simulated visual quantum sandbox environments.",
    syllabus: [
      "Quantum state vectors and superposition",
      "Programming Hadamard, CNOT, and Phase gates",
      "Simulating Grover's search algorithm",
      "Practical deployment on simulated quantum hardware",
    ],
    duration: "4 Hours (Practical Lab)",
    instructor: "Dr. Arthur Pendelton",
    instructorTitle: "Director of Quantum Logic, QG Systems",
    glowingColor: "rgba(168, 85, 247, 0.5)", // Purple glow
  },
  {
    id: "ws-cyber",
    title: "Cybersecurity Nexus",
    tagline: "Interactive Red-Teaming & Threat Mitigation",
    description: "Learn ethical hacking in a safe virtual sandbox. Pen-test SQL servers, decode weak hash handshakes, and prevent remote warp core overrides.",
    syllabus: [
      "Symmetry and asymmetric encryption audits",
      "Exploiting and shielding mock database backends",
      "Intercepting and reading packet channels",
      "Live Capture-the-Flag (CTF) mini challenge",
    ],
    duration: "4 Hours (CTF Session)",
    instructor: "Prof. Silas Stone",
    instructorTitle: "Threat Intel Commander, ZeroDay Shield",
    glowingColor: "rgba(6, 182, 212, 0.5)", // Cyan glow
  },
];

export const GALLERY_IMAGES = [
  {
    id: "g1",
    title: "The central core",
    description: "Vibrant auroras hovering around the quantum gate.",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g2",
    title: "Floating crystal laboratories",
    description: "Incubating neural networks in crystallite halls.",
    url: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g3",
    title: "Drone delivery corridors",
    description: "Supplies gliding silently through moving cloud lanes.",
    url: "https://images.unsplash.com/photo-1484589065579-248adc018627?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g4",
    title: "The symposium mainframe",
    description: "High-density servers cooled by liquid nitrogen.",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g5",
    title: "Volumetric display array",
    description: "Holographic projections inside the floating amphitheater.",
    url: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g6",
    title: "Warp energy shield",
    description: "The primary gateway charging with blue energy.",
    url: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&q=80&w=800",
  },
];

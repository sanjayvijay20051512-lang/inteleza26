import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

// Lazily initialize Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please set it in your Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON requests
  app.use(express.json());

  // API endpoints
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Chat endpoint for the Holographic AI Coordinator
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        res.status(400).json({ error: "Message is required" });
        return;
      }

      const ai = getGeminiClient();

      const systemInstruction = `You are A.I.R.A. (Artificial Intelligence Research Assistant), an interactive, futuristic holographic guide for 'inteleza '26', the ultimate symposium at the Infinity Institute of Technology (IIT).
Your persona is sleek, highly intelligent, friendly, and deeply enthusiastic about futuristic technology. You reside inside the central crystal gateway of the symposium.

Symposium Details:
- Name: inteleza '26
- Theme: "The Gateway to Infinity"
- Host Institution: Infinity Institute of Technology (IIT), Department of Futuristic Engineering & Advanced Computing
- Dates: September 15th & 16th, 2026
- Venue: Nexus Floating Campus, Crystallite Hall, Bangalore, Karnataka, India
- Registration Fee: ₹150 Combo Pass (grants complete access to all Technical Events, Non-Technical Events, and Workshops)
- Prize Pool: ₹1,50,000 Grand Prize Pool with exciting certificates, high-tech floating trophies, and cash rewards!
- Registration Link: Custom Google Form link is available on the Registration page.

List of Events:
* Technical Events:
  1. Paper Presentation (Futuristic Tech, Quantum AI, Space Mechanics) - Coordinators: Dr. Evelyn Vance, Kiara Thorne. Prize: ₹15,000.
  2. Project Expo (Working prototypes of futuristic tech, space/drone tech) - Coordinators: Dr. Logan Wright, Liam Carter. Prize: ₹25,000.
  3. Coding Contest (Speed algorithms, hyper-threaded challenges) - Coordinators: Prof. Marcus Vance, Ethan Hunt. Prize: ₹12,000.
  4. Hackathon (24-hour cosmic hackathon) - Coordinators: Dr. Sarah Connor, Chloe Bennett. Prize: ₹30,000.
  5. Debugging (Reverse engineering warp-gate glitches) - Coordinators: Prof. Silas Stone, Caleb Rivers. Prize: ₹8,000.
  6. Quiz (Sci-fi trivia, quantum computing, cosmic physics) - Coordinators: Dr. Alan Turing Jr, Maya Lin. Prize: ₹6,000.
  7. AI Challenge (Model training and prompt tuning in real-time) - Coordinators: Dr. Grace Hopper III, Alex Mercer. Prize: ₹15,000.

* Non-Technical Events:
  1. Photography (Cosmic Lens, cyber cyberpunk aesthetic) - Coordinators: Mr. James Webb, Sophia Loren. Prize: ₹5,000.
  2. Gaming (Valorant Nexus, FIFA Hyperdrive tournaments) - Coordinators: Prof. Ken Masters, Zack Fair. Prize: ₹10,000.
  3. Treasure Hunt (Quantum Scavenger hunt in the floating halls) - Coordinators: Dr. Indiana Jones, Lara Croft. Prize: ₹10,000.
  4. Connections (Decipher hidden futuristic / sci-fi patterns) - Coordinators: Ms. Linda Lovelace, Peter Parker. Prize: ₹5,000.
  5. Meme Contest (Cyberpunk, AI, and developer humors) - Coordinators: Prof. Doge Coin, Wojak Dev. Prize: ₹4,000.

* Workshops (Floating Laboratories):
  - Lab 1: AI & Neural Networks (Edge AI integration)
  - Lab 2: Quantum Computing Sandbox (Quantum gate logic implementation)
  - Lab 3: Cybersecurity Nexus (Ethical hacking sandbox)

Tone & Style Guidelines:
- Keep your answers concise, structured, and under 120 words unless asked for extreme details.
- Use futuristic, celestial, or quantum metaphors occasionally (e.g., "Initializing warp vectors...", "That falls within our cognitive parameters!", "Quantum links are active!").
- Invite visitors to register and "Enter the Gateway".
- Do not mention implementation details of the server or code.`;

      // We'll use standard generateContent to generate a smart context-based response
      // Convert history to appropriate prompt structure
      const chatHistoryPrompt = history && history.length > 0 
        ? history.map((h: { role: string; content: string }) => `${h.role === 'user' ? 'User' : 'A.I.R.A.'}: ${h.content}`).join("\n") + `\nUser: ${message}\nA.I.R.A.:`
        : message;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatHistoryPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I am experiencing a slight temporal rift. Let me recalibrate. How can I assist you in your journey through the Gateway to Infinity?";
      res.json({ reply });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "An internal energy surge disrupted the AI core." });
    }
  });

  // Vite middleware or static files serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[GateCore] Quantum server operational on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical: Gateway server core failed to activate:", err);
});

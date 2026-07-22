export interface Coordinator {
  name: string;
  phone?: string;
  email?: string;
  role: "Faculty" | "Student";
}

export interface EventDetail {
  id: string;
  title: string;
  category: "Technical" | "Non-Technical";
  icon: string; // Lucide icon name
  tagline: string;
  description: string;
  rules: string[];
  venue: string;
  time: string;
  prizeDetails: string;
  coordinators: Coordinator[];
  fee: string;
  objective?: string;
  format?: string[];
  explanation?: string;
  exampleGame?: {
    title: string;
    objective: string;
    materials: string;
    winning: string;
  };
}

export interface WorkshopDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  syllabus: string[];
  duration: string;
  instructor: string;
  instructorTitle: string;
  glowingColor: string; // Tailwind glow class
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

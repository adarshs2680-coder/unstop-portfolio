export interface ClubEvent {
  id: number;
  title: string;
  date: string;
  duration?: string;
  mode: "Offline" | "Online" | "Hybrid";
  participants?: string | number;
  category: string;
  description: string;
  color: string;
  posterFileId?: string;
  posterUrl?: string;
  reelUrl?: string;
  reportUrl?: string;
}

export const SPREADSHEET_ID = "1aY-qy2rr4wCF2RJeD29vobyiCmPKNlXLaWapbF230-0";
export const SPREADSHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv`;

export function getPosterImageUrl(fileId?: string): string | null {
  if (!fileId) return null;
  return `/posters/${fileId}.jpg`;
}

export function getPosterCdnUrl(fileId?: string): string | null {
  if (!fileId) return null;
  return `https://lh3.googleusercontent.com/d/${fileId}=w800`;
}

export const fallbackEvents: ClubEvent[] = [
  {
    id: 1,
    title: "Unstop Orientation 2025",
    date: "05-08-2025",
    duration: "3 hrs",
    mode: "Offline",
    participants: 200,
    category: "Flagship Orientation",
    description: "Official club induction and placement roadmap unveiling for the incoming batch at UCEK.",
    color: "#ec4899",
    reelUrl: "https://www.instagram.com/reel/DPq3uJqkU-e/",
    reportUrl: "https://drive.google.com/file/d/14OnTS1YoWYSFjAqSDj3Vcp6Ypt4h3wkA/view?usp=sharing",
  },
  {
    id: 2,
    title: "Tata Imagination Challenge",
    date: "15-09-2025",
    duration: "Full Day",
    mode: "Online",
    participants: 120,
    category: "National Case Challenge",
    description: "National-level business acumen and critical problem-solving competition by Tata Group.",
    color: "#f59e0b",
    reelUrl: "https://www.instagram.com/reel/DOn3zS6DxD5/",
  },
  {
    id: 3,
    title: "Ignitia - Hand Drawn Poster Competition",
    date: "05-10-2025",
    duration: "4 hrs",
    mode: "Offline",
    participants: 20,
    category: "Creative Arts & Design",
    description: "Artistic expression and creative visual storytelling competition under the Ignitia banner.",
    color: "#8b5cf6",
    posterFileId: "12hvYBC54ShmQXqyByErh8hoV7AHmRlGP",
    posterUrl: "https://drive.google.com/file/d/12hvYBC54ShmQXqyByErh8hoV7AHmRlGP/view?usp=drive_link",
  },
  {
    id: 4,
    title: "Ignitia - Campus Treasure Hunt",
    date: "07-10-2025",
    duration: "3 hrs",
    mode: "Offline",
    participants: 20,
    category: "Team Building & Logic",
    description: "Campus-wide cryptic clues and puzzle-solving event testing speed, teamwork, and deduction.",
    color: "#3b82f6",
    posterFileId: "1STdWE3d9ddC8JBCwIAvvyIlAXWaEDckm",
    posterUrl: "https://drive.google.com/file/d/1STdWE3d9ddC8JBCwIAvvyIlAXWaEDckm/view?usp=drive_link",
  },
  {
    id: 5,
    title: "Ignitia - The Foundation",
    date: "17-10-2025",
    duration: "5 hrs",
    mode: "Offline",
    participants: 60,
    category: "Skill Dev Workshop",
    description: "Fundamental placement readiness and soft-skills workshop empowering campus students.",
    color: "#06b6d4",
    posterFileId: "11HHicMFitHzKk7Wv290HdEz4EDFO8fP9",
    posterUrl: "https://drive.google.com/file/d/11HHicMFitHzKk7Wv290HdEz4EDFO8fP9/view?usp=drive_link",
  },
  {
    id: 6,
    title: "Two-Day Python Workshop",
    date: "14-10-2025 to 15-10-2025",
    duration: "2 days",
    mode: "Offline",
    participants: 200,
    category: "Technical Masterclass",
    description: "Hands-on coding sprint covering Python syntax, data structures, and automation scripting.",
    color: "#10b981",
    posterFileId: "1rsQ_1z9Ld0QCqplWKgiQmMN7rIBSAXff",
    posterUrl: "https://drive.google.com/file/d/1rsQ_1z9Ld0QCqplWKgiQmMN7rIBSAXff/view?usp=drive_link",
    reelUrl: "https://www.instagram.com/reel/DQHI-i7D1hg/",
  },
  {
    id: 7,
    title: "Selfie Unstop Mirror Competition",
    date: "10-11-2025",
    duration: "2 days",
    mode: "Online",
    participants: 15,
    category: "Photography & Media",
    description: "Social media engagement contest showcasing student life, campus moments, and creativity.",
    color: "#f43f5e",
    posterFileId: "18Ie8lJiOTfTd3AbBnk6zDPx4ompkV0PZ",
    posterUrl: "https://drive.google.com/file/d/18Ie8lJiOTfTd3AbBnk6zDPx4ompkV0PZ/view?usp=drive_link",
  },
  {
    id: 8,
    title: "Chat2Peer: Study Abroad Program",
    date: "15-11-2025",
    duration: "1 hr",
    mode: "Online",
    participants: 20,
    category: "Global Education",
    description: "Interactive session exploring master's opportunities, international admissions, and GRE/IELTS prep.",
    color: "#6366f1",
    posterFileId: "1AX4hhjNVtENFbwPAgXP3kpX09EVRd6sS",
    posterUrl: "https://drive.google.com/file/d/1AX4hhjNVtENFbwPAgXP3kpX09EVRd6sS/view?usp=drive_link",
  },
  {
    id: 9,
    title: "Scala Level Up Workshop",
    date: "03-12-2025",
    duration: "7 hrs",
    mode: "Offline",
    participants: 65,
    category: "Advanced Programming",
    description: "Intensive deep dive into functional programming, Scala idioms, and enterprise backend engineering.",
    color: "#ec4899",
    posterFileId: "1xVHbFKtgTjVAVFeah727j8ZBg48fYk2B",
    posterUrl: "https://drive.google.com/file/d/1xVHbFKtgTjVAVFeah727j8ZBg48fYk2B/view?usp=drive_link",
  },
  {
    id: 10,
    title: "One Tank: Idea Pitching Challenge",
    date: "05-12-2025",
    duration: "5 hrs",
    mode: "Offline",
    participants: 50,
    category: "Entrepreneurship",
    description: "Shark-tank style startup pitch contest evaluating market viability, business models, and innovation.",
    color: "#f59e0b",
    posterFileId: "1SU1PhbKm1KvX1Aj38RlgX1vNNhJ2I2N3",
    posterUrl: "https://drive.google.com/file/d/1SU1PhbKm1KvX1Aj38RlgX1vNNhJ2I2N3/view?usp=drive_link",
  },
  {
    id: 11,
    title: "AI Workshop: Hack2Skill",
    date: "24-01-2026",
    duration: "2 hrs",
    mode: "Online",
    participants: 45,
    category: "Artificial Intelligence",
    description: "Prompt engineering, generative models, and LLM integration masterclass with Hack2Skill.",
    color: "#3b82f6",
    posterFileId: "1nF0O8WcqOHh-zXlOevvf3EePj5_M5FkI",
    posterUrl: "https://drive.google.com/file/d/1nF0O8WcqOHh-zXlOevvf3EePj5_M5FkI/view?usp=drive_link",
  },
  {
    id: 12,
    title: "CAD Engineering Workshop",
    date: "03-02-2026",
    duration: "5 hrs",
    mode: "Offline",
    participants: 57,
    category: "Engineering Design",
    description: "Computer-Aided Design fundamentals, 3D modeling, and engineering drafting for students.",
    color: "#8b5cf6",
    posterFileId: "1uV-RmmNiVhLOVi6KlKYLQOodQ2AWHSk_",
    posterUrl: "https://drive.google.com/file/d/1uV-RmmNiVhLOVi6KlKYLQOodQ2AWHSk_/view?usp=drive_link",
  },
  {
    id: 13,
    title: "Fragrance Canvas: L'Oréal Brandstorm",
    date: "03-02-2026",
    duration: "6 hrs",
    mode: "Offline",
    participants: 50,
    category: "Brand Campaign",
    description: "Campaign ideation, consumer marketing strategies, and pitch prep for L'Oréal Brandstorm.",
    color: "#f43f5e",
    posterFileId: "1fQhoVhIeicCVJd7H9kawGDwhS85jrYPI",
    posterUrl: "https://drive.google.com/file/d/1fQhoVhIeicCVJd7H9kawGDwhS85jrYPI/view?usp=drive_link",
  },
  {
    id: 14,
    title: "Yaathra'26",
    date: "23-02-2026",
    duration: "Full Day",
    mode: "Offline",
    participants: 180,
    category: "Cultural & Flagship",
    description: "UCEK annual student journey celebration, talent showcase, and community reunion.",
    color: "#f59e0b",
    posterFileId: "1CMN6QNPJFgUfmKPerSIybjUppaPcb_H5",
    posterUrl: "https://drive.google.com/file/d/1CMN6QNPJFgUfmKPerSIybjUppaPcb_H5/view?usp=drive_link",
  },
  {
    id: 15,
    title: "Campus2Career (Keltron × Igniters)",
    date: "04-02-2026",
    duration: "6 hrs",
    mode: "Offline",
    participants: 240,
    category: "Placement Partnership",
    description: "Flagship industrial training and placement readiness summit organized in collaboration with Keltron.",
    color: "#10b981",
    posterFileId: "1GtJXsoIM5p53fkcjQhCmFK3SoluHRH8w",
    posterUrl: "https://drive.google.com/file/d/1GtJXsoIM5p53fkcjQhCmFK3SoluHRH8w/view?usp=drive_link",
  },
  {
    id: 16,
    title: "Industry Panel Discussion",
    date: "19-03-2026",
    duration: "2 hrs",
    mode: "Offline",
    participants: 70,
    category: "Executive Talks",
    description: "Alumni and corporate leaders discuss recruitment trends, interview expectations, and career roadmaps.",
    color: "#3b82f6",
    posterFileId: "1US3HZHDVJEHOQTv0_WPTNpLymrrYFRVk",
    posterUrl: "https://drive.google.com/file/d/1US3HZHDVJEHOQTv0_WPTNpLymrrYFRVk/view?usp=drive_link",
  },
  {
    id: 17,
    title: "ET Hackathon Challenge",
    date: "02-06-2026",
    duration: "24 hrs",
    mode: "Online",
    participants: 100,
    category: "Hackathon Sprint",
    description: "High-intensity hackathon sprint solving real-world technological challenges and product prototypes.",
    color: "#ec4899",
  },
  {
    id: 18,
    title: "Annual Photography Competition",
    date: "06-07-2026",
    duration: "3 days",
    mode: "Online",
    participants: 35,
    category: "Visual Arts",
    description: "Visual composition, framing, and light storytelling showcase by campus photographers.",
    color: "#f59e0b",
  },
  {
    id: 19,
    title: "Website & Tech Implementation",
    date: "17-08-2026",
    duration: "3 hrs",
    mode: "Offline",
    participants: 40,
    category: "Dev Sprint",
    description: "Building, deploying, and maintaining digital web experiences and student portals for UCEK.",
    color: "#06b6d4",
  },
  {
    id: 20,
    title: "Annual Induction & Orientation 2026",
    date: "18-08-2026",
    duration: "2 hrs",
    mode: "Offline",
    participants: 220,
    category: "Campus Induction",
    description: "Welcoming future engineers into the club and setting the academic year placement trajectory.",
    color: "#ec4899",
  },
];

const POSTER_ID_MAP: Record<number, string> = {
  3: "12hvYBC54ShmQXqyByErh8hoV7AHmRlGP",
  4: "1STdWE3d9ddC8JBCwIAvvyIlAXWaEDckm",
  5: "11HHicMFitHzKk7Wv290HdEz4EDFO8fP9",
  6: "1rsQ_1z9Ld0QCqplWKgiQmMN7rIBSAXff",
  7: "18Ie8lJiOTfTd3AbBnk6zDPx4ompkV0PZ",
  8: "1AX4hhjNVtENFbwPAgXP3kpX09EVRd6sS",
  9: "1xVHbFKtgTjVAVFeah727j8ZBg48fYk2B",
  10: "1SU1PhbKm1KvX1Aj38RlgX1vNNhJ2I2N3",
  11: "1nF0O8WcqOHh-zXlOevvf3EePj5_M5FkI",
  12: "1uV-RmmNiVhLOVi6KlKYLQOodQ2AWHSk_",
  13: "1fQhoVhIeicCVJd7H9kawGDwhS85jrYPI",
  14: "1CMN6QNPJFgUfmKPerSIybjUppaPcb_H5",
  15: "1GtJXsoIM5p53fkcjQhCmFK3SoluHRH8w",
  16: "1US3HZHDVJEHOQTv0_WPTNpLymrrYFRVk",
};

export function parseCsvToEvents(csvText: string): ClubEvent[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const events: ClubEvent[] = [];

  let headerIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("Sl No") && lines[i].includes("Event Name")) {
      headerIndex = i;
      break;
    }
  }

  if (headerIndex === -1) return fallbackEvents;

  const colorPalette = ["#ec4899", "#3b82f6", "#f59e0b", "#10b981", "#8b5cf6", "#f43f5e", "#06b6d4"];

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith(",,,") || line.includes("Link for all Creatives")) continue;

    const cols: string[] = [];
    let current = "";
    let insideQuotes = false;
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        cols.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    cols.push(current.trim());

    const slNo = parseInt(cols[0], 10);
    const title = cols[1];
    if (isNaN(slNo) || !title) continue;

    const date = cols[2] || "2025-2026";
    const duration = cols[5] || undefined;
    const participants = cols[7] ? parseInt(cols[7], 10) || cols[7] : undefined;
    const mode = cols[8]?.toLowerCase().includes("online") ? "Online" : "Offline";
    const posterFileId = POSTER_ID_MAP[slNo];

    events.push({
      id: slNo,
      title,
      date,
      duration,
      mode,
      participants,
      category: title.includes("Workshop")
        ? "Technical Masterclass"
        : title.includes("Competition")
        ? "Competitive Event"
        : "Club Initiative",
      description: `Official initiative organized by Unstop Igniters Club UCEK on ${date}.`,
      color: colorPalette[(slNo - 1) % colorPalette.length],
      posterFileId,
      posterUrl: posterFileId ? `https://drive.google.com/file/d/${posterFileId}/view` : undefined,
    });
  }

  return events.length > 0 ? events : fallbackEvents;
}

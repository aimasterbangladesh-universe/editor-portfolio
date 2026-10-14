import {
  Building2,
  Clapperboard,
  Film,
  Palette,
  Scissors,
  type LucideIcon,
} from "lucide-react";

export const SERVICES: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: Clapperboard,
    title: "News & Media Editing",
    body: "Fast-turnaround editing for broadcast news, built for accuracy and pace under deadline pressure.",
  },
  {
    Icon: Film,
    title: "Documentary Editing",
    body: "Long-form storytelling that finds the narrative thread in hours of raw footage.",
  },
  {
    Icon: Palette,
    title: "Color Grading & Correction",
    body: "Cinematic color treatment that gives every frame mood and consistency.",
  },
  {
    Icon: Scissors,
    title: "Short-Form & Social Content",
    body: "Punchy, platform-ready edits for YouTube, Reels, and short-form audiences.",
  },
  {
    Icon: Building2,
    title: "Corporate & Promotional Videos",
    body: "Clean, professional edits for brand films, interviews, and promotional content.",
  },
];

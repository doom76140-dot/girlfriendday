export interface Question {
  id: number;
  title: string;
  subtitle?: string;
  category: 'food' | 'anniversary' | 'bike' | 'birthdate' | 'custom';
  options: string[];
  correctAnswer: string; // or flexible matching
  hint?: string;
  iconName?: string;
}

export interface Wish {
  id: number;
  title: string;
  content: string;
  emoji: string;
  highlight?: string;
}

export interface Memory {
  id: number;
  url: string;
  title: string;
  date?: string;
  location?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface SiteConfig {
  girlfriendName: string;
  boyfriendName: string;
  credentials: {
    username: string;
    password: string;
  };
  wishes: Wish[];
  questions: Question[];
  memories: Memory[];
  finalSurprise: {
    heading: string;
    subheading: string;
    loveLetter: string;
    closing: string;
  };
  audioTrackUrl: string;
}

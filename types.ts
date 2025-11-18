
export enum EssayLevel {
  MIDDLE_SCHOOL = 'Middle School',
  HIGH_SCHOOL = 'High School',
  UNIVERSITY = 'University',
  PROFESSIONAL = 'Professional / CSS',
}

export enum EssayLength {
  SHORT = 'Short (approx. 300 words)',
  MEDIUM = 'Medium (approx. 600 words)',
  LONG = 'Long (approx. 1000 words)',
  CUSTOM = 'Custom Word Count',
}

export enum TargetLanguage {
  ENGLISH = 'English (Default)',
  SPANISH = 'Spanish',
  FRENCH = 'French',
  GERMAN = 'German',
  CHINESE_SIMPLIFIED = 'Chinese (Simplified)',
  JAPANESE = 'Japanese',
  ARABIC = 'Arabic',
  HINDI = 'Hindi',
  // Add more languages as needed
}

export interface EssayParagraph {
  heading: string;
  content: string;
}

export interface SampleEssay {
  topic: string;
  level: EssayLevel;
  essayLength: EssayLength;
  customWordCount?: string;
  targetLanguage: TargetLanguage;
  requirements: string;
  essayContent: EssayParagraph[];
}

export interface HistoryEntry extends SampleEssay {
  id: string;
  timestamp: string;
}

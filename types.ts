
export enum AppScreen {
  WELCOME,
  INSTRUCTIONS,
  QUESTIONNAIRE,
  RESULTS,
  HISTORY,
}

export enum ProfileType {
  D = 'D',
  I = 'I',
  S = 'S',
  C = 'C',
}

export interface Question {
  id: number;
  characteristics: string;
  profile: ProfileType;
}

export interface QuestionBlock {
  id: number;
  questions: Question[];
}

export type Answers = Record<number, number>;

export interface Score {
  profile: ProfileType;
  value: number;
}

export interface HistoryItem {
  id: string;
  participantName: string;
  answers: Answers;
  date: string;
  analysis?: string; // Armazena a análise gerada pela IA
}
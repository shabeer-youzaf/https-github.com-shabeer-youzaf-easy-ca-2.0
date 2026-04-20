
export interface BaseQuestion {
  id: string;
  marks: number;
  explanation: string;
  topic: string;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single';
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface MultiChoiceQuestion extends BaseQuestion {
  type: 'multi';
  question: string;
  options: string[];
  correctAnswers: string[];
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  question: string;
  pairs: MatchingPair[];
}

export interface DropdownPart {
  text?: string;
  options?: string[];
  correctAnswer?: string;
}

export interface DropdownQuestion extends BaseQuestion {
  type: 'dropdown';
  question: string; // General instruction
  parts: DropdownPart[];
}

// Flattened Scenario Question for easier rendering logic
// In this app, we will treat a Scenario as a container that renders multiple sub-questions
export interface ScenarioQuestion {
  id: string;
  type: 'scenario';
  topic: string;
  scenario: string;
  questions: (SingleChoiceQuestion | MultiChoiceQuestion | MatchingQuestion | DropdownQuestion)[];
}

export type MockQuestion = SingleChoiceQuestion | MultiChoiceQuestion | MatchingQuestion | DropdownQuestion | ScenarioQuestion;

// User Answer Types
export type SingleAnswer = string;
export type MultiAnswer = string[];
export type MatchingAnswer = Record<string, string>; // { leftText: rightText }
export type DropdownAnswer = Record<number, string>; // { partIndex: selectedOption }

export type UserAnswerValue = SingleAnswer | MultiAnswer | MatchingAnswer | DropdownAnswer;

export interface UserAnswer {
  questionId: string;
  answer: UserAnswerValue;
}

// Existing Chapter types (unchanged)
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'tricky';
  rephrase?: {
    question: string;
    options: string[];
    correctAnswer: string;
  }
}

export interface Chapter {
  id: number;
  subjectId: string;
  title: string;
  description: string;
  content: {
    explanation: {
      english: string;
      malayalam: string;
    };
    memoryTechniques: {
      title: string;
      english: string;
      malayalam: string;
    };
    examTips: {
      title: string;
      english: string;
      malayalam: string;
    };
    questions: Question[];
  };
  malayalamAudioUrl?: string; // Added for audio lesson
}
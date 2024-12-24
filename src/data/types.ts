export interface Phrase {
  text: string;
  translation: string; // 添加短语的中文翻译
}

export interface Word {
  spanish: string;
  meaning: string;
  phrase: Phrase;
  distractors: string[];
}

export interface Unit {
  id: number;
  title: string;
  description: string;
  words: Word[];
}
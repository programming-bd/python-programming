export interface Section {
  id: string;
  title: string;
  content: string;
  code?: {
    language: string;
    content: string;
  };
  note?: string;
}

export interface Chapter {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  sections: Section[];
}

export interface Book {
  title: string;
  subtitle: string;
  author: string;
  edition: string;
  year: string;
  description: string;
  coverQuote: string;
  chapters: Chapter[];
}

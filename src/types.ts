export interface Student {
  id: string;
  name: string;
  techStack: string[];
  github?: string;
  linkedin?: string;
  twitter?: string;
  image: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  image: string;
  author: string;
}

export interface Memory {
  id: string;
  url: string;
  caption: string;
  type: 'image' | 'video';
}

export interface Message {
  id: string;
  text: string;
  author: string;
  timestamp: number;
  color: string;
}

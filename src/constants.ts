import { Student, Project, Memory } from './types';

export const STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    techStack: ['React', 'Node.js', 'TypeScript'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    image: 'https://picsum.photos/seed/alex/400/400'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    techStack: ['Python', 'Django', 'AI/ML'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    image: 'https://picsum.photos/seed/sarah/400/400'
  },
  {
    id: '3',
    name: 'Jordan Smith',
    techStack: ['Flutter', 'Firebase', 'Dart'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    image: 'https://picsum.photos/seed/jordan/400/400'
  },
  {
    id: '4',
    name: 'Priya Sharma',
    techStack: ['Java', 'Spring Boot', 'AWS'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    image: 'https://picsum.photos/seed/priya/400/400'
  },
  {
    id: '5',
    name: 'Liam Wilson',
    techStack: ['Go', 'Kubernetes', 'Docker'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    image: 'https://picsum.photos/seed/liam/400/400'
  },
  {
    id: '6',
    name: 'Elena Rodriguez',
    techStack: ['UI/UX', 'Figma', 'React'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    image: 'https://picsum.photos/seed/elena/400/400'
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nexus AI',
    description: 'A collaborative AI platform for real-time code generation and pair programming.',
    techStack: ['Next.js', 'OpenAI', 'Socket.io'],
    author: 'Alex Rivera',
    image: 'https://picsum.photos/seed/nexus/800/450'
  },
  {
    id: '2',
    title: 'EcoTrack',
    description: 'IoT based solution for monitoring and reducing carbon footprint in smart cities.',
    techStack: ['React Native', 'Node.js', 'IoT'],
    author: 'Sarah Chen',
    image: 'https://picsum.photos/seed/eco/800/450'
  },
  {
    id: '3',
    title: 'CryptoVault',
    description: 'Secure decentralized wallet with multi-signature support and hardware integration.',
    techStack: ['Solidity', 'Web3.js', 'React'],
    author: 'Liam Wilson',
    image: 'https://picsum.photos/seed/crypto/800/450'
  }
];

export const MEMORIES: Memory[] = [
  { id: '1', url: 'https://picsum.photos/seed/mem1/600/800', caption: 'First Day at Campus', type: 'image' },
  { id: '2', url: 'https://picsum.photos/seed/mem2/800/600', caption: 'Hackathon 2025', type: 'image' },
  { id: '3', url: 'https://picsum.photos/seed/mem3/600/600', caption: 'Coffee Breaks', type: 'image' },
  { id: '4', url: 'https://picsum.photos/seed/mem4/700/900', caption: 'Project Submissions', type: 'image' },
  { id: '5', url: 'https://picsum.photos/seed/mem5/900/700', caption: 'Batch Trip', type: 'image' },
  { id: '6', url: 'https://picsum.photos/seed/mem6/600/800', caption: 'Late Night Coding', type: 'image' }
];

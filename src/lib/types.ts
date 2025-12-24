import type { LucideIcon } from 'lucide-react';

export type Role = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: {
    id: string;
    url: string;
    hint: string;
  };
};

export type Task = {
  id: string;
  roleId: string;
  title: string;
  description: string;
  task: string;
};

export type Submission = {
  id: string;
  taskId: string;
  roleId: string;
  submittedAt: string;
  submissionText: string;
  feedback: string;
};

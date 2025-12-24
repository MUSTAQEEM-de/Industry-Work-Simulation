import type { Role, Task, Submission } from '@/lib/types';
import { Briefcase, Code2, PenTool } from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';

const softwareEngineerImage = PlaceHolderImages.find(p => p.id === 'software-engineer');
const uxDesignerImage = PlaceHolderImages.find(p => p.id === 'ux-designer');
const productManagerImage = PlaceHolderImages.find(p => p.id === 'product-manager');

export const roles: Role[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Build and maintain web applications, focusing on functionality and performance.',
    icon: Code2,
    image: {
      id: softwareEngineerImage!.id,
      url: softwareEngineerImage!.imageUrl,
      hint: softwareEngineerImage!.imageHint,
    },
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Design intuitive and engaging user experiences for digital products.',
    icon: PenTool,
    image: {
      id: uxDesignerImage!.id,
      url: uxDesignerImage!.imageUrl,
      hint: uxDesignerImage!.imageHint,
    },
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Define product vision, strategy, and roadmap to drive business goals.',
    icon: Briefcase,
    image: {
      id: productManagerImage!.id,
      url: productManagerImage!.imageUrl,
      hint: productManagerImage!.imageHint,
    },
  },
];

export const tasks: Task[] = [
  {
    id: 'build-api',
    roleId: 'software-engineer',
    title: 'Build a REST API Endpoint',
    description: 'Develop a new REST API endpoint to fetch user profile data.',
    task: 'Your task is to create a secure and efficient REST API endpoint using Node.js and Express. The endpoint should handle GET requests to `/api/users/:id` and return the user profile for the given ID from a mock database. Include error handling for cases where the user is not found.',
  },
  {
    id: 'refactor-component',
    roleId: 'software-engineer',
    title: 'Refactor a React Component',
    description: 'Improve the performance and readability of an existing React component.',
    task: 'You are given a large, monolithic React component that fetches and displays a list of articles. Your task is to refactor this component. Break it down into smaller, reusable components. Implement memoization where appropriate and use custom hooks to handle data fetching and state management logic. The goal is to make the code more modular, performant, and easier to maintain.',
  },
  {
    id: 'login-screen',
    roleId: 'ux-designer',
    title: 'Design a Login Screen',
    description: 'Create a wireframe and a high-fidelity mockup for a mobile app login screen.',
    task: 'You need to design a login screen for a new social media mobile app. Your submission should be a written description of your design, including the elements you chose to include, the layout, and the rationale behind your design decisions. Describe the user flow for both new user sign-up and existing user login. Consider accessibility and usability best practices in your design description.',
  },
  {
    id: 'onboarding-flow',
    roleId: 'ux-designer',
    title: 'Design a User Onboarding Flow',
    description: 'Create a user-friendly onboarding experience for a new productivity app.',
    task: 'Describe the user onboarding flow for a new project management tool. Your goal is to guide new users through the initial setup and introduce them to key features. Detail the steps in the flow, from account creation to creating their first project. Explain the design choices you made to ensure the process is intuitive and encourages user engagement.',
  },
  {
    id: 'feature-prd',
    roleId: 'product-manager',
    title: 'Write a Product Requirements Document (PRD)',
    description: 'Draft a PRD for a new "Teams" feature in a project management tool.',
    task: 'Write a Product Requirements Document (PRD) for a new "Teams" feature. This feature will allow users to create and manage teams, assign tasks to teams, and view team-based analytics. Your PRD should include the problem statement, goals and objectives, user stories, feature requirements, and success metrics. Be clear, concise, and thorough.',
  },
  {
    id: 'product-roadmap',
    roleId: 'product-manager',
    title: 'Develop a 6-Month Product Roadmap',
    description: 'Create a strategic product roadmap for an e-commerce platform.',
    task: 'You are the product manager for a growing e-commerce website. Develop a 6-month product roadmap outlining the key initiatives and features you plan to launch. Your roadmap description should be theme-based (e.g., "Improve Checkout Experience", "Enhance Personalization"). For each theme, list the specific features, the problem they solve, and the expected impact. Justify the prioritization of your initiatives.',
  },
];

export const history: Submission[] = [
  {
    id: 'hist-1',
    taskId: 'build-api',
    roleId: 'software-engineer',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    submissionText: 'Here is my implementation of the REST API endpoint...',
    feedback: 'Great start! Your Express setup is clean. Consider adding input validation for the user ID to prevent potential security vulnerabilities. Also, your error handling could be more specific, returning a 404 for not found and a 500 for server errors.',
  },
  {
    id: 'hist-2',
    taskId: 'login-screen',
    roleId: 'ux-designer',
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    submissionText: 'I designed the login screen with a minimalist approach...',
    feedback: "Your focus on minimalism is excellent and creates a clean look. The user flow is logical. A key area for improvement would be to provide clearer social login options and ensure the 'Forgot Password' link is more prominent. Think about the user's state of mind when they can't log in.",
  },
  {
    id: 'hist-3',
    taskId: 'feature-prd',
    roleId: 'product-manager',
    submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    submissionText: 'This PRD outlines the new "Teams" feature, including user stories and success metrics...',
    feedback: 'This is a very comprehensive PRD. The user stories are well-defined and the success metrics are measurable. To make it even stronger, consider adding a section on non-goals to clarify the scope and manage stakeholder expectations effectively. Also, including some low-fidelity wireframes or user flow diagrams would help visualize the feature.',
  },
];

export function getRole(id: string) {
  return roles.find(role => role.id === id);
}

export function getTasksForRole(roleId: string) {
  return tasks.filter(task => task.roleId === roleId);
}

export function getTask(id: string) {
  return tasks.find(task => task.id === id);
}

export function getSubmissionHistory() {
  return history;
}

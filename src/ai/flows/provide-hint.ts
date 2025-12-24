'use server';

/**
 * @fileOverview AI-powered hint provider for simulation tasks.
 *
 * - provideHint - A function to generate a hint for a given task and question.
 * - ProvideHintInput - Input type for the provideHint function.
 * - ProvideHintOutput - Return type for the provideHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideHintInputSchema = z.object({
  taskDescription: z.string().describe('The description of the task the student is working on.'),
  userQuestion: z.string().describe('The user\'s question or request for a hint.'),
});
export type ProvideHintInput = z.infer<typeof ProvideHintInputSchema>;

const ProvideHintOutputSchema = z.object({
  hint: z.string().describe('A helpful hint that guides the user without giving away the direct answer.'),
});
export type ProvideHintOutput = z.infer<typeof ProvideHintOutputSchema>;

export async function provideHint(
  input: ProvideHintInput
): Promise<ProvideHintOutput> {
  return provideHintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideHintPrompt',
  input: {schema: ProvideHintInputSchema},
  output: {schema: ProvideHintOutputSchema},
  prompt: `You are an AI Mentor for a work simulation platform. A user is asking for a hint on a task.

Your goal is to guide them, not to give them the answer. Provide a helpful suggestion, ask a clarifying question, or point them to a relevant concept.

Task Description:
"{{taskDescription}}"

User's Question:
"{{userQuestion}}"

Generate a short, encouraging hint (2-3 sentences max) to help them move forward.`,
});

const provideHintFlow = ai.defineFlow(
  {
    name: 'provideHintFlow',
    inputSchema: ProvideHintInputSchema,
    outputSchema: ProvideHintOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

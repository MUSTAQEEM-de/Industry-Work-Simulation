'use server';

/**
 * @fileOverview AI-powered personalized feedback on student submissions.
 *
 * - providePersonalizedFeedback - A function to generate feedback on student submissions.
 * - PersonalizedFeedbackInput - Input type for the providePersonalizedFeedback function.
 * - PersonalizedFeedbackOutput - Return type for the providePersonalizedFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFeedbackInputSchema = z.object({
  submissionText: z
    .string()
    .describe('The text of the student submission.'),
  taskDescription: z
    .string()
    .describe('The description of the task the student was completing.'),
  role: z
    .string()
    .describe('The role the student is simulating in this task.'),
});
export type PersonalizedFeedbackInput = z.infer<
  typeof PersonalizedFeedbackInputSchema
>;

const PersonalizedFeedbackOutputSchema = z.object({
  feedback: z
    .string()
    .describe(
      'Personalized feedback on the student submission, including strengths and weaknesses.'
    ),
});
export type PersonalizedFeedbackOutput = z.infer<
  typeof PersonalizedFeedbackOutputSchema
>;

export async function providePersonalizedFeedback(
  input: PersonalizedFeedbackInput
): Promise<PersonalizedFeedbackOutput> {
  return providePersonalizedFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFeedbackPrompt',
  input: {schema: PersonalizedFeedbackInputSchema},
  output: {schema: PersonalizedFeedbackOutputSchema},
  prompt: `You are an AI-powered mentor providing personalized feedback to students on their work.

  The student is currently simulating the role of a {{role}} and has submitted the following for the task: {{taskDescription}}.

  Submission: {{{submissionText}}}

  Provide detailed feedback to the student, highlighting their strengths and areas for improvement.
  Focus on actionable steps the student can take to improve their skills and understanding.
`,
});

const providePersonalizedFeedbackFlow = ai.defineFlow(
  {
    name: 'providePersonalizedFeedbackFlow',
    inputSchema: PersonalizedFeedbackInputSchema,
    outputSchema: PersonalizedFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

"use server";

import { providePersonalizedFeedback } from "@/ai/flows/provide-personalized-feedback";
import { z } from "zod";

const submissionSchema = z.object({
  submissionText: z.string().min(10, "Submission is too short."),
  taskDescription: z.string(),
  role: z.string(),
});

export type FormState = {
  feedback?: string;
  error?: string;
  success: boolean;
};

export async function getAIFeedback(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedData = submissionSchema.safeParse({
      submissionText: formData.get("submissionText"),
      taskDescription: formData.get("taskDescription"),
      role: formData.get("role"),
    });

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.errors.map((e) => e.message).join(", "),
      };
    }

    const result = await providePersonalizedFeedback(validatedData.data);

    if (result.feedback) {
      return {
        success: true,
        feedback: result.feedback,
      };
    } else {
      return {
        success: false,
        error: "Failed to generate feedback. Please try again.",
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}

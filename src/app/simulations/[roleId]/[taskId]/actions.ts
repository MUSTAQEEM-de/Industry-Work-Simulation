"use server";

import { providePersonalizedFeedback } from "@/ai/flows/provide-personalized-feedback";
import { provideHint } from "@/ai/flows/provide-hint";
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

const hintSchema = z.object({
  taskDescription: z.string(),
  userQuestion: z.string().min(5, "Question is too short."),
});

export type HintState = {
  hint?: string;
  error?: string;
  success: boolean;
};

export async function getAIHint(
  prevState: HintState,
  formData: FormData
): Promise<HintState> {
  try {
    const validatedData = hintSchema.safeParse({
      taskDescription: formData.get("taskDescription"),
      userQuestion: formData.get("userQuestion"),
    });

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.errors.map((e) => e.message).join(", "),
      };
    }

    const result = await provideHint(validatedData.data);

    if (result.hint) {
      return {
        success: true,
        hint: result.hint,
      };
    } else {
      return {
        success: false,
        error: "Failed to generate a hint. Please try again.",
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

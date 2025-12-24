"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getAIFeedback, type FormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bot, LoaderCircle, Sparkles, RefreshCw } from "lucide-react";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Task, Role } from "@/lib/types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Getting Feedback...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Submit for Feedback
        </>
      )}
    </Button>
  );
}

type SimulationFormProps = {
  task: Task;
  role: Role;
};

export default function SimulationForm({ task, role }: SimulationFormProps) {
  const initialState: FormState = { success: false };
  const [state, formAction] = useFormState(getAIFeedback, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state.success && state.error) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: state.error,
      });
    }
  }, [state, toast]);

  const handleReset = () => {
    formRef.current?.reset();
    // A bit of a trick to reset the form state
    formAction(new FormData());
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Task</h2>
        <Card>
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription className="pt-2">{task.task}</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction}>
              <input type="hidden" name="taskDescription" value={task.task} />
              <input type="hidden" name="role" value={role.title} />
              <Textarea
                name="submissionText"
                placeholder={`Enter your response for the ${role.title} task here...`}
                rows={15}
                className="mb-4"
                disabled={state.success}
              />
              {!state.success && <SubmitButton />}
            </form>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">AI Mentor Feedback</h2>
        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="text-accent" />
              Feedback
            </CardTitle>
            <CardDescription>
              {state.success
                ? "Here is your personalized feedback."
                : "Submit your work to receive feedback from your AI mentor."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {state.success && state.feedback ? (
              <>
                <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-secondary/50 rounded-md whitespace-pre-wrap">
                  {state.feedback}
                </div>
                 <Button onClick={handleReset} variant="outline" className="mt-4">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </>
            ) : (
              <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
                Awaiting your submission...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

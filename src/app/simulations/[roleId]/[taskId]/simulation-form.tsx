
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { getAIFeedback, type FormState, getAIHint, type HintState } from "./actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bot, LoaderCircle, Sparkles, RefreshCw, Lightbulb, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Task } from "@/lib/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

function HintSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="sm">
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Getting Hint...
        </>
      ) : (
        <>
          <Lightbulb className="mr-2 h-4 w-4" />
          Get Hint
        </>
      )}
    </Button>
  );
}


type SimulationFormProps = {
  task: Task;
  roleTitle: string;
};

export default function SimulationForm({ task, roleTitle }: SimulationFormProps) {
  const initialFeedbackState: FormState = { success: false };
  const [feedbackState, feedbackFormAction] = useActionState(getAIFeedback, initialFeedbackState);
  
  const initialHintState: HintState = { success: false };
  const [hintState, hintFormAction] = useActionState(getAIHint, initialHintState);

  const { toast } = useToast();
  const feedbackFormRef = useRef<HTMLFormElement>(null);
  const hintFormRef = useRef<HTMLFormElement>(null);
  const [showHintArea, setShowHintArea] = useState(false);

  useEffect(() => {
    if (!feedbackState.success && feedbackState.error) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: feedbackState.error,
      });
    }
  }, [feedbackState, toast]);

  useEffect(() => {
    if (!hintState.success && hintState.error) {
      toast({
        variant: "destructive",
        title: "Hint Error",
        description: hintState.error,
      });
    }
    if (hintState.success && hintState.hint) {
      hintFormRef.current?.reset();
    }
  }, [hintState, toast]);

  const handleReset = () => {
    feedbackFormRef.current?.reset();
    // This is not a standard way to reset useFormState. A better approach might be needed
    // if we need to clear the feedback from the UI upon reset.
    // For now, we just reset the form inputs.
    const newFormData = new FormData();
    feedbackFormAction(newFormData);
    hintFormAction(new FormData());
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
            <form ref={feedbackFormRef} action={feedbackFormAction}>
              <input type="hidden" name="taskDescription" value={task.task} />
              <input type="hidden" name="role" value={roleTitle} />
              <Textarea
                name="submissionText"
                placeholder={`Enter your response for the ${roleTitle} task here...`}
                rows={15}
                className="mb-4"
                disabled={feedbackState.success}
              />
              {!feedbackState.success && <SubmitButton />}
            </form>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">AI Mentor</h2>
        <Collapsible className="mb-4">
          <CollapsibleTrigger asChild>
             <Button variant="outline" onClick={() => setShowHintArea(!showHintArea)}>
              <HelpCircle className="mr-2 h-4 w-4" />
              {showHintArea ? 'Close Live Assistance' : 'Need a hint? Ask our AI Mentor!'}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="mt-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="text-accent" />
                  Live Assistance
                </CardTitle>
                 <CardDescription>
                  Stuck? Ask a question and get a hint from your AI mentor.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={hintFormAction} ref={hintFormRef} className="space-y-4">
                  <input type="hidden" name="taskDescription" value={task.task} />
                  <Textarea
                    name="userQuestion"
                    placeholder="e.g., 'Where should I start?' or 'What's the best way to handle error cases?'"
                    rows={3}
                  />
                  <HintSubmitButton />
                </form>
                {hintState.success && hintState.hint && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Hint:</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-secondary/50 rounded-md">
                      {hintState.hint}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
        
        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="text-accent" />
              Submission Feedback
            </CardTitle>
            <CardDescription>
              {feedbackState.success
                ? "Here is your personalized feedback."
                : "Submit your work to receive feedback from your AI mentor."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {feedbackState.success && feedbackState.feedback ? (
              <>
                <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-secondary/50 rounded-md whitespace-pre-wrap">
                  {feedbackState.feedback}
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

"use client";

import { useState } from "react";
import { getSubmissionHistory, getTask, getRole } from "@/lib/data";
import type { Submission } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Eye } from "lucide-react";

export default function HistoryPage() {
  const history = getSubmissionHistory();
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const handleViewDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
  };

  const currentTask = selectedSubmission ? getTask(selectedSubmission.taskId) : null;
  const currentRole = selectedSubmission ? getRole(selectedSubmission.roleId) : null;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Simulation History</h1>
        <p className="text-muted-foreground mt-1">
          Review your past submissions and feedback.
        </p>
      </header>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Task</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((submission) => {
              const task = getTask(submission.taskId);
              const role = getRole(submission.roleId);
              return (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{role?.title}</TableCell>
                  <TableCell>{task?.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(submission.submittedAt), "MMMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewDetails(submission)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedSubmission} onOpenChange={(isOpen) => !isOpen && setSelectedSubmission(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentTask?.title}</DialogTitle>
            <DialogDescription>
              Feedback for your submission as a {currentRole?.title}.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="grid gap-6 py-4">
              <div>
                <h3 className="font-semibold mb-2">Your Submission</h3>
                <p className="text-sm text-muted-foreground bg-secondary p-4 rounded-md whitespace-pre-wrap font-mono">
                  {selectedSubmission?.submissionText}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">AI Mentor Feedback</h3>
                <p className="text-sm bg-background border p-4 rounded-md whitespace-pre-wrap">
                  {selectedSubmission?.feedback}
                </p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

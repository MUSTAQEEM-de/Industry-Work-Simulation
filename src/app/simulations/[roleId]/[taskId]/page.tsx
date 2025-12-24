import { getRole, getTask } from "@/lib/data";
import { notFound } from "next/navigation";
import SimulationForm from "./simulation-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type SimulationTaskPageProps = {
  params: {
    roleId: string;
    taskId: string;
  };
};

export default function SimulationTaskPage({ params }: SimulationTaskPageProps) {
  const role = getRole(params.roleId);
  const task = getTask(params.taskId);

  if (!role || !task || task.roleId !== role.id) {
    notFound();
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <Button asChild variant="ghost" className="mb-4 -ml-4">
          <Link href={`/simulations/${role.id}`}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Tasks
          </Link>
        </Button>
        <div className="flex items-center gap-4">
           <role.icon className="w-10 h-10 text-primary" />
          <div>
            <p className="font-semibold text-primary">{role.title}</p>
            <h1 className="text-3xl font-bold tracking-tight">{task.title}</h1>
          </div>
        </div>
      </header>

      <SimulationForm task={task} role={role} />
    </div>
  );
}

import { getRole, getTasksForRole } from "@/lib/data";
import { notFound } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type SimulationRolePageProps = {
  params: {
    roleId: string;
  };
};

export default function SimulationRolePage({ params }: SimulationRolePageProps) {
  const role = getRole(params.roleId);
  if (!role) {
    notFound();
  }

  const tasks = getTasksForRole(params.roleId);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <Button asChild variant="ghost" className="mb-4 -ml-4">
          <Link href="/dashboard">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Roles
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <role.icon className="w-10 h-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{role.title}</h1>
            <p className="text-muted-foreground mt-1">{role.description}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <h2 className="text-xl font-semibold">Available Tasks</h2>
        {tasks.map((task) => (
          <Link
            href={`/simulations/${role.id}/${task.id}`}
            key={task.id}
            className="group block"
          >
            <Card className="transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:border-primary/30">
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
                <CardDescription className="pt-1">{task.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                 <div className="flex w-full items-center justify-end text-sm font-medium text-primary group-hover:text-accent">
                  Start Task
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
         {tasks.length === 0 && (
          <p className="text-muted-foreground">No tasks available for this role yet.</p>
        )}
      </div>
    </div>
  );
}

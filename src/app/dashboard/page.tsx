import { roles } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Choose Your Role
        </h1>
        <p className="text-muted-foreground mt-1">
          Select a professional role to start your real-world work simulation.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Link
            href={`/simulations/${role.id}`}
            key={role.id}
            className="group block"
          >
            <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-primary/50">
              <div className="overflow-hidden">
                <Image
                  src={role.image.url}
                  alt={role.title}
                  width={600}
                  height={400}
                  data-ai-hint={role.image.hint}
                  className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <role.icon className="w-6 h-6 text-primary" />
                  {role.title}
                </CardTitle>
                <CardDescription className="pt-1">{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-end text-sm font-medium text-primary group-hover:text-accent">
                  Start Simulation
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

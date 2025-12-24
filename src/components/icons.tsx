import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={cn("h-6 w-6", className)}
    >
      <rect width="256" height="256" fill="none" />
      <path
        d="M44.2,197.8,113.8,50.2a15.9,15.9,0,0,1,28.4,0l69.6,147.6c-21-22-49-36.2-80.1-41.2-30.8,4.9-58.8,19-77.5,41.2Z"
        opacity="0.2"
      />
      <path
        d="M44.2,197.8,113.8,50.2a15.9,15.9,0,0,1,28.4,0l69.6,147.6a72,72,0,0,1-139.2,0Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}

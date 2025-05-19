import { cn } from "@/lib/utils";

interface StatsProps {
  label: string;
  value: number | string | undefined;
  variant?: "default" | "highlight";
}

const Stats = ({ label, value, variant = "default" }: StatsProps) => {
  return (
    <div>
      <p className="text-sm font-semibold">{label}</p>
      <p
        className={cn(
          "font-mono text-xl",
          variant === "highlight" && "font-bold text-purple-500",
        )}
      >
        {value ?? 0}
      </p>
    </div>
  );
};

export { Stats };

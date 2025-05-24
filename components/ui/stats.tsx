import { cn } from "@/lib/common";

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
          variant === "highlight" && "font-bold text-amber-500",
        )}
      >
        {value ?? 0}
      </p>
    </div>
  );
};

export { Stats };

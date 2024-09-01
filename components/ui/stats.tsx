interface StatsProps {
  label: string;
  value: number | string | undefined;
}

const Stats = ({ label, value }: StatsProps) => {
  return (
    <div>
      <p className="text-xs font-semibold">{label}</p>
      <p className="text-xl">{value ?? 0}</p>
    </div>
  );
};

export { Stats };

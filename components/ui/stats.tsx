interface StatsProps {
  label: string;
  value: number | string;
}

const Stats = ({ label, value }: StatsProps) => {
  return (
    <div>
      <p className="text-xs font-semibold">{label}</p>
      <p className="text-xl">{value}</p>
    </div>
  );
};

export { Stats };

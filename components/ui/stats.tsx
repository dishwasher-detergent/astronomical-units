import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

interface StatsProps {
  label: string;
  value: number | string;
}

const Stats = ({ label, value }: StatsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-4xl">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export { Stats };

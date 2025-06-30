import { Card, CardContent } from "../components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  gradient: string;
}

export function StatsCard({ title, value, icon: Icon, gradient }: StatsCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      <CardContent className="p-0">
        <div className={`bg-gradient-to-r ${gradient} p-4`}>
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm opacity-90">{title}</p>
              <p className="text-3xl font-bold">{value}</p>
            </div>
            <Icon className="h-8 w-8 opacity-80" />
          </div>
        </div>
        <div className="p-4 bg-white">
          <div className="flex items-center text-sm text-gray-600">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} mr-2`}></div>
            Track your progress
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

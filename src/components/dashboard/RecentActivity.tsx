import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock, Building2, MapPin } from "lucide-react";

interface Activity {
  id: string;
  type: "applied" | "interview" | "offer" | "rejected" | "updated";
  jobTitle: string;
  company: string;
  location: string;
  timestamp: string;
  status: string;
}

export function RecentActivity() {
  const activities: Activity[] = [
    {
      id: "1",
      type: "applied",
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      timestamp: "2 hours ago",
      status: "applied"
    },
    {
      id: "2",
      type: "interview",
      jobTitle: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      timestamp: "1 day ago",
      status: "interview"
    },
    {
      id: "3",
      type: "offer",
      jobTitle: "UI/UX Designer",
      company: "Design Studio",
      location: "New York, NY",
      timestamp: "2 days ago",
      status: "offer"
    },
    {
      id: "4",
      type: "updated",
      jobTitle: "Backend Developer",
      company: "Enterprise Solutions",
      location: "Austin, TX",
      timestamp: "3 days ago",
      status: "rejected"
    }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case "applied": return "bg-blue-100 text-blue-800 border-blue-200";
      case "interview": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "offer": return "bg-green-100 text-green-800 border-green-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getActivityText = (type: string) => {
    switch (type) {
      case "applied": return "Applied to";
      case "interview": return "Interview scheduled for";
      case "offer": return "Received offer from";
      case "rejected": return "Application rejected by";
      case "updated": return "Updated application for";
      default: return "Activity for";
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={getActivityColor(activity.type)}>
                    {getActivityText(activity.type)}
                  </Badge>
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{activity.jobTitle}</h4>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {activity.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {activity.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

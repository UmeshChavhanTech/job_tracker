import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Search, FileText, Calendar, Bell, Target } from "lucide-react";

interface QuickActionsProps {
  onAddJob: () => void;
}

export function QuickActions({ onAddJob }: QuickActionsProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="h-5 w-5 text-blue-600" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={onAddJob}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Application
          </Button>
          <Button variant="outline" className="h-12 border-2">
            <Search className="mr-2 h-4 w-4" />
            Job Search
          </Button>
          <Button variant="outline" className="h-12 border-2">
            <FileText className="mr-2 h-4 w-4" />
            Upload Resume
          </Button>
          <Button variant="outline" className="h-12 border-2">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Follow-up
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Bell className="h-4 w-4 text-yellow-600" />
            <span className="font-medium text-yellow-800">Today's Reminders</span>
          </div>
          <p className="text-sm text-yellow-700">
            Follow up with TechCorp Inc. about your Frontend Developer application
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

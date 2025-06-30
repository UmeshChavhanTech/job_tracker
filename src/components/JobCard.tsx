import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Building2, MapPin, Calendar, DollarSign, Edit2, Trash2, ExternalLink, Briefcase } from "lucide-react";
import { Job } from "../pages/index";

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (jobId: string) => void;
  onUpdate: (job: Job) => void;
}

const statusColors = {
  applied: "bg-blue-100 text-blue-800 border-blue-200",
  interview: "bg-yellow-100 text-yellow-800 border-yellow-200",
  offer: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  withdrawn: "bg-gray-100 text-gray-800 border-gray-200",
};

const statusLabels = {
  applied: "Applied",
  interview: "Interview",
  offer: "Offer Received",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

export function JobCard({ job, onEdit, onDelete, onUpdate }: JobCardProps) {
  const handleStatusChange = (newStatus: Job["status"]) => {
    onUpdate({ ...job, status: newStatus });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 bg-gradient-to-r from-white to-gray-50/50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl text-gray-800 mb-2 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              {job.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {job.company}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(job.dateApplied)}
              </span>
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={statusColors[job.status]}>
              {statusLabels[job.status]}
            </Badge>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(job)}
                className="h-8 w-8 p-0 hover:bg-blue-100"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(job.id)}
                className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {job.salary && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-700">{job.salary}</span>
            </div>
          )}
          
          {job.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
          )}
          
          {job.notes && (
            <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-l-blue-400">
              <p className="text-sm text-blue-800 font-medium">Notes:</p>
              <p className="text-sm text-blue-700">{job.notes}</p>
            </div>
          )}
          
          <div className="flex gap-2 flex-wrap pt-2">
            <span className="text-xs text-gray-500">Quick Status Update:</span>
            {Object.entries(statusLabels).map(([status, label]) => (
              <Button
                key={status}
                variant={job.status === status ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusChange(status as Job["status"])}
                className="h-7 px-3 text-xs"
                disabled={job.status === status}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Calendar, Target, Award } from "lucide-react";
import { Job } from "../pages/index";

interface AnalyticsCardProps {
  jobs: Job[];
  stats: {
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
  };
}

const COLORS = ['#3b82f6', '#eab308', '#10b981', '#ef4444', '#6b7280'];

export function AnalyticsCard({ jobs, stats }: AnalyticsCardProps) {
  const statusData = [
    { name: 'Applied', value: stats.applied, color: '#3b82f6' },
    { name: 'Interview', value: stats.interview, color: '#eab308' },
    { name: 'Offer', value: stats.offer, color: '#10b981' },
    { name: 'Rejected', value: stats.rejected, color: '#ef4444' },
  ].filter(item => item.value > 0);

  const monthlyData = jobs.reduce((acc, job) => {
    const month = new Date(job.dateApplied).toLocaleString('default', { month: 'short', year: '2-digit' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(monthlyData).map(([month, count]) => ({
    month,
    applications: count,
  }));

  const successRate = jobs.length > 0 ? ((stats.interview + stats.offer) / jobs.length) * 100 : 0;
  const offerRate = jobs.length > 0 ? (stats.offer / jobs.length) * 100 : 0;

  return (
    <div className="grid gap-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
              <TrendingUp className="h-5 w-5" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-900">{successRate.toFixed(1)}%</div>
              <Progress value={successRate} className="h-2" />
              <p className="text-sm text-blue-700">Interviews + Offers / Total Applications</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-green-800">
              <Award className="h-5 w-5" />
              Offer Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-900">{offerRate.toFixed(1)}%</div>
              <Progress value={offerRate} className="h-2" />
              <p className="text-sm text-green-700">Offers / Total Applications</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-purple-800">
              <Target className="h-5 w-5" />
              Active Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-900">{stats.applied + stats.interview}</div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-blue-700 border-blue-300">
                  {stats.applied} Applied
                </Badge>
                <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                  {stats.interview} Interviews
                </Badge>
              </div>
              <p className="text-sm text-purple-700">Applications in progress</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Application Status Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of your application statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {statusData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data to display
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Applications Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Applications Over Time
            </CardTitle>
            <CardDescription>
              Monthly application activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applications" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data to display
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>
            Your latest job application activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {jobs.slice(0, 5).map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{job.title}</p>
                  <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="outline" 
                    className={
                      job.status === 'offer' ? 'border-green-300 text-green-700' :
                      job.status === 'interview' ? 'border-yellow-300 text-yellow-700' :
                      job.status === 'rejected' ? 'border-red-300 text-red-700' :
                      'border-blue-300 text-blue-700'
                    }
                  >
                    {job.status}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(job.dateApplied).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

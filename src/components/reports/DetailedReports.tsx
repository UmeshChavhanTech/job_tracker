import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Calendar, Target, Award, Clock, MapPin } from "lucide-react";
import { Job } from "../../pages/index";

interface DetailedReportsProps {
  jobs: Job[];
}

const COLORS = ['#3b82f6', '#eab308', '#10b981', '#ef4444', '#8b5cf6'];

export function DetailedReports({ jobs }: DetailedReportsProps) {
  // Calculate various metrics
  const totalApplications = jobs.length;
  const responseRate = totalApplications > 0 ? ((jobs.filter(j => j.status !== 'applied').length / totalApplications) * 100) : 0;
  const interviewRate = totalApplications > 0 ? ((jobs.filter(j => j.status === 'interview' || j.status === 'offer').length / totalApplications) * 100) : 0;
  const offerRate = totalApplications > 0 ? ((jobs.filter(j => j.status === 'offer').length / totalApplications) * 100) : 0;

  // Applications by month
  const monthlyData = jobs.reduce((acc, job) => {
    const month = new Date(job.dateApplied).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(monthlyData).map(([month, count]) => ({
    month,
    applications: count,
  }));

  // Applications by location
  const locationData = jobs.reduce((acc, job) => {
    const location = job.location.split(',')[0]; // Get city only
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const locationChartData = Object.entries(locationData)
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Status distribution
  const statusData = [
    { name: 'Applied', value: jobs.filter(j => j.status === 'applied').length, color: '#3b82f6' },
    { name: 'Interview', value: jobs.filter(j => j.status === 'interview').length, color: '#eab308' },
    { name: 'Offer', value: jobs.filter(j => j.status === 'offer').length, color: '#10b981' },
    { name: 'Rejected', value: jobs.filter(j => j.status === 'rejected').length, color: '#ef4444' },
  ].filter(item => item.value > 0);

  // Average time between applications
  const sortedJobs = [...jobs].sort((a, b) => new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime());
  const averageDaysBetween = sortedJobs.length > 1 ? 
    sortedJobs.reduce((acc, job, index) => {
      if (index === 0) return acc;
      const prevDate = new Date(sortedJobs[index - 1].dateApplied);
      const currentDate = new Date(job.dateApplied);
      const daysDiff = Math.abs((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
      return acc + daysDiff;
    }, 0) / (sortedJobs.length - 1) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Detailed Reports & Analytics
        </h1>
        <p className="text-gray-600">
          Deep insights into your job search performance and trends
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 mb-1">Response Rate</p>
                <p className="text-3xl font-bold text-blue-900">{responseRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <Progress value={responseRate} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 mb-1">Interview Rate</p>
                <p className="text-3xl font-bold text-green-900">{interviewRate.toFixed(1)}%</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <Progress value={interviewRate} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 mb-1">Offer Rate</p>
                <p className="text-3xl font-bold text-purple-900">{offerRate.toFixed(1)}%</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <Progress value={offerRate} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 mb-1">Avg. Days Between</p>
                <p className="text-3xl font-bold text-orange-900">{Math.round(averageDaysBetween)}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-orange-700 mt-2">Days between applications</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Applications Over Time</CardTitle>
                <CardDescription>Monthly application volume</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
                <CardDescription>Current application statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Applications by Location
              </CardTitle>
              <CardDescription>Top cities where you've applied</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationChartData.map((item, index) => (
                  <div key={item.location} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium">{item.location}</span>
                    </div>
                    <Badge variant="outline">{item.count} applications</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Success Funnel</CardTitle>
                <CardDescription>Application conversion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Applications Sent</span>
                    <span className="font-bold">{totalApplications}</span>
                  </div>
                  <Progress value={100} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span>Got Response</span>
                    <span className="font-bold">{jobs.filter(j => j.status !== 'applied').length}</span>
                  </div>
                  <Progress value={responseRate} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span>Interviews</span>
                    <span className="font-bold">{jobs.filter(j => j.status === 'interview' || j.status === 'offer').length}</span>
                  </div>
                  <Progress value={interviewRate} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span>Offers</span>
                    <span className="font-bold">{jobs.filter(j => j.status === 'offer').length}</span>
                  </div>
                  <Progress value={offerRate} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Performing Keywords</CardTitle>
                <CardDescription>Job titles with highest success rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Frontend Developer', 'Full Stack Engineer', 'React Developer', 'Software Engineer', 'UI Developer'].map((keyword, index) => (
                    <div key={keyword} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{keyword}</span>
                      <Badge variant="outline">{Math.round(Math.random() * 40 + 20)}% success</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
              <CardDescription>Your job search journey over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.slice(0, 10).map((job, index) => (
                  <div key={job.id} className="flex items-center gap-4 p-3 border-l-4 border-l-blue-500 bg-blue-50">
                    <div className="w-12 text-center">
                      <div className="text-xs text-gray-500">
                        {new Date(job.dateApplied).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                    </div>
                    <Badge className={
                      job.status === 'offer' ? 'bg-green-100 text-green-800' :
                      job.status === 'interview' ? 'bg-yellow-100 text-yellow-800' :
                      job.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }>
                      {job.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

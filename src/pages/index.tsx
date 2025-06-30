import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Plus, Briefcase, TrendingUp, Calendar, Building2, MapPin, FileText, BarChart3, User, LogOut } from "lucide-react";
import { JobForm } from "../components/JobForm";
import { JobCard } from "../components/JobCard";
import { StatsCard } from "../components/StatsCard";
import { AnalyticsCard } from "../components/AnalyticsCard";
import { LoginForm } from "../components/auth/LoginForm";
import { SignupForm } from "../components/auth/SignupForm";
import { ResumeManager } from "../components/resume/ResumeManager";
import { QuickActions } from "../components/dashboard/QuickActions";
import { RecentActivity } from "../components/dashboard/RecentActivity";
import { DetailedReports } from "../components/reports/DetailedReports";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  status: "applied" | "interview" | "offer" | "rejected" | "withdrawn";
  salary?: string;
  dateApplied: string;
  description?: string;
  notes?: string;
}

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      status: "interview",
      salary: "$80,000 - $100,000",
      dateApplied: "2024-01-15",
      description: "Looking for a passionate frontend developer to join our team.",
      notes: "Second round interview scheduled for next week"
    },
    {
      id: "2",
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      status: "applied",
      salary: "$90,000 - $120,000",
      dateApplied: "2024-01-10",
      description: "Full stack role with React and Node.js focus."
    },
    {
      id: "3",
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "New York, NY",
      status: "offer",
      salary: "$70,000 - $85,000",
      dateApplied: "2024-01-05",
      description: "Creative UI/UX designer position in a fast-paced environment."
    },
    {
      id: "4",
      title: "Backend Developer",
      company: "Enterprise Solutions",
      location: "Austin, TX",
      status: "rejected",
      salary: "$95,000 - $110,000",
      dateApplied: "2024-01-01",
      description: "Backend developer role focusing on scalable systems."
    },
    {
      id: "5",
      title: "React Developer",
      company: "Innovation Labs",
      location: "Seattle, WA",
      status: "interview",
      salary: "$85,000 - $105,000",
      dateApplied: "2023-12-28",
      description: "React specialist for modern web applications."
    }
  ]);

  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to false to show auth
  const [showLogin, setShowLogin] = useState(true);
  const [currentUser, setCurrentUser] = useState({ name: "John Doe", email: "john@example.com" });

  const addJob = (jobData: Omit<Job, "id">) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
    };
    setJobs([newJob, ...jobs]);
    setShowJobForm(false);
  };

  const updateJob = (updatedJob: Job) => {
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
    setEditingJob(null);
  };

  const deleteJob = (jobId: string) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const getStatusStats = () => {
    const stats = {
      applied: jobs.filter(job => job.status === "applied").length,
      interview: jobs.filter(job => job.status === "interview").length,
      offer: jobs.filter(job => job.status === "offer").length,
      rejected: jobs.filter(job => job.status === "rejected").length,
    };
    return stats;
  };

  const handleLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
    setCurrentUser({ name: "John Doe", email });
  };

  const handleSignup = (name: string, email: string, password: string) => {
    setIsAuthenticated(true);
    setCurrentUser({ name, email });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser({ name: "", email: "" });
  };

  const handleForgotPassword = () => {
    alert("Password reset functionality would be implemented here");
  };

  // Show authentication screens if not authenticated
  if (!isAuthenticated) {
    return showLogin ? (
      <LoginForm
        onLogin={handleLogin}
        onSwitchToSignup={() => setShowLogin(false)}
        onForgotPassword={handleForgotPassword}
      />
    ) : (
      <SignupForm
        onSignup={handleSignup}
        onSwitchToLogin={() => setShowLogin(true)}
      />
    );
  }

  const stats = getStatusStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with User Info */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Career Compass Tracker
            </h1>
            <p className="text-lg text-gray-600">
              Welcome back, {currentUser.name}! Track your job applications and land your dream career
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              {currentUser.name}
            </div>
            <Button variant="outline" onClick={handleLogout} className="text-red-600 hover:bg-red-50">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Applications" 
            value={jobs.length} 
            icon={Briefcase}
            gradient="from-blue-500 to-blue-600"
          />
          <StatsCard 
            title="Interviews" 
            value={stats.interview} 
            icon={Calendar}
            gradient="from-green-500 to-green-600"
          />
          <StatsCard 
            title="Offers" 
            value={stats.offer} 
            icon={TrendingUp}
            gradient="from-purple-500 to-purple-600"
          />
          <StatsCard 
            title="Response Rate" 
            value={`${jobs.length > 0 ? Math.round(((stats.interview + stats.offer) / jobs.length) * 100) : 0}%`} 
            icon={TrendingUp}
            gradient="from-orange-500 to-orange-600"
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="resumes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Resumes
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <RecentActivity />
                <AnalyticsCard jobs={jobs} stats={stats} />
              </div>
              <div className="space-y-6">
                <QuickActions onAddJob={() => setShowJobForm(true)} />
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div>
                          <p className="font-medium text-yellow-800">Follow-up with TechCorp</p>
                          <p className="text-sm text-yellow-600">Due tomorrow</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">Urgent</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div>
                          <p className="font-medium text-blue-800">Interview Prep</p>
                          <p className="text-sm text-blue-600">Due in 3 days</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">Medium</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Job Applications ({jobs.length})</h2>
              <Button 
                onClick={() => setShowJobForm(true)} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add New Application
              </Button>
            </div>
            
            <div className="grid gap-6">
              {jobs.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Briefcase className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Applications Yet</h3>
                    <p className="text-gray-500 mb-4">Start tracking your job applications to see them here.</p>
                    <Button onClick={() => setShowJobForm(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Application
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onEdit={setEditingJob}
                      onDelete={deleteJob}
                      onUpdate={updateJob}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="resumes">
            <ResumeManager />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsCard jobs={jobs} stats={stats} />
          </TabsContent>

          <TabsContent value="reports">
            <DetailedReports jobs={jobs} />
          </TabsContent>
        </Tabs>

        {/* Job Form Modal */}
{(showJobForm || editingJob) && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <JobForm
        job={editingJob ?? undefined}
        onSubmit={(jobData) => {
          if (editingJob) {
            updateJob(jobData as Job);
          } else {
            addJob(jobData as Omit<Job, "id">);
          }
        }}
        onCancel={() => {
          setShowJobForm(false);
          setEditingJob(null);
        }}
      />
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Index;

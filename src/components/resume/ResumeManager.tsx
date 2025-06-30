import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "..//ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Upload, FileText, Edit2, Trash2, Download, Eye, Plus, Star } from "lucide-react";

interface Resume {
  id: string;
  name: string;
  version: string;
  uploadDate: string;
  fileSize: string;
  isDefault: boolean;
  jobsApplied: number;
  tags: string[];
}

export function ResumeManager() {
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: "1",
      name: "Software Engineer - Tech Focus",
      version: "v2.1",
      uploadDate: "2024-01-15",
      fileSize: "245 KB",
      isDefault: true,
      jobsApplied: 12,
      tags: ["Frontend", "React", "JavaScript"]
    },
    {
      id: "2",
      name: "Full Stack Developer",
      version: "v1.3",
      uploadDate: "2024-01-10",
      fileSize: "238 KB",
      isDefault: false,
      jobsApplied: 8,
      tags: ["Full Stack", "Node.js", "MongoDB"]
    },
    {
      id: "3",
      name: "UI/UX Developer",
      version: "v1.0",
      uploadDate: "2024-01-05",
      fileSize: "251 KB",
      isDefault: false,
      jobsApplied: 5,
      tags: ["UI/UX", "Design", "Figma"]
    }
  ]);

  const handleSetDefault = (resumeId: string) => {
    setResumes(resumes.map(resume => ({
      ...resume,
      isDefault: resume.id === resumeId
    })));
  };

  const handleDelete = (resumeId: string) => {
    setResumes(resumes.filter(resume => resume.id !== resumeId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Resume Manager
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your resumes and optimize them for different job applications
        </p>
        
        <div className="flex gap-4">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Upload className="mr-2 h-4 w-4" />
            Upload New Resume
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Create from Template
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">All Resumes ({resumes.length})</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-6">
            {resumes.map((resume) => (
              <Card key={resume.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-600" />
                          {resume.name}
                        </CardTitle>
                        {resume.isDefault && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <Star className="h-3 w-3 mr-1" />
                            Default
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center gap-4 text-sm">
                        <span>Version {resume.version}</span>
                        <span>•</span>
                        <span>Uploaded {new Date(resume.uploadDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{resume.fileSize}</span>
                        <span>•</span>
                        <span className="text-blue-600 font-medium">{resume.jobsApplied} jobs applied</span>
                      </CardDescription>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(resume.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex gap-2 flex-wrap mb-4">
                    {resume.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    {!resume.isDefault && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSetDefault(resume.id)}
                      >
                        <Star className="h-3 w-3 mr-1" />
                        Set as Default
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Use for Application
                    </Button>
                    <Button variant="outline" size="sm">
                      Duplicate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Template cards would go here */}
            <Card className="border-dashed border-2 hover:border-blue-500 transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <Plus className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="font-semibold text-gray-700 mb-2">Software Engineer Template</h3>
                <p className="text-sm text-gray-500">Perfect for tech roles</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Performance</CardTitle>
                <CardDescription>Track which resumes perform best</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resumes.map((resume) => (
                    <div key={resume.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{resume.name}</h4>
                        <p className="text-sm text-gray-600">{resume.jobsApplied} applications</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {Math.round((Math.random() * 30) + 10)}%
                        </p>
                        <p className="text-sm text-gray-600">Response rate</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

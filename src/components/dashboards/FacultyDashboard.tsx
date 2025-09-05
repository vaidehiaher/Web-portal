import React from 'react'
import { Layout } from '../../components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { 
  Users, 
  FileText, 
  Award, 
  TrendingUp,
  MessageSquare,
  BookOpen,
  CheckCircle,
  Clock,
  QrCode,
  FolderOpen
} from 'lucide-react'

export function FacultyDashboard() {
  const lorRequests = [
    { id: '1', student: 'Gaurav Agrawal', purpose: 'Graduate School Application', status: 'pending', date: '2024-01-15' },
    { id: '2', student: 'Pankaj Borkar', purpose: 'Scholarship Application', status: 'completed', date: '2024-01-10' },
    { id: '3', student: 'Jaya Raut', purpose: 'Job Application', status: 'in-progress', date: '2024-01-20' }
  ]

  const miniProjects = [
    { id: '1', title: 'AI-Powered Resume Parser', student: 'Gaurav Agrawal', status: 'in-progress', progress: 75, deadline: '2024-03-15' },
    { id: '2', title: 'Blockchain-based Certificate Verification', student: 'Pankaj Borkar', status: 'completed', progress: 100, deadline: '2024-02-28' },
    { id: '3', title: 'IoT Smart Campus System', student: 'Jaya Raut', status: 'planning', progress: 25, deadline: '2024-04-20' }
  ]

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
          <p className="text-muted-foreground">
            Manage LOR requests and track mini projects.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending LORs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">LORs Issued</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Mini projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="lor">LOR Management</TabsTrigger>
            <TabsTrigger value="projects">Mini Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Pending LOR Requests</CardTitle>
                  <CardDescription>Recent requests requiring your attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lorRequests.filter(req => req.status === 'pending').map(request => (
                    <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{request.student}</p>
                        <p className="text-xs text-muted-foreground">{request.purpose}</p>
                      </div>
                      <Button size="sm">Review</Button>
                    </div>
                  ))}
                  {lorRequests.filter(req => req.status === 'pending').length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No pending requests
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Mini Projects</CardTitle>
                  <CardDescription>Projects currently in progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {miniProjects.filter(project => project.status === 'in-progress').map(project => (
                    <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{project.title}</p>
                        <p className="text-xs text-muted-foreground">{project.student}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{project.progress}% complete</p>
                      </div>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and frequently used features</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Create LOR Template
                </Button>
                <Button variant="outline" size="sm">
                  <QrCode className="mr-2 h-4 w-4" />
                  Verify LOR
                </Button>
                <Button variant="outline" size="sm">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  New Project
                </Button>
                <Button variant="outline" size="sm">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Project Reports
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  LOR Management System
                </CardTitle>
                <CardDescription>
                  Issue Letters of Recommendation with AI assistance and verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {lorRequests.map(request => {
                    const statusIcon = {
                      'pending': <Clock className="h-4 w-4 text-yellow-500" />,
                      'in-progress': <Clock className="h-4 w-4 text-blue-500" />,
                      'completed': <CheckCircle className="h-4 w-4 text-green-500" />
                    }[request.status]

                    const statusColor = {
                      'pending': 'bg-yellow-100 text-yellow-800',
                      'in-progress': 'bg-blue-100 text-blue-800',
                      'completed': 'bg-green-100 text-green-800'
                    }[request.status]

                    return (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {statusIcon}
                          <div>
                            <p className="font-medium">{request.student}</p>
                            <p className="text-sm text-muted-foreground">{request.purpose}</p>
                            <p className="text-xs text-muted-foreground">Requested: {request.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={statusColor}>
                            {request.status}
                          </Badge>
                          <Button size="sm" variant={request.status === 'completed' ? 'outline' : 'default'}>
                            {request.status === 'completed' ? 'View' : 'Process'}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5" />
                  Mini Project Tracking
                </CardTitle>
                <CardDescription>
                  Monitor and manage student mini projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {miniProjects.map(project => {
                    const statusIcon = {
                      'planning': <Clock className="h-4 w-4 text-yellow-500" />,
                      'in-progress': <Clock className="h-4 w-4 text-blue-500" />,
                      'completed': <CheckCircle className="h-4 w-4 text-green-500" />
                    }[project.status]

                    const statusColor = {
                      'planning': 'bg-yellow-100 text-yellow-800',
                      'in-progress': 'bg-blue-100 text-blue-800',
                      'completed': 'bg-green-100 text-green-800'
                    }[project.status]

                    return (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {statusIcon}
                            <div>
                              <h4 className="font-semibold">{project.title}</h4>
                              <p className="text-sm text-muted-foreground">{project.student}</p>
                            </div>
                          </div>
                          <Badge className={statusColor}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress:</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Deadline:</span>
                            <span>{project.deadline}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm" variant="outline">Update Progress</Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
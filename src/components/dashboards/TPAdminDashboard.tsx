import React from 'react'
import { Layout } from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Building, 
  Users, 
  Calendar, 
  TrendingUp,
  BarChart3,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  DollarSign,
  MapPin
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { mockAnalytics, mockDriveEvents } from '@/data/mockData'

export function TPAdminDashboard() {
  const chartData = Object.entries(mockAnalytics.departmentWiseStats).map(([dept, count]) => ({
    department: dept,
    placements: count
  }))

  const placedStudents = [
    {
      id: '1',
              name: 'Gaurav Agrawal',
      department: 'Computer Science',
      company: 'TechCorp',
      package: 85000,
      location: 'San Francisco, CA',
      date: '2024-01-15',
      status: 'confirmed'
    },
    {
      id: '2',
              name: 'Pankaj Borkar',
      department: 'Information Technology',
      company: 'DataTech Inc',
      package: 78000,
      location: 'New York, NY',
      date: '2024-01-20',
      status: 'pending'
    },
    {
      id: '3',
              name: 'Jaya Raut',
      department: 'Computer Science',
      company: 'Innovation Labs',
      package: 92000,
      location: 'Seattle, WA',
      date: '2024-01-25',
      status: 'confirmed'
    },
    {
      id: '4',
      name: 'Emma Wilson',
      department: 'Electronics',
      company: 'TechCorp',
      package: 82000,
      location: 'Austin, TX',
      date: '2024-01-30',
      status: 'confirmed'
    },
    {
      id: '5',
      name: 'Michael Brown',
      department: 'Information Technology',
      company: 'DataTech Inc',
      package: 75000,
      location: 'Boston, MA',
      date: '2024-02-05',
      status: 'pending'
    }
  ]

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">T&P Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage recruitment drives, track placements, and oversee T&P operations.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Placements</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.totalPlacements}</div>
              <p className="text-xs text-muted-foreground">+12% from last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Package</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockAnalytics.averagePackage.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Drives</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">3 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Placed Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{placedStudents.length}</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="drives">Drive Management</TabsTrigger>
            <TabsTrigger value="placed">Placed Students</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Department-wise Placements</CardTitle>
                  <CardDescription>Placement statistics by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="placements" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Recruiters</CardTitle>
                  <CardDescription>Companies with highest recruitment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAnalytics.topRecruiters.slice(0, 5).map((company, index) => (
                    <div key={company} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{company}</span>
                      </div>
                      <Badge variant="outline">
                        {Math.floor(Math.random() * 20) + 10} hires
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest T&P operations and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">TechCorp drive completed successfully</p>
                    <p className="text-xs text-muted-foreground">15 students selected • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">DataTech interviews scheduled</p>
                    <p className="text-xs text-muted-foreground">45 students registered • 1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mt-2" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">New scholarship opportunities added</p>
                    <p className="text-xs text-muted-foreground">5 programs eligible for CS students • 2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drives" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recruitment Drives</CardTitle>
                  <CardDescription>Manage and schedule placement drives</CardDescription>
                </div>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Drive
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDriveEvents.map(drive => {
                    const statusIcon = {
                      'upcoming': <Clock className="h-4 w-4 text-blue-500" />,
                      'ongoing': <AlertCircle className="h-4 w-4 text-yellow-500" />,
                      'completed': <CheckCircle className="h-4 w-4 text-green-500" />,
                      'cancelled': <AlertCircle className="h-4 w-4 text-red-500" />
                    }[drive.status]

                    const statusColor = {
                      'upcoming': 'bg-blue-100 text-blue-800',
                      'ongoing': 'bg-yellow-100 text-yellow-800',
                      'completed': 'bg-green-100 text-green-800',
                      'cancelled': 'bg-red-100 text-red-800'
                    }[drive.status]

                    return (
                      <div key={drive.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {statusIcon}
                            <div>
                              <h4 className="font-semibold">{drive.company}</h4>
                              <p className="text-sm text-muted-foreground capitalize">{drive.type} Drive</p>
                            </div>
                          </div>
                          <Badge className={statusColor}>
                            {drive.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Date:</span>
                            <p className="font-medium">{drive.date.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Venue:</span>
                            <p className="font-medium">{drive.venue}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Registered:</span>
                            <p className="font-medium">{drive.registeredStudents.length}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Min CGPA:</span>
                            <p className="font-medium">{drive.minimumCgpa}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="placed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Placed Students Information
                </CardTitle>
                <CardDescription>
                  Track and manage information about placed students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {placedStudents.map(student => {
                    const statusIcon = {
                      'confirmed': <CheckCircle className="h-4 w-4 text-green-500" />,
                      'pending': <Clock className="h-4 w-4 text-yellow-500" />
                    }[student.status]

                    const statusColor = {
                      'confirmed': 'bg-green-100 text-green-800',
                      'pending': 'bg-yellow-100 text-yellow-800'
                    }[student.status]

                    return (
                      <div key={student.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {statusIcon}
                            <div>
                              <h4 className="font-semibold">{student.name}</h4>
                              <p className="text-sm text-muted-foreground">{student.department}</p>
                            </div>
                          </div>
                          <Badge className={statusColor}>
                            {student.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Company:</span>
                            <p className="font-medium">{student.company}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Package:</span>
                            <p className="font-medium">${student.package.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Location:</span>
                            <p className="font-medium">{student.location}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Date:</span>
                            <p className="font-medium">{student.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm" variant="outline">Update Status</Button>
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
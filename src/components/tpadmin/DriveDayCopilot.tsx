import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Bot, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Mail,
  BarChart3,
  Zap,
  Calendar,
  MapPin,
  FileText,
  Send,
  RefreshCw
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

interface DriveEvent {
  id: string
  company: string
  position: string
  date: Date
  venue: string
  totalRegistered: number
  currentAttendees: number
  interviewsScheduled: number
  interviewsCompleted: number
  shortlisted: number
  selected: number
  status: 'pre-drive' | 'ongoing' | 'completed'
}

interface StudentStatus {
  id: string
  name: string
  rollNumber: string
  department: string
  cgpa: number
  status: 'registered' | 'present' | 'written-test' | 'interview' | 'shortlisted' | 'selected' | 'rejected'
  testScore?: number
  interviewSlot?: string
  feedback?: string
}

interface AutomatedAction {
  id: string
  type: 'email' | 'sms' | 'notification'
  trigger: string
  action: string
  status: 'pending' | 'sent' | 'failed'
  timestamp: Date
}

export function DriveDayCopilot() {
  const [currentDrive] = useState<DriveEvent>({
    id: '1',
    company: 'TechCorp',
    position: 'Software Engineer',
    date: new Date(),
    venue: 'Auditorium A',
    totalRegistered: 150,
    currentAttendees: 142,
    interviewsScheduled: 45,
    interviewsCompleted: 23,
    shortlisted: 12,
    selected: 5,
    status: 'ongoing'
  })

  const [students] = useState<StudentStatus[]>([
    {
      id: '1',
              name: 'Gaurav Agrawal',
      rollNumber: 'CS2021001',
      department: 'Computer Science',
      cgpa: 8.5,
      status: 'selected',
      testScore: 85,
      interviewSlot: '10:30 AM',
      feedback: 'Excellent technical skills'
    },
    {
      id: '2',
              name: 'Pankaj Borkar',
      rollNumber: 'CS2021002',
      department: 'Computer Science',
      cgpa: 9.2,
      status: 'shortlisted',
      testScore: 92,
      interviewSlot: '11:00 AM'
    },
    {
      id: '3',
              name: 'Jaya Raut',
      rollNumber: 'IT2021001',
      department: 'Information Technology',
      cgpa: 7.8,
      status: 'interview',
      testScore: 78,
      interviewSlot: '2:30 PM'
    }
  ])

  const [automatedActions] = useState<AutomatedAction[]>([
    {
      id: '1',
      type: 'email',
      trigger: 'Student shortlisted',
      action: 'Send interview confirmation email',
      status: 'sent',
      timestamp: new Date('2024-01-20T10:30:00')
    },
    {
      id: '2',
      type: 'sms',
      trigger: 'Interview slot assigned',
      action: 'Send SMS reminder',
      status: 'sent',
      timestamp: new Date('2024-01-20T11:00:00')
    },
    {
      id: '3',
      type: 'email',
      trigger: 'Drive completion',
      action: 'Send results to company',
      status: 'pending',
      timestamp: new Date()
    }
  ])

  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const hourlyData = [
    { time: '9:00', attendees: 45, interviews: 0 },
    { time: '10:00', attendees: 89, interviews: 5 },
    { time: '11:00', attendees: 142, interviews: 12 },
    { time: '12:00', attendees: 138, interviews: 18 },
    { time: '1:00', attendees: 125, interviews: 23 },
    { time: '2:00', attendees: 118, interviews: 28 },
    { time: '3:00', attendees: 95, interviews: 35 }
  ]

  const statusDistribution = [
    { status: 'Present', count: 142 },
    { status: 'Written Test', count: 89 },
    { status: 'Interview', count: 45 },
    { status: 'Shortlisted', count: 12 },
    { status: 'Selected', count: 5 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered': return 'bg-blue-100 text-blue-800'
      case 'present': return 'bg-green-100 text-green-800'
      case 'written-test': return 'bg-yellow-100 text-yellow-800'
      case 'interview': return 'bg-purple-100 text-purple-800'
      case 'shortlisted': return 'bg-orange-100 text-orange-800'
      case 'selected': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const generateReport = async () => {
    setIsGeneratingReport(true)
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGeneratingReport(false)
  }

  const attendanceRate = Math.round((currentDrive.currentAttendees / currentDrive.totalRegistered) * 100)
  const interviewProgress = Math.round((currentDrive.interviewsCompleted / currentDrive.interviewsScheduled) * 100)
  const selectionRate = Math.round((currentDrive.selected / currentDrive.interviewsCompleted) * 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="h-6 w-6" />
            Drive Day Copilot
          </h2>
          <p className="text-muted-foreground">
            Real-time drive management with automated actions and analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button onClick={generateReport} disabled={isGeneratingReport}>
            {isGeneratingReport ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileText className="mr-2 h-4 w-4" />
            )}
            Generate Report
          </Button>
        </div>
      </div>

      {/* Drive Overview */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-blue-800 dark:text-blue-200 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {currentDrive.company} - {currentDrive.position}
          </CardTitle>
          <CardDescription className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {currentDrive.venue}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {currentDrive.date.toLocaleDateString()}
            </div>
            <Badge className="bg-green-100 text-green-800">
              {currentDrive.status}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentDrive.totalRegistered}</div>
              <div className="text-sm text-muted-foreground">Registered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{currentDrive.currentAttendees}</div>
              <div className="text-sm text-muted-foreground">Present</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{currentDrive.interviewsScheduled}</div>
              <div className="text-sm text-muted-foreground">Interviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{currentDrive.shortlisted}</div>
              <div className="text-sm text-muted-foreground">Shortlisted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{currentDrive.selected}</div>
              <div className="text-sm text-muted-foreground">Selected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{attendanceRate}%</div>
              <div className="text-sm text-muted-foreground">Attendance</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="realtime" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="realtime">Real-time Analytics</TabsTrigger>
          <TabsTrigger value="students">Student Tracking</TabsTrigger>
          <TabsTrigger value="automation">Automated Actions</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Hourly Progress</CardTitle>
                <CardDescription>Attendance and interview progress throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="attendees" stroke="#3B82F6" name="Attendees" />
                    <Line type="monotone" dataKey="interviews" stroke="#10B981" name="Interviews" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
                <CardDescription>Current status of all registered students</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statusDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Attendance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Present: {currentDrive.currentAttendees}</span>
                    <span className="text-sm">Total: {currentDrive.totalRegistered}</span>
                  </div>
                  <Progress value={attendanceRate} className="h-2" />
                  <div className="text-center text-2xl font-bold text-primary">{attendanceRate}%</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Interview Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Completed: {currentDrive.interviewsCompleted}</span>
                    <span className="text-sm">Scheduled: {currentDrive.interviewsScheduled}</span>
                  </div>
                  <Progress value={interviewProgress} className="h-2" />
                  <div className="text-center text-2xl font-bold text-primary">{interviewProgress}%</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Selection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Selected: {currentDrive.selected}</span>
                    <span className="text-sm">Interviewed: {currentDrive.interviewsCompleted}</span>
                  </div>
                  <Progress value={selectionRate} className="h-2" />
                  <div className="text-center text-2xl font-bold text-primary">{selectionRate}%</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Student Status Tracking</CardTitle>
                <CardDescription>Real-time tracking of all registered students</CardDescription>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Search students..." className="w-64" />
                <Button variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Export List
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {students.map((student) => (
                  <div key={student.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {student.rollNumber} • {student.department} • CGPA: {student.cgpa}
                        </p>
                      </div>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status.replace('-', ' ')}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {student.testScore && (
                        <div>
                          <span className="text-muted-foreground">Test Score:</span>
                          <div className="font-medium">{student.testScore}%</div>
                        </div>
                      )}
                      {student.interviewSlot && (
                        <div>
                          <span className="text-muted-foreground">Interview:</span>
                          <div className="font-medium">{student.interviewSlot}</div>
                        </div>
                      )}
                      {student.feedback && (
                        <div className="md:col-span-2">
                          <span className="text-muted-foreground">Feedback:</span>
                          <div className="font-medium">{student.feedback}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Automated Actions
              </CardTitle>
              <CardDescription>AI-powered automation for drive day operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Active Automations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Auto-shortlisting</span>
                      </div>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Email notifications</span>
                      </div>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Interview scheduling</span>
                      </div>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Recent Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {automatedActions.map((action) => (
                      <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          {action.type === 'email' ? (
                            <Mail className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Send className="h-4 w-4 text-green-600" />
                          )}
                          <div>
                            <p className="text-sm font-medium">{action.action}</p>
                            <p className="text-xs text-muted-foreground">{action.trigger}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={action.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {action.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {action.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Automation Rules</CardTitle>
                  <CardDescription>Configure automated actions for drive events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium">Trigger Event</label>
                        <select className="w-full mt-1 px-3 py-2 border rounded-md bg-background">
                          <option>Student shortlisted</option>
                          <option>Interview completed</option>
                          <option>Drive completed</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Action Type</label>
                        <select className="w-full mt-1 px-3 py-2 border rounded-md bg-background">
                          <option>Send email</option>
                          <option>Send SMS</option>
                          <option>Update status</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Recipients</label>
                        <select className="w-full mt-1 px-3 py-2 border rounded-md bg-background">
                          <option>Students</option>
                          <option>Company</option>
                          <option>Faculty</option>
                        </select>
                      </div>
                    </div>
                    <Button>
                      <Zap className="mr-2 h-4 w-4" />
                      Add Automation Rule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication Center</CardTitle>
              <CardDescription>Manage all drive-related communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Communication management interface coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
import React from 'react'
import { Layout } from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Users, 
  Calendar, 
  FileText,
  QrCode,
  Filter,
  Star,
  MapPin,
  DollarSign,
  Briefcase,
  Accessibility,
  Leaf
} from 'lucide-react'
import { SmartSearchChatbot } from '@/components/SmartSearchChatbot'

const sidebarContent = (
  <nav className="space-y-2">
    <Button variant="ghost" className="w-full justify-start">
      <Users className="mr-2 h-4 w-4" />
      Dashboard
    </Button>
    <Button variant="ghost" className="w-full justify-start">
      <Search className="mr-2 h-4 w-4" />
      Candidate Search
    </Button>
    <Button variant="ghost" className="w-full justify-start">
      <QrCode className="mr-2 h-4 w-4" />
      Resume Verification
    </Button>
    <Button variant="ghost" className="w-full justify-start">
      <Calendar className="mr-2 h-4 w-4" />
      Interview Scheduling
    </Button>
    <Button variant="ghost" className="w-full justify-start">
      <FileText className="mr-2 h-4 w-4" />
      Job Postings
    </Button>
    <Button variant="ghost" className="w-full justify-start">
      <DollarSign className="mr-2 h-4 w-4" />
      Offer Management
    </Button>
  </nav>
)

export function RecruiterDashboard() {
  const mockCandidates = [
    {
      id: '1',
              name: 'Gaurav Agrawal',
      department: 'Computer Science',
      year: 4,
      cgpa: 8.5,
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      experience: ['Internship at StartupXYZ', 'Open Source Contributor'],
      verified: true,
      matchScore: 95
    },
    {
      id: '2',
              name: 'Pankaj Borkar',
      department: 'Information Technology',
      year: 4,
      cgpa: 9.2,
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
      experience: ['Research Assistant', 'ML Competition Winner'],
      verified: true,
      matchScore: 88
    },
    {
      id: '3',
              name: 'Jaya Raut',
      department: 'Computer Science',
      year: 3,
      cgpa: 7.8,
      skills: ['Java', 'Spring Boot', 'AWS', 'Docker'],
      experience: ['Summer Intern at TechCorp', 'Personal Projects'],
      verified: false,
      matchScore: 76
    }
  ]

  return (
    <Layout showSidebar sidebarContent={sidebarContent}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recruiter Dashboard</h1>
          <p className="text-muted-foreground">
            Discover talented candidates, schedule interviews, and manage your recruitment pipeline.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Currently recruiting</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Total received</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Scheduled this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offers Made</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="search" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="search">Candidate Search</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="offers">Offer Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Advanced Candidate Search
                </CardTitle>
                <CardDescription>
                  Find candidates with QR-verifiable resumes and specialized filters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <Input placeholder="Search by skills..." />
                  <Input placeholder="Min CGPA" type="number" />
                  <Input placeholder="Department" />
                  <Button>
                    <Filter className="mr-2 h-4 w-4" />
                    Advanced Filters
                  </Button>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm">
                    <Accessibility className="mr-2 h-4 w-4" />
                    Accessibility Focus
                  </Button>
                  <Button variant="outline" size="sm">
                    <Leaf className="mr-2 h-4 w-4" />
                    Green Jobs
                  </Button>
                  <Button variant="outline" size="sm">
                    <QrCode className="mr-2 h-4 w-4" />
                    Verified Only
                  </Button>
                  <Button variant="outline" size="sm">
                    <Accessibility className="mr-2 h-4 w-4" />
                    Accessibility Focus
                  </Button>
                  <Button variant="outline" size="sm">
                    <Leaf className="mr-2 h-4 w-4" />
                    Green Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {mockCandidates.map(candidate => (
                <Card key={candidate.id} className="relative">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{candidate.name}</h3>
                          <p className="text-muted-foreground">
                            {candidate.department} • Year {candidate.year} • CGPA: {candidate.cgpa}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {candidate.verified && (
                              <Badge variant="success" className="flex items-center gap-1">
                                <QrCode className="h-3 w-3" />
                                Verified
                              </Badge>
                            )}
                            <Badge variant="outline">
                              {candidate.matchScore}% match
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {candidate.matchScore}%
                        </div>
                        <div className="text-xs text-muted-foreground">Match Score</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map(skill => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Experience:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {candidate.experience.map((exp, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="h-1 w-1 rounded-full bg-blue-500" />
                              {exp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                          <Button size="sm" variant="outline">
                            <QrCode className="mr-2 h-3 w-3" />
                            Verify Resume
                          </Button>
                        </div>
                        <Button size="sm">
                          Schedule Interview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Job Applications</CardTitle>
                <CardDescription>Review and manage candidate applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Application management interface coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interview Scheduling</CardTitle>
                <CardDescription>Manage interview schedules and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Interview scheduling system coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Offer Comparison Tools</CardTitle>
                <CardDescription>Compare and analyze job offers across different metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Offer comparison tools coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Smart Search Assistant</CardTitle>
              <CardDescription>Get help with recruitment processes and candidate search</CardDescription>
            </CardHeader>
            <CardContent>
              <SmartSearchChatbot />
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </Layout>
  )
}
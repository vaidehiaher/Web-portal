import { useState } from 'react'
import { Layout } from '../components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Award,
  FileText,
  QrCode,
  Download,
  Upload,
  Edit,
  Save
} from 'lucide-react'

export function MyProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Gaurav Agrawal',
          email: 'gaurav.agrawal@college.edu',
    phone: '+1 (555) 123-4567',
    address: '123 College Street, University City, State 12345',
    studentId: 'CS2021001',
    department: 'Computer Science',
    year: 4,
    cgpa: 8.5,
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning'],
    achievements: ['Dean\'s List 2023', 'Hackathon Winner', 'Research Publication'],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Full-stack web application with React and Node.js',
        technologies: ['React', 'Node.js', 'MongoDB']
      },
      {
        name: 'ML Recommendation System',
        description: 'Machine learning model for product recommendations',
        technologies: ['Python', 'TensorFlow', 'Pandas']
      }
    ]
  })

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your personal information and academic details.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <QrCode className="mr-2 h-4 w-4" />
              Generate QR Resume
            </Button>
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "default" : "outline"}
            >
              {isEditing ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Summary */}
          <Card>
            <CardHeader className="text-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                {profile.name.charAt(0)}
              </div>
              <CardTitle>{profile.name}</CardTitle>
              <CardDescription>{profile.department} • Year {profile.year}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{profile.cgpa}</div>
                <div className="text-sm text-muted-foreground">CGPA</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input 
                      value={profile.email} 
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="text-sm"
                    />
                  ) : (
                    <span>{profile.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input 
                      value={profile.phone} 
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="text-sm"
                    />
                  ) : (
                    <span>{profile.phone}</span>
                  )}
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  {isEditing ? (
                    <textarea 
                      value={profile.address} 
                      onChange={(e) => setProfile({...profile, address: e.target.value})}
                      className="w-full text-sm border rounded px-2 py-1 resize-none"
                      rows={2}
                    />
                  ) : (
                    <span>{profile.address}</span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Profile Photo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="academic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="academic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Information</CardTitle>
                    <CardDescription>Your educational background and achievements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Student ID</label>
                        <Input value={profile.studentId} disabled className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Department</label>
                        <Input value={profile.department} disabled className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Current Year</label>
                        <Input value={profile.year} disabled className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">CGPA</label>
                        <Input value={profile.cgpa} disabled className="mt-1" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Achievements</label>
                      <div className="space-y-2">
                        {profile.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <Award className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm" className="mt-2">
                          Add Achievement
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Competencies</CardTitle>
                    <CardDescription>Your technical and soft skills</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Technical Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {skill}
                            {isEditing && (
                              <button className="ml-1 text-xs hover:text-red-500">×</button>
                            )}
                          </Badge>
                        ))}
                      </div>
                      {isEditing && (
                        <div className="flex gap-2 mt-2">
                          <Input placeholder="Add new skill" className="flex-1" />
                          <Button size="sm">Add</Button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Skill Proficiency</label>
                      <div className="space-y-3">
                        {profile.skills.slice(0, 5).map((skill, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{skill}</span>
                              <span>{Math.floor(Math.random() * 30) + 70}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Projects & Experience</CardTitle>
                    <CardDescription>Your academic and personal projects</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profile.projects.map((project, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-2">
                        <h4 className="font-semibold">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                    {isEditing && (
                      <Button variant="outline" className="w-full">
                        Add New Project
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents & Certificates</CardTitle>
                    <CardDescription>Manage your academic documents</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      {[
                        { name: 'Resume', status: 'uploaded', verified: true },
                        { name: 'Academic Transcript', status: 'uploaded', verified: true },
                        { name: 'Certificate of Achievements', status: 'uploaded', verified: false },
                        { name: 'Recommendation Letter', status: 'pending', verified: false }
                      ].map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-sm">{doc.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{doc.status}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {doc.verified && (
                              <Badge variant="success" className="text-xs">
                                <QrCode className="mr-1 h-3 w-3" />
                                Verified
                              </Badge>
                            )}
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Document
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  )
}
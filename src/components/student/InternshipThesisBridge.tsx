import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowRight, 
  BookOpen, 
  Briefcase, 
  Lightbulb, 
  Users,
  FileText,
  Search,
  Star,
  Calendar,
  MapPin
} from 'lucide-react'

interface InternshipExperience {
  id: string
  company: string
  role: string
  duration: string
  domain: string
  technologies: string[]
  projects: string[]
  learnings: string[]
  mentorContact: string
}

interface ThesisOpportunity {
  id: string
  title: string
  supervisor: string
  department: string
  domain: string
  requiredSkills: string[]
  duration: string
  matchScore: number
  description: string
  prerequisites: string[]
  relatedInternships: string[]
}

interface ResearchIdea {
  id: string
  title: string
  description: string
  feasibility: number
  novelty: number
  impact: number
  requiredResources: string[]
  timelineWeeks: number
}

export function InternshipThesisBridge() {
  const [internships] = useState<InternshipExperience[]>([
    {
      id: '1',
      company: 'TechCorp',
      role: 'ML Engineering Intern',
      duration: '3 months',
      domain: 'Machine Learning',
      technologies: ['Python', 'TensorFlow', 'AWS', 'Docker'],
      projects: ['Recommendation System', 'Data Pipeline Optimization'],
      learnings: ['Deep Learning', 'MLOps', 'Cloud Computing'],
      mentorContact: 'john.mentor@techcorp.com'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      role: 'Full Stack Developer',
      duration: '6 months',
      domain: 'Web Development',
      technologies: ['React', 'Node.js', 'MongoDB', 'GraphQL'],
      projects: ['E-commerce Platform', 'Real-time Chat System'],
      learnings: ['System Design', 'Database Optimization', 'API Development'],
      mentorContact: 'sarah.lead@startupxyz.com'
    }
  ])

  const [thesisOpportunities] = useState<ThesisOpportunity[]>([
    {
      id: '1',
      title: 'Advanced Recommendation Systems using Deep Learning',
      supervisor: 'Dr. Alice Johnson',
      department: 'Computer Science',
      domain: 'Machine Learning',
      requiredSkills: ['Python', 'TensorFlow', 'Deep Learning', 'Statistics'],
      duration: '8 months',
      matchScore: 95,
      description: 'Research on improving recommendation accuracy using advanced neural networks and user behavior analysis.',
      prerequisites: ['Machine Learning Course', 'Statistics', 'Programming Experience'],
      relatedInternships: ['1']
    },
    {
      id: '2',
      title: 'Scalable Web Applications Architecture',
      supervisor: 'Prof. Bob Smith',
      department: 'Computer Science',
      domain: 'Software Engineering',
      requiredSkills: ['JavaScript', 'System Design', 'Database Design', 'Cloud Computing'],
      duration: '6 months',
      matchScore: 88,
      description: 'Study of modern web application architectures and their scalability patterns.',
      prerequisites: ['Web Development', 'Database Systems', 'Software Engineering'],
      relatedInternships: ['2']
    },
    {
      id: '3',
      title: 'IoT Security in Smart Cities',
      supervisor: 'Dr. Carol Wilson',
      department: 'Computer Science',
      domain: 'Cybersecurity',
      requiredSkills: ['Network Security', 'IoT Protocols', 'Cryptography'],
      duration: '10 months',
      matchScore: 65,
      description: 'Research on security challenges and solutions for IoT devices in smart city infrastructure.',
      prerequisites: ['Network Security', 'Cryptography', 'IoT Fundamentals'],
      relatedInternships: []
    }
  ])

  const [researchIdeas] = useState<ResearchIdea[]>([
    {
      id: '1',
      title: 'Hybrid Recommendation System with Explainable AI',
      description: 'Combine collaborative filtering with content-based approaches and add explainability features.',
      feasibility: 85,
      novelty: 78,
      impact: 82,
      requiredResources: ['GPU Access', 'Large Dataset', 'Survey Participants'],
      timelineWeeks: 32
    },
    {
      id: '2',
      title: 'Microservices Performance Optimization',
      description: 'Study and optimize inter-service communication patterns in microservices architecture.',
      feasibility: 90,
      novelty: 70,
      impact: 75,
      requiredResources: ['Cloud Infrastructure', 'Load Testing Tools', 'Monitoring Stack'],
      timelineWeeks: 24
    }
  ])

  const [selectedInternship, setSelectedInternship] = useState<string | null>(null)

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const generateResearchIdeas = (internshipId: string) => {
    setSelectedInternship(internshipId)
    // In a real app, this would call an AI service to generate ideas
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ArrowRight className="h-6 w-6" />
            Internship → Thesis Bridge
          </h2>
          <p className="text-muted-foreground">
            Transform your internship experience into meaningful thesis opportunities
          </p>
        </div>
        <Button variant="outline">
          <Search className="mr-2 h-4 w-4" />
          Find More Opportunities
        </Button>
      </div>

      <Tabs defaultValue="bridge" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bridge">Bridge Analysis</TabsTrigger>
          <TabsTrigger value="opportunities">Thesis Opportunities</TabsTrigger>
          <TabsTrigger value="ideas">Research Ideas</TabsTrigger>
          <TabsTrigger value="planning">Thesis Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="bridge" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Your Internship Experience
                </CardTitle>
                <CardDescription>Leverage your practical experience for research</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {internships.map((internship) => (
                  <div key={internship.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{internship.role}</h4>
                        <p className="text-sm text-muted-foreground">{internship.company}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{internship.duration}</span>
                        </div>
                      </div>
                      <Badge variant="outline">{internship.domain}</Badge>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Technologies Used:</p>
                      <div className="flex flex-wrap gap-1">
                        {internship.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Key Projects:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {internship.projects.map((project, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full bg-blue-500" />
                            {project}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Key Learnings:</p>
                      <div className="flex flex-wrap gap-1">
                        {internship.learnings.map((learning) => (
                          <Badge key={learning} variant="outline" className="text-xs">
                            {learning}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => generateResearchIdeas(internship.id)}
                    >
                      <Lightbulb className="mr-2 h-3 w-3" />
                      Generate Research Ideas
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Matched Thesis Opportunities
                </CardTitle>
                <CardDescription>Opportunities that align with your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {thesisOpportunities
                  .filter(opp => opp.relatedInternships.length > 0)
                  .map((opportunity) => (
                    <div key={opportunity.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{opportunity.title}</h4>
                          <p className="text-sm text-muted-foreground">{opportunity.supervisor}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{opportunity.department}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getMatchColor(opportunity.matchScore)}`}>
                            {opportunity.matchScore}%
                          </div>
                          <div className="text-xs text-muted-foreground">Match</div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">{opportunity.description}</p>

                      <div>
                        <p className="text-sm font-medium mb-2">Required Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {opportunity.requiredSkills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {opportunity.duration}
                        </div>
                        <Button size="sm">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Available Thesis Opportunities</CardTitle>
              <CardDescription>Browse all thesis opportunities across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {thesisOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{opportunity.title}</h4>
                        <p className="text-sm text-muted-foreground">{opportunity.supervisor} • {opportunity.department}</p>
                        <Badge variant="outline" className="mt-1">{opportunity.domain}</Badge>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getMatchColor(opportunity.matchScore)}`}>
                          {opportunity.matchScore}%
                        </div>
                        <div className="text-xs text-muted-foreground">Match</div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{opportunity.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Required Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {opportunity.requiredSkills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {opportunity.requiredSkills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{opportunity.requiredSkills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Prerequisites:</p>
                        <div className="flex flex-wrap gap-1">
                          {opportunity.prerequisites.slice(0, 2).map((prereq) => (
                            <Badge key={prereq} variant="outline" className="text-xs">
                              {prereq}
                            </Badge>
                          ))}
                          {opportunity.prerequisites.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{opportunity.prerequisites.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {opportunity.duration}
                        </div>
                        {opportunity.relatedInternships.length > 0 && (
                          <Badge variant="success" className="text-xs">
                            <Briefcase className="mr-1 h-3 w-3" />
                            Experience Match
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                        <Button size="sm">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ideas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI-Generated Research Ideas
              </CardTitle>
              <CardDescription>
                Research ideas based on your internship experience and current trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {researchIdeas.map((idea) => (
                  <div key={idea.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{idea.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{idea.description}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">
                          {Math.round((idea.feasibility + idea.novelty + idea.impact) / 3)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Feasibility:</span>
                        <div className="font-medium">{idea.feasibility}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Novelty:</span>
                        <div className="font-medium">{idea.novelty}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Impact:</span>
                        <div className="font-medium">{idea.impact}%</div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Required Resources:</p>
                      <div className="flex flex-wrap gap-1">
                        {idea.requiredResources.map((resource) => (
                          <Badge key={resource} variant="outline" className="text-xs">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {idea.timelineWeeks} weeks
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Refine Idea
                        </Button>
                        <Button size="sm">
                          Start Proposal
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thesis Planning Assistant</CardTitle>
              <CardDescription>Plan your thesis timeline and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Thesis planning tools coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
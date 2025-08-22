import React, { useState } from 'react'
import { Layout } from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { 
  BookOpen, 
  GraduationCap, 
  Search, 
  Globe, 
  FileText, 
  Award,
  Calendar,
  Users,
  DollarSign,
  MapPin,
  Download,
  ExternalLink,
  Filter,
  Star
} from 'lucide-react'

interface Program {
  id: string
  name: string
  university: string
  country: string
  duration: string
  type: 'Masters' | 'PhD' | 'Diploma'
  field: string
  deadline: string
  tuition: string
  scholarship: boolean
  rating: number
}

interface Exam {
  id: string
  name: string
  type: 'GRE' | 'GMAT' | 'TOEFL' | 'IELTS' | 'CAT' | 'GATE'
  description: string
  syllabus: string[]
  tips: string[]
  pdfUrl: string
  validity: string
  fee: string
}

interface University {
  id: string
  name: string
  country: string
  ranking: number
  programs: Program[]
  admissionRequirements: string[]
  sopGuidelines: string[]
  cutoffs: Record<string, number>
  entranceExams: string[]
  scholarships: string[]
  website: string
}

export function HigherStudies() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [selectedField, setSelectedField] = useState('all')

  const programs: Program[] = [
    {
      id: '1',
      name: 'Master of Science in Computer Science',
      university: 'Stanford University',
      country: 'USA',
      duration: '2 years',
      type: 'Masters',
      field: 'Computer Science',
      deadline: '2024-12-01',
      tuition: '$55,000/year',
      scholarship: true,
      rating: 4.8
    },
    {
      id: '2',
      name: 'PhD in Artificial Intelligence',
      university: 'MIT',
      country: 'USA',
      duration: '4-6 years',
      type: 'PhD',
      field: 'Computer Science',
      deadline: '2024-11-15',
      tuition: '$52,000/year',
      scholarship: true,
      rating: 4.9
    },
    {
      id: '3',
      name: 'Master of Engineering in Data Science',
      university: 'University of Toronto',
      country: 'Canada',
      duration: '2 years',
      type: 'Masters',
      field: 'Data Science',
      deadline: '2025-01-15',
      tuition: 'CAD 45,000/year',
      scholarship: true,
      rating: 4.6
    },
    {
      id: '4',
      name: 'Master of Science in Machine Learning',
      university: 'University of Oxford',
      country: 'UK',
      duration: '1 year',
      type: 'Masters',
      field: 'Computer Science',
      deadline: '2024-10-31',
      tuition: '£35,000/year',
      scholarship: false,
      rating: 4.7
    },
    {
      id: '5',
      name: 'PhD in Computer Engineering',
      university: 'ETH Zurich',
      country: 'Switzerland',
      duration: '4-6 years',
      type: 'PhD',
      field: 'Computer Engineering',
      deadline: '2024-12-31',
      tuition: 'CHF 1,500/year',
      scholarship: true,
      rating: 4.8
    }
  ]

  const exams: Exam[] = [
    {
      id: '1',
      name: 'Graduate Record Examination (GRE)',
      type: 'GRE',
      description: 'Standardized test for graduate school admissions in the US and other countries',
      syllabus: [
        'Verbal Reasoning (170 points)',
        'Quantitative Reasoning (170 points)',
        'Analytical Writing (6 points)'
      ],
      tips: [
        'Practice with official ETS materials',
        'Focus on vocabulary building',
        'Master time management',
        'Take multiple practice tests'
      ],
      pdfUrl: '/pdfs/gre-syllabus.pdf',
      validity: '5 years',
      fee: '$205'
    },
    {
      id: '2',
      name: 'Graduate Management Admission Test (GMAT)',
      type: 'GMAT',
      description: 'Computer-adaptive test for business school admissions',
      syllabus: [
        'Analytical Writing Assessment',
        'Integrated Reasoning',
        'Quantitative',
        'Verbal'
      ],
      tips: [
        'Practice data sufficiency questions',
        'Improve reading comprehension',
        'Master sentence correction',
        'Use official GMAT prep materials'
      ],
      pdfUrl: '/pdfs/gmat-syllabus.pdf',
      validity: '5 years',
      fee: '$275'
    },
    {
      id: '3',
      name: 'Test of English as a Foreign Language (TOEFL)',
      type: 'TOEFL',
      description: 'English proficiency test for non-native speakers',
      syllabus: [
        'Reading (30 points)',
        'Listening (30 points)',
        'Speaking (30 points)',
        'Writing (30 points)'
      ],
      tips: [
        'Practice speaking English daily',
        'Listen to English podcasts',
        'Read academic texts',
        'Practice integrated writing tasks'
      ],
      pdfUrl: '/pdfs/toefl-syllabus.pdf',
      validity: '2 years',
      fee: '$185'
    },
    {
      id: '4',
      name: 'International English Language Testing System (IELTS)',
      type: 'IELTS',
      description: 'English proficiency test accepted worldwide',
      syllabus: [
        'Listening (30 minutes)',
        'Reading (60 minutes)',
        'Writing (60 minutes)',
        'Speaking (11-14 minutes)'
      ],
      tips: [
        'Practice with British Council materials',
        'Focus on accent training',
        'Master academic writing',
        'Take mock tests regularly'
      ],
      pdfUrl: '/pdfs/ielts-syllabus.pdf',
      validity: '2 years',
      fee: '$245'
    }
  ]

  const universities: University[] = [
    {
      id: '1',
      name: 'Stanford University',
      country: 'USA',
      ranking: 2,
      programs: programs.filter(p => p.university === 'Stanford University'),
      admissionRequirements: [
        'Bachelor\'s degree in relevant field',
        'GRE scores (320+)',
        'TOEFL/IELTS scores',
        'Statement of Purpose',
        'Letters of Recommendation (3)',
        'Resume/CV',
        'Transcripts'
      ],
      sopGuidelines: [
        'Maximum 2 pages, single-spaced',
        'Explain your research interests',
        'Describe relevant experience',
        'Mention specific faculty members',
        'Discuss career goals'
      ],
      cutoffs: {
        'GRE': 320,
        'TOEFL': 100,
        'IELTS': 7.0,
        'CGPA': 3.5
      },
      entranceExams: ['GRE', 'TOEFL/IELTS'],
      scholarships: [
        'Stanford Graduate Fellowship',
        'Knight-Hennessy Scholars Program',
        'Department-specific funding'
      ],
      website: 'https://www.stanford.edu'
    },
    {
      id: '2',
      name: 'MIT',
      country: 'USA',
      ranking: 1,
      programs: programs.filter(p => p.university === 'MIT'),
      admissionRequirements: [
        'Strong academic background',
        'GRE scores (325+)',
        'Research experience',
        'Statement of Purpose',
        'Letters of Recommendation (3)',
        'Publications (for PhD)'
      ],
      sopGuidelines: [
        'Maximum 1000 words',
        'Focus on research experience',
        'Explain fit with MIT',
        'Discuss future research plans'
      ],
      cutoffs: {
        'GRE': 325,
        'TOEFL': 100,
        'IELTS': 7.0,
        'CGPA': 3.7
      },
      entranceExams: ['GRE', 'TOEFL/IELTS'],
      scholarships: [
        'MIT Presidential Fellowship',
        'Research Assistantships',
        'Teaching Assistantships'
      ],
      website: 'https://www.mit.edu'
    },
    {
      id: '3',
      name: 'University of Toronto',
      country: 'Canada',
      ranking: 18,
      programs: programs.filter(p => p.university === 'University of Toronto'),
      admissionRequirements: [
        'Bachelor\'s degree (B+ average)',
        'GRE scores (optional)',
        'English proficiency',
        'Statement of Intent',
        'Letters of Reference (2)',
        'Resume'
      ],
      sopGuidelines: [
        'Maximum 500 words',
        'Academic background',
        'Research interests',
        'Career objectives'
      ],
      cutoffs: {
        'GRE': 310,
        'TOEFL': 93,
        'IELTS': 6.5,
        'CGPA': 3.3
      },
      entranceExams: ['GRE (optional)', 'TOEFL/IELTS'],
      scholarships: [
        'Ontario Graduate Scholarship',
        'University of Toronto Fellowship',
        'Department awards'
      ],
      website: 'https://www.utoronto.ca'
    }
  ]

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.field.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCountry = selectedCountry === 'all' || program.country === selectedCountry
    const matchesField = selectedField === 'all' || program.field === selectedField
    return matchesSearch && matchesCountry && matchesField
  })

  const countries = [...new Set(programs.map(p => p.country))]
  const fields = [...new Set(programs.map(p => p.field))]

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Higher Studies Window</h1>
          <p className="text-muted-foreground">
            Explore programs, competitive exams, and universities worldwide for your higher education journey.
          </p>
        </div>

        <Tabs defaultValue="programs" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="programs">Programs & Opportunities</TabsTrigger>
            <TabsTrigger value="exams">Competitive Exams</TabsTrigger>
            <TabsTrigger value="universities">Universities Database</TabsTrigger>
          </TabsList>

          <TabsContent value="programs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Programs and Opportunities</CardTitle>
                <CardDescription>
                  Discover graduate programs and opportunities worldwide
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search programs, universities, or fields..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="px-3 py-2 border rounded-md"
                    >
                      <option value="all">All Countries</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    <select
                      value={selectedField}
                      onChange={(e) => setSelectedField(e.target.value)}
                      className="px-3 py-2 border rounded-md"
                    >
                      <option value="all">All Fields</option>
                      {fields.map(field => (
                        <option key={field} value={field}>{field}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Programs List */}
                <div className="grid gap-4">
                  {filteredPrograms.map(program => (
                    <Card key={program.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{program.name}</h3>
                            <p className="text-muted-foreground">{program.university}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={program.type === 'PhD' ? 'default' : 'secondary'}>
                              {program.type}
                            </Badge>
                            {program.scholarship && (
                              <Badge variant="outline" className="text-green-600">
                                <Award className="h-3 w-3 mr-1" />
                                Scholarship Available
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{program.country}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{program.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{program.tuition}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{program.rating}/5.0</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            Application Deadline: {new Date(program.deadline).toLocaleDateString()}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button size="sm">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exams" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Competitive Exams Guidance</CardTitle>
                <CardDescription>
                  Comprehensive information about entrance exams, syllabus, and preparation tips
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {exams.map(exam => (
                    <Card key={exam.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{exam.name}</h3>
                            <p className="text-muted-foreground">{exam.description}</p>
                          </div>
                          <Badge variant="outline">{exam.type}</Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">Syllabus</h4>
                            <ul className="space-y-2">
                              {exam.syllabus.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                  <span className="text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Preparation Tips</h4>
                            <ul className="space-y-2">
                              {exam.tips.map((tip, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                  <span className="text-sm">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t">
                          <div>
                            <span className="text-sm text-muted-foreground">Validity:</span>
                            <p className="font-medium">{exam.validity}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Fee:</span>
                            <p className="font-medium">{exam.fee}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">PDF:</span>
                            <Button variant="link" size="sm" className="p-0 h-auto">
                              <Download className="h-4 w-4 mr-1" />
                              Download Syllabus
                            </Button>
                          </div>
                          <div>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Official Website
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="universities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Universities Database</CardTitle>
                <CardDescription>
                  Comprehensive information about universities organized by country
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {universities.map(university => (
                    <Card key={university.id} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{university.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {university.country}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-4 w-4" />
                                World Ranking: #{university.ranking}
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Visit Website
                          </Button>
                        </div>

                        <Tabs defaultValue="requirements" className="mt-6">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="requirements">Requirements</TabsTrigger>
                            <TabsTrigger value="sop">SOP Guidelines</TabsTrigger>
                            <TabsTrigger value="cutoffs">Cutoffs</TabsTrigger>
                            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
                          </TabsList>

                          <TabsContent value="requirements" className="mt-4">
                            <h4 className="font-semibold mb-3">Admission Requirements</h4>
                            <ul className="space-y-2">
                              {university.admissionRequirements.map((req, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                  <span className="text-sm">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </TabsContent>

                          <TabsContent value="sop" className="mt-4">
                            <h4 className="font-semibold mb-3">Statement of Purpose Guidelines</h4>
                            <ul className="space-y-2">
                              {university.sopGuidelines.map((guideline, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                  <span className="text-sm">{guideline}</span>
                                </li>
                              ))}
                            </ul>
                          </TabsContent>

                          <TabsContent value="cutoffs" className="mt-4">
                            <h4 className="font-semibold mb-3">Minimum Cutoffs</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {Object.entries(university.cutoffs).map(([exam, score]) => (
                                <div key={exam} className="text-center p-3 border rounded-lg">
                                  <div className="text-sm text-muted-foreground">{exam}</div>
                                  <div className="text-lg font-semibold">{score}</div>
                                </div>
                              ))}
                            </div>
                          </TabsContent>

                          <TabsContent value="scholarships" className="mt-4">
                            <h4 className="font-semibold mb-3">Available Scholarships</h4>
                            <ul className="space-y-2">
                              {university.scholarships.map((scholarship, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Award className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{scholarship}</span>
                                </li>
                              ))}
                            </ul>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Award, 
  CheckCircle, 
  AlertTriangle, 
  Zap, 
  FileText,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react'

interface ScholarshipApplication {
  id: string
  name: string
  provider: string
  amount: number
  deadline: Date
  eligibilityMatch: number
  requiredDocuments: string[]
  autoFillProgress: number
  status: 'eligible' | 'not-eligible' | 'partially-eligible'
}

interface StudentProfile {
  cgpa: number
  department: string
  year: number
  familyIncome: number
  achievements: string[]
  documents: Record<string, boolean>
}

export function ScholarshipAutofill() {
  const [profile] = useState<StudentProfile>({
    cgpa: 8.5,
    department: 'Computer Science',
    year: 4,
    familyIncome: 500000,
    achievements: ['Dean\'s List', 'Hackathon Winner', 'Research Publication'],
    documents: {
      'transcript': true,
      'income_certificate': true,
      'caste_certificate': false,
      'bank_statement': true,
      'recommendation_letter': true
    }
  })

  const [scholarships] = useState<ScholarshipApplication[]>([
    {
      id: '1',
      name: 'Merit Excellence Scholarship',
      provider: 'Education Foundation',
      amount: 100000,
      deadline: new Date('2024-03-15'),
      eligibilityMatch: 95,
      requiredDocuments: ['transcript', 'recommendation_letter', 'bank_statement'],
      autoFillProgress: 85,
      status: 'eligible'
    },
    {
      id: '2',
      name: 'Need-Based Support Grant',
      provider: 'Government Scheme',
      amount: 75000,
      deadline: new Date('2024-02-28'),
      eligibilityMatch: 60,
      requiredDocuments: ['transcript', 'income_certificate', 'caste_certificate'],
      autoFillProgress: 45,
      status: 'partially-eligible'
    },
    {
      id: '3',
      name: 'Research Innovation Award',
      provider: 'Tech Corporation',
      amount: 150000,
      deadline: new Date('2024-04-10'),
      eligibilityMatch: 88,
      requiredDocuments: ['transcript', 'research_paper', 'recommendation_letter'],
      autoFillProgress: 70,
      status: 'eligible'
    }
  ])

  const [selectedScholarship, setSelectedScholarship] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'eligible': return 'bg-green-100 text-green-800'
      case 'partially-eligible': return 'bg-yellow-100 text-yellow-800'
      case 'not-eligible': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'eligible': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'partially-eligible': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'not-eligible': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return null
    }
  }

  const autoFillApplication = (scholarshipId: string) => {
    setSelectedScholarship(scholarshipId)
    // Simulate auto-fill process
    setTimeout(() => {
      setSelectedScholarship(null)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Award className="h-6 w-6" />
            Scholarship Autofill System
          </h2>
          <p className="text-muted-foreground">
            Intelligent application filling with eligibility verification
          </p>
        </div>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Update Profile
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profile Summary</CardTitle>
            <CardDescription>Your eligibility profile for scholarships</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">CGPA</p>
                <p className="text-2xl font-bold">{profile.cgpa}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Year</p>
                <p className="text-2xl font-bold">{profile.year}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Department</p>
              <Badge variant="outline">{profile.department}</Badge>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Achievements</p>
              <div className="space-y-1">
                {profile.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Document Status</p>
              <div className="space-y-2">
                {Object.entries(profile.documents).map(([doc, available]) => (
                  <div key={doc} className="flex items-center justify-between">
                    <span className="text-xs capitalize">{doc.replace('_', ' ')}</span>
                    {available ? (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Scholarships</CardTitle>
              <CardDescription>Scholarships matched to your profile with auto-fill capability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {scholarships.map((scholarship) => (
                <div key={scholarship.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{scholarship.name}</h4>
                      <p className="text-sm text-muted-foreground">{scholarship.provider}</p>
                      <p className="text-sm font-medium">₹{scholarship.amount.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(scholarship.status)}
                        <Badge className={getStatusColor(scholarship.status)}>
                          {scholarship.eligibilityMatch}% match
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Due: {scholarship.deadline.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Auto-fill Progress</span>
                      <span className="text-sm text-muted-foreground">{scholarship.autoFillProgress}%</span>
                    </div>
                    <Progress value={scholarship.autoFillProgress} className="h-2" />
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Required Documents:</p>
                    <div className="flex flex-wrap gap-1">
                      {scholarship.requiredDocuments.map((doc) => {
                        const available = profile.documents[doc] || false
                        return (
                          <Badge 
                            key={doc} 
                            variant={available ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {doc.replace('_', ' ')}
                            {available ? <CheckCircle className="ml-1 h-3 w-3" /> : <AlertTriangle className="ml-1 h-3 w-3" />}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => autoFillApplication(scholarship.id)}
                      disabled={selectedScholarship === scholarship.id || scholarship.status === 'not-eligible'}
                    >
                      {selectedScholarship === scholarship.id ? (
                        <>
                          <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                          Auto-filling...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-3 w-3" />
                          Auto-fill Application
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-3 w-3" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-3 w-3" />
                      Download Form
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eligibility Insights</CardTitle>
              <CardDescription>Improve your scholarship eligibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Strong Academic Record</p>
                  <p className="text-xs text-muted-foreground">Your CGPA of 8.5 qualifies you for most merit-based scholarships</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Missing Documents</p>
                  <p className="text-xs text-muted-foreground">Upload caste certificate to unlock additional need-based scholarships</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Research Background</p>
                  <p className="text-xs text-muted-foreground">Your research publication makes you eligible for research-focused grants</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
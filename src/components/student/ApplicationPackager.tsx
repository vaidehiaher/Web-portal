import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Package, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Download,
  Upload,
  Zap,
  Clock,
  Star,
  Eye
} from 'lucide-react'

interface Document {
  id: string
  name: string
  type: 'resume' | 'transcript' | 'sop' | 'lor' | 'certificate' | 'portfolio'
  status: 'available' | 'missing' | 'outdated'
  lastUpdated: Date
  size: string
  format: string
}

interface ApplicationPackage {
  id: string
  name: string
  type: 'job' | 'scholarship' | 'higher-studies'
  company: string
  deadline: Date
  requiredDocuments: string[]
  optionalDocuments: string[]
  completionPercentage: number
  status: 'draft' | 'ready' | 'submitted'
  customRequirements: string[]
}

export function ApplicationPackager() {
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Resume_2024.pdf',
      type: 'resume',
      status: 'available',
      lastUpdated: new Date('2024-01-15'),
      size: '245 KB',
      format: 'PDF'
    },
    {
      id: '2',
      name: 'Official_Transcript.pdf',
      type: 'transcript',
      status: 'available',
      lastUpdated: new Date('2024-01-10'),
      size: '1.2 MB',
      format: 'PDF'
    },
    {
      id: '3',
      name: 'Statement_of_Purpose.docx',
      type: 'sop',
      status: 'outdated',
      lastUpdated: new Date('2023-12-01'),
      size: '89 KB',
      format: 'DOCX'
    },
    {
      id: '4',
      name: 'Recommendation_Letter_Prof_Smith.pdf',
      type: 'lor',
      status: 'available',
      lastUpdated: new Date('2024-01-12'),
      size: '156 KB',
      format: 'PDF'
    },
    {
      id: '5',
      name: 'Portfolio_Website.pdf',
      type: 'portfolio',
      status: 'missing',
      lastUpdated: new Date('2023-11-15'),
      size: '0 KB',
      format: 'PDF'
    }
  ])

  const [packages, setPackages] = useState<ApplicationPackage[]>([
    {
      id: '1',
      name: 'TechCorp Software Engineer',
      type: 'job',
      company: 'TechCorp',
      deadline: new Date('2024-02-15'),
      requiredDocuments: ['resume', 'transcript', 'portfolio'],
      optionalDocuments: ['lor'],
      completionPercentage: 75,
      status: 'draft',
      customRequirements: ['Cover letter mentioning specific projects', 'GitHub profile link']
    },
    {
      id: '2',
      name: 'Excellence Merit Scholarship',
      type: 'scholarship',
      company: 'Education Foundation',
      deadline: new Date('2024-03-01'),
      requiredDocuments: ['resume', 'transcript', 'sop', 'lor'],
      optionalDocuments: ['certificate'],
      completionPercentage: 90,
      status: 'ready',
      customRequirements: ['Financial need statement', 'Community service documentation']
    },
    {
      id: '3',
      name: 'Stanford MS Computer Science',
      type: 'higher-studies',
      company: 'Stanford University',
      deadline: new Date('2024-04-01'),
      requiredDocuments: ['resume', 'transcript', 'sop', 'lor'],
      optionalDocuments: ['portfolio', 'certificate'],
      completionPercentage: 60,
      status: 'draft',
      customRequirements: ['GRE scores', 'TOEFL scores', 'Research statement']
    }
  ])

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const getDocumentStatus = (docType: string) => {
    const doc = documents.find(d => d.type === docType)
    return doc ? doc.status : 'missing'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'outdated': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'missing': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'outdated': return 'bg-yellow-100 text-yellow-800'
      case 'missing': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPackageStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-blue-100 text-blue-800'
      case 'submitted': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const autoPackage = (packageId: string) => {
    setSelectedPackage(packageId)
    // Simulate auto-packaging process
    setTimeout(() => {
      setPackages(prev => prev.map(pkg => 
        pkg.id === packageId 
          ? { ...pkg, status: 'ready' as const, completionPercentage: 100 }
          : pkg
      ))
      setSelectedPackage(null)
    }, 3000)
  }

  const calculateDaysLeft = (deadline: Date) => {
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6" />
            Application Packager
          </h2>
          <p className="text-muted-foreground">
            Auto-bundle required documents for seamless applications
          </p>
        </div>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload Documents
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Document Library</CardTitle>
            <CardDescription>Your available documents and their status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.size} • {doc.format} • Updated {doc.lastUpdated.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(doc.status)}>
                    {doc.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Add New Document
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Packages</CardTitle>
              <CardDescription>Manage your application bundles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {packages.map((pkg) => {
                const daysLeft = calculateDaysLeft(pkg.deadline)
                const isUrgent = daysLeft <= 7
                
                return (
                  <div key={pkg.id} className={`border rounded-lg p-4 space-y-3 ${isUrgent ? 'border-red-300 bg-red-50 dark:bg-red-900/10' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{pkg.name}</h4>
                        <p className="text-sm text-muted-foreground">{pkg.company}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="capitalize">{pkg.type}</Badge>
                          <Badge className={getPackageStatusColor(pkg.status)}>
                            {pkg.status}
                          </Badge>
                          {isUrgent && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {daysLeft} days left
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{pkg.completionPercentage}%</div>
                        <div className="text-xs text-muted-foreground">Complete</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Completion Progress</span>
                        <span className="text-sm text-muted-foreground">{pkg.completionPercentage}%</span>
                      </div>
                      <Progress value={pkg.completionPercentage} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Required Documents:</p>
                        <div className="space-y-1">
                          {pkg.requiredDocuments.map((docType) => {
                            const status = getDocumentStatus(docType)
                            return (
                              <div key={docType} className="flex items-center justify-between">
                                <span className="text-xs capitalize">{docType.replace('_', ' ')}</span>
                                {getStatusIcon(status)}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Optional Documents:</p>
                        <div className="space-y-1">
                          {pkg.optionalDocuments.map((docType) => {
                            const status = getDocumentStatus(docType)
                            return (
                              <div key={docType} className="flex items-center justify-between">
                                <span className="text-xs capitalize">{docType.replace('_', ' ')}</span>
                                {getStatusIcon(status)}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {pkg.customRequirements.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Custom Requirements:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {pkg.customRequirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="h-1 w-1 rounded-full bg-blue-500" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2 border-t">
                      <Button 
                        size="sm" 
                        onClick={() => autoPackage(pkg.id)}
                        disabled={selectedPackage === pkg.id || pkg.status === 'submitted'}
                      >
                        {selectedPackage === pkg.id ? (
                          <>
                            <Clock className="mr-2 h-3 w-3 animate-spin" />
                            Packaging...
                          </>
                        ) : (
                          <>
                            <Zap className="mr-2 h-3 w-3" />
                            Auto-Package
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-3 w-3" />
                        Preview
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={pkg.completionPercentage < 100}
                      >
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Smart Recommendations</CardTitle>
              <CardDescription>AI-powered suggestions to improve your applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Star className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Update Your Statement of Purpose</p>
                  <p className="text-xs text-muted-foreground">Your SoP is outdated. Consider updating it with recent achievements and experiences.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Missing Portfolio</p>
                  <p className="text-xs text-muted-foreground">A portfolio would strengthen your TechCorp application. Consider creating one.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Strong Documentation</p>
                  <p className="text-xs text-muted-foreground">Your transcript and resume are up-to-date and well-formatted.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
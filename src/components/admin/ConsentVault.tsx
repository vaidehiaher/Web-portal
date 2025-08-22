import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { 
  Shield, 
  Lock, 
  Eye, 
  Download, 
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  FileText,
  User,
  Calendar
} from 'lucide-react'

interface ConsentRecord {
  id: string
  userId: string
  userName: string
  userEmail: string
  dataType: string
  purpose: string
  consentGiven: boolean
  consentDate: Date
  expiryDate: Date
  status: 'active' | 'expired' | 'revoked'
  accessLog: AccessLogEntry[]
}

interface AccessLogEntry {
  id: string
  accessedBy: string
  accessedAt: Date
  purpose: string
  dataAccessed: string[]
  ipAddress: string
}

interface DataRequest {
  id: string
  requesterId: string
  requesterName: string
  requesterType: 'student' | 'faculty' | 'recruiter' | 'admin'
  dataRequested: string[]
  purpose: string
  requestDate: Date
  status: 'pending' | 'approved' | 'denied'
  reviewedBy?: string
  reviewDate?: Date
  expiryDate?: Date
}

export function ConsentVault() {
  const [consentRecords] = useState<ConsentRecord[]>([
    {
      id: '1',
      userId: 'user1',
              userName: 'Gaurav Agrawal',
              userEmail: 'gaurav.agrawal@college.edu',
      dataType: 'Academic Records',
      purpose: 'Placement Process',
      consentGiven: true,
      consentDate: new Date('2024-01-15'),
      expiryDate: new Date('2024-12-31'),
      status: 'active',
      accessLog: [
        {
          id: '1',
          accessedBy: 'recruiter@techcorp.com',
          accessedAt: new Date('2024-01-20'),
          purpose: 'Resume Verification',
          dataAccessed: ['Transcript', 'CGPA'],
          ipAddress: '192.168.1.100'
        }
      ]
    },
    {
      id: '2',
      userId: 'user2',
              userName: 'Pankaj Borkar',
              userEmail: 'pankaj.borkar@college.edu',
      dataType: 'Personal Information',
      purpose: 'Scholarship Application',
      consentGiven: true,
      consentDate: new Date('2024-01-10'),
      expiryDate: new Date('2024-06-30'),
      status: 'active',
      accessLog: []
    },
    {
      id: '3',
      userId: 'user3',
              userName: 'Jaya Raut',
              userEmail: 'jaya.raut@college.edu',
      dataType: 'Contact Information',
      purpose: 'Alumni Network',
      consentGiven: false,
      consentDate: new Date('2024-01-05'),
      expiryDate: new Date('2024-01-05'),
      status: 'revoked',
      accessLog: []
    }
  ])

  const [dataRequests] = useState<DataRequest[]>([
    {
      id: '1',
      requesterId: 'recruiter1',
      requesterName: 'TechCorp Recruiter',
      requesterType: 'recruiter',
      dataRequested: ['Resume', 'Academic Transcript', 'Contact Info'],
      purpose: 'Candidate Evaluation for Software Engineer Position',
      requestDate: new Date('2024-01-22'),
      status: 'pending'
    },
    {
      id: '2',
      requesterId: 'faculty1',
      requesterName: 'Dr. Sarah Wilson',
      requesterType: 'faculty',
      dataRequested: ['Academic Performance', 'Project Details'],
      purpose: 'Research Collaboration Assessment',
      requestDate: new Date('2024-01-21'),
      status: 'approved',
      reviewedBy: 'admin@college.edu',
      reviewDate: new Date('2024-01-21'),
      expiryDate: new Date('2024-07-21')
    },
    {
      id: '3',
      requesterId: 'admin1',
      requesterName: 'T&P Administrator',
      requesterType: 'admin',
      dataRequested: ['Placement Statistics', 'Student Preferences'],
      purpose: 'Annual Placement Report Generation',
      requestDate: new Date('2024-01-20'),
      status: 'denied',
      reviewedBy: 'system.admin@college.edu',
      reviewDate: new Date('2024-01-20')
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'expired': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'revoked': return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'pending': return <Clock className="h-4 w-4 text-blue-600" />
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'denied': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'expired': return 'bg-yellow-100 text-yellow-800'
      case 'revoked': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-blue-100 text-blue-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'denied': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredRecords = consentRecords.filter(record => {
    const matchesSearch = record.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.dataType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredRequests = dataRequests.filter(request => {
    const matchesSearch = request.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Private Consent Vault
          </h2>
          <p className="text-muted-foreground">
            GDPR-compliant data access controls and consent management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Audit Log
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Compliance Report
          </Button>
        </div>
      </div>

      {/* Privacy Controls */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-green-800 dark:text-green-200 flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Privacy Protection Status
          </CardTitle>
          <CardDescription>
            All data access is logged and requires explicit consent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1,247</div>
              <div className="text-sm text-muted-foreground">Active Consents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-muted-foreground">Data Requests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">23</div>
              <div className="text-sm text-muted-foreground">Pending Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">8</div>
              <div className="text-sm text-muted-foreground">Revoked Access</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, or data type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
              <option value="revoked">Revoked</option>
              <option value="approved">Approved</option>
              <option value="denied">Denied</option>
            </select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Advanced
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="consents" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="consents">Consent Records</TabsTrigger>
          <TabsTrigger value="requests">Data Requests</TabsTrigger>
          <TabsTrigger value="access-logs">Access Logs</TabsTrigger>
          <TabsTrigger value="settings">Privacy Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="consents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consent Management</CardTitle>
              <CardDescription>Manage user consent for data access and processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                          {record.userName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{record.userName}</h4>
                          <p className="text-sm text-muted-foreground">{record.userEmail}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{record.dataType}</Badge>
                            <Badge className={getStatusColor(record.status)}>
                              {record.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        <Switch checked={record.consentGiven} disabled />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Purpose:</span>
                        <div className="font-medium">{record.purpose}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Consent Date:</span>
                        <div className="font-medium">{record.consentDate.toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expires:</span>
                        <div className="font-medium">{record.expiryDate.toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Access Count:</span>
                        <div className="font-medium">{record.accessLog.length}</div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-3 w-3" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-3 w-3" />
                        Access Log
                      </Button>
                      {record.status === 'active' && (
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="mr-2 h-3 w-3" />
                          Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Access Requests</CardTitle>
              <CardDescription>Review and manage data access requests from various stakeholders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white font-medium">
                          {request.requesterName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{request.requesterName}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{request.requesterType}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {request.requestDate.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      {getStatusIcon(request.status)}
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Purpose:</p>
                      <p className="text-sm text-muted-foreground">{request.purpose}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Data Requested:</p>
                      <div className="flex flex-wrap gap-1">
                        {request.dataRequested.map((data, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {data}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {request.reviewedBy && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Reviewed by:</span>
                          <div className="font-medium">{request.reviewedBy}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Review Date:</span>
                          <div className="font-medium">{request.reviewDate?.toLocaleDateString()}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2 border-t">
                      {request.status === 'pending' && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="mr-2 h-3 w-3" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <AlertTriangle className="mr-2 h-3 w-3" />
                            Deny
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-3 w-3" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-3 w-3" />
                        Audit Trail
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access-logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Access Audit Logs</CardTitle>
              <CardDescription>Complete audit trail of all data access activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consentRecords.flatMap(record => 
                  record.accessLog.map(log => (
                    <div key={log.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">Data Access Event</h4>
                          <p className="text-sm text-muted-foreground">
                            {log.accessedBy} accessed {record.userName}'s data
                          </p>
                        </div>
                        <Badge variant="outline">
                          {log.accessedAt.toLocaleDateString()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Purpose:</span>
                          <div className="font-medium">{log.purpose}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Time:</span>
                          <div className="font-medium">{log.accessedAt.toLocaleTimeString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">IP Address:</span>
                          <div className="font-medium">{log.ipAddress}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Data Types:</span>
                          <div className="font-medium">{log.dataAccessed.length} items</div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-1">Data Accessed:</p>
                        <div className="flex flex-wrap gap-1">
                          {log.dataAccessed.map((data, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {data}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Configure system-wide privacy and consent settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Automatic Consent Expiry</h4>
                    <p className="text-sm text-muted-foreground">Automatically expire consents after specified period</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Send notifications for consent requests and expiry</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Audit Logging</h4>
                    <p className="text-sm text-muted-foreground">Log all data access activities</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Retention Limits</h4>
                    <p className="text-sm text-muted-foreground">Automatically delete old data based on retention policies</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Default Consent Duration</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Academic Data</label>
                    <Input type="number" defaultValue="365" className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">Days</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Personal Information</label>
                    <Input type="number" defaultValue="180" className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">Days</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Contact Details</label>
                    <Input type="number" defaultValue="90" className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">Days</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button>Save Settings</Button>
                <Button variant="outline">Reset to Defaults</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
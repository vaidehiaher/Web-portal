export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  isActive: boolean
  createdAt: Date
  lastLogin?: Date
}

export type UserRole = 'student' | 'faculty' | 'tpAdmin'

export interface Student extends User {
  studentId: string
  department: string
  year: number
  cgpa: number
  skills: string[]
  resume?: string
  verificationHash?: string
  applications: Application[]
  offers: JobOffer[]
}

export interface Faculty extends User {
  employeeId: string
  department: string
  designation: string
  researchAreas: string[]
  mentees: string[]
  lorIssued: LOR[]
}

export interface JobListing {
  id: string
  title: string
  company: string
  location: string
  type: 'full-time' | 'internship' | 'part-time'
  package: {
    min: number
    max: number
    currency: string
  }
  requirements: string[]
  description: string
  applicationDeadline: Date
  postedBy: string
  applicants: string[]
  shortlisted: string[]
  selected: string[]
  status: 'active' | 'closed' | 'draft'
}

export interface Scholarship {
  id: string
  name: string
  provider: string
  amount: number
  eligibilityCriteria: string[]
  applicationDeadline: Date
  description: string
  category: 'merit' | 'need-based' | 'research' | 'diversity'
  status: 'active' | 'closed'
  applicants: string[]
}

export interface Application {
  id: string
  type: 'job' | 'scholarship' | 'higher-studies'
  targetId: string
  studentId: string
  status: 'draft' | 'submitted' | 'under-review' | 'shortlisted' | 'rejected' | 'accepted'
  submittedAt?: Date
  documents: Document[]
  notes?: string
}

export interface Document {
  id: string
  name: string
  type: 'resume' | 'cover-letter' | 'transcript' | 'lor' | 'sop' | 'other'
  url: string
  verificationHash?: string
  uploadedAt: Date
}

export interface LOR {
  id: string
  studentId: string
  facultyId: string
  purpose: string
  content: string
  tone: 'formal' | 'enthusiastic' | 'academic'
  template: string
  verificationHash: string
  issuedAt: Date
  status: 'draft' | 'issued' | 'verified'
}

export interface JobOffer {
  id: string
  jobId: string
  studentId: string
  company: string
  position: string
  package: number
  location: string
  joiningDate: Date
  status: 'pending' | 'accepted' | 'declined'
  benefits: string[]
  terms: string
}

export interface DriveEvent {
  id: string
  company: string
  type: 'placement' | 'internship'
  date: Date
  venue: string
  eligibleDepartments: string[]
  minimumCgpa: number
  registeredStudents: string[]
  shortlistedStudents: string[]
  selectedStudents: string[]
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  coordinator: string
}

export interface SkillGap {
  skill: string
  currentLevel: number
  requiredLevel: number
  estimatedWeeks: number
  resources: string[]
}

export interface OpportunityMatch {
  id: string
  title: string
  type: 'job' | 'scholarship' | 'higher-studies'
  matchPercentage: number
  reasons: string[]
  missingSkills: string[]
  applicationDeadline: Date
}

export interface Analytics {
  totalPlacements: number
  averagePackage: number
  topRecruiters: string[]
  departmentWiseStats: Record<string, number>
  yearWiseTrends: Record<string, number>
  scholarshipsAwarded: number
  higherStudiesEnrolled: number
}
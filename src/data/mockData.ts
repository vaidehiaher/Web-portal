import { User, Student, JobListing, Scholarship, DriveEvent, Analytics } from '../types'

export const mockUsers: User[] = [
  {
    id: '1',
          email: 'gaurav.agrawal@college.edu',
          name: 'Gaurav Agrawal',
    role: 'student',
    isActive: true,
    createdAt: new Date('2023-01-15'),
    lastLogin: new Date('2024-01-20')
  },
  {
    id: '2',
          email: 'amit.thakre@college.edu',
          name: 'Dr. Sharayu Deote',
    role: 'faculty',
    isActive: true,
    createdAt: new Date('2022-08-01'),
    lastLogin: new Date('2024-01-19')
  },
  {
    id: '3',
    email: 'tp.admin@college.edu',
    name: 'Mehul Joshi',
    role: 'tpAdmin',
    isActive: true,
    createdAt: new Date('2023-03-10'),
    lastLogin: new Date('2024-01-20')
  },
  {
    id: '4',
    email: 'recruiter@techcorp.com',
    name: 'Riya Menon',
    role: 'tpAdmin',
    isActive: true,
    createdAt: new Date('2023-09-01'),
    lastLogin: new Date('2024-01-18')
  },
  {
    id: '5',
    email: 'hs.coordinator@college.edu',
    name: 'HS Coordinator',
    role: 'higherStudies',
    isActive: true,
    createdAt: new Date('2023-06-01'),
    lastLogin: new Date('2024-01-18')
  }
]

export const mockStudents: Student[] = [
  {
    ...mockUsers[0],
    studentId: 'CS2021001',
    department: 'Computer Science',
    year: 4,
    cgpa: 8.5,
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning'],
    resume: '/resumes/john-doe-resume.pdf',
    verificationHash: 'abc123def456',
    applications: [],
    offers: []
  }
]

export const mockJobListings: JobListing[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'TechCorp',
    location: 'Bengaluru, KA',
    type: 'full-time',
    package: { min: 1200000, max: 1500000, currency: 'INR' },
    requirements: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    description: 'Join our dynamic team as a Software Engineer and work on cutting-edge web applications.',
    applicationDeadline: new Date('2024-02-15'),
    postedBy: '4',
    applicants: ['1'],
    shortlisted: [],
    selected: [],
    status: 'active'
  },
  {
    id: '2',
    title: 'Data Scientist Intern',
    company: 'DataTech Inc',
    location: 'Hyderabad, TS',
    type: 'internship',
    package: { min: 25000, max: 50000, currency: 'INR' },
    requirements: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
    description: 'Summer internship opportunity for aspiring data scientists.',
    applicationDeadline: new Date('2024-03-01'),
    postedBy: '4',
    applicants: [],
    shortlisted: [],
    selected: [],
    status: 'active'
  }
]

export const mockScholarships: Scholarship[] = [
  {
    id: '1',
    name: 'Excellence Merit Scholarship',
    provider: 'Education Foundation',
    amount: 10000,
    eligibilityCriteria: ['CGPA > 8.0', 'Final Year Student', 'Leadership Experience'],
    applicationDeadline: new Date('2024-02-28'),
    description: 'Merit-based scholarship for outstanding students pursuing higher education.',
    category: 'merit',
    status: 'active',
    applicants: ['1']
  },
  {
    id: '2',
    name: 'Research Excellence Grant',
    provider: 'National Research Council',
    amount: 25000,
    eligibilityCriteria: ['Research Publication', 'CGPA > 8.5', 'Faculty Recommendation'],
    applicationDeadline: new Date('2024-04-15'),
    description: 'Grant for students pursuing research-oriented higher studies.',
    category: 'research',
    status: 'active',
    applicants: []
  }
]

export const mockDriveEvents: DriveEvent[] = [
  {
    id: '1',
    company: 'TechCorp',
    type: 'placement',
    date: new Date('2024-02-10'),
    venue: 'Auditorium A',
    eligibleDepartments: ['Computer Science', 'Information Technology'],
    minimumCgpa: 7.0,
    registeredStudents: ['1'],
    shortlistedStudents: [],
    selectedStudents: [],
    status: 'upcoming',
    coordinator: '3'
  }
]

export const mockAnalytics: Analytics = {
  totalPlacements: 234,
  averagePackage: 85000,
  topRecruiters: ['TechCorp', 'DataTech Inc', 'Innovation Labs', 'CloudSoft', 'AI Solutions'],
  departmentWiseStats: {
    'Computer Science': 89,
    'Information Technology': 67,
    'Electronics': 45,
    'Mechanical': 33
  },
  yearWiseTrends: {
    '2020': 180,
    '2021': 195,
    '2022': 210,
    '2023': 234
  },
  scholarshipsAwarded: 45,
  higherStudiesEnrolled: 78
}

export const skillGapData = [
  {
    skill: 'React',
    currentLevel: 6,
    requiredLevel: 8,
    estimatedWeeks: 3,
    resources: ['React Documentation', 'Advanced React Course', 'Practice Projects']
  },
  {
    skill: 'TypeScript',
    currentLevel: 4,
    requiredLevel: 7,
    estimatedWeeks: 4,
    resources: ['TypeScript Handbook', 'Practical TypeScript', 'Real-world Projects']
  },
  {
    skill: 'System Design',
    currentLevel: 2,
    requiredLevel: 6,
    estimatedWeeks: 6,
    resources: ['System Design Primer', 'Architecture Patterns', 'Case Studies']
  }
]

export const opportunityMatches = [
  {
    id: '1',
    title: 'Frontend Developer at TechCorp',
    type: 'job' as const,
    matchPercentage: 85,
    reasons: ['Strong React skills', 'JavaScript expertise', 'Good academic record'],
    missingSkills: ['TypeScript', 'Testing'],
    applicationDeadline: new Date('2024-02-15')
  },
  {
    id: '2',
    title: 'CS Masters Scholarship',
    type: 'scholarship' as const,
    matchPercentage: 92,
    reasons: ['Excellent CGPA', 'Research interest', 'Strong recommendations'],
    missingSkills: [],
    applicationDeadline: new Date('2024-03-01')
  }
]
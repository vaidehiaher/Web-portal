import { useState, useEffect } from "react"
import { Layout } from '../../components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { CompanyLogo } from '../../components/ui/company-logo'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { 
  Calendar, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Upload
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { mockAnalytics, mockDriveEvents } from '../../data/mockData'
import type { DriveEvent } from '../../types'

// ✅ Firebase imports
import { ref, push, onValue } from "firebase/database"
import { db } from "../../lib/firebase"

export function TPAdminDashboard() {
  const chartData = Object.entries(mockAnalytics.departmentWiseStats).map(([dept, count]) => ({
    department: dept,
    placements: count
  }))

  const placedStudents = [/* ... your existing data ... */]

  // ✅ State for opportunities
  const [opportunity, setOpportunity] = useState({
    title: "",
    company: "",
    deadline: "",
    skills: "",
  })
  const [opportunities, setOpportunities] = useState<any[]>([])

  // ✅ Fetch opportunities from Firebase
  useEffect(() => {
    const oppRef = ref(db, "opportunities")
    onValue(oppRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setOpportunities(Object.values(data))
      }
    })
  }, [])

  // ✅ Upload to Firebase
  const handleUpload = () => {
    if (!opportunity.title || !opportunity.company) return
    const oppRef = ref(db, "opportunities")
    push(oppRef, opportunity)
    setOpportunity({ title: "", company: "", deadline: "", skills: "" })
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">T&P Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage recruitment drives, track placements, and oversee T&P operations.
          </p>
        </div>

        {/* Quick Stats (unchanged) */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* ... your existing quick stats cards ... */}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          {/* ✅ Added 1 more tab */}
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="drives">Drive Management</TabsTrigger>
            <TabsTrigger value="placed">Placed Students</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          </TabsList>

          {/* === Existing tabs (Overview, Drives, Placed Students) remain unchanged === */}

          {/* ✅ New Opportunities Tab */}
          <TabsContent value="opportunities">
            <Card>
              <CardHeader>
                <CardTitle>Add New Opportunity</CardTitle>
                <CardDescription>Upload a placement/internship opportunity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  className="border rounded p-2 w-full"
                  placeholder="Job Title"
                  value={opportunity.title}
                  onChange={(e) => setOpportunity({ ...opportunity, title: e.target.value })}
                />
                <input
                  className="border rounded p-2 w-full"
                  placeholder="Company"
                  value={opportunity.company}
                  onChange={(e) => setOpportunity({ ...opportunity, company: e.target.value })}
                />
                <input
                  className="border rounded p-2 w-full"
                  type="date"
                  value={opportunity.deadline}
                  onChange={(e) => setOpportunity({ ...opportunity, deadline: e.target.value })}
                />
                <input
                  className="border rounded p-2 w-full"
                  placeholder="Skills (comma separated)"
                  value={opportunity.skills}
                  onChange={(e) => setOpportunity({ ...opportunity, skills: e.target.value })}
                />
                <Button onClick={handleUpload}>
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Uploaded Opportunities</CardTitle>
                <CardDescription>These are visible to students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {opportunities.map((opp, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold">{opp.title}</h4>
                    <p className="text-sm text-muted-foreground">{opp.company}</p>
                    <p className="text-sm">Deadline: {opp.deadline}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {opp.skills?.split(",").map((skill: string, i: number) => (
                        <Badge key={i} variant="outline">{skill.trim()}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

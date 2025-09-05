import { useState } from 'react'
import { Layout } from '../../components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import {
  Target,
  TrendingUp,
  Calendar,
  FileText,
  Award,
  Search,
  Brain,
  CheckCircle
} from 'lucide-react'
import { opportunityMatches, skillGapData } from '../../data/mockData'
import { OpportunityRadar } from '../../components/student/OpportunityRadar'
import { SkillGapMapper } from '../../components/student/SkillGapMapper'
import { SoPAssistant } from '../../components/student/SoPAssistant'
import { SmartSearchChatbot } from '../../components/SmartSearchChatbot'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'

export function StudentDashboard() {
  const [openTemplate, setOpenTemplate] = useState<string | null>(null)

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your personalized career development overview.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offers</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Pending response</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">+5% this month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="sop">SoP Assistant</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Opportunity Radar
                  </CardTitle>
                  <CardDescription>
                    AI-powered matching for jobs and opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OpportunityRadar opportunities={opportunityMatches} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Your latest actions and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Applied to TechCorp</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Interview scheduled</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mt-2" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Resume updated</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks to boost your career prospects</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Update Resume
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Jobs
                </Button>
                <Button variant="outline" size="sm">
                  <Award className="mr-2 h-4 w-4" />
                  Find Scholarships
                </Button>
                <Button variant="outline" size="sm">
                  <Brain className="mr-2 h-4 w-4" />
                  Skill Assessment
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Smart Search Assistant</CardTitle>
                  <CardDescription>Get instant help with T&P processes</CardDescription>
                </CardHeader>
                <CardContent>
                  <SmartSearchChatbot />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="opportunities">
            <OpportunityRadar opportunities={opportunityMatches} detailed />
          </TabsContent>

          <TabsContent value="skills">
            <SkillGapMapper skillGaps={skillGapData} />
          </TabsContent>

          <TabsContent value="sop">
            <SoPAssistant />

            {/* Templates section inside SoP Assistant */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Templates</CardTitle>
                <CardDescription>Pre-built templates for different programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="cursor-pointer hover:shadow-lg transition"
                        onClick={() => setOpenTemplate("cs")}>
                    <CardHeader>
                      <CardTitle>Computer Science Masters</CardTitle>
                      <CardDescription>Template for CS graduate programs</CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-lg transition"
                        onClick={() => setOpenTemplate("mba")}>
                    <CardHeader>
                      <CardTitle>MBA Application</CardTitle>
                      <CardDescription>Business school application template</CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-lg transition"
                        onClick={() => setOpenTemplate("phd")}>
                    <CardHeader>
                      <CardTitle>Research PhD</CardTitle>
                      <CardDescription>Research-focused doctoral programs</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Templates</CardTitle>
                <CardDescription>Download ready-to-edit templates for common application types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-lg">CS Masters (M.S.)</CardTitle>
                      <CardDescription>SoP skeleton, CV checklist, docs list</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button asChild className="flex-1"><a href="/templates/cs_masters_template.docx" download>Download .docx</a></Button>
                        <Button asChild variant="outline" className="flex-1"><a href="/templates/cs_masters_template.pdf" target="_blank">View PDF</a></Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-lg">MBA Application</CardTitle>
                      <CardDescription>Essay prompts, resume checklist, docs list</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button asChild className="flex-1"><a href="/templates/mba_application_template.docx" download>Download .docx</a></Button>
                        <Button asChild variant="outline" className="flex-1"><a href="/templates/mba_application_template.pdf" target="_blank">View PDF</a></Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-lg">PhD Research</CardTitle>
                      <CardDescription>Research proposal structure + checklist</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button asChild className="flex-1"><a href="/templates/phd_research_template.docx" download>Download .docx</a></Button>
                        <Button asChild variant="outline" className="flex-1"><a href="/templates/phd_research_template.pdf" target="_blank">View PDF</a></Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Template Dialog */}
        <Dialog open={!!openTemplate} onOpenChange={() => setOpenTemplate(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {openTemplate === "cs" && "Computer Science Masters Template"}
                {openTemplate === "mba" && "MBA Application Template"}
                {openTemplate === "phd" && "PhD Research Template"}
              </DialogTitle>
            </DialogHeader>

            <div className="flex gap-2">
              {openTemplate === "cs" && (
                <>
                  <Button asChild><a href="/templates/cs_masters_template.docx" download>Download .docx</a></Button>
                  <Button asChild variant="outline"><a href="/templates/cs_masters_template.pdf" target="_blank">View PDF</a></Button>
                </>
              )}
              {openTemplate === "mba" && (
                <>
                  <Button asChild><a href="/templates/mba_application_template.docx" download>Download .docx</a></Button>
                  <Button asChild variant="outline"><a href="/templates/mba_application_template.pdf" target="_blank">View PDF</a></Button>
                </>
              )}
              {openTemplate === "phd" && (
                <>
                  <Button asChild><a href="/templates/phd_research_template.docx" download>Download .docx</a></Button>
                  <Button asChild variant="outline"><a href="/templates/phd_research_template.pdf" target="_blank">View PDF</a></Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}

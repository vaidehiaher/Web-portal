//
import { Layout } from '../../components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'

export function HigherStudiesDashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Higher Studies Dashboard</h1>
          <p className="text-muted-foreground">Access opportunities, scholarships, and your application tracker.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Explore Opportunities</CardTitle>
              <CardDescription>Masters, PhD, and more</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild><a href="/higher-studies#opportunities">Browse</a></Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Scholarships</CardTitle>
              <CardDescription>Funding and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild><a href="/higher-studies#scholarships">View</a></Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
              <CardDescription>Track your status</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild><a href="/higher-studies#applications">Open</a></Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Guidance</CardTitle>
              <CardDescription>Exams, SOP tips, FAQs</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild><a href="/higher-studies#guidance">Resources</a></Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Universities</CardTitle>
              <CardDescription>Browse by country</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild><a href="/higher-studies#universities">Explore</a></Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>About & Placements</CardTitle>
              <CardDescription>College info and outcomes</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button asChild variant="outline"><a href="/about">About</a></Button>
              <Button asChild><a href="/placements">Placements</a></Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}



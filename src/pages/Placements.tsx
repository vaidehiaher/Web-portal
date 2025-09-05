import React from 'react'
import { Layout } from '../components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export function Placements() {
  const highlights = {
    totalPlacements: 234,
    averagePackage: '₹8.5 LPA',
    topRecruiters: ['Cummins', 'TCS', 'Infosys', 'Tech Mahindra', 'Capgemini'],
  }

  const recentOffers = [
    { id: '1', student: 'Aditi Sharma', company: 'Cummins', role: 'GET', ctc: '₹7.5 LPA' },
    { id: '2', student: 'Neha Patil', company: 'TCS', role: 'System Engineer', ctc: '₹6.8 LPA' },
    { id: '3', student: 'Pooja Deshmukh', company: 'Infosys', role: 'SE', ctc: '₹6.5 LPA' },
  ]

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Placements</h1>
          <p className="text-muted-foreground">Highlights and recent offers</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Placements</CardTitle>
              <CardDescription>Across all departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{highlights.totalPlacements}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Package</CardTitle>
              <CardDescription>CTC for placed students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{highlights.averagePackage}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Recruiters</CardTitle>
              <CardDescription>Recent hiring partners</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {highlights.topRecruiters.map((r) => (
                <Badge key={r} variant="secondary">{r}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Offers</CardTitle>
            <CardDescription>Sample of placed students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOffers.map((o) => (
              <div key={o.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium text-sm">{o.student}</p>
                  <p className="text-xs text-muted-foreground">{o.company} • {o.role}</p>
                </div>
                <div className="text-sm font-semibold">{o.ctc}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}



import React from 'react'
import { Layout } from '../components/Layout'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'

export function About() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
          <p className="text-muted-foreground">About Maharshi Karve and Cummins College of Engineering for Women, Nagpur</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Maharshi Karve Stree Shikshan Samstha</CardTitle>
            <CardDescription>Legacy and mission</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>
              Maharshi Karve Stree Shikshan Samstha (MKSSS) was founded with a singular vision of advancing
              education for women and enabling their holistic development. Inspired by the social reformer
              Maharshi Dhondo Keshav Karve, the Samstha has consistently worked to expand access to quality
              education and professional opportunities for women across disciplines.
            </p>
            <p>
              The institution emphasizes values-driven education, modern pedagogy, and a strong ecosystem of
              support services that fosters academic excellence, personal growth, and social responsibility.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About the College</CardTitle>
            <CardDescription>Cummins College of Engineering for Women, Nagpur</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>
              Cummins College of Engineering for Women, Nagpur is an autonomous institute affiliated to RTM
              Nagpur University. The college is approved by AICTE, New Delhi and is accredited by NAAC with an
              A+ grade. Established in 2010 with generous support from Cummins India Limited, the institute has
              grown steadily with achievements in academics and placements.
            </p>
            <p>
              The campus is located at Hingna, Nagpur and spans a serene, green environment of approximately
              22 acres. It offers B.Tech programs in Computer Engineering, Electronics & Telecommunications
              Engineering, and Mechanical Engineering, supported by modern laboratories, a central library,
              ICT-enabled classrooms, and comprehensive student support facilities.
            </p>
            <p className="text-xs">
              Source: Cummins College official site — see About and Home pages for details.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}



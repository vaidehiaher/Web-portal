import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { useAuth } from '../contexts/AuthContext'
import { Trash2, Plus } from 'lucide-react'

type ProgramType = 'Masters' | 'PhD' | 'Diploma'

interface ProgramItem {
  id: string
  name: string
  university: string
  country: string
  duration: string
  type: ProgramType
  field: string
  deadline: string
  tuition: string
  scholarship: boolean
  rating: number
}

interface ScholarshipItem {
  id: string
  name: string
  provider: string
  amount?: string
  deadline: string
  link: string
  country?: string
}

export function HigherStudiesAdmin() {
  const { user } = useAuth()
  const [programs, setPrograms] = useState<ProgramItem[]>([])
  const [scholarships, setScholarships] = useState<ScholarshipItem[]>([])

  useEffect(() => {
    try {
      const p = localStorage.getItem('hs_programs')
      if (p) setPrograms(JSON.parse(p))
    } catch {/* noop */}
    try {
      const s = localStorage.getItem('hs_scholarships')
      if (s) setScholarships(JSON.parse(s))
    } catch {/* noop */}
  }, [])

  useEffect(() => {
    try { localStorage.setItem('hs_programs', JSON.stringify(programs)) } catch {/* noop */}
  }, [programs])

  useEffect(() => {
    try { localStorage.setItem('hs_scholarships', JSON.stringify(scholarships)) } catch {/* noop */}
  }, [scholarships])

  if (!user) {
    return (
      <Layout>
        <div className="p-6 text-center text-muted-foreground">Please sign in to access the admin panel.</div>
      </Layout>
    )
  }

  if (user.role !== 'tpAdmin') {
    return (
      <Layout>
        <div className="p-6 text-center text-muted-foreground">You are not authorized to view this page.</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Higher Studies Admin</h1>
          <p className="text-muted-foreground">Add, edit, and remove opportunities and scholarships</p>
        </div>

        <Tabs defaultValue="programs" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          </TabsList>

          <TabsContent value="programs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Program</CardTitle>
                <CardDescription>Minimal fields for now; extend later</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault()
                    const f = e.currentTarget
                    const data = new FormData(f)
                    const item: ProgramItem = {
                      id: Date.now().toString(),
                      name: String(data.get('name') || ''),
                      university: String(data.get('university') || ''),
                      country: String(data.get('country') || ''),
                      duration: String(data.get('duration') || ''),
                      type: (String(data.get('type') || 'Masters') as ProgramType),
                      field: String(data.get('field') || ''),
                      deadline: String(data.get('deadline') || ''),
                      tuition: String(data.get('tuition') || ''),
                      scholarship: Boolean(data.get('scholarship')),
                      rating: Number(data.get('rating') || 4.5)
                    }
                    setPrograms(prev => [item, ...prev])
                    f.reset()
                  }}
                  className="grid md:grid-cols-6 gap-2"
                >
                  <Input name="name" placeholder="Program Name" className="md:col-span-2" required />
                  <Input name="university" placeholder="University" className="md:col-span-2" required />
                  <Input name="country" placeholder="Country" />
                  <select name="type" className="px-3 py-2 border rounded-md">
                    <option>Masters</option>
                    <option>PhD</option>
                    <option>Diploma</option>
                  </select>
                  <Input name="field" placeholder="Field" />
                  <Input name="duration" placeholder="Duration" />
                  <Input name="deadline" type="date" />
                  <Input name="tuition" placeholder="Tuition" />
                  <Input name="rating" placeholder="Rating (0-5)" />
                  <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" name="scholarship" /> Scholarship
                  </label>
                  <Button type="submit" className="md:col-span-1"><Plus className="h-4 w-4 mr-1" />Add</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Programs</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {programs.map(p => (
                  <div key={p.id} className="p-3 border rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.university} • {p.country} • {p.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {p.scholarship && <Badge variant="outline">Scholarship</Badge>}
                      <Button variant="outline" size="icon" onClick={() => setPrograms(prev => prev.filter(x => x.id !== p.id))}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scholarships" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Scholarship</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault()
                    const f = e.currentTarget
                    const data = new FormData(f)
                    const item: ScholarshipItem = {
                      id: Date.now().toString(),
                      name: String(data.get('name') || ''),
                      provider: String(data.get('provider') || ''),
                      amount: String(data.get('amount') || ''),
                      deadline: String(data.get('deadline') || ''),
                      link: String(data.get('link') || ''),
                      country: String(data.get('country') || '')
                    }
                    setScholarships(prev => [item, ...prev])
                    f.reset()
                  }}
                  className="grid md:grid-cols-6 gap-2"
                >
                  <Input name="name" placeholder="Scholarship Name" className="md:col-span-2" required />
                  <Input name="provider" placeholder="Provider" className="md:col-span-2" required />
                  <Input name="amount" placeholder="Amount" />
                  <Input name="country" placeholder="Country" />
                  <Input name="deadline" type="date" />
                  <Input name="link" placeholder="Application Link" className="md:col-span-3" />
                  <Button type="submit" className="md:col-span-1"><Plus className="h-4 w-4 mr-1" />Add</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Scholarships</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {scholarships.map(s => (
                  <div key={s.id} className="p-3 border rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.provider}{s.country ? ` • ${s.country}` : ''}</p>
                    </div>
                    <Button variant="outline" size="icon" onClick={() => setScholarships(prev => prev.filter(x => x.id !== s.id))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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



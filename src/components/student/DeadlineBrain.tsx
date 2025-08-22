import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, AlertTriangle, Download, Filter } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Deadline {
  id: string
  title: string
  type: 'job' | 'scholarship' | 'application' | 'interview'
  date: Date
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'completed' | 'missed'
  description: string
}

const mockDeadlines: Deadline[] = [
  {
    id: '1',
    title: 'TechCorp Application',
    type: 'job',
    date: new Date('2024-02-15'),
    priority: 'high',
    status: 'pending',
    description: 'Software Engineer position application deadline'
  },
  {
    id: '2',
    title: 'Google Interview',
    type: 'interview',
    date: new Date('2024-02-12'),
    priority: 'high',
    status: 'pending',
    description: 'Technical interview round 2'
  },
  {
    id: '3',
    title: 'Merit Scholarship',
    type: 'scholarship',
    date: new Date('2024-02-28'),
    priority: 'medium',
    status: 'pending',
    description: 'Excellence Merit Scholarship application'
  },
  {
    id: '4',
    title: 'Resume Update',
    type: 'application',
    date: new Date('2024-02-08'),
    priority: 'medium',
    status: 'completed',
    description: 'Updated resume for placement season'
  }
]

export function DeadlineBrain() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'high-priority'>('all')
  
  const filteredDeadlines = mockDeadlines.filter(deadline => {
    if (filter === 'pending') return deadline.status === 'pending'
    if (filter === 'high-priority') return deadline.priority === 'high' && deadline.status === 'pending'
    return true
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'job': return 'bg-blue-100 text-blue-800'
      case 'scholarship': return 'bg-purple-100 text-purple-800'
      case 'interview': return 'bg-green-100 text-green-800'
      case 'application': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string, date: Date) => {
    const isOverdue = date < new Date() && status === 'pending'
    if (isOverdue) return <AlertTriangle className="h-4 w-4 text-red-500" />
    if (status === 'completed') return <div className="h-2 w-2 rounded-full bg-green-500" />
    return <Clock className="h-4 w-4 text-yellow-500" />
  }

  const urgentDeadlines = filteredDeadlines.filter(d => {
    const daysUntil = Math.ceil((d.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return daysUntil <= 7 && d.status === 'pending'
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Deadline Brain
          </h2>
          <p className="text-muted-foreground">
            Unified calendar with smart conflict detection and iCal export
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export iCal
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {urgentDeadlines.length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-red-800 dark:text-red-200 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Urgent Deadlines
            </CardTitle>
            <CardDescription>
              {urgentDeadlines.length} deadline{urgentDeadlines.length > 1 ? 's' : ''} within 7 days
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {urgentDeadlines.map(deadline => (
              <div key={deadline.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
                <div>
                  <p className="font-medium text-sm">{deadline.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.ceil((deadline.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                  </p>
                </div>
                <Badge className={getPriorityColor(deadline.priority)}>
                  {deadline.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2 mb-4">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button 
          variant={filter === 'pending' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('pending')}
        >
          Pending
        </Button>
        <Button 
          variant={filter === 'high-priority' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilter('high-priority')}
        >
          High Priority
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredDeadlines.map((deadline) => {
          const daysUntil = Math.ceil((deadline.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
          const isOverdue = daysUntil < 0 && deadline.status === 'pending'
          
          return (
            <Card key={deadline.id} className={isOverdue ? 'border-red-300' : ''}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(deadline.status, deadline.date)}
                    <div className="space-y-1">
                      <h4 className="font-semibold">{deadline.title}</h4>
                      <p className="text-sm text-muted-foreground">{deadline.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(deadline.date)}
                        {daysUntil >= 0 ? ` (${daysUntil} days left)` : ` (${Math.abs(daysUntil)} days overdue)`}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getTypeColor(deadline.type)}>
                      {deadline.type}
                    </Badge>
                    <Badge className={getPriorityColor(deadline.priority)}>
                      {deadline.priority}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conflict Detection</CardTitle>
          <CardDescription>
            Smart scheduling analysis to prevent overlapping commitments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-sm">Potential Conflict Detected</p>
                <p className="text-xs text-muted-foreground">
                  Google interview and TechCorp application preparation overlap on Feb 12-15
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Scheduling Suggestions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
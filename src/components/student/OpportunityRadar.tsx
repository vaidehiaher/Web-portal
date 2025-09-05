import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Target, Calendar, ExternalLink } from 'lucide-react'
import { OpportunityMatch } from '../../types'
import { formatDate } from '../../lib/utils'

interface OpportunityRadarProps {
  opportunities: OpportunityMatch[]
  detailed?: boolean
}

export function OpportunityRadar({ opportunities, detailed = false }: OpportunityRadarProps) {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'job': return 'bg-blue-100 text-blue-800'
      case 'scholarship': return 'bg-purple-100 text-purple-800'
      case 'higher-studies': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (detailed) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Opportunity Radar</h2>
            <p className="text-muted-foreground">AI-powered matching based on your profile</p>
          </div>
          <Button variant="outline">
            <Target className="mr-2 h-4 w-4" />
            Refine Preferences
          </Button>
        </div>

        <div className="grid gap-4">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="relative overflow-hidden">
              <div 
                className={`absolute left-0 top-0 h-full w-1 ${getMatchColor(opportunity.matchPercentage)}`}
              />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(opportunity.type)}>
                        {opportunity.type}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <div className={`h-2 w-2 rounded-full ${getMatchColor(opportunity.matchPercentage)}`} />
                        <span className="text-sm font-medium">{opportunity.matchPercentage}% match</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {opportunity.matchPercentage}%
                    </div>
                    <div className="text-xs text-muted-foreground">Match Score</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Why it's a good match:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {opportunity.reasons.map((reason, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-green-500" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {opportunity.missingSkills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Skills to improve:</h4>
                    <div className="flex flex-wrap gap-1">
                      {opportunity.missingSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Due: {formatDate(opportunity.applicationDeadline)}
                  </div>
                  <Button size="sm">
                    Apply Now
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {opportunities.slice(0, 3).map((opportunity) => (
        <div key={opportunity.id} className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${getMatchColor(opportunity.matchPercentage)}`} />
            <div>
              <p className="font-medium text-sm">{opportunity.title}</p>
              <p className="text-xs text-muted-foreground">{opportunity.matchPercentage}% match</p>
            </div>
          </div>
          <Badge className={getTypeColor(opportunity.type)}>
            {opportunity.type}
          </Badge>
        </div>
      ))}
      <Button variant="outline" className="w-full" size="sm">
        View All Opportunities
      </Button>
    </div>
  )
}
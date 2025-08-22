import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Brain, Clock, BookOpen, Target } from 'lucide-react'
import { SkillGap } from '@/types'

interface SkillGapMapperProps {
  skillGaps: SkillGap[]
}

export function SkillGapMapper({ skillGaps }: SkillGapMapperProps) {
  const totalWeeks = skillGaps.reduce((sum, skill) => sum + skill.estimatedWeeks, 0)
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Skill Gap Mapper
          </h2>
          <p className="text-muted-foreground">
            Compare your skills with target roles and get personalized learning plans
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{totalWeeks}</div>
          <div className="text-sm text-muted-foreground">weeks total</div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>6-Week Upskilling Plan</CardTitle>
          <CardDescription>
            Personalized learning roadmap to bridge your skill gaps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {skillGaps.map((skill, index) => (
              <div key={skill.skill} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{skill.skill}</h4>
                    <p className="text-sm text-muted-foreground">
                      Current: Level {skill.currentLevel} → Target: Level {skill.requiredLevel}
                    </p>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {skill.estimatedWeeks}w
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress needed</span>
                    <span>{Math.round(((skill.requiredLevel - skill.currentLevel) / skill.requiredLevel) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(skill.currentLevel / skill.requiredLevel) * 100} 
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    Recommended Resources:
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {skill.resources.map((resource, resourceIndex) => (
                      <Badge key={resourceIndex} variant="secondary" className="text-xs">
                        {resource}
                      </Badge>
                    ))}
                  </div>
                </div>

                {index < skillGaps.length - 1 && <div className="border-b" />}
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex gap-2">
            <Button className="flex-1">
              <Target className="mr-2 h-4 w-4" />
              Start Learning Plan
            </Button>
            <Button variant="outline">
              Export Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Current Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {skillGaps.reduce((sum, skill) => sum + skill.currentLevel, 0) / skillGaps.length}
            </div>
            <p className="text-sm text-muted-foreground">Average level</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Target Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {skillGaps.reduce((sum, skill) => sum + skill.requiredLevel, 0) / skillGaps.length}
            </div>
            <p className="text-sm text-muted-foreground">Average target</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((skillGaps.reduce((sum, skill) => sum + (skill.currentLevel / skill.requiredLevel), 0) / skillGaps.length) * 100)}%
            </div>
            <p className="text-sm text-muted-foreground">Skills readiness</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
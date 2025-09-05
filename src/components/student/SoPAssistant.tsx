import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { 
  FileText, 
  Wand2, 
  BarChart3, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Copy,
  RefreshCw
} from 'lucide-react'

interface ToneAnalysis {
  tone: 'formal' | 'enthusiastic' | 'academic' | 'personal'
  score: number
  suggestions: string[]
}

interface SoPMetrics {
  wordCount: number
  readabilityScore: number
  keywordDensity: Record<string, number>
  structureScore: number
}

export function SoPAssistant() {
  const [content, setContent] = useState('')
  const [targetProgram, setTargetProgram] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [toneAnalysis, setToneAnalysis] = useState<ToneAnalysis | null>(null)
  const [metrics, setMetrics] = useState<SoPMetrics | null>(null)

  const analyzeTone = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setToneAnalysis({
      tone: 'academic',
      score: 85,
      suggestions: [
        'Consider adding more personal anecdotes',
        'Strengthen the connection to your career goals',
        'Include specific examples of relevant experience'
      ]
    })

    setMetrics({
      wordCount: content.split(' ').length,
      readabilityScore: 78,
      keywordDensity: {
        'research': 3.2,
        'experience': 2.8,
        'passion': 1.5,
        'goals': 2.1
      },
      structureScore: 82
    })
    
    setIsAnalyzing(false)
  }

  const generateOutline = () => {
    const outline = `
1. Introduction & Motivation
   - Personal background and what sparked your interest
   - Brief overview of your academic journey

2. Academic & Professional Experience
   - Relevant coursework and projects
   - Internships, research, or work experience
   - Key achievements and learnings

3. Why This Program
   - Specific aspects that attract you
   - How it aligns with your career goals
   - Faculty or research areas of interest

4. Future Goals & Impact
   - Short-term and long-term career objectives
   - How you plan to contribute to the field
   - Expected impact of the program on your goals

5. Conclusion
   - Summarize your fit for the program
   - Reiterate your enthusiasm and commitment
    `
    setContent(outline)
  }

  const templates = [
    {
      name: 'Computer Science Masters',
      description: 'Template for CS graduate programs',
      keywords: ['algorithms', 'machine learning', 'software engineering', 'research']
    },
    {
      name: 'MBA Application',
      description: 'Business school application template',
      keywords: ['leadership', 'entrepreneurship', 'strategy', 'innovation']
    },
    {
      name: 'Research PhD',
      description: 'Research-focused doctoral programs',
      keywords: ['research', 'methodology', 'contribution', 'academia']
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Statement of Purpose Assistant
          </h2>
          <p className="text-muted-foreground">
            AI-powered writing assistant with tone analysis and optimization
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateOutline}>
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Outline
          </Button>
          <Button onClick={analyzeTone} disabled={!content || isAnalyzing}>
            {isAnalyzing ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <BarChart3 className="mr-2 h-4 w-4" />
            )}
            Analyze
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Write Your Statement</CardTitle>
                <Input
                  placeholder="Target program (e.g., MS Computer Science)"
                  value={targetProgram}
                  onChange={(e) => setTargetProgram(e.target.value)}
                  className="w-64"
                />
              </div>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full h-96 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Start writing your statement of purpose here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  {content.split(' ').filter(word => word.length > 0).length} words
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="mr-2 h-3 w-3" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3 w-3" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {toneAnalysis && metrics && (
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tone">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tone">Tone Analysis</TabsTrigger>
                    <TabsTrigger value="metrics">Metrics</TabsTrigger>
                    <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="tone" className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">Detected Tone</p>
                        <Badge className="capitalize">{toneAnalysis.tone}</Badge>
                      </div>
                      <div>
                        <p className="font-medium">Tone Score</p>
                        <div className="text-2xl font-bold text-primary">{toneAnalysis.score}%</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="metrics" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">Word Count</p>
                        <div className="text-xl font-bold">{metrics.wordCount}</div>
                      </div>
                      <div>
                        <p className="font-medium">Readability</p>
                        <div className="text-xl font-bold">{metrics.readabilityScore}%</div>
                      </div>
                      <div>
                        <p className="font-medium">Structure Score</p>
                        <div className="text-xl font-bold">{metrics.structureScore}%</div>
                      </div>
                      <div>
                        <p className="font-medium">Top Keywords</p>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(metrics.keywordDensity).map(([keyword, density]) => (
                            <Badge key={keyword} variant="outline" className="text-xs">
                              {keyword} ({density}%)
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="suggestions" className="space-y-3">
                    {toneAnalysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <p className="text-sm">{suggestion}</p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>Pre-built templates for different programs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {templates.map((template, index) => (
                <div key={index} className="p-3 border rounded-lg hover:bg-accent cursor-pointer">
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.keywords.map(keyword => (
                      <Badge key={keyword} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Writing Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Be Specific</p>
                  <p className="text-xs text-muted-foreground">Use concrete examples and achievements</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Show Passion</p>
                  <p className="text-xs text-muted-foreground">Demonstrate genuine interest in the field</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Connect Goals</p>
                  <p className="text-xs text-muted-foreground">Link past experience to future objectives</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
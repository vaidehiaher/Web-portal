import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  DollarSign, 
  MapPin, 
  TrendingUp, 
  Home, 
  Car,
  Utensils,
  Plus,
  BarChart3,
  Calculator,
  Star
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

interface JobOffer {
  id: string
  company: string
  position: string
  location: string
  baseSalary: number
  bonus: number
  equity: number
  benefits: string[]
  workLifeBalance: number
  careerGrowth: number
  companyRating: number
  costOfLiving: number
  effectiveSalary: number
}

interface CostBreakdown {
  housing: number
  food: number
  transportation: number
  utilities: number
  entertainment: number
  savings: number
}

export function OfferAnalyzer() {
  const [offers, setOffers] = useState<JobOffer[]>([
    {
      id: '1',
      company: 'TechCorp',
      position: 'Software Engineer',
      location: 'San Francisco, CA',
      baseSalary: 120000,
      bonus: 15000,
      equity: 25000,
      benefits: ['Health Insurance', '401k Match', 'Stock Options', 'Flexible PTO'],
      workLifeBalance: 7,
      careerGrowth: 8,
      companyRating: 4.2,
      costOfLiving: 180,
      effectiveSalary: 89000
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'Austin, TX',
      baseSalary: 95000,
      bonus: 8000,
      equity: 40000,
      benefits: ['Health Insurance', 'Stock Options', 'Remote Work', 'Learning Budget'],
      workLifeBalance: 8,
      careerGrowth: 9,
      companyRating: 4.0,
      costOfLiving: 110,
      effectiveSalary: 93600
    },
    {
      id: '3',
      company: 'BigTech Inc',
      position: 'Software Developer',
      location: 'Seattle, WA',
      baseSalary: 130000,
      bonus: 20000,
      equity: 30000,
      benefits: ['Premium Health', '401k Match', 'Stock Options', 'Gym Membership', 'Free Meals'],
      workLifeBalance: 6,
      careerGrowth: 7,
      companyRating: 4.5,
      costOfLiving: 140,
      effectiveSalary: 128500
    }
  ])

  const [selectedOffers, setSelectedOffers] = useState<string[]>(['1', '2'])

  const costBreakdowns: Record<string, CostBreakdown> = {
    '1': { housing: 3500, food: 800, transportation: 200, utilities: 150, entertainment: 400, savings: 1000 },
    '2': { housing: 1800, food: 600, transportation: 300, utilities: 120, entertainment: 350, savings: 1500 },
    '3': { housing: 2800, food: 500, transportation: 150, utilities: 140, entertainment: 450, savings: 2000 }
  }

  const comparisonData = offers
    .filter(offer => selectedOffers.includes(offer.id))
    .map(offer => ({
      company: offer.company,
      baseSalary: offer.baseSalary,
      totalComp: offer.baseSalary + offer.bonus + offer.equity,
      effectiveSalary: offer.effectiveSalary,
      workLifeBalance: offer.workLifeBalance,
      careerGrowth: offer.careerGrowth,
      rating: offer.companyRating
    }))

  const radarData = offers
    .filter(offer => selectedOffers.includes(offer.id))
    .map(offer => ({
      company: offer.company,
      salary: (offer.effectiveSalary / 1000),
      workLife: offer.workLifeBalance,
      growth: offer.careerGrowth,
      rating: offer.companyRating,
      benefits: offer.benefits.length
    }))

  const toggleOfferSelection = (offerId: string) => {
    setSelectedOffers(prev => 
      prev.includes(offerId) 
        ? prev.filter(id => id !== offerId)
        : [...prev, offerId]
    )
  }

  const calculateScore = (offer: JobOffer) => {
    const salaryScore = (offer.effectiveSalary / 150000) * 30
    const workLifeScore = (offer.workLifeBalance / 10) * 25
    const growthScore = (offer.careerGrowth / 10) * 25
    const ratingScore = (offer.companyRating / 5) * 20
    
    return Math.round(salaryScore + workLifeScore + growthScore + ratingScore)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <DollarSign className="h-6 w-6" />
            Offer Analyzer
          </h2>
          <p className="text-muted-foreground">
            Compare job offers with cost-of-living analysis and comprehensive metrics
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Offer
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Job Offers</CardTitle>
            <CardDescription>Select offers to compare (click to toggle)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {offers.map((offer) => {
                const isSelected = selectedOffers.includes(offer.id)
                const score = calculateScore(offer)
                
                return (
                  <div
                    key={offer.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      isSelected ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                    }`}
                    onClick={() => toggleOfferSelection(offer.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{offer.company}</h4>
                        <p className="text-sm text-muted-foreground">{offer.position}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{offer.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{score}</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Base Salary:</span>
                        <span className="font-medium">${offer.baseSalary.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Comp:</span>
                        <span className="font-medium">${(offer.baseSalary + offer.bonus + offer.equity).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Effective Salary:</span>
                        <span className="font-medium text-primary">${offer.effectiveSalary.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs">{offer.companyRating}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        CoL: {offer.costOfLiving}%
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {offer.benefits.slice(0, 3).map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                      {offer.benefits.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{offer.benefits.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {selectedOffers.length > 0 && (
          <Tabs defaultValue="comparison" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
              <TabsTrigger value="radar">Radar Analysis</TabsTrigger>
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Salary Comparison</CardTitle>
                  <CardDescription>Base salary vs effective salary after cost of living</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="company" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                      <Bar dataKey="baseSalary" fill="#3B82F6" name="Base Salary" />
                      <Bar dataKey="effectiveSalary" fill="#10B981" name="Effective Salary" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                {offers.filter(offer => selectedOffers.includes(offer.id)).map((offer) => (
                  <Card key={offer.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{offer.company}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Work-Life:</span>
                          <div className="font-medium">{offer.workLifeBalance}/10</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Growth:</span>
                          <div className="font-medium">{offer.careerGrowth}/10</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rating:</span>
                          <div className="font-medium">{offer.companyRating}/5</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Score:</span>
                          <div className="font-medium text-primary">{calculateScore(offer)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-4">
              <div className="grid gap-4">
                {offers.filter(offer => selectedOffers.includes(offer.id)).map((offer) => {
                  const breakdown = costBreakdowns[offer.id]
                  return (
                    <Card key={offer.id}>
                      <CardHeader>
                        <CardTitle>{offer.company} - Cost Breakdown</CardTitle>
                        <CardDescription>{offer.location}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Home className="h-4 w-4 text-muted-foreground" />
                                <span>Housing</span>
                              </div>
                              <span className="font-medium">${breakdown.housing}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Utensils className="h-4 w-4 text-muted-foreground" />
                                <span>Food</span>
                              </div>
                              <span className="font-medium">${breakdown.food}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Car className="h-4 w-4 text-muted-foreground" />
                                <span>Transportation</span>
                              </div>
                              <span className="font-medium">${breakdown.transportation}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span>Utilities</span>
                              <span className="font-medium">${breakdown.utilities}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Entertainment</span>
                              <span className="font-medium">${breakdown.entertainment}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Potential Savings</span>
                              <span className="font-medium text-green-600">${breakdown.savings}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="radar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Multi-dimensional Analysis</CardTitle>
                  <CardDescription>Compare offers across multiple factors</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={radarData[0] ? [radarData[0]] : []}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 10]} />
                      {radarData.map((data, index) => (
                        <Radar
                          key={data.company}
                          name={data.company}
                          dataKey="value"
                          stroke={index === 0 ? '#3B82F6' : '#10B981'}
                          fill={index === 0 ? '#3B82F6' : '#10B981'}
                          fillOpacity={0.1}
                        />
                      ))}
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calculator" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Calculator</CardTitle>
                  <CardDescription>Calculate your own offer scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Base Salary</label>
                        <Input type="number" placeholder="120000" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Bonus</label>
                        <Input type="number" placeholder="15000" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Equity Value</label>
                        <Input type="number" placeholder="25000" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Cost of Living Index</label>
                        <Input type="number" placeholder="140" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Calculated Results</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Total Compensation:</span>
                            <span className="font-medium">$160,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Effective Salary:</span>
                            <span className="font-medium text-primary">$114,286</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly Take-home:</span>
                            <span className="font-medium">$9,524</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Calculator className="mr-2 h-4 w-4" />
                        Calculate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
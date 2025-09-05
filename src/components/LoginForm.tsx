import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useAuth } from '../contexts/AuthContext'
import { UserRole } from '../types'
import { Loader2, GraduationCap, Users, Building } from 'lucide-react'

const roleInfo: Record<UserRole, { label: string; icon: React.ReactNode; color: string; demo: string }> = {
  student: { 
    label: 'Student', 
    icon: <GraduationCap className="h-4 w-4" />, 
    color: 'bg-blue-500', 
    demo: 'gaurav.agrawal@college.edu' 
  },
  faculty: { 
    label: 'Faculty', 
    icon: <Users className="h-4 w-4" />, 
    color: 'bg-green-500', 
    demo: 'amit.thakre@college.edu' 
  },
  tpAdmin: { 
    label: 'T&P Admin', 
    icon: <Building className="h-4 w-4" />, 
    color: 'bg-purple-500', 
    demo: 'tp.admin@college.edu' 
  },
  higherStudies: {
    label: 'Higher Studies',
    icon: <GraduationCap className="h-4 w-4" />,
    color: 'bg-pink-600',
    demo: 'hs.coordinator@college.edu'
  }
}

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()
  const [logoOk, setLogoOk] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    const success = await login(email, password)
    if (!success) {
      setError('Invalid credentials. Try demo accounts listed below.')
      return
    }
    // After successful login, always land on dashboard
    navigate('/dashboard', { replace: true })
  }

  const handleDemoLogin = (role: UserRole) => {
    setEmail(roleInfo[role].demo)
    setPassword('demo123')
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* --- Spline Background (Dotwaves) --- */}
      <iframe
        src="https://my.spline.design/dotwaves-W7wfAMp4VK9KSOqDA025PrfA/"
        frameBorder="0"
        className="fixed top-0 left-0 w-full h-full z-0"
      ></iframe>

      {/* --- Dark Overlay --- */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* --- Login Box --- */}
      <div className="relative z-20 w-full max-w-md p-4">
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
          <CardHeader className="text-center">
            {logoOk ? (
              <img
                src="https://www.mathworks.com/academia/tah-portal/cummins-college-of-engineering-for-women-40733520/_jcr_content/schoolLogo.adapt.full.medium.png/1592899846942.png"
                alt="Cummins"
                referrerPolicy="no-referrer"
                className="mx-auto mb-4 h-16 w-16 object-contain"
                onError={() => setLogoOk(false)}
              />
            ) : (
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                <GraduationCap className="h-8 w-8" />
              </div>
            )}
            <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
            <CardDescription>
              Sign in to access the T&amp;P Cell portal
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="h-11"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="h-11"
              />
              
              {error && (
                <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-11" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            
            <div className="space-y-3">
              <div className="text-sm text-center text-muted-foreground">
                Demo Accounts - Click to try:
              </div>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(roleInfo).map(([role, info]) => (
                  <button
                    key={role}
                    onClick={() => handleDemoLogin(role as UserRole)}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded ${info.color} flex items-center justify-center text-white text-xs`}>
                        {info.icon}
                      </div>
                      <span className="font-medium">{info.label}</span>
                    </div>
                    <code className="text-xs text-muted-foreground">{info.demo}</code>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

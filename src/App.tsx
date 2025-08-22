import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LandingAnimation } from '@/components/LandingAnimation'
import { LoginForm } from '@/components/LoginForm'
import { Dashboard } from '@/components/Dashboard'
import { SmartSearchChatbot } from '@/components/SmartSearchChatbot'
import { JobSearch } from '@/pages/JobSearch'
import { Scholarships } from '@/pages/Scholarships'
import { HigherStudies } from '@/pages/HigherStudies'
import { SkillMapper } from '@/pages/SkillMapper'
import { MyProfile } from '@/pages/MyProfile'
import { Applications } from '@/pages/Applications'
import { SoPAssistantPage } from '@/pages/SoPAssistant'
import './globals.css'

function AppContent() {
  const { user, isLoading } = useAuth()
  const [showLanding, setShowLanding] = React.useState(true)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (showLanding && !user) {
    return (
      <>
        <LandingAnimation onComplete={() => setShowLanding(false)} />
        <SmartSearchChatbot />
      </>
    )
  }

  if (!user) {
    return (
      <>
        <LoginForm />
        <SmartSearchChatbot />
      </>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/job-search" element={<JobSearch />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/higher-studies" element={<HigherStudies />} />
        <Route path="/skill-mapper" element={<SkillMapper />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/sop-assistant" element={<SoPAssistantPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SmartSearchChatbot />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
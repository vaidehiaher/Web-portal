import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { Button } from './ui/button'
import { BackButton } from './ui/back-button'
import { 
  Sun, 
  Moon, 
  LogOut, 
  Bell,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '../lib/utils'

interface LayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  sidebarContent?: React.ReactNode
}

export function Layout({ children, showSidebar = false, sidebarContent }: LayoutProps) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {showSidebar && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
            <div className="flex items-center gap-3">
              <BackButton className="hidden md:inline-flex" />
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                TP
              </div>
              <span className="font-bold text-lg">College T&P Cell</span>
              <nav className="hidden md:flex items-center gap-1 ml-2">
                {(!user || user.role !== 'student') && (
                  <>
                    <Button asChild variant="ghost" size="sm">
                      <Link to="/about">About</Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <Link to="/placements">Placements</Link>
                    </Button>
                  </>
                )}
                <Button asChild variant="ghost" size="sm">
                  <Link to="/higher-studies">Higher Studies</Link>
                </Button>
              </nav>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
            {user && (
              <>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Bell className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-2 px-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="h-9 w-9"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {showSidebar && sidebarContent && (
          <>
            <div
              className={cn(
                "fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden",
                sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
              onClick={() => setSidebarOpen(false)}
            />
            <aside
              className={cn(
                "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform md:relative md:top-0 md:translate-x-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              )}
            >
              <div className="h-full overflow-y-auto p-4">
                {sidebarContent}
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
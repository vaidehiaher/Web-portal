import { useAuth } from '../contexts/AuthContext'
import { StudentDashboard } from './dashboards/StudentDashboard'
import { FacultyDashboard } from './dashboards/FacultyDashboard'
import { TPAdminDashboard } from './dashboards/TPAdminDashboard'
import { HigherStudiesDashboard } from './dashboards/HigherStudiesDashboard'

export function Dashboard() {
  const { user } = useAuth()

  if (!user) return null

  switch (user.role) {
    case 'student':
      return <StudentDashboard />
    case 'faculty':
      return <FacultyDashboard />
    case 'tpAdmin':
      return <TPAdminDashboard />
    case 'higherStudies':
      return <HigherStudiesDashboard />
    default:
      return <div>Unknown user role</div>
  }
}
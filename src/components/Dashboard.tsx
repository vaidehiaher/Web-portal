import { useAuth } from '../contexts/AuthContext'
import { StudentDashboard } from './dashboards/StudentDashboard'
import { FacultyDashboard } from './dashboards/FacultyDashboard'
import { TPAdminDashboard } from './dashboards/TPAdminDashboard'

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
    default:
      return <div>Unknown user role</div>
  }
}
import React from 'react'
import { Layout } from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings, 
  Users, 
  Shield, 
  BarChart3,
  Database,
  Lock,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { ConsentVault } from '@/components/admin/ConsentVault'

const sidebarContent = (
  <nav className="space-y-2">
    <Button variant="ghost" className="w-full justify-start">
      <BarChart3 className="mr-2 h-4 w-4" />
      Dashboard
    </Button>
    <Button variant="ghost" className="w-full justify-start">
      <Users className="mr-2 h-4 w-4" />
      User Management
    </Button>
    <Button variant="ghost" className="w-full justify-start">
      <Shield className="mr-2 h-4 w-4" />
      Consent Vault
    </Button>
    <Button variant="ghost" className="w-full justify-start">
      <Activity className="mr-2 h-4 w-4" />
      System Analytics
    </Button>
    <Button variant="ghost" className="w-full justify-start">
      <Database className="mr-2 h-4 w-4" />
      Data Access Logs
    </Button>
    <Button variant="ghost" className="w-full justify-start">
      <Settings className="mr-2 h-4 w-4" />
      System Settings
    </Button>
  </nav>
)

export function SystemAdminDashboard() {
  const systemMetrics = {
    totalUsers: 1247,
    activeUsers: 892,
    dataRequests: 45,
    systemUptime: '99.8%'
  }

  const activityData = [
    { time: '00:00', users: 120 },
    { time: '04:00', users: 89 },
    { time: '08:00', users: 456 },
    { time: '12:00', users: 678 },
    { time: '16:00', users: 543 },
    { time: '20:00', users: 234 },
    { time: '24:00', users: 156 }
  ]

  const userRoleData = [
    { name: 'Students', value: 850, color: '#3B82F6' },
    { name: 'Faculty', value: 234, color: '#10B981' },
    { name: 'T&P Admin', value: 45, color: '#8B5CF6' },
    { name: 'Recruiters', value: 89, color: '#F59E0B' },
    { name: 'System Admin', value: 12, color: '#EF4444' }
  ]

  const consentLogs = [
    { id: '1', user: 'john.doe@college.edu', action: 'Data Export', timestamp: '2024-01-20 14:30', status: 'approved' },
    { id: '2', user: 'admin@college.edu', action: 'User Data Access', timestamp: '2024-01-20 13:15', status: 'completed' },
    { id: '3', user: 'recruiter@techcorp.com', action: 'Resume Access', timestamp: '2024-01-20 12:45', status: 'pending' }
  ]

  return (
    <Layout showSidebar sidebarContent={sidebarContent}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor system health, manage users, and ensure GDPR compliance.
          </p>
        </div>

        {/* System Health Alert */}
        <Card className="border-green-200 bg-green-50 dark:bg-green-900/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-green-800 dark:text-green-200 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              System Status: Healthy
            </CardTitle>
            <CardDescription>
              All systems operational • Last updated: 2 minutes ago
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemMetrics.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemMetrics.activeUsers}</div>
              <p className="text-xs text-muted-foreground">Currently online</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Requests</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemMetrics.dataRequests}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemMetrics.systemUptime}</div>
              <p className="text-xs text-muted-foreground">30-day average</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="consent">Consent Vault</TabsTrigger>
            <TabsTrigger value="logs">Access Logs</TabsTrigger>
            <TabsTrigger value="vault">Privacy Vault</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Real-time User Activity</CardTitle>
                  <CardDescription>Active users throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Distribution by Role</CardTitle>
                  <CardDescription>Breakdown of user roles in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={userRoleData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {userRoleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {userRoleData.map((role) => (
                      <div key={role.name} className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: role.color }}
                        />
                        <span className="text-sm">{role.name}: {role.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">System Load</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Low</div>
                  <p className="text-sm text-muted-foreground">CPU: 23% • Memory: 45%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Database Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Healthy</div>
                  <p className="text-sm text-muted-foreground">Response: 45ms avg</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Security Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <p className="text-sm text-muted-foreground">No active threats</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and role assignments</CardDescription>
                </div>
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">User management interface coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Private Consent Vault
                </CardTitle>
                <CardDescription>
                  GDPR-compliant data access controls and consent management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Active Consents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,156</div>
                      <p className="text-sm text-muted-foreground">Users opted in</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Pending Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-sm text-muted-foreground">Awaiting approval</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Data Exports</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">23</div>
                      <p className="text-sm text-muted-foreground">This month</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Recent Consent Actions</h4>
                  {[
                    { action: 'Data export requested', user: 'student@college.edu', time: '2 hours ago', status: 'pending' },
                    { action: 'Consent withdrawn', user: 'user@college.edu', time: '1 day ago', status: 'completed' },
                    { action: 'Data access granted', user: 'recruiter@company.com', time: '2 days ago', status: 'completed' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{item.action}</p>
                        <p className="text-xs text-muted-foreground">{item.user} • {item.time}</p>
                      </div>
                      <Badge variant={item.status === 'pending' ? 'warning' : 'success'}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Consent/Data Access Logs</CardTitle>
                <CardDescription>
                  Complete audit trail of all data access and consent activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consentLogs.map(log => {
                    const statusIcon = {
                      'approved': <CheckCircle className="h-4 w-4 text-green-500" />,
                      'completed': <CheckCircle className="h-4 w-4 text-blue-500" />,
                      'pending': <Clock className="h-4 w-4 text-yellow-500" />,
                      'denied': <AlertTriangle className="h-4 w-4 text-red-500" />
                    }[log.status]

                    const statusColor = {
                      'approved': 'bg-green-100 text-green-800',
                      'completed': 'bg-blue-100 text-blue-800',
                      'pending': 'bg-yellow-100 text-yellow-800',
                      'denied': 'bg-red-100 text-red-800'
                    }[log.status]

                    return (
                      <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {statusIcon}
                          <div>
                            <p className="font-medium text-sm">{log.action}</p>
                            <p className="text-xs text-muted-foreground">
                              {log.user} • {log.timestamp}
                            </p>
                          </div>
                        </div>
                        <Badge className={statusColor}>
                          {log.status}
                        </Badge>
                      </div>
                    )
                  })}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Showing 3 of 156 log entries
                  </p>
                  <Button variant="outline" size="sm">
                    View All Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vault">
            <ConsentVault />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
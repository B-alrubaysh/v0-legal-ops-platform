import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Briefcase, Calendar, MessageSquare, FileWarning, ArrowLeft } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'

export function DashboardContent() {
  const stats = [
    { title: 'القضايا المفتوحة', value: '24', icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'الجلسات القادمة', value: '8', icon: Calendar, color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'الاستشارات', value: '12', icon: MessageSquare, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { title: 'وثائق منتهية', value: '3', icon: FileWarning, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ]

  const upcomingSessions = [
    { caseNo: 'ق-2025-001', client: 'شركة النور للتجارة', type: 'جلسة استماع', date: '2025-01-20', time: '10:00 ص', status: 'مؤكد' },
    { caseNo: 'ق-2025-015', client: 'محمد بن عبدالله', type: 'جلسة مرافعة', date: '2025-01-22', time: '11:30 ص', status: 'مؤكد' },
    { caseNo: 'ق-2024-089', client: 'مؤسسة الأمل', type: 'جلسة تحقيق', date: '2025-01-24', time: '09:00 ص', status: 'معلق' },
    { caseNo: 'ق-2025-008', client: 'سارة أحمد', type: 'جلسة حكم', date: '2025-01-25', time: '02:00 م', status: 'مؤكد' },
  ]

  const recentAlerts = [
    { message: 'موعد جلسة القضية ق-2025-001 غداً الساعة 10:00 صباحاً', time: 'منذ ساعة', type: 'warning' },
    { message: 'تم إضافة مستند جديد للقضية ق-2024-089', time: 'منذ ساعتين', type: 'info' },
    { message: 'تحديث حالة القضية ق-2025-015 إلى "قيد المرافعة"', time: 'منذ 3 ساعات', type: 'success' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
        <p className="text-muted-foreground mt-2">نظرة عامة على أنشطة المكتب</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Sessions */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold">الجلسات القادمة</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/calendar">
                عرض الكل
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم القضية</TableHead>
                  <TableHead className="text-right">اسم العميل</TableHead>
                  <TableHead className="text-right">نوع الجلسة</TableHead>
                  <TableHead className="text-right">التاريخ والوقت</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingSessions.map((session) => (
                  <TableRow key={session.caseNo}>
                    <TableCell className="font-medium">{session.caseNo}</TableCell>
                    <TableCell>{session.client}</TableCell>
                    <TableCell>{session.type}</TableCell>
                    <TableCell className="text-sm">
                      <div>{session.date}</div>
                      <div className="text-muted-foreground">{session.time}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={session.status === 'مؤكد' ? 'default' : 'secondary'}>
                        {session.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Notifications Panel */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-xl font-bold">التنبيهات الأخيرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    alert.type === 'warning' ? 'bg-orange-500' :
                    alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground leading-relaxed">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

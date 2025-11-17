'use client'

import { useEffect, useState } from 'react'
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
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    { title: 'القضايا المفتوحة', value: '24', icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-950/30' },
    { title: 'الجلسات القادمة', value: '8', icon: Calendar, color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-950/30' },
    { title: 'الاستشارات', value: '12', icon: MessageSquare, color: 'text-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-950/30' },
    { title: 'وثائق منتهية', value: '3', icon: FileWarning, color: 'text-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-950/30' },
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
    <div className={`space-y-8 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">لوحة التحكم</h1>
        <p className="text-muted-foreground text-base">نظرة عامة على أنشطة المكتب</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="border-border shadow-sm hover:shadow-md transition-shadow duration-200" style={{
            animationDelay: `${index * 100}ms`,
            animation: mounted ? 'fadeIn 0.5s ease-out forwards' : 'none'
          }}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</p>
                  <p className="text-4xl font-bold text-foreground tracking-tight">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Upcoming Sessions */}
        <Card className="lg:col-span-2 border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
            <CardTitle className="text-xl font-bold">الجلسات القادمة</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm font-medium hover:bg-accent" asChild>
              <Link href="/dashboard/calendar">
                عرض الكل
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="text-right font-semibold h-12 px-6">رقم القضية</TableHead>
                    <TableHead className="text-right font-semibold h-12">اسم العميل</TableHead>
                    <TableHead className="text-right font-semibold h-12">نوع الجلسة</TableHead>
                    <TableHead className="text-right font-semibold h-12">التاريخ والوقت</TableHead>
                    <TableHead className="text-right font-semibold h-12 px-6">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingSessions.map((session, index) => (
                    <TableRow key={session.caseNo} className={`${index % 2 === 0 ? 'bg-muted/30' : ''} hover:bg-muted/50 transition-colors`}>
                      <TableCell className="font-semibold px-6 py-4">{session.caseNo}</TableCell>
                      <TableCell className="py-4">{session.client}</TableCell>
                      <TableCell className="py-4">{session.type}</TableCell>
                      <TableCell className="text-sm py-4">
                        <div className="font-medium">{session.date}</div>
                        <div className="text-muted-foreground mt-1">{session.time}</div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge variant={session.status === 'مؤكد' ? 'default' : 'secondary'} className="px-3 py-1">
                          {session.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Panel */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">التنبيهات الأخيرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className={`w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 ${
                    alert.type === 'warning' ? 'bg-orange-500 ring-2 ring-orange-100' :
                    alert.type === 'success' ? 'bg-green-500 ring-2 ring-green-100' : 'bg-blue-500 ring-2 ring-blue-100'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed mb-1.5">{alert.message}</p>
                    <p className="text-xs text-muted-foreground font-medium">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

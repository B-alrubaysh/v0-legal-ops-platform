'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ChevronRight, ChevronLeft, CalendarIcon, Clock } from 'lucide-react'

export function CalendarContent() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)) // January 2025
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const sessions = [
    { id: 1, caseId: 'ق-2025-001', client: 'شركة النور للتجارة', type: 'جلسة استماع', date: '2025-01-20', time: '10:00 ص', day: 20 },
    { id: 2, caseId: 'ق-2025-015', client: 'محمد بن عبدالله', type: 'جلسة مرافعة', date: '2025-01-22', time: '11:30 ص', day: 22 },
    { id: 3, caseId: 'ق-2024-089', client: 'مؤسسة الأمل', type: 'جلسة تحقيق', date: '2025-01-24', time: '09:00 ص', day: 24 },
    { id: 4, caseId: 'ق-2025-008', client: 'سارة أحمد', type: 'جلسة حكم', date: '2025-01-25', time: '02:00 م', day: 25 },
    { id: 5, caseId: 'ق-2025-002', client: 'شركة البناء المتقدم', type: 'استشارة', date: '2025-01-28', time: '03:00 م', day: 28 },
  ]

  const monthNames = [
    'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ]

  const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    return { daysInMonth, startingDayOfWeek }
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate)

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const getSessionsForDay = (day: number) => {
    return sessions.filter(s => s.day === day)
  }

  const handleSessionClick = (session: any) => {
    setSelectedSession(session)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">التقويم والجلسات</h1>
        <p className="text-muted-foreground text-base leading-relaxed">جدولة ومتابعة الجلسات والمواعيد</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth} className="h-10 w-10 shadow-sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth} className="h-10 w-10 shadow-sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-3">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2.5">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1
                const daySessions = getSessionsForDay(day)
                const isToday = day === 17

                return (
                  <div
                    key={day}
                    className={`aspect-square border rounded-lg p-2 ${
                      isToday ? 'border-primary bg-primary/5 shadow-sm' : 'border-border'
                    } ${daySessions.length > 0 ? 'cursor-pointer hover:bg-muted/50 transition-colors' : ''}`}
                  >
                    <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-primary' : 'text-foreground'}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {daySessions.slice(0, 2).map((session) => (
                        <div
                          key={session.id}
                          onClick={() => handleSessionClick(session)}
                          className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 rounded px-1.5 py-0.5 truncate font-medium"
                        >
                          {session.time}
                        </div>
                      ))}
                      {daySessions.length > 2 && (
                        <div className="text-xs text-muted-foreground font-medium">
                          +{daySessions.length - 2}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-5">
            <CardTitle className="text-xl font-semibold">الجلسات القادمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessions.slice(0, 5).map((session) => (
                <div
                  key={session.id}
                  className="p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleSessionClick(session)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1.5">{session.type}</h4>
                      <p className="text-xs text-muted-foreground truncate mb-2.5">{session.client}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                        <Clock className="h-3 w-3" />
                        <span>{session.date} - {session.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تفاصيل الجلسة</DialogTitle>
            <DialogDescription>معلومات الجلسة والقضية المرتبطة</DialogDescription>
          </DialogHeader>
          {selectedSession && (
            <div className="space-y-4 py-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">نوع الجلسة</p>
                <p className="font-medium">{selectedSession.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">اسم القضية</p>
                <p className="font-medium">{selectedSession.caseId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">العميل</p>
                <p className="font-medium">{selectedSession.client}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">التاريخ</p>
                  <p className="font-medium">{selectedSession.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">الوقت</p>
                  <p className="font-medium">{selectedSession.time}</p>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                فتح القضية
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

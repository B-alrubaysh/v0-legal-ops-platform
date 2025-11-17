'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Briefcase, Calendar, MessageSquare, FileWarning, ArrowLeft, Plus, FileText, FileEdit } from 'lucide-react'
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
  const [newCaseOpen, setNewCaseOpen] = useState(false)
  const [newClientOpen, setNewClientOpen] = useState(false)
  const [newLetterOpen, setNewLetterOpen] = useState(false)
  const [newContractOpen, setNewContractOpen] = useState(false)
  const [sessionLetterOpen, setSessionLetterOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNewCase = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] New case created')
    setNewCaseOpen(false)
  }

  const handleNewClient = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] New client created')
    setNewClientOpen(false)
  }

  const handleNewLetter = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] New letter created')
    setNewLetterOpen(false)
  }

  const handleNewContract = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] New contract template created')
    setNewContractOpen(false)
  }

  const handleSessionLetter = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Session letter created for:', selectedSession)
    setSessionLetterOpen(false)
  }

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
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">لوحة التحكم</h1>
        <p className="text-muted-foreground text-base leading-relaxed">نظرة عامة على أنشطة المكتب</p>
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Plus className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold text-xl">إجراءات سريعة</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Dialog open={newCaseOpen} onOpenChange={setNewCaseOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-auto py-5 px-4 flex-col gap-2.5 hover:bg-accent hover:border-primary transition-all shadow-sm hover:shadow-md">
                  <Briefcase className="h-5 w-5" />
                  <span className="text-sm font-medium">إضافة قضية جديدة</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">إضافة قضية جديدة</DialogTitle>
                  <DialogDescription className="text-base">أدخل بيانات القضية الجديدة</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleNewCase} className="space-y-5 py-4">
                  <div className="space-y-2.5">
                    <Label htmlFor="case-client" className="text-sm font-medium">اسم العميل</Label>
                    <Select>
                      <SelectTrigger id="case-client" className="h-11">
                        <SelectValue placeholder="اختر العميل" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client1">شركة النور للتجارة</SelectItem>
                        <SelectItem value="client2">محمد بن عبدالله</SelectItem>
                        <SelectItem value="client3">مؤسسة الأمل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="case-type" className="text-sm font-medium">نوع القضية</Label>
                    <Select>
                      <SelectTrigger id="case-type" className="h-11">
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="commercial">تجاري</SelectItem>
                        <SelectItem value="civil">مدني</SelectItem>
                        <SelectItem value="labor">عمالي</SelectItem>
                        <SelectItem value="family">أسري</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="case-court" className="text-sm font-medium">المحكمة</Label>
                    <Select>
                      <SelectTrigger id="case-court" className="h-11">
                        <SelectValue placeholder="اختر المحكمة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="riyadh">المحكمة التجارية بالرياض</SelectItem>
                        <SelectItem value="jeddah">المحكمة التجارية بجدة</SelectItem>
                        <SelectItem value="civil">محكمة الأحوال المدنية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="case-session" className="text-sm font-medium">موعد الجلسة القادمة</Label>
                    <Input id="case-session" type="date" className="h-11" />
                  </div>
                  <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 shadow-sm">
                    إضافة القضية
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={newClientOpen} onOpenChange={setNewClientOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-auto py-5 px-4 flex-col gap-2.5 hover:bg-accent hover:border-primary transition-all shadow-sm hover:shadow-md">
                  <Plus className="h-5 w-5" />
                  <span className="text-sm font-medium">إضافة عميل جديد</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">إضافة عميل جديد</DialogTitle>
                  <DialogDescription className="text-base">أدخل بيانات العميل</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleNewClient} className="space-y-5 py-4">
                  <div className="space-y-2.5">
                    <Label htmlFor="client-name" className="text-sm font-medium">اسم العميل</Label>
                    <Input id="client-name" placeholder="الاسم الكامل" className="h-11" />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="client-type" className="text-sm font-medium">نوع العميل</Label>
                    <Select>
                      <SelectTrigger id="client-type" className="h-11">
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company">شركة</SelectItem>
                        <SelectItem value="individual">فرد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="client-phone" className="text-sm font-medium">رقم الهاتف</Label>
                    <Input id="client-phone" placeholder="05xxxxxxxx" className="h-11" />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="client-email" className="text-sm font-medium">البريد الإلكتروني</Label>
                    <Input id="client-email" type="email" placeholder="email@example.com" className="h-11" />
                  </div>
                  <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 shadow-sm">
                    إضافة العميل
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={newLetterOpen} onOpenChange={setNewLetterOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-auto py-5 px-4 flex-col gap-2.5 hover:bg-accent hover:border-primary transition-all shadow-sm hover:shadow-md">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-medium">إنشاء خطاب</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">إنشاء خطاب جديد</DialogTitle>
                  <DialogDescription className="text-base">أدخل تفاصيل الخطاب</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleNewLetter} className="space-y-5 py-4">
                  <div className="space-y-2.5">
                    <Label htmlFor="letter-client" className="text-sm font-medium">العميل</Label>
                    <Select>
                      <SelectTrigger id="letter-client" className="h-11">
                        <SelectValue placeholder="اختر العميل" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client1">شركة النور للتجارة</SelectItem>
                        <SelectItem value="client2">محمد بن عبدالله</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="letter-body" className="text-sm font-medium">نص الخطاب</Label>
                    <Textarea 
                      id="letter-body" 
                      placeholder="اكتب محتوى الخطاب هنا..."
                      className="min-h-32"
                    />
                  </div>
                  <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 shadow-sm">
                    إنشاء الخطاب
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={newContractOpen} onOpenChange={setNewContractOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-auto py-5 px-4 flex-col gap-2.5 hover:bg-accent hover:border-primary transition-all shadow-sm hover:shadow-md">
                  <FileEdit className="h-5 w-5" />
                  <span className="text-sm font-medium">إنشاء نموذج عقد</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">إنشاء نموذج عقد</DialogTitle>
                  <DialogDescription className="text-base">أدخل تفاصيل العقد</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleNewContract} className="space-y-5 py-4">
                  <div className="space-y-2.5">
                    <Label htmlFor="contract-name" className="text-sm font-medium">اسم النموذج</Label>
                    <Input id="contract-name" placeholder="مثال: عقد توريد" className="h-11" />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="contract-type" className="text-sm font-medium">نوع العقد</Label>
                    <Select>
                      <SelectTrigger id="contract-type" className="h-11">
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supply">مقاولة</SelectItem>
                        <SelectItem value="work">عمل</SelectItem>
                        <SelectItem value="consulting">استشارات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="contract-clauses" className="text-sm font-medium">بنود العقد</Label>
                    <Textarea 
                      id="contract-clauses" 
                      placeholder="اكتب بنود العقد الأساسية..."
                      className="min-h-32"
                    />
                  </div>
                  <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 shadow-sm">
                    إنشاء النموذج
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="border-border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer" style={{
            animationDelay: `${index * 100}ms`,
            animation: mounted ? 'fadeIn 0.5s ease-out forwards' : 'none'
          }}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-3">{stat.title}</p>
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
        <Card className="lg:col-span-2 border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-5 space-y-0">
            <CardTitle className="text-xl font-semibold">الجلسات القادمة</CardTitle>
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
                    <TableHead className="text-right font-semibold text-sm h-12 px-6">رقم القضية</TableHead>
                    <TableHead className="text-right font-semibold text-sm h-12">اسم العميل</TableHead>
                    <TableHead className="text-right font-semibold text-sm h-12">نوع الجلسة</TableHead>
                    <TableHead className="text-right font-semibold text-sm h-12">التاريخ والوقت</TableHead>
                    <TableHead className="text-right font-semibold text-sm h-12">الحالة</TableHead>
                    <TableHead className="text-right font-semibold text-sm h-12 px-6">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingSessions.map((session, index) => (
                    <TableRow key={session.caseNo} className={`${index % 2 === 0 ? 'bg-muted/30' : ''} hover:bg-muted/50 transition-colors border-border`}>
                      <TableCell className="font-semibold text-sm px-6 py-4">{session.caseNo}</TableCell>
                      <TableCell className="text-sm py-4">{session.client}</TableCell>
                      <TableCell className="text-sm py-4">{session.type}</TableCell>
                      <TableCell className="text-sm py-4">
                        <div className="font-medium">{session.date}</div>
                        <div className="text-muted-foreground mt-1 text-xs">{session.time}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant={session.status === 'مؤكد' ? 'default' : 'secondary'} className="px-3 py-1 text-xs font-medium">
                          {session.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover:bg-accent text-xs h-9 px-3"
                          onClick={() => {
                            setSelectedSession(session)
                            setSessionLetterOpen(true)
                          }}
                        >
                          <FileText className="h-3.5 w-3.5 ml-1.5" />
                          إنشاء خطاب
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-5">
            <CardTitle className="text-xl font-semibold">التنبيهات الأخيرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex gap-3 pb-5 border-b border-border last:border-0 last:pb-0">
                  <div className={`w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 ${
                    alert.type === 'warning' ? 'bg-orange-500 ring-2 ring-orange-100 animate-pulse' :
                    alert.type === 'success' ? 'bg-green-500 ring-2 ring-green-100' : 'bg-blue-500 ring-2 ring-blue-100'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed mb-2">{alert.message}</p>
                    <p className="text-xs text-muted-foreground font-medium">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={sessionLetterOpen} onOpenChange={setSessionLetterOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>إنشاء خطاب للجلسة</DialogTitle>
            <DialogDescription>خطاب متعلق بالجلسة القادمة</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSessionLetter} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>رقم القضية</Label>
              <Input value={selectedSession?.caseNo || ''} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>اسم العميل</Label>
              <Input value={selectedSession?.client || ''} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-letter-content">محتوى الخطاب</Label>
              <Textarea 
                id="session-letter-content" 
                placeholder="اكتب محتوى الخطاب المتعلق بالجلسة..."
                className="min-h-32"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              إنشاء الخطاب
            </Button>
          </form>
        </DialogContent>
      </Dialog>

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

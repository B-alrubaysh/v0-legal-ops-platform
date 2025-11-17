'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ArrowRight, Upload, Download, Calendar, MessageSquare, DollarSign, FileText, CheckCircle2, Clock } from 'lucide-react'
import Link from 'next/link'
import { casesData } from '@/lib/cases-data'

export function CaseDetailsContent({ caseId }: { caseId: string }) {
  const [activeTab, setActiveTab] = useState('summary')
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false)
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const [sessions, setSessions] = useState([
    { type: 'جلسة استماع', date: '2025-01-20', time: '10:00 ص', location: 'قاعة 3', status: 'مجدولة' },
    { type: 'جلسة تمهيدية', date: '2025-01-05', time: '11:00 ص', location: 'قاعة 1', status: 'منتهية' },
  ])
  const [tasks, setTasks] = useState([
    { task: 'إعداد المذكرة الختامية', assignee: 'أحمد الشمري', deadline: '2025-01-18', status: 'قيد العمل' },
    { task: 'مراجعة المستندات الإضافية', assignee: 'فاطمة العلي', deadline: '2025-01-17', status: 'مكتمل' },
    { task: 'التواصل مع الشهود', assignee: 'خالد المطيري', deadline: '2025-01-19', status: 'معلق' },
  ])

  const caseData = casesData.find(c => c.id === caseId)

  if (!caseData) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Card className="border-border shadow-sm p-8">
          <p className="text-lg text-muted-foreground text-center">لم يتم العثور على القضية</p>
        </Card>
      </div>
    )
  }

  const handleAddSession = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newSession = {
      type: formData.get('session-type') as string,
      date: formData.get('session-date') as string,
      time: formData.get('session-time') as string,
      location: formData.get('session-location') as string,
      status: 'مجدولة'
    }
    setSessions([newSession, ...sessions])
    setSessionDialogOpen(false)
    e.currentTarget.reset()
  }

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newTask = {
      task: formData.get('task-name') as string,
      assignee: formData.get('task-assignee') as string,
      deadline: formData.get('task-deadline') as string,
      status: 'قيد العمل'
    }
    setTasks([newTask, ...tasks])
    setTaskDialogOpen(false)
    e.currentTarget.reset()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800'
      case 'closed': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800'
      case 'on-hold': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-800'
      default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
    }
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'open': return 'قيد النظر'
      case 'closed': return 'مغلقة'
      case 'on-hold': return 'معلقة'
      default: return status
    }
  }

  const documents = [
    { name: 'عقد التوريد الأصلي', category: 'عقود', date: caseData.openDate, size: '2.4 MB' },
    { name: 'صحيفة الدعوى', category: 'مذكرات', date: caseData.openDate, size: '1.8 MB' },
    { name: 'مستندات الإثبات', category: 'إثباتات', date: caseData.openDate, size: '5.2 MB' },
  ]

  const communications = [
    { message: 'تم استلام المستندات المطلوبة من العميل', time: 'منذ يومين', sender: caseData.assignedLawyer },
    { message: 'استفسار العميل عن موعد الجلسة القادمة', time: 'منذ 3 أيام', sender: caseData.clientName },
  ]

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/dashboard/cases" className="hover:text-foreground font-medium transition-colors">القضايا</Link>
        <ArrowRight className="h-4 w-4 rotate-180" />
        <span className="text-foreground font-medium">{caseData.number}</span>
      </div>

      {/* Case Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">{caseData.number}</h1>
            <Badge className={`${getStatusColor(caseData.status)} px-3 py-1`} variant="outline">
              {getStatusDisplay(caseData.status)}
            </Badge>
          </div>
          <p className="text-muted-foreground text-base">{caseData.clientName} - {caseData.type}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="shadow-sm">تعديل</Button>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm" onClick={() => setSessionDialogOpen(true)}>
            <Calendar className="ml-2 h-4 w-4" />
            جدولة جلسة
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="border-b border-border">
          <TabsList className="h-auto p-0 bg-transparent gap-6">
            <TabsTrigger value="summary" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1 data-[state=active]:shadow-none">الملخص</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1">الوثائق</TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1">الجلسات والمواعيد</TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1">المهام</TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1">الملاحظات الداخلية</TabsTrigger>
            <TabsTrigger value="communication" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1">التواصل مع العميل</TabsTrigger>
            <TabsTrigger value="finance" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-3 px-1">الرسوم والمدفوعات</TabsTrigger>
          </TabsList>
        </div>

        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-8 mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">معلومات القضية</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">رقم القضية</p>
                    <p className="font-semibold text-base">{caseData.number}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">نوع القضية</p>
                    <p className="font-semibold text-base">{caseData.type}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-muted-foreground mb-2">الجهة القضائية</p>
                    <p className="font-semibold text-base">{caseData.court}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">المحامي المسؤول</p>
                    <p className="font-semibold text-base">{caseData.assignedLawyer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">تاريخ الفتح</p>
                    <p className="font-semibold text-base">{caseData.openDate}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-muted-foreground mb-2">الجلسة القادمة</p>
                    <p className="font-semibold text-base">{caseData.nextSessionDate || '-'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">ملخص القضية</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <p className="text-foreground leading-relaxed">{caseData.description}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6 mt-8">
          <Card className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
              <CardTitle className="text-lg">الوثائق</CardTitle>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm">
                <Upload className="ml-2 h-4 w-4" />
                رفع وثيقة جديدة
              </Button>
            </CardHeader>
            <Separator />
            <CardContent className="p-0 mt-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="text-right font-semibold h-12 px-6">اسم الوثيقة</TableHead>
                      <TableHead className="text-right font-semibold h-12">التصنيف</TableHead>
                      <TableHead className="text-right font-semibold h-12">تاريخ الرفع</TableHead>
                      <TableHead className="text-right font-semibold h-12">الحجم</TableHead>
                      <TableHead className="text-right font-semibold h-12 px-6">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc, index) => (
                      <TableRow key={index} className={`${index % 2 === 0 ? 'bg-muted/30' : ''} hover:bg-muted/50 transition-colors border-border`}>
                        <TableCell className="font-semibold px-6 py-4">{doc.name}</TableCell>
                        <TableCell className="py-4">
                          <Badge variant="secondary" className="px-3 py-1">{doc.category}</Badge>
                        </TableCell>
                        <TableCell className="py-4">{doc.date}</TableCell>
                        <TableCell className="py-4 text-muted-foreground">{doc.size}</TableCell>
                        <TableCell className="px-6 py-4">
                          <Button variant="ghost" size="sm" className="hover:bg-accent">
                            <Download className="h-4 w-4 ml-1" />
                            تحميل
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sessions Tab */}
        <TabsContent value="sessions" className="space-y-6 mt-8">
          <Card className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
              <CardTitle className="text-lg">الجلسات والمواعيد</CardTitle>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm" onClick={() => setSessionDialogOpen(true)}>
                <Calendar className="ml-2 h-4 w-4" />
                إضافة جلسة
              </Button>
            </CardHeader>
            <Separator />
            <CardContent className="p-0 mt-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="text-right font-semibold h-12 px-6">نوع الجلسة</TableHead>
                      <TableHead className="text-right font-semibold h-12">التاريخ</TableHead>
                      <TableHead className="text-right font-semibold h-12">الوقت</TableHead>
                      <TableHead className="text-right font-semibold h-12">المكان</TableHead>
                      <TableHead className="text-right font-semibold h-12 px-6">الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((session, index) => (
                      <TableRow key={index} className={`${index % 2 === 0 ? 'bg-muted/30' : ''} hover:bg-muted/50 transition-colors border-border`}>
                        <TableCell className="font-semibold px-6 py-4">{session.type}</TableCell>
                        <TableCell className="py-4">{session.date}</TableCell>
                        <TableCell className="py-4">{session.time}</TableCell>
                        <TableCell className="py-4">{session.location}</TableCell>
                        <TableCell className="px-6 py-4">
                          <Badge variant={session.status === 'مجدولة' ? 'default' : 'secondary'} className="px-3 py-1">
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
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-6 mt-8">
          <Card className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
              <CardTitle className="text-lg">المهام</CardTitle>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm" onClick={() => setTaskDialogOpen(true)}>
                إضافة مهمة
              </Button>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 rounded-lg border border-border bg-card hover:shadow-sm transition-shadow">
                    <div className="flex-shrink-0 mt-0.5">
                      {task.status === 'مكتمل' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-base mb-2">{task.task}</h4>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="font-medium">المسؤول: {task.assignee}</span>
                        <span className="font-medium">الموعد النهائي: {task.deadline}</span>
                      </div>
                    </div>
                    <Badge variant={task.status === 'مكتمل' ? 'default' : 'secondary'} className="px-3 py-1 flex-shrink-0">
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-6 mt-8">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">الملاحظات الداخلية</CardTitle>
              <CardDescription className="text-base mt-2">هذه الملاحظات مرئية فقط لفريق العمل</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4 pt-6">
              <Textarea 
                placeholder="أضف ملاحظة جديدة..."
                className="min-h-32 resize-none"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm">
                حفظ الملاحظة
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-6 mt-8">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">التواصل مع العميل</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {communications.map((comm, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                    <MessageSquare className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-relaxed mb-2">{comm.message}</p>
                      <div className="flex gap-3 text-xs text-muted-foreground font-medium">
                        <span>{comm.sender}</span>
                        <span>•</span>
                        <span>{comm.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Input placeholder="اكتب رسالتك هنا..." className="flex-1 h-11" />
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm px-6">
                  إرسال
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Finance Tab */}
        <TabsContent value="finance" className="space-y-6 mt-8">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">إجمالي الرسوم</p>
                    <p className="text-3xl font-bold">50,000 ر.س</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">المدفوع</p>
                    <p className="text-3xl font-bold text-green-600">30,000 ر.س</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">المتبقي</p>
                    <p className="text-3xl font-bold text-orange-600">20,000 ر.س</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={sessionDialogOpen} onOpenChange={setSessionDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>إضافة جلسة جديدة</DialogTitle>
            <DialogDescription>جدولة جلسة جديدة للقضية {caseData.number}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSession} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="session-type">نوع الجلسة</Label>
              <Input id="session-type" name="session-type" placeholder="جلسة استماع" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-date">التاريخ</Label>
              <Input id="session-date" name="session-date" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-time">الوقت</Label>
              <Input id="session-time" name="session-time" type="time" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-location">المكان</Label>
              <Input id="session-location" name="session-location" placeholder="قاعة 3" required />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              إضافة الجلسة
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>إضافة مهمة جديدة</DialogTitle>
            <DialogDescription>إنشاء مهمة مرتبطة بالقضية {caseData.number}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddTask} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task-name">اسم المهمة</Label>
              <Input id="task-name" name="task-name" placeholder="إعداد المذكرة..." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-assignee">المسؤول</Label>
              <Input id="task-assignee" name="task-assignee" placeholder="أحمد الشمري" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-deadline">الموعد النهائي</Label>
              <Input id="task-deadline" name="task-deadline" type="date" required />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              إضافة المهمة
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

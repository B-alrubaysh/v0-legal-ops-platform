'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowRight, Upload, Download, Calendar, MessageSquare, DollarSign, FileText, CheckCircle2, Clock } from 'lucide-react'
import Link from 'next/link'

export function CaseDetailsContent({ caseId }: { caseId: string }) {
  const [activeTab, setActiveTab] = useState('summary')

  const caseData = {
    id: caseId,
    client: 'شركة النور للتجارة',
    type: 'تجاري',
    court: 'المحكمة التجارية بالرياض',
    lawyer: 'أحمد الشمري',
    status: 'قيد النظر',
    openDate: '2025-01-10',
    nextSession: '2025-01-20',
    description: 'نزاع تجاري يتعلق بعقد توريد بين شركة النور للتجارة وشركة الأمل للمقاولات بقيمة 500,000 ريال سعودي'
  }

  const documents = [
    { name: 'عقد التوريد الأصلي', category: 'عقود', date: '2025-01-10', size: '2.4 MB' },
    { name: 'صحيفة الدعوى', category: 'مذكرات', date: '2025-01-12', size: '1.8 MB' },
    { name: 'مستندات الإثبات', category: 'إثباتات', date: '2025-01-15', size: '5.2 MB' },
  ]

  const sessions = [
    { type: 'جلسة استماع', date: '2025-01-20', time: '10:00 ص', location: 'قاعة 3', status: 'مجدولة' },
    { type: 'جلسة تمهيدية', date: '2025-01-05', time: '11:00 ص', location: 'قاعة 1', status: 'منتهية' },
  ]

  const tasks = [
    { task: 'إعداد المذكرة الختامية', assignee: 'أحمد الشمري', deadline: '2025-01-18', status: 'قيد العمل' },
    { task: 'مراجعة المستندات الإضافية', assignee: 'فاطمة العلي', deadline: '2025-01-17', status: 'مكتمل' },
    { task: 'التواصل مع الشهود', assignee: 'خالد المطيري', deadline: '2025-01-19', status: 'معلق' },
  ]

  const communications = [
    { message: 'تم استلام المستندات المطلوبة من العميل', time: 'منذ يومين', sender: 'أحمد الشمري' },
    { message: 'استفسار العميل عن موعد الجلسة القادمة', time: 'منذ 3 أيام', sender: 'شركة النور للتجارة' },
  ]

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/dashboard/cases" className="hover:text-foreground">القضايا</Link>
        <ArrowRight className="h-4 w-4 rotate-180" />
        <span className="text-foreground">{caseId}</span>
      </div>

      {/* Case Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">{caseId}</h1>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200" variant="outline">
              {caseData.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">{caseData.client} - {caseData.type}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">تعديل</Button>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Calendar className="ml-2 h-4 w-4" />
            جدولة جلسة
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-2">
          <TabsTrigger value="summary">الملخص</TabsTrigger>
          <TabsTrigger value="documents">الوثائق</TabsTrigger>
          <TabsTrigger value="sessions">الجلسات والمواعيد</TabsTrigger>
          <TabsTrigger value="tasks">المهام</TabsTrigger>
          <TabsTrigger value="notes">الملاحظات الداخلية</TabsTrigger>
          <TabsTrigger value="communication">التواصل مع العميل</TabsTrigger>
          <TabsTrigger value="finance">الرسوم والمدفوعات</TabsTrigger>
        </TabsList>

        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>معلومات القضية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">رقم القضية</p>
                    <p className="font-medium">{caseData.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">نوع القضية</p>
                    <p className="font-medium">{caseData.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">الجهة القضائية</p>
                    <p className="font-medium">{caseData.court}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">المحامي المسؤول</p>
                    <p className="font-medium">{caseData.lawyer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">تاريخ الفتح</p>
                    <p className="font-medium">{caseData.openDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">الجلسة القادمة</p>
                    <p className="font-medium">{caseData.nextSession}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>ملخص القضية</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{caseData.description}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>الوثائق</CardTitle>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Upload className="ml-2 h-4 w-4" />
                رفع وثيقة جديدة
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">اسم الوثيقة</TableHead>
                    <TableHead className="text-right">التصنيف</TableHead>
                    <TableHead className="text-right">تاريخ الرفع</TableHead>
                    <TableHead className="text-right">الحجم</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{doc.category}</Badge>
                      </TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 ml-1" />
                          تحميل
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sessions Tab */}
        <TabsContent value="sessions" className="space-y-6">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>الجلسات والمواعيد</CardTitle>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Calendar className="ml-2 h-4 w-4" />
                إضافة جلسة
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">نوع الجلسة</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">الوقت</TableHead>
                    <TableHead className="text-right">المكان</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((session, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{session.type}</TableCell>
                      <TableCell>{session.date}</TableCell>
                      <TableCell>{session.time}</TableCell>
                      <TableCell>{session.location}</TableCell>
                      <TableCell>
                        <Badge variant={session.status === 'مجدولة' ? 'default' : 'secondary'}>
                          {session.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-6">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>المهام</CardTitle>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                إضافة مهمة
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-border">
                    <div className="flex-shrink-0 mt-1">
                      {task.status === 'مكتمل' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{task.task}</h4>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>المسؤول: {task.assignee}</span>
                        <span>الموعد النهائي: {task.deadline}</span>
                      </div>
                    </div>
                    <Badge variant={task.status === 'مكتمل' ? 'default' : 'secondary'}>
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>الملاحظات الداخلية</CardTitle>
              <p className="text-sm text-muted-foreground">هذه الملاحظات مرئية فقط لفريق العمل</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="أضف ملاحظة جديدة..."
                className="min-h-32"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                حفظ الملاحظة
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>التواصل مع العميل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {communications.map((comm, index) => (
                  <div key={index} className="flex gap-3 p-4 rounded-lg bg-muted">
                    <MessageSquare className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm mb-1">{comm.message}</p>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span>{comm.sender}</span>
                        <span>{comm.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="اكتب رسالتك هنا..." className="flex-1" />
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  إرسال
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Finance Tab */}
        <TabsContent value="finance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">إجمالي الرسوم</p>
                    <p className="text-2xl font-bold">50,000 ر.س</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">المدفوع</p>
                    <p className="text-2xl font-bold text-green-600">30,000 ر.س</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">المتبقي</p>
                    <p className="text-2xl font-bold text-orange-600">20,000 ر.س</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

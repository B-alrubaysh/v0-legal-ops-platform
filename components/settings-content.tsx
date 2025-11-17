'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Upload, Save } from 'lucide-react'

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState('office')

  const users = [
    { name: 'أحمد الشمري', email: 'ahmed@lawfirm.sa', role: 'مدير', status: 'نشط' },
    { name: 'فاطمة العلي', email: 'fatima@lawfirm.sa', role: 'محامي', status: 'نشط' },
    { name: 'خالد المطيري', email: 'khaled@lawfirm.sa', role: 'محامي', status: 'نشط' },
    { name: 'نورة السالم', email: 'noura@lawfirm.sa', role: 'مساعد قانوني', status: 'نشط' },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">الإعدادات</h1>
        <p className="text-muted-foreground text-base leading-relaxed">إدارة إعدادات المنصة والصلاحيات</p>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 h-auto p-1">
          <TabsTrigger value="office" className="h-10">إعدادات المكتب</TabsTrigger>
          <TabsTrigger value="users" className="h-10">إدارة المستخدمين</TabsTrigger>
          <TabsTrigger value="notifications" className="h-10">الإشعارات</TabsTrigger>
          <TabsTrigger value="branding" className="h-10">الهوية البصرية</TabsTrigger>
        </TabsList>

        {/* Office Settings Tab */}
        <TabsContent value="office" className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-5">
              <CardTitle className="text-xl font-semibold">معلومات المكتب</CardTitle>
              <CardDescription className="text-base mt-2">تحديث معلومات المكتب الأساسية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2.5">
                  <Label htmlFor="office-name" className="text-sm font-medium">اسم المكتب</Label>
                  <Input id="office-name" defaultValue="مكتب الشمري للمحاماة" className="h-11" />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="office-license" className="text-sm font-medium">رقم الترخيص</Label>
                  <Input id="office-license" defaultValue="123456789" className="h-11" />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="office-phone" className="text-sm font-medium">رقم الهاتف</Label>
                  <Input id="office-phone" defaultValue="+966 50 123 4567" className="h-11" />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="office-email" className="text-sm font-medium">البريد الإلكتروني</Label>
                  <Input id="office-email" type="email" defaultValue="info@lawfirm.sa" className="h-11" />
                </div>
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="office-address" className="text-sm font-medium">العنوان</Label>
                <Textarea 
                  id="office-address" 
                  defaultValue="الرياض - حي العليا - طريق الملك فهد"
                  className="min-h-24 resize-none"
                />
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm h-11 px-6">
                <Save className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-5 space-y-0">
              <div>
                <CardTitle className="text-xl font-semibold">المستخدمون والصلاحيات</CardTitle>
                <CardDescription className="text-base mt-2">إدارة فريق العمل والصلاحيات</CardDescription>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm h-11 px-5">
                إضافة مستخدم
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="text-right font-semibold text-sm h-14 px-6">الاسم</TableHead>
                      <TableHead className="text-right font-semibold text-sm h-14">البريد الإلكتروني</TableHead>
                      <TableHead className="text-right font-semibold text-sm h-14">الدور</TableHead>
                      <TableHead className="text-right font-semibold text-sm h-14">الحالة</TableHead>
                      <TableHead className="text-right font-semibold text-sm h-14 px-6">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow key={index} className={`${index % 2 === 0 ? 'bg-muted/30' : ''} hover:bg-muted/50 transition-colors border-border`}>
                        <TableCell className="font-semibold text-sm px-6 py-4">{user.name}</TableCell>
                        <TableCell className="text-sm py-4">{user.email}</TableCell>
                        <TableCell className="py-4">
                          <Badge variant={user.role === 'مدير' ? 'default' : 'secondary'} className="px-3 py-1 text-xs font-medium">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800 px-3 py-1 text-xs font-medium">
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <Button variant="ghost" size="sm" className="hover:bg-accent h-9 px-3 text-xs">
                            تعديل
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

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-5">
              <CardTitle className="text-xl font-semibold">إعدادات الإشعارات</CardTitle>
              <CardDescription className="text-base mt-2">تخصيص تلقي الإشعارات والتنبيهات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-5 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="space-y-1">
                  <p className="font-medium text-base">إشعارات الجلسات القادمة</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">استلام تنبيهات قبل موعد الجلسات</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-5 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="space-y-1">
                  <p className="font-medium text-base">إشعارات القضايا الجديدة</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">تلقي تنبيه عند إضافة قضية جديدة</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-5 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="space-y-1">
                  <p className="font-medium text-base">إشعارات المستندات</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">تنبيه عند رفع مستند جديد</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-5 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="space-y-1">
                  <p className="font-medium text-base">إشعارات المهام</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">تذكير بالمهام المعلقة والمواعيد النهائية</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-5 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="space-y-1">
                  <p className="font-medium text-base">ملخص يومي</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">إرسال ملخص يومي بالبريد الإلكتروني</p>
                </div>
                <Switch />
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm h-11 px-6 mt-2">
                <Save className="ml-2 h-4 w-4" />
                حفظ الإعدادات
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>الهوية البصرية للمستندات</CardTitle>
              <CardDescription>تخصيص شعار ورأس وتذييل المستندات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>شعار المكتب</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">لا يوجد شعار</span>
                    </div>
                    <Button variant="outline">
                      <Upload className="ml-2 h-4 w-4" />
                      رفع شعار
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="header-text">نص رأس الصفحة</Label>
                  <Textarea 
                    id="header-text" 
                    placeholder="النص الذي سيظهر في أعلى المستندات"
                    className="min-h-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footer-text">نص تذييل الصفحة</Label>
                  <Textarea 
                    id="footer-text" 
                    placeholder="النص الذي سيظهر في أسفل المستندات"
                    className="min-h-20"
                  />
                </div>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm h-11 px-6">
                <Save className="ml-2 h-4 w-4" />
                حفظ الهوية البصرية
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

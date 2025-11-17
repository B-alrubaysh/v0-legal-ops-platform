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
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">الإعدادات</h1>
        <p className="text-muted-foreground mt-2">إدارة إعدادات المنصة والصلاحيات</p>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2">
          <TabsTrigger value="office">إعدادات المكتب</TabsTrigger>
          <TabsTrigger value="users">إدارة المستخدمين</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="branding">الهوية البصرية</TabsTrigger>
        </TabsList>

        {/* Office Settings Tab */}
        <TabsContent value="office" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>معلومات المكتب</CardTitle>
              <CardDescription>تحديث معلومات المكتب الأساسية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="office-name">اسم المكتب</Label>
                  <Input id="office-name" defaultValue="مكتب الشمري للمحاماة" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office-license">رقم الترخيص</Label>
                  <Input id="office-license" defaultValue="123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office-phone">رقم الهاتف</Label>
                  <Input id="office-phone" defaultValue="+966 50 123 4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office-email">البريد الإلكتروني</Label>
                  <Input id="office-email" type="email" defaultValue="info@lawfirm.sa" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="office-address">العنوان</Label>
                <Textarea 
                  id="office-address" 
                  defaultValue="الرياض - حي العليا - طريق الملك فهد"
                  className="min-h-20"
                />
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Save className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>المستخدمون والصلاحيات</CardTitle>
                <CardDescription>إدارة فريق العمل والصلاحيات</CardDescription>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                إضافة مستخدم
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">البريد الإلكتروني</TableHead>
                    <TableHead className="text-right">الدور</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'مدير' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          تعديل
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>تخصيص تلقي الإشعارات والتنبيهات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="space-y-1">
                    <p className="font-medium">إشعارات الجلسات القادمة</p>
                    <p className="text-sm text-muted-foreground">استلام تنبيهات قبل موعد الجلسات</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="space-y-1">
                    <p className="font-medium">إشعارات القضايا الجديدة</p>
                    <p className="text-sm text-muted-foreground">تلقي تنبيه عند إضافة قضية جديدة</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="space-y-1">
                    <p className="font-medium">إشعارات المستندات</p>
                    <p className="text-sm text-muted-foreground">تنبيه عند رفع مستند جديد</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="space-y-1">
                    <p className="font-medium">إشعارات المهام</p>
                    <p className="text-sm text-muted-foreground">تذكير بالمهام المعلقة والمواعيد النهائية</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="space-y-1">
                    <p className="font-medium">ملخص يومي</p>
                    <p className="text-sm text-muted-foreground">إرسال ملخص يومي بالبريد الإلكتروني</p>
                  </div>
                  <Switch />
                </div>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Save className="ml-2 h-4 w-4" />
                حفظ الإعدادات
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-6">
          <Card className="border-border">
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
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
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

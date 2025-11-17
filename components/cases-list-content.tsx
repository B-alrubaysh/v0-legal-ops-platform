'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Search, Eye } from 'lucide-react'
import Link from 'next/link'

export function CasesListContent() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const cases = [
    { 
      id: 'ق-2025-001', 
      client: 'شركة النور للتجارة', 
      type: 'تجاري', 
      court: 'المحكمة التجارية بالرياض',
      lawyer: 'أحمد الشمري',
      status: 'قيد النظر',
      nextSession: '2025-01-20'
    },
    { 
      id: 'ق-2025-002', 
      client: 'محمد بن عبدالله', 
      type: 'مدني', 
      court: 'محكمة الأحوال المدنية',
      lawyer: 'فاطمة العلي',
      status: 'مرافعة',
      nextSession: '2025-01-22'
    },
    { 
      id: 'ق-2024-089', 
      client: 'مؤسسة الأمل', 
      type: 'عمالي', 
      court: 'محكمة العمل',
      lawyer: 'خالد المطيري',
      status: 'تحقيق',
      nextSession: '2025-01-24'
    },
    { 
      id: 'ق-2025-008', 
      client: 'سارة أحمد', 
      type: 'أسري', 
      court: 'محكمة الأحوال الشخصية',
      lawyer: 'نورة السالم',
      status: 'حكم نهائي',
      nextSession: '-'
    },
    { 
      id: 'ق-2025-015', 
      client: 'شركة البناء المتقدم', 
      type: 'تجاري', 
      court: 'المحكمة التجارية بجدة',
      lawyer: 'أحمد الشمري',
      status: 'قيد النظر',
      nextSession: '2025-02-05'
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'قيد النظر': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'مرافعة': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'تحقيق': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'حكم نهائي': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">القضايا</h1>
          <p className="text-muted-foreground mt-2">إدارة جميع قضايا المكتب</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="ml-2 h-4 w-4" />
          إضافة قضية جديدة
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن قضية..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="حالة القضية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد النظر</SelectItem>
                <SelectItem value="active">مرافعة</SelectItem>
                <SelectItem value="closed">حكم نهائي</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="نوع القضية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="commercial">تجاري</SelectItem>
                <SelectItem value="civil">مدني</SelectItem>
                <SelectItem value="labor">عمالي</SelectItem>
                <SelectItem value="family">أسري</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم القضية</TableHead>
                  <TableHead className="text-right">اسم العميل</TableHead>
                  <TableHead className="text-right">نوع القضية</TableHead>
                  <TableHead className="text-right">الجهة القضائية</TableHead>
                  <TableHead className="text-right">المحامي المسؤول</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الجلسة القادمة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">{caseItem.id}</TableCell>
                    <TableCell>{caseItem.client}</TableCell>
                    <TableCell>{caseItem.type}</TableCell>
                    <TableCell className="max-w-xs truncate">{caseItem.court}</TableCell>
                    <TableCell>{caseItem.lawyer}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(caseItem.status)} variant="outline">
                        {caseItem.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{caseItem.nextSession}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/cases/${caseItem.id}`}>
                          <Eye className="h-4 w-4 ml-1" />
                          عرض
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

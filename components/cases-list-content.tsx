'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plus, Search, Eye, FileText, MoreVertical } from 'lucide-react'
import { casesData } from '@/lib/cases-data'

export function CasesListContent() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [courtFilter, setCourtFilter] = useState('all')
  const [lawyerFilter, setLawyerFilter] = useState('all')
  const [letterDialogOpen, setLetterDialogOpen] = useState(false)
  const [pleadingDialogOpen, setPleadingDialogOpen] = useState(false)
  const [selectedCase, setSelectedCase] = useState<any>(null)
  
  const filteredCases = useMemo(() => {
    return casesData.filter(caseItem => {
      const matchesSearch = searchQuery === '' || 
        caseItem.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.clientName.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || caseItem.status === statusFilter
      
      const matchesCourt = courtFilter === 'all' || caseItem.court === courtFilter
      
      const matchesLawyer = lawyerFilter === 'all' || caseItem.assignedLawyer === lawyerFilter
      
      return matchesSearch && matchesStatus && matchesCourt && matchesLawyer
    })
  }, [searchQuery, statusFilter, courtFilter, lawyerFilter])

  const handleCreateLetter = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Letter created for case:', selectedCase?.id)
    setLetterDialogOpen(false)
  }

  const handleCreatePleading = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Pleading draft created for case:', selectedCase?.id)
    setPleadingDialogOpen(false)
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'open': return 'قيد النظر'
      case 'closed': return 'مغلقة'
      case 'on-hold': return 'معلقة'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800'
      case 'closed': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800'
      case 'on-hold': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-800'
      default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">القضايا</h1>
          <p className="text-muted-foreground text-base leading-relaxed">إدارة جميع قضايا المكتب</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all h-11 px-5">
          <Plus className="ml-2 h-4 w-4" />
          إضافة قضية جديدة
        </Button>
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن قضية..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 h-11"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 h-11">
                  <SelectValue placeholder="حالة القضية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="open">قيد النظر</SelectItem>
                  <SelectItem value="closed">مغلقة</SelectItem>
                  <SelectItem value="on-hold">معلقة</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48 h-11">
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
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={courtFilter} onValueChange={setCourtFilter}>
                <SelectTrigger className="w-full md:w-64 h-11">
                  <SelectValue placeholder="المحكمة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المحاكم</SelectItem>
                  <SelectItem value="المحكمة التجارية بالرياض">المحكمة التجارية بالرياض</SelectItem>
                  <SelectItem value="المحكمة التجارية بجدة">المحكمة التجارية بجدة</SelectItem>
                  <SelectItem value="محكمة الأحوال الشخصية">محكمة الأحوال الشخصية</SelectItem>
                  <SelectItem value="محكمة العمل">محكمة العمل</SelectItem>
                  <SelectItem value="محكمة الأحوال المدنية">محكمة الأحوال المدنية</SelectItem>
                </SelectContent>
              </Select>
              <Select value={lawyerFilter} onValueChange={setLawyerFilter}>
                <SelectTrigger className="w-full md:w-64 h-11">
                  <SelectValue placeholder="المحامي المسؤول" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المحامين</SelectItem>
                  <SelectItem value="أحمد الشمري">أحمد الشمري</SelectItem>
                  <SelectItem value="فاطمة العلي">فاطمة العلي</SelectItem>
                  <SelectItem value="خالد المطيري">خالد المطيري</SelectItem>
                  <SelectItem value="نورة السالم">نورة السالم</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="text-right font-semibold text-sm h-14 px-6">رقم القضية</TableHead>
                  <TableHead className="text-right font-semibold text-sm h-14">اسم العميل</TableHead>
                  <TableHead className="text-right font-semibold text-sm h-14">نوع القضية</TableHead>
                  <TableHead className="text-right font-semibold text-sm h-14">الجهة القضائية</TableHead>
                  <TableHead className="text-right font-semibold text-sm h-14">المحامي المسؤول</TableHead>
                  <TableHead className="text-right font-semibold text-sm h-14">الحالة</TableHead>
                  <TableHead className="text-right font-semibold text-sm h-14">الجلسة القادمة</TableHead>
                  <TableHead className="text-right font-semibold text-sm h-14 px-6">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((caseItem, index) => (
                  <TableRow 
                    key={caseItem.id} 
                    className={`${index % 2 === 0 ? 'bg-muted/30' : ''} hover:bg-muted/50 transition-colors border-border cursor-pointer`}
                    onClick={() => router.push(`/dashboard/cases/${caseItem.id}`)}
                  >
                    <TableCell className="font-semibold text-sm px-6 py-4">{caseItem.number}</TableCell>
                    <TableCell className="text-sm py-4">{caseItem.clientName}</TableCell>
                    <TableCell className="text-sm py-4">{caseItem.type}</TableCell>
                    <TableCell className="max-w-xs text-sm py-4">{caseItem.court}</TableCell>
                    <TableCell className="text-sm py-4">{caseItem.assignedLawyer}</TableCell>
                    <TableCell className="py-4">
                      <Badge className={`${getStatusColor(caseItem.status)} px-3 py-1 text-xs font-medium`} variant="outline">
                        {getStatusDisplay(caseItem.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 font-medium text-sm">{caseItem.nextSessionDate || '-'}</TableCell>
                    <TableCell className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="hover:bg-accent h-9 px-3 text-xs" onClick={() => router.push(`/dashboard/cases/${caseItem.id}`)}>
                          <Eye className="h-3.5 w-3.5 ml-1.5" />
                          عرض
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem onClick={() => {
                              setSelectedCase(caseItem)
                              setLetterDialogOpen(true)
                            }}>
                              <FileText className="ml-2 h-4 w-4" />
                              إنشاء خطاب للعميل
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedCase(caseItem)
                              setPleadingDialogOpen(true)
                            }}>
                              <FileText className="ml-2 h-4 w-4" />
                              إنشاء مسودة مرافعة
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={letterDialogOpen} onOpenChange={setLetterDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>إنشاء خطاب للعميل</DialogTitle>
            <DialogDescription>خطاب متعلق بالقضية</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateLetter} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>رقم القضية</Label>
              <Input value={selectedCase?.number || ''} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>اسم العميل</Label>
              <Input value={selectedCase?.clientName || ''} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="letter-content">محتوى الخطاب</Label>
              <Textarea 
                id="letter-content" 
                placeholder="اكتب محتوى الخطاب..."
                className="min-h-32"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              إنشاء الخطاب
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={pleadingDialogOpen} onOpenChange={setPleadingDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>إنشاء مسودة مرافعة</DialogTitle>
            <DialogDescription>مسودة مرافعة للقضية</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreatePleading} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>رقم القضية</Label>
              <Input value={selectedCase?.number || ''} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>نوع القضية</Label>
              <Input value={selectedCase?.type || ''} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pleading-content">محتوى المرافعة</Label>
              <Textarea 
                id="pleading-content" 
                placeholder="اكتب نقاط المرافعة الرئيسية..."
                className="min-h-40"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              إنشاء المسودة
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

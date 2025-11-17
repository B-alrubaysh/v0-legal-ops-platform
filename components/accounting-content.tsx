'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  DialogTrigger,
} from '@/components/ui/dialog'
import { TrendingUp, TrendingDown, DollarSign, Plus } from 'lucide-react'

export function AccountingContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const entries = [
    { date: '2025-01-15', description: 'أتعاب قضية ق-2025-001', debit: '50,000', credit: '', balance: '50,000' },
    { date: '2025-01-14', description: 'إيجار المكتب - يناير', debit: '', credit: '25,000', balance: '25,000' },
    { date: '2025-01-12', description: 'أتعاب استشارة قانونية', debit: '15,000', credit: '', balance: '40,000' },
    { date: '2025-01-10', description: 'رواتب الموظفين', debit: '', credit: '80,000', balance: '-40,000' },
    { date: '2025-01-08', description: 'أتعاب قضية ق-2024-089', debit: '45,000', credit: '', balance: '5,000' },
    { date: '2025-01-05', description: 'مصاريف إدارية', debit: '', credit: '8,000', balance: '-3,000' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">المحاسبة</h1>
          <p className="text-muted-foreground mt-2">نظرة عامة على الوضع المالي</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="ml-2 h-4 w-4" />
              إضافة قيد جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة قيد جديد</DialogTitle>
              <DialogDescription>أدخل تفاصيل القيد المحاسبي</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="entry-date">التاريخ</Label>
                <Input id="entry-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Input id="description" placeholder="وصف القيد المحاسبي" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">النوع</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debit">مدين (دخل)</SelectItem>
                    <SelectItem value="credit">دائن (مصروف)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">المبلغ (ريال)</Label>
                <Input id="amount" type="number" placeholder="0.00" />
              </div>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                حفظ القيد
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي الدخل</p>
                <p className="text-3xl font-bold text-green-600">250,000 ر.س</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12% عن الشهر الماضي</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">إجمالي المصروفات</p>
                <p className="text-3xl font-bold text-red-600">180,000 ر.س</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+8% عن الشهر الماضي</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">صافي الربح</p>
                <p className="text-3xl font-bold text-blue-600">70,000 ر.س</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+18% عن الشهر الماضي</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Journal Entries Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>دفتر القيود</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">الوصف</TableHead>
                <TableHead className="text-right">مدين (دخل)</TableHead>
                <TableHead className="text-right">دائن (مصروف)</TableHead>
                <TableHead className="text-right">الرصيد</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{entry.date}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell className={entry.debit ? 'text-green-600 font-medium' : ''}>
                    {entry.debit || '-'}
                  </TableCell>
                  <TableCell className={entry.credit ? 'text-red-600 font-medium' : ''}>
                    {entry.credit || '-'}
                  </TableCell>
                  <TableCell className="font-medium">{entry.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

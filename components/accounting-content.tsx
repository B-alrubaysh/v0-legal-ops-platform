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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">المحاسبة</h1>
          <p className="text-muted-foreground text-base leading-relaxed">نظرة عامة على الوضع المالي</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm hover:shadow-md transition-all h-11 px-5">
              <Plus className="ml-2 h-4 w-4" />
              إضافة قيد جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">إضافة قيد جديد</DialogTitle>
              <DialogDescription className="text-base">أدخل تفاصيل القيد المحاسبي</DialogDescription>
            </DialogHeader>
            <div className="space-y-5 py-4">
              <div className="space-y-2.5">
                <Label htmlFor="entry-date" className="text-sm font-medium">التاريخ</Label>
                <Input id="entry-date" type="date" className="h-11" />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="description" className="text-sm font-medium">الوصف</Label>
                <Input id="description" placeholder="وصف القيد المحاسبي" className="h-11" />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="type" className="text-sm font-medium">النوع</Label>
                <Select>
                  <SelectTrigger id="type" className="h-11">
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debit">مدين (دخل)</SelectItem>
                    <SelectItem value="credit">دائن (مصروف)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="amount" className="text-sm font-medium">المبلغ (ريال)</Label>
                <Input id="amount" type="number" placeholder="0.00" className="h-11" />
              </div>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-11">
                حفظ القيد
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-3 font-medium">إجمالي الدخل</p>
                <p className="text-3xl font-bold text-green-600">250,000 ر.س</p>
                <div className="flex items-center gap-1.5 mt-3 text-sm text-green-600 font-medium">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12% عن الشهر الماضي</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center shadow-sm">
                <DollarSign className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-3 font-medium">إجمالي المصروفات</p>
                <p className="text-3xl font-bold text-red-600">180,000 ر.س</p>
                <div className="flex items-center gap-1.5 mt-3 text-sm text-red-600 font-medium">
                  <TrendingUp className="h-4 w-4" />
                  <span>+8% عن الشهر الماضي</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center shadow-sm">
                <DollarSign className="h-7 w-7 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-3 font-medium">صافي الربح</p>
                <p className="text-3xl font-bold text-blue-600">70,000 ر.س</p>
                <div className="flex items-center gap-1.5 mt-3 text-sm text-blue-600 font-medium">
                  <TrendingUp className="h-4 w-4" />
                  <span>+18% عن الشهر الماضي</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center shadow-sm">
                <DollarSign className="h-7 w-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-5">
          <CardTitle className="text-xl font-semibold">دفتر القيود</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="text-right font-semibold text-sm h-14 px-6">التاريخ</TableHead>
                  <TableHead className="text-right font-semibold text-sm h-14">الوصف</TableHead>
                  <TableHead className="text-right font-semibold text-sm h-14">مدين (دخل)</TableHead>
                  <TableHead className="text-right font-semibold text-sm h-14">دائن (مصروف)</TableHead>
                  <TableHead className="text-right font-semibold text-sm h-14 px-6">الرصيد</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry, index) => (
                  <TableRow key={index} className={`${index % 2 === 0 ? 'bg-muted/30' : ''} hover:bg-muted/50 transition-colors border-border`}>
                    <TableCell className="font-medium text-sm px-6 py-4">{entry.date}</TableCell>
                    <TableCell className="text-sm py-4">{entry.description}</TableCell>
                    <TableCell className={`text-sm py-4 ${entry.debit ? 'text-green-600 font-semibold' : ''}`}>
                      {entry.debit || '-'}
                    </TableCell>
                    <TableCell className={`text-sm py-4 ${entry.credit ? 'text-red-600 font-semibold' : ''}`}>
                      {entry.credit || '-'}
                    </TableCell>
                    <TableCell className="font-semibold text-sm px-6 py-4">{entry.balance}</TableCell>
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

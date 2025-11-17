'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Search, Eye, Building2, User } from 'lucide-react'

export function ClientsContent() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const clients = [
    { 
      name: 'شركة النور للتجارة', 
      type: 'شركة',
      idNumber: '1234567890',
      expiryDate: '2026-12-31',
      casesCount: 3,
      phone: '0501234567',
      email: 'info@alnoor.sa'
    },
    { 
      name: 'محمد بن عبدالله', 
      type: 'فرد',
      idNumber: '1098765432',
      expiryDate: '2028-05-15',
      casesCount: 1,
      phone: '0509876543',
      email: 'mohammed@email.com'
    },
    { 
      name: 'مؤسسة الأمل', 
      type: 'شركة',
      idNumber: '5555666677',
      expiryDate: '2027-08-20',
      casesCount: 2,
      phone: '0505556666',
      email: 'contact@alamal.sa'
    },
    { 
      name: 'سارة أحمد', 
      type: 'فرد',
      idNumber: '2233445566',
      expiryDate: '2029-03-10',
      casesCount: 1,
      phone: '0502233445',
      email: 'sarah@email.com'
    },
    { 
      name: 'شركة البناء المتقدم', 
      type: 'شركة',
      idNumber: '7788990011',
      expiryDate: '2026-11-25',
      casesCount: 4,
      phone: '0507788990',
      email: 'info@advanced-build.sa'
    },
  ]

  const getInitials = (name: string) => {
    const words = name.split(' ')
    return words.slice(0, 2).map(w => w[0]).join('')
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">العملاء</h1>
          <p className="text-muted-foreground text-base">إدارة قاعدة بيانات العملاء</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm">
          <Plus className="ml-2 h-4 w-4" />
          إضافة عميل جديد
        </Button>
      </div>

      {/* Search */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن عميل..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 h-11"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="text-right font-semibold h-14 px-6">اسم العميل</TableHead>
                  <TableHead className="text-right font-semibold h-14">النوع</TableHead>
                  <TableHead className="text-right font-semibold h-14">رقم الهوية / السجل التجاري</TableHead>
                  <TableHead className="text-right font-semibold h-14">تاريخ الانتهاء</TableHead>
                  <TableHead className="text-right font-semibold h-14">عدد القضايا</TableHead>
                  <TableHead className="text-right font-semibold h-14">التواصل</TableHead>
                  <TableHead className="text-right font-semibold h-14 px-6">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client, index) => (
                  <TableRow key={index} className={`${index % 2 === 0 ? 'bg-muted/30' : ''} hover:bg-muted/50 transition-colors border-border cursor-pointer`}>
                    <TableCell className="font-semibold px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 flex-shrink-0">
                          <AvatarFallback className={client.type === 'شركة' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400' : 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400'}>
                            {client.type === 'شركة' ? <Building2 className="h-4 w-4" /> : <User className="h-4 w-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <span>{client.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant={client.type === 'شركة' ? 'default' : 'secondary'} className="px-3 py-1">
                        {client.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 font-medium">{client.idNumber}</TableCell>
                    <TableCell className="py-4">{client.expiryDate}</TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className="px-3 py-1 font-semibold">{client.casesCount}</Badge>
                    </TableCell>
                    <TableCell className="text-sm py-4">
                      <div className="font-medium">{client.phone}</div>
                      <div className="text-muted-foreground mt-1">{client.email}</div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Button variant="ghost" size="sm" className="hover:bg-accent">
                        <Eye className="h-4 w-4 ml-1" />
                        عرض الملف
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

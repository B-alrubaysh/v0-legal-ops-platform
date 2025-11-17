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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">العملاء</h1>
          <p className="text-muted-foreground mt-2">إدارة قاعدة بيانات العملاء</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="ml-2 h-4 w-4" />
          إضافة عميل جديد
        </Button>
      </div>

      {/* Search */}
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن عميل..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">اسم العميل</TableHead>
                  <TableHead className="text-right">النوع</TableHead>
                  <TableHead className="text-right">رقم الهوية / السجل التجاري</TableHead>
                  <TableHead className="text-right">تاريخ الانتهاء</TableHead>
                  <TableHead className="text-right">عدد القضايا</TableHead>
                  <TableHead className="text-right">التواصل</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {client.type === 'شركة' ? (
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <User className="h-4 w-4 text-muted-foreground" />
                        )}
                        {client.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={client.type === 'شركة' ? 'default' : 'secondary'}>
                        {client.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.idNumber}</TableCell>
                    <TableCell>{client.expiryDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{client.casesCount}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{client.phone}</div>
                      <div className="text-muted-foreground">{client.email}</div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
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

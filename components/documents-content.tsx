'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Search, Upload, FileText, Download, Grid3x3, List } from 'lucide-react'

export function DocumentsContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  const documents = [
    { 
      name: 'عقد التوريد الأصلي', 
      category: 'عقود',
      caseId: 'ق-2025-001',
      uploadDate: '2025-01-10',
      status: 'نشط',
      size: '2.4 MB'
    },
    { 
      name: 'صحيفة الدعوى', 
      category: 'مذكرات',
      caseId: 'ق-2025-002',
      uploadDate: '2025-01-12',
      status: 'نشط',
      size: '1.8 MB'
    },
    { 
      name: 'مستندات الإثبات', 
      category: 'إثباتات',
      caseId: 'ق-2025-001',
      uploadDate: '2025-01-15',
      status: 'نشط',
      size: '5.2 MB'
    },
    { 
      name: 'حكم المحكمة النهائي', 
      category: 'أحكام',
      caseId: 'ق-2024-089',
      uploadDate: '2024-12-20',
      status: 'مؤرشف',
      size: '3.1 MB'
    },
    { 
      name: 'عقد الاستشارة القانونية', 
      category: 'عقود',
      caseId: 'ق-2025-008',
      uploadDate: '2025-01-08',
      status: 'نشط',
      size: '1.5 MB'
    },
    { 
      name: 'مذكرة دفاع', 
      category: 'مذكرات',
      caseId: 'ق-2025-015',
      uploadDate: '2025-01-18',
      status: 'نشط',
      size: '2.9 MB'
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'عقود': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'مذكرات': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'إثباتات': return 'bg-green-100 text-green-700 border-green-200'
      case 'أحكام': return 'bg-orange-100 text-orange-700 border-orange-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">الوثائق</h1>
          <p className="text-muted-foreground mt-2">مكتبة الوثائق والمستندات</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Upload className="ml-2 h-4 w-4" />
          رفع وثيقة جديدة
        </Button>
      </div>

      {/* Filters and View Toggle */}
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن وثيقة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="نوع الوثيقة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="contracts">عقود</SelectItem>
                <SelectItem value="briefs">مذكرات</SelectItem>
                <SelectItem value="evidence">إثباتات</SelectItem>
                <SelectItem value="verdicts">أحكام</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="القضية المرتبطة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع القضايا</SelectItem>
                <SelectItem value="case1">ق-2025-001</SelectItem>
                <SelectItem value="case2">ق-2025-002</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Display */}
      {viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <Badge className={getCategoryColor(doc.category)} variant="outline">
                    {doc.category}
                  </Badge>
                </div>
                <h3 className="font-semibold mb-2 text-foreground line-clamp-2">{doc.name}</h3>
                <div className="space-y-1 text-sm text-muted-foreground mb-4">
                  <p>القضية: {doc.caseId}</p>
                  <p>التاريخ: {doc.uploadDate}</p>
                  <p>الحجم: {doc.size}</p>
                </div>
                <Button variant="outline" className="w-full">
                  <Download className="ml-2 h-4 w-4" />
                  فتح
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {documents.map((doc, index) => (
                <div key={index} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{doc.name}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                        <span>{doc.caseId}</span>
                        <span>{doc.uploadDate}</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                    <Badge className={getCategoryColor(doc.category)} variant="outline">
                      {doc.category}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 ml-1" />
                      تحميل
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

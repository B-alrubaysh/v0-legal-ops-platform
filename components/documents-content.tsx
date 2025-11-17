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
import { Plus, Search, Upload, FileText, Download, Grid3x3, List, File } from 'lucide-react'

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
      size: '2.4 MB',
      type: 'PDF'
    },
    { 
      name: 'صحيفة الدعوى', 
      category: 'مذكرات',
      caseId: 'ق-2025-002',
      uploadDate: '2025-01-12',
      status: 'نشط',
      size: '1.8 MB',
      type: 'DOCX'
    },
    { 
      name: 'مستندات الإثبات', 
      category: 'إثباتات',
      caseId: 'ق-2025-001',
      uploadDate: '2025-01-15',
      status: 'نشط',
      size: '5.2 MB',
      type: 'PDF'
    },
    { 
      name: 'حكم المحكمة النهائي', 
      category: 'أحكام',
      caseId: 'ق-2024-089',
      uploadDate: '2024-12-20',
      status: 'مؤرشف',
      size: '3.1 MB',
      type: 'PDF'
    },
    { 
      name: 'عقد الاستشارة القانونية', 
      category: 'عقود',
      caseId: 'ق-2025-008',
      uploadDate: '2025-01-08',
      status: 'نشط',
      size: '1.5 MB',
      type: 'PDF'
    },
    { 
      name: 'مذكرة دفاع', 
      category: 'مذكرات',
      caseId: 'ق-2025-015',
      uploadDate: '2025-01-18',
      status: 'نشط',
      size: '2.9 MB',
      type: 'DOCX'
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'عقود': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800'
      case 'مذكرات': return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-800'
      case 'إثباتات': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800'
      case 'أحكام': return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800'
      default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
    }
  }

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'
      case 'DOCX': return 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">الوثائق</h1>
          <p className="text-muted-foreground text-base">مكتبة الوثائق والمستندات</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm">
          <Upload className="ml-2 h-4 w-4" />
          رفع وثيقة جديدة
        </Button>
      </div>

      {/* Filters and View Toggle */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن وثيقة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-11"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48 h-11">
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
              <SelectTrigger className="w-full md:w-48 h-11">
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
                className="h-11 w-11"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="icon"
                className="h-11 w-11"
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
            <Card key={index} className="border-border shadow-sm hover:shadow-md transition-all duration-200 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-3 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shadow-sm group-hover:shadow transition-shadow flex-shrink-0">
                    <FileText className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getCategoryColor(doc.category)} variant="outline" className="px-2.5 py-1">
                      {doc.category}
                    </Badge>
                    <Badge className={getFileTypeColor(doc.type)} variant="outline" className="px-2.5 py-1 text-xs">
                      {doc.type}
                    </Badge>
                  </div>
                </div>
                <h3 className="font-semibold text-base mb-3 text-foreground line-clamp-2 leading-snug">{doc.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground mb-6">
                  <p className="font-medium">القضية: <span className="text-foreground">{doc.caseId}</span></p>
                  <p>التاريخ: {doc.uploadDate}</p>
                  <p>الحجم: {doc.size}</p>
                </div>
                <Button variant="outline" className="w-full hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Download className="ml-2 h-4 w-4" />
                  فتح
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border shadow-sm">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {documents.map((doc, index) => (
                <div key={index} className="p-5 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 shadow-sm">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-foreground mb-2">{doc.name}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="font-medium">{doc.caseId}</span>
                        <span>•</span>
                        <span>{doc.uploadDate}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Badge className={getFileTypeColor(doc.type)} variant="outline" className="px-2.5 py-1">
                        {doc.type}
                      </Badge>
                      <Badge className={getCategoryColor(doc.category)} variant="outline" className="px-2.5 py-1">
                        {doc.category}
                      </Badge>
                      <Button variant="ghost" size="sm" className="hover:bg-accent">
                        <Download className="h-4 w-4 ml-1" />
                        تحميل
                      </Button>
                    </div>
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

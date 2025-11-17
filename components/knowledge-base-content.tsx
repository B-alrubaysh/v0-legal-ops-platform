'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, FileText, Download, FolderOpen } from 'lucide-react'

export function KnowledgeBaseContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'الكل', count: 45 },
    { id: 'briefs', name: 'مذكرات قانونية', count: 18 },
    { id: 'contracts', name: 'نماذج عقود', count: 12 },
    { id: 'precedents', name: 'سوابق قضائية', count: 10 },
    { id: 'notes', name: 'ملاحظات داخلية', count: 5 },
  ]

  const documents = [
    { 
      name: 'نموذج عقد توريد', 
      category: 'نماذج عقود',
      categoryId: 'contracts',
      date: '2024-12-15',
      author: 'أحمد الشمري',
      tags: ['عقود', 'توريد', 'تجاري']
    },
    { 
      name: 'مذكرة قانونية - النزاعات التجارية', 
      category: 'مذكرات قانونية',
      categoryId: 'briefs',
      date: '2024-12-10',
      author: 'فاطمة العلي',
      tags: ['تجاري', 'نزاعات']
    },
    { 
      name: 'سابقة قضائية - قضايا العمل', 
      category: 'سوابق قضائية',
      categoryId: 'precedents',
      date: '2024-11-20',
      author: 'خالد المطيري',
      tags: ['عمالي', 'أحكام']
    },
    { 
      name: 'نموذج عقد استشارة قانونية', 
      category: 'نماذج عقود',
      categoryId: 'contracts',
      date: '2024-11-15',
      author: 'نورة السالم',
      tags: ['عقود', 'استشارة']
    },
    { 
      name: 'ملاحظات حول الإجراءات المدنية', 
      category: 'ملاحظات داخلية',
      categoryId: 'notes',
      date: '2024-10-25',
      author: 'أحمد الشمري',
      tags: ['مدني', 'إجراءات']
    },
    { 
      name: 'مذكرة دفاع نموذجية', 
      category: 'مذكرات قانونية',
      categoryId: 'briefs',
      date: '2024-10-10',
      author: 'فاطمة العلي',
      tags: ['مذكرات', 'دفاع']
    },
  ]

  const filteredDocuments = documents.filter(doc => 
    (selectedCategory === 'all' || doc.categoryId === selectedCategory) &&
    (searchQuery === '' || doc.name.includes(searchQuery))
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">قاعدة المعرفة</h1>
        <p className="text-muted-foreground mt-2">مكتبة المستندات والموارد القانونية</p>
      </div>

      {/* Search */}
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ابحث في قاعدة المعرفة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Categories Sidebar */}
        <Card className="border-border">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">التصنيفات</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <Badge variant={selectedCategory === category.id ? 'secondary' : 'outline'}>
                    {category.count}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <div className="lg:col-span-3 space-y-4">
          {filteredDocuments.map((doc, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{doc.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span>{doc.category}</span>
                      <span>•</span>
                      <span>بواسطة {doc.author}</span>
                      <span>•</span>
                      <span>{doc.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {doc.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 ml-1" />
                    تحميل
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

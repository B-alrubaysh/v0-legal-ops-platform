'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, FileText, Lightbulb } from 'lucide-react'

type Doc = {
  id: string
  title: string
  type: 'law' | 'policy' | 'template'
  summary: string
  content: string
  tags: string[]
}

const docs: Doc[] = [
  {
    id: '1',
    title: 'نظام المرافعات الشرعية - المادة 34',
    type: 'law',
    summary: 'توضح المادة 34 من نظام المرافعات الشرعية الإجراءات المتعلقة بتقديم الدعوى والمستندات المطلوبة.',
    content: 'تنص المادة على أنه يجب على المدعي تقديم صحيفة دعواه متضمنة البيانات اللازمة والمستندات المؤيدة لطلباته. ويجب أن تكون الصحيفة واضحة ومحددة في بياناتها وطلباتها، وأن ترفق بها المستندات اللازمة لإثبات الدعوى.',
    tags: ['مرافعات', 'إجراءات', 'دعوى']
  },
  {
    id: '2',
    title: 'سياسة حماية البيانات الشخصية',
    type: 'policy',
    summary: 'سياسة داخلية تحدد كيفية التعامل مع بيانات العملاء والحفاظ على سريتها وفقاً للأنظمة السعودية.',
    content: 'تلتزم المؤسسة بحماية جميع البيانات الشخصية للعملاء وعدم مشاركتها مع أطراف ثالثة إلا بموافقة صريحة أو بناءً على متطلب نظامي. يتم تخزين البيانات بطرق آمنة وتشفيرها عند الضرورة.',
    tags: ['خصوصية', 'بيانات', 'حماية']
  },
  {
    id: '3',
    title: 'نموذج عقد استشارة قانونية',
    type: 'template',
    summary: 'نموذج عقد قابل للتخصيص لتقديم خدمات الاستشارة القانونية للعملاء.',
    content: 'عقد استشارة قانونية\n\nبين كل من:\n\nالطرف الأول: [اسم المكتب]\nالطرف الثاني: [اسم العميل]\n\nيتفق الطرفان على ما يلي:\n1. يقدم الطرف الأول خدمات استشارية قانونية في [المجال]\n2. مدة العقد: [المدة]\n3. الأتعاب: [المبلغ]\n4. يلتزم الطرف الأول بالحفاظ على سرية معلومات العميل',
    tags: ['عقود', 'استشارة', 'نموذج']
  },
  {
    id: '4',
    title: 'نظام العمل - حقوق الموظف',
    type: 'law',
    summary: 'ملخص للحقوق الأساسية للموظف في القطاع الخاص وفقاً لنظام العمل السعودي.',
    content: 'يحق للموظف الحصول على راتب شهري محدد، إجازة سنوية لا تقل عن 21 يوماً، إجازة مرضية بأجر كامل لمدة 30 يوماً، والحصول على مكافأة نهاية خدمة. كما يحق له بيئة عمل آمنة وصحية.',
    tags: ['عمل', 'موظفين', 'حقوق']
  },
  {
    id: '5',
    title: 'نموذج عقد توريد',
    type: 'template',
    summary: 'نموذج عقد شامل لتوريد البضائع والخدمات مع شروط التسليم والدفع.',
    content: 'عقد توريد\n\nالطرف الأول (المورد): [الاسم]\nالطرف الثاني (العميل): [الاسم]\n\n1. البضائع المتفق عليها: [الوصف]\n2. الكمية: [العدد]\n3. السعر الإجمالي: [المبلغ]\n4. موعد التسليم: [التاريخ]\n5. شروط الدفع: [التفاصيل]\n6. الضمانات: [المدة والشروط]',
    tags: ['عقود', 'توريد', 'تجاري']
  },
  {
    id: '6',
    title: 'سياسة التعامل مع النزاعات',
    type: 'policy',
    summary: 'إجراءات داخلية للتعامل مع النزاعات بين العملاء أو مع أطراف خارجية.',
    content: 'عند حدوث نزاع، يتم أولاً محاولة التسوية الودية من خلال الحوار والتفاوض. في حالة فشل ذلك، يتم اللجوء إلى التحكيم أو الوساطة قبل التوجه للمحاكم. يتم توثيق جميع مراحل النزاع والمراسلات.',
    tags: ['نزاعات', 'إجراءات', 'تسوية']
  },
  {
    id: '7',
    title: 'نظام الإفلاس - إجراءات التصفية',
    type: 'law',
    summary: 'نظرة عامة على إجراءات تصفية الشركات المفلسة وحقوق الدائنين.',
    content: 'ينظم نظام الإفلاس إجراءات تصفية الشركات المتعثرة بما يضمن حقوق الدائنين. يتم تعيين أمين تصفية لإدارة أصول الشركة وتوزيعها على الدائنين بحسب الأولوية المحددة نظاماً.',
    tags: ['إفلاس', 'تصفية', 'شركات']
  },
  {
    id: '8',
    title: 'نموذج مذكرة دفاع',
    type: 'template',
    summary: 'نموذج لإعداد مذكرة دفاع شاملة في القضايا المدنية والتجارية.',
    content: 'مذكرة دفاع\n\nإلى المحكمة الموقرة\n\nبالإشارة إلى القضية رقم: [الرقم]\n\nالموضوع: [عنوان القضية]\n\nالوقائع:\n[سرد الوقائع]\n\nالدفوع:\n1. [الدفع الأول]\n2. [الدفع الثاني]\n\nالطلبات:\nبناء عليه نلتمس من المحكمة الموقرة...',
    tags: ['مذكرات', 'دفاع', 'نموذج']
  },
  {
    id: '9',
    title: 'سياسة الأتعاب والفوترة',
    type: 'policy',
    summary: 'سياسة داخلية لتحديد أتعاب الخدمات القانونية وإجراءات الفوترة.',
    content: 'يتم احتساب الأتعاب بناءً على طبيعة القضية، الوقت المستغرق، وخبرة المحامي. يتم إصدار فاتورة تفصيلية للعميل شهرياً أو عند إنجاز كل مرحلة. يحق للعميل الاستفسار عن تفاصيل الأتعاب في أي وقت.',
    tags: ['أتعاب', 'فوترة', 'مالية']
  },
  {
    id: '10',
    title: 'نظام الشركات - تأسيس الشركة',
    type: 'law',
    summary: 'المتطلبات القانونية والإجراءات اللازمة لتأسيس شركة في المملكة العربية السعودية.',
    content: 'يتطلب تأسيس الشركة إعداد عقد التأسيس والنظام الأساسي، تحديد رأس المال، تسجيل الشركة في وزارة التجارة، والحصول على السجل التجاري. يجب توافر الحد الأدنى من الشركاء حسب نوع الشركة.',
    tags: ['شركات', 'تأسيس', 'تجاري']
  }
]

export function KnowledgeBaseContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'law' | 'policy' | 'template'>('all')
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null)

  const filteredDocs = docs.filter(doc => {
    // Type filter
    if (typeFilter !== 'all' && doc.type !== typeFilter) {
      return false
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        doc.title.toLowerCase().includes(query) ||
        doc.summary.toLowerCase().includes(query) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    return true
  })

  const selectedDoc = selectedDocId 
    ? docs.find(d => d.id === selectedDocId) 
    : filteredDocs[0]

  const getSuggestion = (type: 'law' | 'policy' | 'template') => {
    switch (type) {
      case 'law':
        return 'ينبغي مراجعة هذه المادة قبل الرد على الدعوى وتطبيقها على وقائع القضية.'
      case 'policy':
        return 'يُنصح بتطبيق هذه السياسة على جميع الملفات ذات الصلة لضمان الامتثال.'
      case 'template':
        return 'تذكر تخصيص هذا النموذج حسب تفاصيل القضية أو العميل المحدد.'
    }
  }

  const typeLabels = {
    law: 'قانون',
    policy: 'سياسة',
    template: 'نموذج'
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">قاعدة المعرفة</h1>
        <p className="text-muted-foreground text-base leading-relaxed">مكتبة المستندات والموارد القانونية</p>
      </div>

      {/* Search and Filter */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث في قاعدة المعرفة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-11"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={typeFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('all')}
                className="h-11"
              >
                الكل
              </Button>
              <Button
                variant={typeFilter === 'law' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('law')}
                className="h-11"
              >
                قوانين
              </Button>
              <Button
                variant={typeFilter === 'policy' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('policy')}
                className="h-11"
              >
                سياسات
              </Button>
              <Button
                variant={typeFilter === 'template' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('template')}
                className="h-11"
              >
                نماذج
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Documents List - Left Side */}
        <div className="space-y-3">
          {filteredDocs.map((doc) => (
            <Card 
              key={doc.id}
              className={`border-border shadow-sm hover:shadow-md transition-all cursor-pointer ${
                selectedDoc?.id === doc.id ? 'ring-2 ring-primary shadow-md' : ''
              }`}
              onClick={() => setSelectedDocId(doc.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1.5 text-foreground line-clamp-2">{doc.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">
                        {typeLabels[doc.type]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{doc.summary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredDocs.length === 0 && (
            <Card className="border-border shadow-sm">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">لا توجد مستندات مطابقة</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Document Preview - Right Side */}
        <div className="lg:col-span-2">
          {selectedDoc ? (
            <Card className="border-border shadow-sm">
              <CardContent className="p-6 space-y-6">
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-1">اقتراح من النظام</h4>
                      <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                        {getSuggestion(selectedDoc.type)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Document Details */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-foreground mb-3">{selectedDoc.title}</h2>
                      <Badge variant="secondary" className="text-sm px-3 py-1">
                        {typeLabels[selectedDoc.type]}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-foreground">ملخص</h3>
                      <p className="text-muted-foreground leading-relaxed">{selectedDoc.summary}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-foreground">الوسوم</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedDoc.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-sm px-3 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-foreground">المحتوى</h3>
                      <div className="bg-muted rounded-lg p-5">
                        <p className="text-foreground leading-relaxed whitespace-pre-wrap">{selectedDoc.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border shadow-sm">
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg">اختر مستنداً لعرض تفاصيله</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

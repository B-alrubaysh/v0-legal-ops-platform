import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

export function TasksContent() {
  const tasks = [
    { task: 'إعداد المذكرة الختامية للقضية ق-2025-001', assignee: 'أحمد الشمري', deadline: '2025-01-18', priority: 'عالية', status: 'قيد العمل' },
    { task: 'مراجعة المستندات الإضافية', assignee: 'فاطمة العلي', deadline: '2025-01-17', priority: 'متوسطة', status: 'مكتمل' },
    { task: 'التواصل مع الشهود', assignee: 'خالد المطيري', deadline: '2025-01-19', priority: 'عالية', status: 'معلق' },
    { task: 'تحديث قاعدة البيانات', assignee: 'نورة السالم', deadline: '2025-01-20', priority: 'منخفضة', status: 'قيد العمل' },
    { task: 'إعداد تقرير الحالة الشهري', assignee: 'أحمد الشمري', deadline: '2025-01-25', priority: 'متوسطة', status: 'معلق' },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالية': return 'bg-red-100 text-red-700 border-red-200'
      case 'متوسطة': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'منخفضة': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'مكتمل': return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'قيد العمل': return <Clock className="h-5 w-5 text-blue-600" />
      case 'معلق': return <AlertCircle className="h-5 w-5 text-orange-600" />
      default: return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">المهام</h1>
          <p className="text-muted-foreground text-base leading-relaxed">متابعة المهام والتكليفات</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm hover:shadow-md transition-all h-11 px-5">
          <Plus className="ml-2 h-4 w-4" />
          إضافة مهمة جديدة
        </Button>
      </div>

      {/* Tasks List */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-5">
          <CardTitle className="text-xl font-semibold">قائمة المهام</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-start gap-4 p-5 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <Checkbox className="mt-1" defaultChecked={task.status === 'مكتمل'} />
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(task.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-base mb-2.5 text-foreground">{task.task}</h4>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="font-medium">المسؤول: {task.assignee}</span>
                    <span>•</span>
                    <span className="font-medium">الموعد: {task.deadline}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={`${getPriorityColor(task.priority)} px-3 py-1 text-xs font-medium`} variant="outline">
                    {task.priority}
                  </Badge>
                  <Badge variant={task.status === 'مكتمل' ? 'default' : 'secondary'} className="px-3 py-1 text-xs font-medium">
                    {task.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

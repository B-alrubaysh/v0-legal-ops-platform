'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, Edit } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

type Task = {
  id: string
  title: string
  relatedCase?: string
  relatedClient?: string
  dueDate?: string
  priority: 'low' | 'medium' | 'high'
  status: 'open' | 'in-progress' | 'done'
  owner: string
}

const taskSchema = z.object({
  title: z.string().min(1, 'العنوان مطلوب'),
  relatedCase: z.string().optional(),
  relatedClient: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['open', 'in-progress', 'done']),
  owner: z.string().min(1, 'المسؤول مطلوب'),
})

type TaskFormData = z.infer<typeof taskSchema>

export function TasksContent() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'إعداد المذكرة الختامية للقضية ق-2025-001',
      relatedCase: 'ق-2025-001',
      relatedClient: 'شركة النور للتجارة',
      dueDate: '2025-01-18',
      priority: 'high',
      status: 'in-progress',
      owner: 'أحمد الشمري',
    },
    {
      id: '2',
      title: 'مراجعة المستندات الإضافية',
      relatedCase: 'ق-2025-003',
      relatedClient: 'محمد الأحمد',
      dueDate: '2025-01-17',
      priority: 'medium',
      status: 'done',
      owner: 'فاطمة العلي',
    },
    {
      id: '3',
      title: 'التواصل مع الشهود',
      relatedCase: 'ق-2025-002',
      dueDate: '2025-01-19',
      priority: 'high',
      status: 'open',
      owner: 'خالد المطيري',
    },
    {
      id: '4',
      title: 'تحديث قاعدة البيانات',
      dueDate: '2025-01-20',
      priority: 'low',
      status: 'in-progress',
      owner: 'نورة السالم',
    },
    {
      id: '5',
      title: 'إعداد تقرير الحالة الشهري',
      relatedClient: 'مؤسسة البناء الحديث',
      dueDate: '2025-01-25',
      priority: 'medium',
      status: 'open',
      owner: 'أحمد الشمري',
    },
    {
      id: '6',
      title: 'متابعة جلسة المحكمة',
      relatedCase: 'ق-2025-004',
      relatedClient: 'علي السالم',
      dueDate: '2025-01-22',
      priority: 'high',
      status: 'in-progress',
      owner: 'فاطمة العلي',
    },
    {
      id: '7',
      title: 'تحضير عقد جديد',
      relatedClient: 'شركة الخليج',
      dueDate: '2025-01-30',
      priority: 'low',
      status: 'open',
      owner: 'خالد المطيري',
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'in-progress' | 'done'>('all')
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: 'medium',
      status: 'open',
    }
  })

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.relatedCase?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.relatedClient?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleStatusChange = (taskId: string, newStatus: 'open' | 'in-progress' | 'done') => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const handleDelete = (taskId: string, taskTitle: string) => {
    if (confirm(`هل أنت متأكد من حذف المهمة "${taskTitle}"؟`)) {
      setTasks(tasks.filter(task => task.id !== taskId))
    }
  }

  const handleAddTask = () => {
    setEditingTask(null)
    reset({
      title: '',
      relatedCase: '',
      relatedClient: '',
      dueDate: '',
      priority: 'medium',
      status: 'open',
      owner: '',
    })
    setIsDialogOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    reset({
      title: task.title,
      relatedCase: task.relatedCase || '',
      relatedClient: task.relatedClient || '',
      dueDate: task.dueDate || '',
      priority: task.priority,
      status: task.status,
      owner: task.owner,
    })
    setIsDialogOpen(true)
  }

  const onSubmit = (data: TaskFormData) => {
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...data, relatedCase: data.relatedCase || undefined, relatedClient: data.relatedClient || undefined, dueDate: data.dueDate || undefined }
          : task
      ))
    } else {
      // Add new task
      const newTask: Task = {
        id: Date.now().toString(),
        ...data,
        relatedCase: data.relatedCase || undefined,
        relatedClient: data.relatedClient || undefined,
        dueDate: data.dueDate || undefined,
      }
      setTasks([...tasks, newTask])
    }
    setIsDialogOpen(false)
    reset()
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'عالية'
      case 'medium': return 'متوسطة'
      case 'low': return 'منخفضة'
      default: return priority
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'done': return 'مكتمل'
      case 'in-progress': return 'قيد العمل'
      case 'open': return 'معلق'
      default: return status
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
        <Button onClick={handleAddTask} className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm hover:shadow-md transition-all h-11 px-5">
          <Plus className="ml-2 h-4 w-4" />
          إضافة مهمة جديدة
        </Button>
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">البحث</Label>
              <Input 
                placeholder="ابحث في المهام..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">الحالة</Label>
              <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="open">معلق</SelectItem>
                  <SelectItem value="in-progress">قيد العمل</SelectItem>
                  <SelectItem value="done">مكتمل</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">الأولوية</Label>
              <Select value={priorityFilter} onValueChange={(value: any) => setPriorityFilter(value)}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأولويات</SelectItem>
                  <SelectItem value="high">عالية</SelectItem>
                  <SelectItem value="medium">متوسطة</SelectItem>
                  <SelectItem value="low">منخفضة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-5">
          <CardTitle className="text-xl font-semibold">قائمة المهام ({filteredTasks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">لا توجد مهام</p>
            ) : (
              filteredTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-4 p-5 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-base mb-2.5 text-foreground">{task.title}</h4>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="font-medium">المسؤول: {task.owner}</span>
                      {task.dueDate && (
                        <>
                          <span>•</span>
                          <span className="font-medium">الموعد: {task.dueDate}</span>
                        </>
                      )}
                      {task.relatedCase && (
                        <>
                          <span>•</span>
                          <span className="font-medium">القضية: {task.relatedCase}</span>
                        </>
                      )}
                      {task.relatedClient && (
                        <>
                          <span>•</span>
                          <span className="font-medium">العميل: {task.relatedClient}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={`${getPriorityColor(task.priority)} px-3 py-1 text-xs font-medium`} variant="outline">
                      {getPriorityLabel(task.priority)}
                    </Badge>
                    <Select value={task.status} onValueChange={(value: any) => handleStatusChange(task.id, value)}>
                      <SelectTrigger className="h-9 w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">معلق</SelectItem>
                        <SelectItem value="in-progress">قيد العمل</SelectItem>
                        <SelectItem value="done">مكتمل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditTask(task)}
                      className="h-9 w-9"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(task.id, task.title)}
                      className="h-9 w-9 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingTask ? 'تعديل المهمة' : 'إضافة مهمة جديدة'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">العنوان *</Label>
              <Input {...register('title')} className="h-11" />
              {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">القضية المرتبطة</Label>
                <Input {...register('relatedCase')} className="h-11" placeholder="اختياري" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">العميل المرتبط</Label>
                <Input {...register('relatedClient')} className="h-11" placeholder="اختياري" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">تاريخ الاستحقاق</Label>
                <Input {...register('dueDate')} type="date" className="h-11" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">المسؤول *</Label>
                <Input {...register('owner')} className="h-11" />
                {errors.owner && <p className="text-sm text-destructive mt-1">{errors.owner.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">الأولوية *</Label>
                <Select defaultValue="medium" onValueChange={(value: any) => setValue('priority', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفضة</SelectItem>
                    <SelectItem value="medium">متوسطة</SelectItem>
                    <SelectItem value="high">عالية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">الحالة *</Label>
                <Select defaultValue="open" onValueChange={(value: any) => setValue('status', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">معلق</SelectItem>
                    <SelectItem value="in-progress">قيد العمل</SelectItem>
                    <SelectItem value="done">مكتمل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="h-11">
                إلغاء
              </Button>
              <Button type="submit" className="h-11 bg-accent hover:bg-accent/90">
                {editingTask ? 'حفظ التعديلات' : 'إضافة المهمة'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

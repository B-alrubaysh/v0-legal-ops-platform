export interface CaseData {
  id: string
  number: string
  title: string
  clientName: string
  court: string
  status: 'open' | 'closed' | 'on-hold'
  stage: string
  nextSessionDate?: string
  assignedLawyer: string
  type: string
  openDate: string
  description: string
}

export const casesData: CaseData[] = [
  {
    id: 'ق-2025-001',
    number: 'ق-2025-001',
    title: 'نزاع تجاري - عقد توريد',
    clientName: 'شركة النور للتجارة',
    court: 'المحكمة التجارية بالرياض',
    status: 'open',
    stage: 'قيد النظر',
    nextSessionDate: '2025-01-20',
    assignedLawyer: 'أحمد الشمري',
    type: 'تجاري',
    openDate: '2025-01-10',
    description: 'نزاع تجاري يتعلق بعقد توريد بين شركة النور للتجارة وشركة الأمل للمقاولات بقيمة 500,000 ريال سعودي'
  },
  {
    id: 'ق-2025-002',
    number: 'ق-2025-002',
    title: 'قضية أحوال مدنية',
    clientName: 'محمد بن عبدالله',
    court: 'محكمة الأحوال المدنية',
    status: 'open',
    stage: 'مرافعة',
    nextSessionDate: '2025-01-22',
    assignedLawyer: 'فاطمة العلي',
    type: 'مدني',
    openDate: '2024-12-15',
    description: 'قضية تتعلق بنزاع حول ملكية عقار سكني في حي النخيل بالرياض'
  },
  {
    id: 'ق-2024-089',
    number: 'ق-2024-089',
    title: 'نزاع عمالي - مستحقات',
    clientName: 'مؤسسة الأمل',
    court: 'محكمة العمل',
    status: 'open',
    stage: 'تحقيق',
    nextSessionDate: '2025-01-24',
    assignedLawyer: 'خالد المطيري',
    type: 'عمالي',
    openDate: '2024-11-05',
    description: 'نزاع عمالي حول مستحقات نهاية الخدمة لموظف سابق'
  },
  {
    id: 'ق-2025-008',
    number: 'ق-2025-008',
    title: 'قضية أحوال شخصية',
    clientName: 'سارة أحمد',
    court: 'محكمة الأحوال الشخصية',
    status: 'closed',
    stage: 'حكم نهائي',
    nextSessionDate: undefined,
    assignedLawyer: 'نورة السالم',
    type: 'أسري',
    openDate: '2024-10-20',
    description: 'قضية أحوال شخصية تم البت فيها وصدور حكم نهائي'
  },
  {
    id: 'ق-2025-015',
    number: 'ق-2025-015',
    title: 'نزاع تجاري - مقاولات',
    clientName: 'شركة البناء المتقدم',
    court: 'المحكمة التجارية بجدة',
    status: 'on-hold',
    stage: 'معلق',
    nextSessionDate: '2025-02-05',
    assignedLawyer: 'أحمد الشمري',
    type: 'تجاري',
    openDate: '2025-01-08',
    description: 'نزاع تجاري متعلق بعقد مقاولات لمشروع بناء تجاري'
  },
  {
    id: 'ق-2024-156',
    number: 'ق-2024-156',
    title: 'نزاع عمالي - فصل تعسفي',
    clientName: 'عبدالرحمن الخالدي',
    court: 'محكمة العمل',
    status: 'open',
    stage: 'استماع',
    nextSessionDate: '2025-01-28',
    assignedLawyer: 'فاطمة العلي',
    type: 'عمالي',
    openDate: '2024-09-12',
    description: 'قضية فصل تعسفي من العمل والمطالبة بالتعويض'
  },
]

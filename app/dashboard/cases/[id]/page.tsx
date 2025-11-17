import { DashboardLayout } from '@/components/dashboard-layout'
import { CaseDetailsContent } from '@/components/case-details-content'

export default function CaseDetailsPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <CaseDetailsContent caseId={params.id} />
    </DashboardLayout>
  )
}

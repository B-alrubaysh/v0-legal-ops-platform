'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LayoutDashboard, Briefcase, Users, FileText, Calendar, CheckSquare, BookOpen, DollarSign, Settings, Bell, Menu, X, Scale } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { usePathname } from 'next/navigation'

const menuItems = [
  { icon: LayoutDashboard, label: 'لوحة التحكم', href: '/dashboard' },
  { icon: Briefcase, label: 'القضايا', href: '/dashboard/cases', badge: '12' },
  { icon: Users, label: 'العملاء', href: '/dashboard/clients' },
  { icon: FileText, label: 'الوثائق', href: '/dashboard/documents' },
  { icon: Calendar, label: 'التقويم والجلسات', href: '/dashboard/calendar' },
  { icon: CheckSquare, label: 'المهام', href: '/dashboard/tasks', badge: '5' },
  { icon: BookOpen, label: 'قاعدة المعرفة', href: '/dashboard/knowledge' },
  { icon: DollarSign, label: 'المحاسبة', href: '/dashboard/accounting' },
  { icon: Settings, label: 'الإعدادات', href: '/dashboard/settings' },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname?.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-border shadow-sm">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-accent"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <Scale className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground leading-none">منصة العمليات القانونية</h1>
            </div>
          </div>

          <div className="mr-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative hover:bg-accent transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card animate-pulse"></span>
            </Button>
            
            <div className="flex items-center gap-3 pr-4 border-r border-border">
              <Avatar className="h-9 w-9 ring-2 ring-border hover:ring-primary transition-all cursor-pointer">
                <AvatarImage src="/placeholder.svg?height=36&width=36" />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">أح</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold leading-none">أحمد الشمري</p>
                <p className="text-xs text-muted-foreground mt-1.5">محامي أول</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} fixed lg:sticky top-16 right-0 z-40 h-[calc(100vh-4rem)] w-64 border-l border-border bg-sidebar transition-transform duration-300 ease-in-out overflow-y-auto`}>
          <nav className="space-y-1 p-4">
            {menuItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 ${
                    active 
                      ? 'bg-primary text-primary-foreground shadow-sm border-r-4 border-primary' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:translate-x-[-2px]'
                  }`}
                >
                  <item.icon className={`h-5 w-5 flex-shrink-0`} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant={active ? "secondary" : "outline"} className="text-xs px-2 py-0.5 font-semibold">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-[1600px]">
          {children}
        </main>
      </div>
    </div>
  )
}

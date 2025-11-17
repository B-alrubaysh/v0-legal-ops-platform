import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Scale } from 'lucide-react'
import Link from 'next/link'

export function LoginScreen() {
  return (
    <div className="min-h-screen flex">
      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md border-border shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                <Scale className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">تسجيل الدخول</CardTitle>
            <CardDescription className="text-muted-foreground">
              أدخل بيانات حسابك للوصول إلى المنصة
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">البريد الإلكتروني</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="example@law-firm.sa"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">كلمة المرور</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  className="text-right"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                    تذكرني
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  نسيت كلمة المرور؟
                </Link>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              <Link href="/dashboard" className="w-full">
                تسجيل الدخول
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Left Panel - Info */}
      <div className="hidden lg:flex flex-1 bg-primary text-primary-foreground p-12 items-center justify-center">
        <div className="max-w-md space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight text-balance">
              منصة العمليات القانونية
            </h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              نظام متكامل لإدارة القضايا والعملاء والوثائق القانونية بكفاءة عالية
            </p>
          </div>
          <div className="space-y-4 pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">إدارة القضايا بذكاء</h3>
                <p className="text-sm text-primary-foreground/80">
                  تتبع جميع قضاياك ومواعيدها في مكان واحد
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">وثائق آمنة ومنظمة</h3>
                <p className="text-sm text-primary-foreground/80">
                  مكتبة شاملة لجميع مستنداتك القانونية
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">تواصل فعال مع العملاء</h3>
                <p className="text-sm text-primary-foreground/80">
                  منصة متكاملة للتواصل وإدارة العلاقات
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

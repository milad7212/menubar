"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coffee } from "lucide-react"

export default function SignupPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // در آینده منطق ثبت‌نام با Supabase اینجا قرار می‌گیرد
    alert("ثبت‌نام (شبیه‌سازی شده) موفق بود! به صفحه ورود هدایت می‌شوید.")
    window.location.href = "/login"
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2" dir="rtl">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Link href="/landing" className="inline-block mb-4">
              <Coffee className="h-10 w-10 text-amber-600 mx-auto" />
            </Link>
            <h1 className="text-3xl font-bold">ایجاد حساب</h1>
            <p className="text-balance text-muted-foreground">برای شروع مدیریت کافه خود، اطلاعات زیر را وارد کنید</p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cafe-name">نام کافه</Label>
              <Input id="cafe-name" placeholder="کافه آرامش" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">تکرار رمز عبور</Label>
              <Input id="confirm-password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-800">
              ثبت‌نام
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            حساب کاربری دارید؟{" "}
            <Link href="/login" className="underline">
              وارد شوید
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg?width=960&height=1080&text=Cafe+Vibes"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

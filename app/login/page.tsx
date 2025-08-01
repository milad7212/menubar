"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coffee } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50" dir="rtl">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <Link href="/landing" className="inline-block mb-4">
            <Coffee className="h-10 w-10 text-amber-600" />
          </Link>
          <CardTitle className="text-2xl">ورود به حساب کاربری</CardTitle>
          <CardDescription>برای دسترسی به داشبورد خود وارد شوید</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">رمز عبور</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  رمز خود را فراموش کرده‌اید؟
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Link href="/admin/dashboard" className="w-full">
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600">
                ورود
              </Button>
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            حساب کاربری ندارید؟{" "}
            <Link href="/signup" className="underline">
              ثبت‌نام کنید
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

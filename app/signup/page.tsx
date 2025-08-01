"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coffee } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50" dir="rtl">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <Link href="/landing" className="inline-block mb-4">
            <Coffee className="h-10 w-10 text-amber-600" />
          </Link>
          <CardTitle className="text-2xl">ایجاد حساب کاربری</CardTitle>
          <CardDescription>اطلاعات خود را برای ساخت حساب جدید وارد کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">نام</Label>
                <Input id="first-name" placeholder="علی" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">نام خانوادگی</Label>
                <Input id="last-name" placeholder="احمدی" required />
              </div>
            </div>
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
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600">
              ساخت حساب
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            حساب کاربری دارید؟{" "}
            <Link href="/login" className="underline">
              وارد شوید
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

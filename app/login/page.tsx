"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coffee } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2" dir="rtl">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Link href="/landing" className="inline-block mb-4">
              <Coffee className="h-10 w-10 text-amber-600 mx-auto" />
            </Link>
            <h1 className="text-3xl font-bold">ورود</h1>
            <p className="text-balance text-muted-foreground">ایمیل و رمز عبور خود را برای ورود وارد کنید</p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">رمز عبور</Label>
                <Link href="#" className="mr-auto inline-block text-sm underline">
                  فراموشی رمز عبور؟
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Link href="/admin/dashboard">
              <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-800">
                ورود
              </Button>
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            حساب کاربری ندارید؟{" "}
            <Link href="/signup" className="underline">
              ثبت‌نام
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg?width=960&height=1080&text=Modern+Cafe"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

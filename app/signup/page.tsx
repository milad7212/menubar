"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coffee, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // emailRedirectTo is not strictly required for signup,
        // but it's good practice for email confirmation flows.
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      // Supabase sends a confirmation email. You might want to show a message
      // to the user to check their email. For this app, we'll just redirect
      // to a page that tells them to confirm.
      router.push("/confirm-email")
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2" dir="rtl">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Link href="/" className="inline-block mb-4">
              <Coffee className="h-10 w-10 text-amber-600 mx-auto" />
            </Link>
            <h1 className="text-3xl font-bold">ایجاد حساب</h1>
            <p className="text-balance text-muted-foreground">برای شروع مدیریت کافه خود، ایمیل و رمز عبور را وارد کنید</p>
          </div>
          <form onSubmit={handleSignUp} className="grid gap-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>خطا در ثبت‌نام</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "در حال ایجاد حساب..." : "ایجاد حساب"}
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

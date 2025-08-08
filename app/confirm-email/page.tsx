import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MailCheck } from "lucide-react"

export default function ConfirmEmailPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50" dir="rtl">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <MailCheck className="mx-auto h-12 w-12 text-green-500" />
          <CardTitle className="mt-4 text-2xl">ایمیل خود را تأیید کنید</CardTitle>
          <CardDescription>
            یک لینک تأیید به آدرس ایمیل شما ارسال شده است. لطفاً برای فعال‌سازی حساب خود، روی آن کلیک کنید.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            اگر ایمیلی دریافت نکرده‌اید، پوشه اسپم خود را بررسی کنید.
          </p>
          <Button asChild>
            <Link href="/login">بازگشت به صفحه ورود</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

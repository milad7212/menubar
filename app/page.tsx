"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Coffee, Smartphone, QrCode, BarChart3, Star, ArrowLeft } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Coffee className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">منوی دیجیتال</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost">ورود</Button>
            </Link>
            <Link href="/signup">
              <Button>شروع رایگان</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="py-24 md:py-32 text-center">
          <div className="container mx-auto px-6">
            <Badge variant="secondary" className="mb-4">
              راه حل مدرن برای کافه و رستوران‌ها
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              منوی خود را به سطح جدیدی ببرید
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              با پلتفرم ما، به سادگی منوی دیجیتال و تعاملی بسازید، آن را با QR کد به اشتراک بگذارید و سفارشات خود را هوشمندانه مدیریت کنید.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
                <Button size="lg">
                  رایگان شروع کنید <ArrowLeft className="h-5 w-5 mr-2" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  آشنایی با امکانات
                </Button>
              </Link>
            </div>
            <div className="mt-16 rounded-2xl border bg-card/50 shadow-lg max-w-5xl mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&h=600&fit=crop"
                alt="پیش‌نمایش داشبورد"
                width={1200}
                height={600}
                className="rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-secondary/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">هر آنچه برای مدیریت نیاز دارید</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                از ساخت منو تا تحلیل فروش، ما همه چیز را برای شما فراهم کرده‌ایم.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-card rounded-2xl border">
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Smartphone className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">منوی آنلاین و زیبا</h3>
                <p className="text-muted-foreground text-center">
                  منوی خود را با تصاویر جذاب و دسته‌بندی‌های دلخواه ایجاد کنید و آن را با تم‌های مختلف شخصی‌سازی کنید.
                </p>
              </div>
              <div className="p-8 bg-card rounded-2xl border">
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <QrCode className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">اشتراک‌گذاری با QR کد</h3>
                <p className="text-muted-foreground text-center">
                  برای هر میز یک QR کد اختصاصی تولید کنید تا مشتریان به سادگی با اسکن آن به منوی شما دسترسی پیدا کنند.
                </p>
              </div>
              <div className="p-8 bg-card rounded-2xl border">
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">مدیریت هوشمند سفارشات</h3>
                <p className="text-muted-foreground text-center">
                  سفارشات را به صورت آنلاین دریافت و مدیریت کنید، وضعیت آن‌ها را تغییر دهید و آمار فروش خود را تحلیل کنید.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">کافه‌هایی که به ما اعتماد کردند</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardHeader className="p-0">
                  <div className="flex items-center mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=48&h=48&fit=crop"
                      alt="کاربر"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="mr-4">
                      <p className="font-bold">کافه کلاسیک</p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground">
                    "استفاده از این سیستم بهترین تصمیمی بود که برای کافه‌ام گرفتم. به‌روزرسانی منو هیچ‌وقت اینقدر ساده نبوده!"
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardHeader className="p-0">
                  <div className="flex items-center mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=48&h=48&fit=crop"
                      alt="کاربر"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="mr-4">
                      <p className="font-bold">رستوران مدرن</p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground">
                    "مدیریت سفارشات ما خیلی بهینه‌تر شده و مشتریان از منوی دیجیتال و تعاملی بسیار راضی هستند."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-secondary/50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">کسب‌وکار خود را متحول کنید</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              همین امروز به جمع ما بپیوندید و از امکانات بی‌نظیر منوی دیجیتال بهره‌مند شوید.
            </p>
            <Link href="/signup">
              <Button size="lg">ثبت‌نام و ساخت منوی رایگان</Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-6 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} منوی دیجیتال. تمام حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  )
}

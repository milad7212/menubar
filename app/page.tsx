"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Coffee, Smartphone, QrCode, BarChart3, Star, ArrowLeft } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Coffee className="h-8 w-8 text-amber-600" />
            <span className="text-xl font-bold">منوی دیجیتال</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost">ورود</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-amber-500 hover:bg-amber-600">ثبت‌نام رایگان</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="py-20 text-center bg-amber-50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              منوی کافه خود را <span className="text-amber-600">دیجیتال</span> کنید
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              به راحتی منوی دیجیتال و تعاملی برای کافه یا رستوران خود بسازید، آن را با QR کد به اشتراک بگذارید و سفارشات خود را هوشمندانه مدیریت کنید.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
                  شروع کنید <ArrowLeft className="h-5 w-5 mr-2" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="bg-transparent">
                  امکانات
                </Button>
              </Link>
            </div>
            <div className="mt-12">
              <Image
                src="/placeholder.svg?width=800&height=450&text=Dashboard+Preview"
                alt="پیش‌نمایش داشبورد"
                width={800}
                height={450}
                className="rounded-lg shadow-xl mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">چرا منوی دیجیتال؟</h2>
              <p className="text-gray-600 mt-2">امکاناتی که کسب‌وکار شما را متحول می‌کند</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                    <Smartphone className="h-8 w-8 text-amber-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">منوی آنلاین و زیبا</h3>
                <p className="text-gray-600">
                  منوی خود را با تصاویر جذاب و دسته‌بندی‌های دلخواه ایجاد کنید و آن را با تم‌های مختلف شخصی‌سازی کنید.
                </p>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                    <QrCode className="h-8 w-8 text-amber-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">اشتراک‌گذاری با QR کد</h3>
                <p className="text-gray-600">
                  برای هر میز یک QR کد اختصاصی تولید کنید تا مشتریان به سادگی با اسکن آن به منوی شما دسترسی پیدا کنند.
                </p>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-amber-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">مدیریت هوشمند سفارشات</h3>
                <p className="text-gray-600">
                  سفارشات را به صورت آنلاین دریافت و مدیریت کنید، وضعیت آن‌ها را تغییر دهید و آمار فروش خود را تحلیل کنید.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">صدای مشتریان ما</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="کاربر"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="mr-4">
                    <p className="font-bold">کافه کلاسیک</p>
                    <div className="flex text-yellow-400">
                      <Star className="h-5 w-5" />
                      <Star className="h-5 w-5" />
                      <Star className="h-5 w-5" />
                      <Star className="h-5 w-5" />
                      <Star className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "استفاده از این سیستم بهترین تصمیمی بود که برای کافه‌ام گرفتم. به‌روزرسانی منو هیچ‌وقت اینقدر ساده نبوده!"
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="کاربر"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="mr-4">
                    <p className="font-bold">رستوران مدرن</p>
                    <div className="flex text-yellow-400">
                      <Star className="h-5 w-5" />
                      <Star className="h-5 w-5" />
                      <Star className="h-5 w-5" />
                      <Star className="h-5 w-5" />
                      <Star className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "مدیریت سفارشات ما خیلی بهینه‌تر شده و مشتریان از منوی دیجیتال و تعاملی بسیار راضی هستند."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">آماده‌اید کسب‌وکار خود را متحول کنید؟</h2>
            <p className="text-gray-600 mb-8">همین امروز به جمع ما بپیوندید و از امکانات بی‌نظیر منوی دیجیتال بهره‌مند شوید.</p>
            <Link href="/signup">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
                رایگان شروع کنید
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} منوی دیجیتال. تمام حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  )
}

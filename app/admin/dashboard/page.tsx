"use client"
import { Coffee, ArrowLeft, BarChart3, ShoppingBag, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { OrderManagement } from "@/components/order-management"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { QRGenerator } from "@/components/qr-generator"

const cafeInfo = {
  name: "کافه آرامش",
  description: "بهترین قهوه و غذاهای خوشمزه در شهر",
  selectedTheme: "classic",
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <Coffee className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">داشبورد مدیریت</h1>
                <p className="text-sm text-gray-600">مدیریت کامل کافه</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="sm:hidden">
                <QRGenerator cafeInfo={cafeInfo} />
              </div>
              <div className="hidden sm:flex">
                <QRGenerator cafeInfo={cafeInfo} />
                <Link href="/menu-builder">
                  <Button variant="outline" className="text-xs sm:text-sm">
                    ویرایش منو
                  </Button>
                </Link>
              </div>
              <Link href="/">
                <Button variant="ghost" size="icon" className="w-8 h-8 sm:w-9 sm:h-9">
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="qr">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">QR کد و اشتراک‌گذاری منو</h2>
                <p className="text-gray-600">منوی دیجیتال خود را با مشتریان به اشتراک بگذارید</p>
              </div>

              <div className="flex justify-center">
                <QRGenerator cafeInfo={cafeInfo} />
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3">مزایای منوی دیجیتال</h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• کاهش هزینه چاپ منو</li>
                    <li>• بروزرسانی آسان قیمت‌ها</li>
                    <li>• تجربه بهتر مشتری</li>
                    <li>• کاهش تماس فیزیکی</li>
                  </ul>
                </div>

                <div className="p-6 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-3">نحوه استفاده</h3>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li>• QR کد را چاپ کنید</li>
                    <li>• روی میزها قرار دهید</li>
                    <li>• مشتریان با موبایل اسکن کنند</li>
                    <li>• منو فوراً نمایش داده می‌شود</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="container mx-auto px-4 py-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">مدیریت سفارشات</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">آمار و گزارشات</span>
            </TabsTrigger>
            <TabsTrigger value="qr" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">QR کد و اشتراک‌گذاری</span>
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
    </div>
  )
}

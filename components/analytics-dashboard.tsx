"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  averageOrderValue: number
  customerCount: number
  popularItems: Array<{
    id: number
    name: string
    orders: number
    revenue: number
    trend: "up" | "down" | "stable"
  }>
  revenueByDay: Array<{
    day: string
    revenue: number
    orders: number
  }>
  categoryPerformance: Array<{
    category: string
    revenue: number
    percentage: number
  }>
}

const mockAnalytics: AnalyticsData = {
  totalRevenue: 15750000,
  totalOrders: 342,
  averageOrderValue: 46052,
  customerCount: 156,
  popularItems: [
    { id: 1, name: "اسپرسو کلاسیک", orders: 89, revenue: 4005000, trend: "up" },
    { id: 2, name: "کاپوچینو دلوکس", orders: 67, revenue: 4355000, trend: "up" },
    { id: 3, name: "آیس کافه ویژه", orders: 54, revenue: 2970000, trend: "stable" },
    { id: 4, name: "ساندویچ کلاب", orders: 43, revenue: 5160000, trend: "down" },
    { id: 5, name: "تیرامیسو", orders: 38, revenue: 3230000, trend: "up" },
  ],
  revenueByDay: [
    { day: "شنبه", revenue: 2100000, orders: 45 },
    { day: "یکشنبه", revenue: 1850000, orders: 38 },
    { day: "دوشنبه", revenue: 2300000, orders: 52 },
    { day: "سه‌شنبه", revenue: 2650000, orders: 61 },
    { day: "چهارشنبه", revenue: 2200000, orders: 48 },
    { day: "پنج‌شنبه", revenue: 2800000, orders: 59 },
    { day: "جمعه", revenue: 1850000, orders: 39 },
  ],
  categoryPerformance: [
    { category: "نوشیدنی‌های گرم", revenue: 8360000, percentage: 53 },
    { category: "غذاهای اصلی", revenue: 5160000, percentage: 33 },
    { category: "نوشیدنی‌های سرد", revenue: 1230000, percentage: 8 },
    { category: "دسرها", revenue: 1000000, percentage: 6 },
  ],
}

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("week")
  const [analytics] = useState<AnalyticsData>(mockAnalytics)

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("fa-IR") + " تومان"
  }

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">آمار و گزارشات</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">امروز</SelectItem>
            <SelectItem value="week">این هفته</SelectItem>
            <SelectItem value="month">این ماه</SelectItem>
            <SelectItem value="year">امسال</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل فروش</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> نسبت به هفته قبل
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تعداد سفارشات</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> نسبت به هفته قبل
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">میانگین سفارش</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics.averageOrderValue)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3.8%</span> نسبت به هفته قبل
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تعداد مشتریان</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.customerCount}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.3%</span> نسبت به هفته قبل
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="popular">محصولات محبوب</TabsTrigger>
          <TabsTrigger value="revenue">فروش روزانه</TabsTrigger>
          <TabsTrigger value="categories">عملکرد دسته‌بندی‌ها</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>محبوب‌ترین محصولات</CardTitle>
              <CardDescription>بر اساس تعداد سفارش و میزان فروش</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.popularItems.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.orders} سفارش</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{formatCurrency(item.revenue)}</span>
                        {getTrendIcon(item.trend)}
                      </div>
                      <p className={`text-sm ${getTrendColor(item.trend)}`}>
                        {item.trend === "up" ? "رو به رشد" : item.trend === "down" ? "کاهشی" : "ثابت"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>فروش روزانه</CardTitle>
              <CardDescription>فروش و تعداد سفارشات در هفته جاری</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.revenueByDay.map((day) => (
                  <div key={day.day} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{day.day}</h4>
                      <p className="text-sm text-gray-600">{day.orders} سفارش</p>
                    </div>
                    <div className="text-left">
                      <span className="font-bold text-lg">{formatCurrency(day.revenue)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>عملکرد دسته‌بندی‌ها</CardTitle>
              <CardDescription>سهم هر دسته‌بندی از کل فروش</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.categoryPerformance.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.category}</span>
                      <div className="text-left">
                        <span className="font-bold">{formatCurrency(category.revenue)}</span>
                        <span className="text-sm text-gray-600 mr-2">({category.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

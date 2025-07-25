"use client"

import { useState } from "react"
import { Coffee, ShoppingCart, Heart, Star, Plus, Clock, MapPin, ArrowLeft, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"

// Mock data
const cafeInfo = {
  name: "کافه آرامش",
  description: "بهترین قهوه و غذاهای خوشمزه در شهر",
  address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
  hours: "۸:۰۰ - ۲۳:۰۰",
  logo: "",
  rating: 4.8,
  reviewCount: 1250,
}

const customerThemes = {
  classic: {
    name: "کلاسیک",
    colors: {
      primary: "#8B4513",
      secondary: "#D2691E",
      background: "from-amber-50 to-orange-100",
      card: "bg-white",
      text: "text-gray-900",
    },
  },
  modern: {
    name: "مدرن",
    colors: {
      primary: "#2563eb",
      secondary: "#1d4ed8",
      background: "from-slate-50 to-blue-100",
      card: "bg-white/80 backdrop-blur-sm",
      text: "text-slate-900",
    },
  },
  elegant: {
    name: "شیک",
    colors: {
      primary: "#7c3aed",
      secondary: "#5b21b6",
      background: "from-purple-50 to-indigo-100",
      card: "bg-white/90 backdrop-blur-md",
      text: "text-purple-900",
    },
  },
  nature: {
    name: "طبیعی",
    colors: {
      primary: "#059669",
      secondary: "#047857",
      background: "from-green-50 to-emerald-100",
      card: "bg-white/85",
      text: "text-green-900",
    },
  },
  dark: {
    name: "تیره",
    colors: {
      primary: "#f59e0b",
      secondary: "#d97706",
      background: "from-gray-900 to-gray-800",
      card: "bg-gray-800/80 backdrop-blur-sm",
      text: "text-white",
    },
  },
  warm: {
    name: "گرم",
    colors: {
      primary: "#dc2626",
      secondary: "#b91c1c",
      background: "from-red-50 to-pink-100",
      card: "bg-white/90",
      text: "text-red-900",
    },
  },
  "3d-luxury": {
    name: "سه‌بعدی لوکس",
    colors: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      background: "from-slate-900 via-purple-900 to-slate-900",
      card: "bg-white/10 backdrop-blur-xl border border-white/20",
      text: "text-white",
    },
  },
}

const categories = [
  {
    id: 1,
    name: "نوشیدنی‌های گرم",
    description: "قهوه‌ها و نوشیدنی‌های گرم",
    icon: "☕",
  },
  {
    id: 2,
    name: "نوشیدنی‌های سرد",
    description: "نوشیدنی‌های خنک و منعش",
    icon: "🧊",
  },
  {
    id: 3,
    name: "غذاهای اصلی",
    description: "غذاهای اصلی و ساندویچ‌ها",
    icon: "🍽️",
  },
]

const sampleMenuItems = [
  {
    id: 1,
    categoryId: 1,
    name: "اسپرسو کلاسیک",
    description: "قهوه خالص و قوی با طعم بی‌نظیر",
    price: 45000,
    originalPrice: 55000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviewCount: 234,
    likes: 156,
    prepTime: "۲-۳ دقیقه",
    isPopular: true,
  },
  {
    id: 2,
    categoryId: 1,
    name: "کاپوچینو دلوکس",
    description: "قهوه با شیر بخارپز و فوم ابریشمی",
    price: 65000,
    originalPrice: 75000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviewCount: 189,
    likes: 203,
    prepTime: "۴-۵ دقیقه",
    isPopular: false,
  },
  {
    id: 3,
    categoryId: 2,
    name: "آیس کافه ویژه",
    description: "قهوه سرد منعش با یخ و کرم",
    price: 55000,
    originalPrice: 65000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviewCount: 145,
    likes: 98,
    prepTime: "۳-۴ دقیقه",
    isPopular: true,
  },
  {
    id: 4,
    categoryId: 3,
    name: "ساندویچ کلاب ممتاز",
    description: "ساندویچ مرغ با سبزیجات تازه و سس مخصوص",
    price: 120000,
    originalPrice: 140000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviewCount: 312,
    likes: 267,
    prepTime: "۸-۱۰ دقیقه",
    isPopular: true,
  },
]

export default function ThemePreviewPage() {
  const [selectedTheme, setSelectedTheme] = useState("classic")
  const [cart, setCart] = useState<any[]>([])

  const theme = customerThemes[selectedTheme as keyof typeof customerThemes]
  const is3DTheme = selectedTheme === "3d-luxury"

  const addToCart = (item: any) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div
      className={`min-h-screen ${is3DTheme ? "theme-3d-luxury" : `bg-gradient-to-br ${theme.colors.background}`}`}
      dir="rtl"
    >
      {/* Theme Selector Header */}
      <div
        className={`sticky top-0 z-50 ${is3DTheme ? "glass-morphism" : "bg-white/95 backdrop-blur-md"} shadow-sm border-b ${is3DTheme ? "border-white/20" : ""}`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/menu-builder">
                <Button
                  variant="outline"
                  size="sm"
                  className={is3DTheme ? "glass-morphism text-white border-white/30 hover:bg-white/20" : ""}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  بازگشت
                </Button>
              </Link>

              <div className="flex items-center gap-2">
                <Palette className={`h-5 w-5 ${is3DTheme ? "text-white" : "text-gray-600"}`} />
                <span className={`font-medium ${is3DTheme ? "text-white" : ""}`}>انتخاب تم:</span>
                <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                  <SelectTrigger className={`w-40 ${is3DTheme ? "glass-morphism text-white border-white/30" : ""}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(customerThemes).map(([key, theme]) => (
                      <SelectItem key={key} value={key}>
                        {theme.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Badge
              variant="secondary"
              className={`${is3DTheme ? "glass-morphism text-white border-white/30" : "bg-blue-100 text-blue-800"}`}
            >
              حالت پیش‌نمایش تم‌ها
            </Badge>
          </div>
        </div>
      </div>

      {/* Menu Header */}
      <header
        className={`${is3DTheme ? "glass-morphism" : "bg-white/95 backdrop-blur-md"} shadow-sm border-b ${is3DTheme ? "border-white/20" : ""}`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${is3DTheme ? "neon-glow floating-element" : ""}`}
                style={{ backgroundColor: theme.colors.primary }}
              >
                <Coffee className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${is3DTheme ? "text-white glow-text" : "text-gray-900"}`}>
                  {cafeInfo.name}
                </h1>
                <div className={`flex items-center gap-1 text-sm ${is3DTheme ? "text-white/80" : "text-gray-600"}`}>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{cafeInfo.rating}</span>
                  <span>({cafeInfo.reviewCount.toLocaleString("fa-IR")} نظر)</span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className={`relative ${is3DTheme ? "glass-morphism text-white border-white/30 hover:bg-white/20" : "bg-transparent"}`}
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <Badge
                  className={`absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs ${is3DTheme ? "neon-glow" : ""}`}
                >
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>

          <div className={`mt-4 flex flex-wrap gap-4 text-sm ${is3DTheme ? "text-white/70" : "text-gray-600"}`}>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{cafeInfo.address}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>ساعات کاری: {cafeInfo.hours}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Theme Info Banner */}
      <div className={`${is3DTheme ? "glass-morphism" : "bg-blue-50"} border-b ${is3DTheme ? "border-white/20" : ""}`}>
        <div className="container mx-auto px-4 py-3">
          <div className={`flex items-center justify-center gap-2 ${is3DTheme ? "text-white" : "text-blue-800"}`}>
            <div
              className={`w-4 h-4 rounded-full border-2 ${is3DTheme ? "border-white/30 pulse-glow" : "border-blue-200"}`}
              style={{ backgroundColor: theme.colors.primary }}
            />
            <span className={`font-medium ${is3DTheme ? "text-gradient" : ""}`}>در حال مشاهده تم: {theme.name}</span>
            <div
              className={`w-4 h-4 rounded-full border-2 ${is3DTheme ? "border-white/30 pulse-glow" : "border-blue-200"}`}
              style={{ backgroundColor: theme.colors.secondary }}
            />
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <section
              key={category.id}
              className={is3DTheme ? "floating-element" : ""}
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className={`text-3xl ${is3DTheme ? "floating-element" : ""}`}>{category.icon}</span>
                  <h2 className={`text-2xl font-bold ${theme.colors.text} ${is3DTheme ? "glow-text" : ""}`}>
                    {category.name}
                  </h2>
                </div>
                <p className={`${theme.colors.text} ${is3DTheme ? "text-white/80" : "opacity-80"}`}>
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sampleMenuItems
                  .filter((item) => item.categoryId === category.id)
                  .map((item, itemIndex) => (
                    <Card
                      key={item.id}
                      className={`overflow-hidden transition-all duration-300 border-0 shadow-md ${
                        is3DTheme ? "card-3d holographic" : `hover:shadow-lg ${theme.colors.card}`
                      }`}
                      style={{ animationDelay: `${itemIndex * 0.1}s` }}
                    >
                      <div className="relative">
                        <div className="aspect-square relative overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className={`object-cover transition-transform duration-500 ${is3DTheme ? "hover:scale-110" : ""}`}
                          />
                          {item.originalPrice > item.price && (
                            <Badge className={`absolute top-2 right-2 bg-red-500 ${is3DTheme ? "neon-glow" : ""}`}>
                              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% تخفیف
                            </Badge>
                          )}
                          {item.isPopular && (
                            <Badge
                              className={`absolute top-2 left-2 ${is3DTheme ? "neon-glow" : ""}`}
                              style={{ backgroundColor: theme.colors.secondary }}
                            >
                              محبوب
                            </Badge>
                          )}
                          {is3DTheme && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          )}
                        </div>

                        <CardContent className={`p-4 card-content ${is3DTheme ? "relative z-10" : ""}`}>
                          <div className="flex justify-between items-start mb-2">
                            <h3
                              className={`font-bold text-lg leading-tight ${theme.colors.text} ${is3DTheme ? "glow-text" : ""}`}
                            >
                              {item.name}
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`p-1 h-8 w-8 ${is3DTheme ? "hover:bg-white/20" : ""}`}
                            >
                              <Heart
                                className={`h-5 w-5 ${is3DTheme ? "text-white/70 hover:text-pink-400" : "text-gray-400"}`}
                              />
                            </Button>
                          </div>

                          <p
                            className={`text-sm mb-3 line-clamp-2 ${theme.colors.text} ${is3DTheme ? "text-white/70" : "opacity-70"}`}
                          >
                            {item.description}
                          </p>

                          <div
                            className={`flex items-center gap-2 mb-3 ${theme.colors.text} ${is3DTheme ? "text-white/80" : "opacity-80"}`}
                          >
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{item.rating}</span>
                            </div>
                            <span className={is3DTheme ? "text-white/40" : "text-gray-400"}>•</span>
                            <span className="text-sm">{item.reviewCount} نظر</span>
                            <span className={is3DTheme ? "text-white/40" : "text-gray-400"}>•</span>
                            <span className="text-sm">{item.prepTime}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {item.originalPrice > item.price && (
                                <span
                                  className={`text-sm line-through ${theme.colors.text} ${is3DTheme ? "text-white/50" : "opacity-50"}`}
                                >
                                  {item.originalPrice.toLocaleString("fa-IR")}
                                </span>
                              )}
                              <span
                                className={`font-bold text-lg ${is3DTheme ? "text-gradient" : ""}`}
                                style={!is3DTheme ? { color: theme.colors.primary } : {}}
                              >
                                {item.price.toLocaleString("fa-IR")} تومان
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className={
                                  is3DTheme ? "glass-morphism text-white border-white/30 hover:bg-white/20" : ""
                                }
                              >
                                جزئیات
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => addToCart(item)}
                                className={`hover:opacity-90 ${is3DTheme ? "neon-glow text-white" : ""}`}
                                style={
                                  !is3DTheme
                                    ? { backgroundColor: theme.colors.primary }
                                    : { background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }
                                }
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                افزودن
                              </Button>
                            </div>
                          </div>

                          <div
                            className={`flex items-center justify-between mt-3 pt-3 border-t ${theme.colors.text} ${
                              is3DTheme ? "border-white/20 text-white/60" : "opacity-60"
                            }`}
                          >
                            <div className="flex items-center gap-1 text-sm">
                              <Heart className="h-4 w-4" />
                              <span>{item.likes}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`text-sm p-1 ${is3DTheme ? "hover:bg-white/20 text-white/70" : ""}`}
                            >
                              نظرات
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Fixed Theme Selector */}
      <div
        className={`fixed bottom-4 left-4 rounded-lg shadow-lg p-3 border ${is3DTheme ? "glass-morphism border-white/20" : "bg-white"}`}
      >
        <div className={`flex items-center gap-2 text-sm ${is3DTheme ? "text-white" : ""}`}>
          <Palette className="h-4 w-4" />
          <span>تغییر تم:</span>
          <Select value={selectedTheme} onValueChange={setSelectedTheme}>
            <SelectTrigger className={`w-32 h-8 ${is3DTheme ? "glass-morphism text-white border-white/30" : ""}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(customerThemes).map(([key, theme]) => (
                <SelectItem key={key} value={key}>
                  {theme.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Coffee, ShoppingCart, Heart, MessageCircle, Star, Plus, Minus, Clock, MapPin, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import Image from "next/image"

// Mock data - این داده‌ها از سازنده منو می‌آیند
const cafeInfo = {
  name: "کافه آرامش",
  description: "بهترین قهوه و غذاهای خوشمزه در شهر",
  address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
  phone: "۰۲۱-۱۲۳۴۵۶۷۸",
  hours: "۸:۰۰ - ۲۳:۰۰",
  logo: "",
  selectedTheme: "classic", // This comes from menu builder
  rating: 4.8,
  reviewCount: 1250,
}

const customerThemes = {
  classic: {
    colors: {
      primary: "#8B4513",
      secondary: "#D2691E",
      background: "from-amber-50 to-orange-100",
      card: "bg-white",
      text: "text-gray-900",
    },
  },
  modern: {
    colors: {
      primary: "#2563eb",
      secondary: "#1d4ed8",
      background: "from-slate-50 to-blue-100",
      card: "bg-white/80 backdrop-blur-sm",
      text: "text-slate-900",
    },
  },
  elegant: {
    colors: {
      primary: "#7c3aed",
      secondary: "#5b21b6",
      background: "from-purple-50 to-indigo-100",
      card: "bg-white/90 backdrop-blur-md",
      text: "text-purple-900",
    },
  },
  nature: {
    colors: {
      primary: "#059669",
      secondary: "#047857",
      background: "from-green-50 to-emerald-100",
      card: "bg-white/85",
      text: "text-green-900",
    },
  },
  dark: {
    colors: {
      primary: "#f59e0b",
      secondary: "#d97706",
      background: "from-gray-900 to-gray-800",
      card: "bg-gray-800/80 backdrop-blur-sm",
      text: "text-white",
    },
  },
  warm: {
    colors: {
      primary: "#dc2626",
      secondary: "#b91c1c",
      background: "from-red-50 to-pink-100",
      card: "bg-white/90",
      text: "text-red-900",
    },
  },
  "3d-luxury": {
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
    isVisible: true,
  },
  {
    id: 2,
    name: "نوشیدنی‌های سرد",
    description: "نوشیدنی‌های خنک و منعش",
    icon: "🧊",
    isVisible: true,
  },
  {
    id: 3,
    name: "غذاهای اصلی",
    description: "غذاهای اصلی و ساندویچ‌ها",
    icon: "🍽️",
    isVisible: true,
  },
  {
    id: 4,
    name: "دسرها",
    description: "دسرهای خوشمزه",
    icon: "🍰",
    isVisible: true,
  },
]

const menuItems = [
  {
    id: 1,
    categoryId: 1,
    name: "اسپرسو کلاسیک",
    description: "قهوه خالص و قوی با طعم بی‌نظیر",
    fullDescription:
      "اسپرسو کلاسیک ما از بهترین دانه‌های قهوه آرابیکا تهیه می‌شود. این قهوه با روش سنتی ایتالیایی دم‌آوری شده و طعم غنی و عمیقی دارد که عاشقان قهوه را مجذوب خود می‌کند.",
    price: 45000,
    originalPrice: 55000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviewCount: 234,
    likes: 156,
    isLiked: false,
    ingredients: ["قهوه آرابیکا", "آب خالص"],
    calories: 5,
    prepTime: "۲-۳ دقیقه",
    isPopular: true,
    isAvailable: true,
  },
  {
    id: 2,
    categoryId: 1,
    name: "کاپوچینو دلوکس",
    description: "قهوه با شیر بخارپز و فوم ابریشمی",
    fullDescription:
      "کاپوچینو دلوکس ما ترکیبی عالی از اسپرسو قوی و شیر بخارپز شده است. فوم ابریشمی روی آن و پودر کاکائو باعث می‌شود تا تجربه‌ای فراموش‌نشدنی داشته باشید.",
    price: 65000,
    originalPrice: 75000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviewCount: 189,
    likes: 203,
    isLiked: true,
    ingredients: ["اسپرسو", "شیر تازه", "فوم شیر", "پودر کاکائو"],
    calories: 120,
    prepTime: "۴-۵ دقیقه",
    isPopular: false,
    isAvailable: true,
  },
  {
    id: 3,
    categoryId: 2,
    name: "آیس کافه ویژه",
    description: "قهوه سرد منعش با یخ و کرم",
    fullDescription:
      "آیس کافه ویژه ما برای روزهای گرم تابستان طراحی شده است. ترکیب قهوه قوی، یخ، شیر سرد و کرم چنتی باعث می‌شود تا انرژی و طراوت را به شما برگرداند.",
    price: 55000,
    originalPrice: 65000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviewCount: 145,
    likes: 98,
    isLiked: false,
    ingredients: ["قهوه سرد", "یخ", "شیر", "کرم چنتی", "شربت وانیل"],
    calories: 180,
    prepTime: "۳-۴ دقیقه",
    isPopular: true,
    isAvailable: true,
  },
  {
    id: 4,
    categoryId: 3,
    name: "ساندویچ کلاب ممتاز",
    description: "ساندویچ مرغ با سبزیجات تازه و سس مخصوص",
    fullDescription:
      "ساندویچ کلاب ممتاز ما با مرغ گریل شده، کاهو تازه، گوجه، خیار، پنیر چدار و سس مخصوص کافه تهیه می‌شود. نان تست شده و مواد اولیه تازه باعث طعم فوق‌العاده‌ای می‌شود.",
    price: 120000,
    originalPrice: 140000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviewCount: 312,
    likes: 267,
    isLiked: true,
    ingredients: ["مرغ گریل", "نان تست", "کاهو", "گوجه", "خیار", "پنیر چدار", "سس مخصوص"],
    calories: 450,
    prepTime: "۸-۱۰ دقیقه",
    isPopular: true,
    isAvailable: true,
  },
  {
    id: 5,
    categoryId: 4,
    name: "تیرامیسو خانگی",
    description: "دسر ایتالیایی با قهوه و ماسکارپونه",
    fullDescription:
      "تیرامیسو خانگی ما با دستور اصیل ایتالیایی تهیه می‌شود. لایه‌های نرم بیسکویت آغشته به قهوه، کرم ماسکارپونه و پودر کاکائو طعمی بی‌نظیر ایجاد می‌کند.",
    price: 85000,
    originalPrice: 95000,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviewCount: 198,
    likes: 234,
    isLiked: false,
    ingredients: ["بیسکویت لیدی فینگر", "قهوه اسپرسو", "ماسکارپونه", "تخم مرغ", "شکر", "کاکائو"],
    calories: 320,
    prepTime: "تهیه شده",
    isPopular: true,
    isAvailable: true,
  },
]

const comments = [
  {
    id: 1,
    itemId: 1,
    user: "علی احمدی",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment: "واقعا عالی بود! طعم فوق‌العاده‌ای داشت",
    date: "۲ روز پیش",
    likes: 12,
  },
  {
    id: 2,
    itemId: 1,
    user: "مریم کریمی",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    comment: "قهوه خوبی بود ولی کمی تلخ",
    date: "۱ هفته پیش",
    likes: 8,
  },
]

export default function CustomerMenuPage() {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [cart, setCart] = useState<any[]>([])
  const [likedItems, setLikedItems] = useState<number[]>([2, 4])
  const [newComment, setNewComment] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("همه")

  const theme = customerThemes[cafeInfo.selectedTheme as keyof typeof customerThemes] || customerThemes.classic

  const categoryList = ["همه", ...categories.filter((cat) => cat.isVisible).map((cat) => cat.name)]

  const addToCart = (item: any, quantity = 1) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem,
        ),
      )
    } else {
      setCart([...cart, { ...item, quantity }])
    }
  }

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  const updateCartQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
    }
  }

  const toggleLike = (itemId: number) => {
    if (likedItems.includes(itemId)) {
      setLikedItems(likedItems.filter((id) => id !== itemId))
    } else {
      setLikedItems([...likedItems, itemId])
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const filteredItems =
    selectedCategory === "همه"
      ? menuItems.filter((item) => item.isAvailable)
      : menuItems.filter((item) => {
          const category = categories.find((cat) => cat.name === selectedCategory)
          return category && item.categoryId === category.id && item.isAvailable
        })

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.colors.background}`} dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {cafeInfo.logo ? (
                <Image
                  src={cafeInfo.logo || "/placeholder.svg"}
                  alt="لوگو"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  <Coffee className="h-6 w-6 text-white" />
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold text-gray-900">{cafeInfo.name}</h1>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{cafeInfo.rating}</span>
                  <span>({cafeInfo.reviewCount.toLocaleString("fa-IR")} نظر)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative bg-transparent">
                    <ShoppingCart className="h-5 w-5" />
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>سبد خرید</SheetTitle>
                    <SheetDescription>{getTotalItems()} آیتم در سبد شما</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">سبد خرید شما خالی است</p>
                    ) : (
                      <>
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={60}
                              height={60}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1 text-right">
                              <h4 className="font-medium text-sm">{item.name}</h4>
                              <p className="text-green-600 font-bold text-sm">
                                {item.price.toLocaleString("fa-IR")} تومان
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-bold">مجموع:</span>
                            <span className="font-bold text-lg text-green-600">
                              {getTotalPrice().toLocaleString("fa-IR")} تومان
                            </span>
                          </div>
                          <Button className="w-full" size="lg">
                            تکمیل سفارش
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/menu-builder">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
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

      {/* Categories */}
      <div className="sticky top-[89px] z-40 bg-white/95 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categoryList.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setSelectedCategory(category)}
                style={
                  selectedCategory === category
                    ? { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }
                    : {}
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className={`overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md ${theme.colors.card}`}
            >
              <div className="relative">
                <div className="aspect-square relative">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  {item.originalPrice > item.price && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% تخفیف
                    </Badge>
                  )}
                  {item.isPopular && (
                    <Badge className="absolute top-2 left-2" style={{ backgroundColor: theme.colors.secondary }}>
                      محبوب
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold text-lg leading-tight ${theme.colors.text}`}>{item.name}</h3>
                    <Button variant="ghost" size="sm" className="p-1 h-8 w-8" onClick={() => toggleLike(item.id)}>
                      <Heart
                        className={`h-5 w-5 ${
                          likedItems.includes(item.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                        }`}
                      />
                    </Button>
                  </div>

                  <p className={`text-sm mb-3 line-clamp-2 ${theme.colors.text} opacity-70`}>{item.description}</p>

                  <div className={`flex items-center gap-2 mb-3 ${theme.colors.text} opacity-80`}>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm">{item.reviewCount} نظر</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm">{item.prepTime}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => addToCart(item)}
                        style={{ backgroundColor: theme.colors.primary }}
                        className="hover:opacity-90"
                      >
                        <Plus className="h-4 w-4 ml-1" />
                        افزودن
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setSelectedItem(item)}>
                        جزئیات
                      </Button>
                    </div>
                    <div className="text-left">
                      {item.originalPrice > item.price && (
                        <span className={`text-sm line-through ${theme.colors.text} opacity-50`}>
                          {item.originalPrice.toLocaleString("fa-IR")}
                        </span>
                      )}
                      <span className="font-bold text-lg block" style={{ color: theme.colors.primary }}>
                        {item.price.toLocaleString("fa-IR")} تومان
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-center justify-between mt-3 pt-3 border-t ${theme.colors.text} opacity-60`}
                  >
                    <div className="flex items-center gap-1 text-sm">
                      <Heart className="h-4 w-4" />
                      <span>{item.likes}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-sm p-1" onClick={() => setSelectedItem(item)}>
                      <MessageCircle className="h-4 w-4 mr-1" />
                      نظرات
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Item Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className={`text-xl ${theme.colors.text}`}>{selectedItem.name}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{selectedItem.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{selectedItem.reviewCount} نظر</span>
                    <span>•</span>
                    <Badge variant="secondary">
                      {categories.find((cat) => cat.id === selectedItem.categoryId)?.name}
                    </Badge>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className={`font-semibold mb-2 ${theme.colors.text}`}>توضیحات کامل</h4>
                  <p className={`text-sm leading-relaxed ${theme.colors.text} opacity-80`}>
                    {selectedItem.fullDescription}
                  </p>
                </div>

                <div className={`grid grid-cols-2 gap-4 text-sm ${theme.colors.text} opacity-80`}>
                  <div>
                    <span className="font-medium">کالری:</span>
                    <span className="mr-2">{selectedItem.calories}</span>
                  </div>
                  <div>
                    <span className="font-medium">زمان آماده‌سازی:</span>
                    <span className="mr-2">{selectedItem.prepTime}</span>
                  </div>
                </div>

                <div>
                  <h4 className={`font-semibold mb-2 ${theme.colors.text}`}>مواد تشکیل‌دهنده</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedItem.ingredients.map((ingredient: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className={`flex items-center justify-between p-4 rounded-lg ${theme.colors.card}`}>
                  <div>
                    {selectedItem.originalPrice > selectedItem.price && (
                      <span className={`text-sm line-through block ${theme.colors.text} opacity-50`}>
                        {selectedItem.originalPrice.toLocaleString("fa-IR")} تومان
                      </span>
                    )}
                    <span className="font-bold text-xl" style={{ color: theme.colors.primary }}>
                      {selectedItem.price.toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      addToCart(selectedItem)
                      setSelectedItem(null)
                    }}
                    style={{ backgroundColor: theme.colors.primary }}
                    className="hover:opacity-90"
                  >
                    افزودن به سبد
                  </Button>
                </div>

                {/* Comments Section */}
                <div>
                  <h4 className={`font-semibold mb-3 ${theme.colors.text}`}>نظرات کاربران</h4>

                  <div className="space-y-3 mb-4">
                    {comments
                      .filter((comment) => comment.itemId === selectedItem.id)
                      .map((comment) => (
                        <div key={comment.id} className={`p-3 rounded-lg ${theme.colors.card}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{comment.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-right">
                              <div className="flex items-center gap-2 justify-end">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < comment.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className={`font-medium text-sm ${theme.colors.text}`}>{comment.user}</span>
                              </div>
                              <span className="text-xs text-gray-500">{comment.date}</span>
                            </div>
                          </div>
                          <p className={`text-sm ${theme.colors.text} opacity-80 text-right`}>{comment.comment}</p>
                          <div className="flex items-center gap-2 mt-2 justify-end">
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              <Heart className="h-3 w-3 mr-1" />
                              {comment.likes}
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="نظر خود را بنویسید..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="resize-none text-right"
                      rows={3}
                    />
                    <Button size="sm" className="w-full" style={{ backgroundColor: theme.colors.primary }}>
                      ثبت نظر
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

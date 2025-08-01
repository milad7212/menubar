"use client"

import { useState } from "react"
import { Coffee, ShoppingCart, Heart, MessageCircle, Star, Play, Plus, Minus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { SearchFilter } from "@/components/search-filter"
import { CategoryCarousel } from "@/components/ui/category-carousel"
import Link from "next/link"
import Image from "next/image"

// Mock data
const cafeInfo = {
  name: "کافه آرامش",
  description: "بهترین قهوه و غذاهای خوشمزه در شهر",
  rating: 4.8,
  reviewCount: 1250,
}

const categories = [
  { id: 1, name: "نوشیدنی گرم" },
  { id: 2, name: "نوشیدنی سرد" },
  { id: 3, name: "غذای اصلی" },
  { id: 4, name: "دسر" },
]

const menuItems = [
  {
    id: 1,
    name: "اسپرسو کلاسیک",
    description: "قهوه خالص و قوی با طعم بی‌نظیر",
    fullDescription:
      "اسپرسو کلاسیک ما از بهترین دانه‌های قهوه آرابیکا تهیه می‌شود. این قهوه با روش سنتی ایتالیایی دم‌آوری شده و طعم غنی و عمیقی دارد که عاشقان قهوه را مجذوب خود می‌کند.",
    price: 45000,
    originalPrice: 55000,
    category: "نوشیدنی گرم",
    categoryId: 1,
    image: "/images/espresso.jpg",
    video: null,
    rating: 4.9,
    reviewCount: 234,
    likes: 156,
    isLiked: false,
    ingredients: ["قهوه آرابیکا", "آب خالص"],
    calories: 5,
    prepTime: "2-3 دقیقه",
    isPopular: true,
    discount: 18,
  },
  {
    id: 2,
    name: "کاپوچینو دلوکس",
    description: "قهوه با شیر بخارپز و فوم ابریشمی",
    fullDescription:
      "کاپوچینو دلوکس ما ترکیبی عالی از اسپرسو قوی و شیر بخارپز شده است. فوم ابریشمی روی آن و پودر کاکائو باعث می‌شود تا تجربه‌ای فراموش‌نشدنی داشته باشید.",
    price: 65000,
    originalPrice: 75000,
    category: "نوشیدنی گرم",
    categoryId: 1,
    image: "/images/cappuccino.jpg",
    video: "/placeholder.mp4",
    rating: 4.7,
    reviewCount: 189,
    likes: 203,
    isLiked: true,
    ingredients: ["اسپرسو", "شیر تازه", "فوم شیر", "پودر کاکائو"],
    calories: 120,
    prepTime: "4-5 دقیقه",
    isPopular: false,
    discount: 13,
  },
  {
    id: 3,
    name: "آیس کافه ویژه",
    description: "قهوه سرد منعش با یخ و کرم",
    fullDescription:
      "آیس کافه ویژه ما برای روزهای گرم تابستان طراحی شده است. ترکیب قهوه قوی، یخ، شیر سرد و کرم چنتی باعث می‌شود تا انرژی و طراوت را به شما برگرداند.",
    price: 55000,
    originalPrice: 65000,
    category: "نوشیدنی سرد",
    categoryId: 2,
    image: "/images/ice-coffee.jpg",
    video: null,
    rating: 4.6,
    reviewCount: 145,
    likes: 98,
    isLiked: false,
    ingredients: ["قهوه سرد", "یخ", "شیر", "کرم چنتی", "شربت وانیل"],
    calories: 180,
    prepTime: "3-4 دقیقه",
    isPopular: true,
    discount: 15,
  },
  {
    id: 4,
    name: "ساندویچ کلاب ممتاز",
    description: "ساندویچ مرغ با سبزیجات تازه و سس مخصوص",
    fullDescription:
      "ساندویچ کلاب ممتاز ما با مرغ گریل شده، کاهو تازه، گوجه، خیار، پنیر چدار و سس مخصوص کافه تهیه می‌شود. نان تست شده و مواد اولیه تازه باعث طعم فوق‌العاده‌ای می‌شود.",
    price: 120000,
    originalPrice: 140000,
    category: "غذای اصلی",
    categoryId: 3,
    image: "/placeholder.svg?height=300&width=300",
    video: "/placeholder.mp4",
    rating: 4.8,
    reviewCount: 312,
    likes: 267,
    isLiked: true,
    ingredients: ["مرغ گریل", "نان تست", "کاهو", "گوجه", "خیار", "پنیر چدار", "سس مخصوص"],
    calories: 450,
    prepTime: "8-10 دقیقه",
    isPopular: true,
    discount: 14,
  },
  {
    id: 5,
    name: "تیرامیسو خانگی",
    description: "دسر ایتالیایی با قهوه و ماسکارپونه",
    fullDescription:
      "تیرامیسو خانگی ما با دستور اصیل ایتالیایی تهیه می‌شود. لایه‌های نرم بیسکویت آغشته به قهوه، کرم ماسکارپونه و پودر کاکائو طعمی بی‌نظیر ایجاد می‌کند.",
    price: 85000,
    originalPrice: 95000,
    category: "دسر",
    categoryId: 4,
    image: "/placeholder.svg?height=300&width=300",
    video: null,
    rating: 4.9,
    reviewCount: 198,
    likes: 234,
    isLiked: false,
    ingredients: ["بیسکویت لیدی فینگر", "قهوه اسپرسو", "ماسکارپونه", "تخم مرغ", "شکر", "کاکائو"],
    calories: 320,
    prepTime: "تهیه شده",
    isPopular: true,
    discount: 11,
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
    date: "2 روز پیش",
    likes: 12,
  },
  {
    id: 2,
    itemId: 1,
    user: "مریم کریمی",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    comment: "قهوه خوبی بود ولی کمی تلخ",
    date: "1 هفته پیش",
    likes: 8,
  },
]

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [cart, setCart] = useState<any[]>([])
  const [likedItems, setLikedItems] = useState<number[]>([2, 4])
  const [newComment, setNewComment] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("همه")
  const [filteredItems, setFilteredItems] = useState(menuItems)
  const [searchQuery, setSearchQuery] = useState("")

  const categoryList = ["همه", ...categories.map((cat) => cat.name)]

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

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters(query, selectedCategory)
  }

  const handleFilter = (filters: any) => {
    applyFilters(searchQuery, selectedCategory, filters)
  }

  const applyFilters = (query: string, category: string, filters?: any) => {
    let items = menuItems

    // Search filter
    if (query) {
      items = items.filter(
        (item) =>
          item.name.includes(query) ||
          item.description.includes(query) ||
          item.ingredients.some((ingredient) => ingredient.includes(query)),
      )
    }

    // Category filter
    if (category !== "همه") {
      items = items.filter((item) => item.category === category)
    }

    // Advanced filters
    if (filters) {
      // Price range
      if (filters.priceRange) {
        items = items.filter((item) => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1])
      }

      // Categories
      if (filters.categories && filters.categories.length > 0) {
        items = items.filter((item) => filters.categories.includes(item.categoryId))
      }

      // Calorie range
      if (filters.calorieRange) {
        items = items.filter(
          (item) => item.calories >= filters.calorieRange[0] && item.calories <= filters.calorieRange[1],
        )
      }

      // Popular items
      if (filters.isPopular) {
        items = items.filter((item) => item.isPopular)
      }

      // Discount items
      if (filters.hasDiscount) {
        items = items.filter((item) => item.originalPrice > item.price)
      }
    }

    setFilteredItems(items)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    applyFilters(searchQuery, category)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <Coffee className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{cafeInfo.name}</h1>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{cafeInfo.rating}</span>
                  <span className="hidden sm:inline">({cafeInfo.reviewCount.toLocaleString("fa-IR")} نظر)</span>
                </div>
              </div>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative bg-transparent">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-sm bg-blue-500 text-white">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-md bg-white/80 backdrop-blur-md">
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
                          <div className="flex-1">
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
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-4">
        <SearchFilter onSearch={handleSearch} onFilter={handleFilter} categories={categories} />
      </div>

      {/* Categories */}
      <div className="sticky top-[73px] z-40 bg-white/95 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3">
          <CategoryCarousel>
            {categoryList.map((category, index) => (
              <div key={index} className="embla__slide flex-shrink-0">
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Button>
              </div>
            ))}
          </CategoryCarousel>
        </div>
      </div>

      {/* Menu Items */}
      <main className="container mx-auto px-4 py-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">نتیجه‌ای یافت نشد</h3>
            <p className="text-gray-600">لطفاً کلمات کلیدی دیگری امتحان کنید یا فیلترها را تغییر دهید</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white"
              >
                <div className="relative">
                  <div className="aspect-square relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-t-2xl"
                    />
                    {item.discount > 0 && (
                      <Badge className="absolute top-3 right-3 bg-red-500 text-white shadow-md">
                        {item.discount}% تخفیف
                      </Badge>
                    )}
                    {item.isPopular && <Badge className="absolute top-2 left-2 bg-orange-500">محبوب</Badge>}
                    {item.video && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 left-2 rounded-full w-10 h-10 p-0"
                        onClick={() => setSelectedItem(item)}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                      <Button variant="ghost" size="sm" className="p-1 h-8 w-8" onClick={() => toggleLike(item.id)}>
                        <Heart
                          className={`h-6 w-6 ${
                            likedItems.includes(item.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                          }`}
                        />
                      </Button>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{item.reviewCount} نظر</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{item.prepTime}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => addToCart(item)}
                          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transform transition-transform duration-200 active:scale-95"
                        >
                          <Plus className="h-4 w-4 ml-1" />
                          افزودن
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedItem(item)}
                          className="transform transition-transform duration-200 active:scale-95"
                        >
                          جزئیات
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-gray-400 line-through">
                            {item.originalPrice.toLocaleString("fa-IR")}
                          </span>
                        )}
                        <span className="font-bold text-lg text-green-600">
                          {item.price.toLocaleString("fa-IR")} تومان
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Heart className="h-4 w-4" />
                        <span>{item.likes}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-sm text-gray-500 p-1"
                        onClick={() => setSelectedItem(item)}
                      >
                        <MessageCircle className="h-4 w-4 ml-1" />
                        نظرات
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Item Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-white">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedItem.name}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{selectedItem.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{selectedItem.reviewCount} نظر</span>
                    <span>•</span>
                    <Badge variant="secondary">{selectedItem.category}</Badge>
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
                  {selectedItem.video && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Button variant="secondary" className="rounded-full w-16 h-16">
                        <Play className="h-8 w-8" />
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-2">توضیحات کامل</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedItem.fullDescription}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
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
                  <h4 className="font-semibold mb-2">مواد تشکیل‌دهنده</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedItem.ingredients.map((ingredient: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    {selectedItem.originalPrice > selectedItem.price && (
                      <span className="text-sm text-gray-400 line-through block">
                        {selectedItem.originalPrice.toLocaleString("fa-IR")} تومان
                      </span>
                    )}
                    <span className="font-bold text-xl text-green-600">
                      {selectedItem.price.toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      addToCart(selectedItem)
                      setSelectedItem(null)
                    }}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                  >
                    افزودن به سبد
                  </Button>
                </div>

                {/* Comments Section */}
                <div>
                  <h4 className="font-semibold mb-3">نظرات کاربران</h4>

                  <div className="space-y-3 mb-4">
                    {comments
                      .filter((comment) => comment.itemId === selectedItem.id)
                      .map((comment) => (
                        <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{comment.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{comment.user}</span>
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
                              </div>
                              <span className="text-xs text-gray-500">{comment.date}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{comment.comment}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              <Heart className="h-3 w-3 ml-1" />
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
                      className="resize-none"
                      rows={3}
                    />
                    <Button size="sm" className="w-full">
                      ثبت نظر
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Admin Links */}
      <div className="fixed bottom-4 left-4 flex flex-col gap-2">
        <Link href="/admin/dashboard">
          <Button variant="outline" size="sm" className="shadow-lg bg-transparent">
            داشبورد مدیریت
          </Button>
        </Link>
        <Link href="/menu-builder">
          <Button variant="outline" size="sm" className="shadow-lg bg-transparent">
            سازنده منو
          </Button>
        </Link>
      </div>
    </div>
  )
}

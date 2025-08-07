"use client"

import { useState } from "react"
import {
  Plus,
  Edit,
  Trash2,
  Coffee,
  Save,
  Eye,
  ArrowLeft,
  Settings,
  Palette,
  Layout,
  GripVertical,
  Clock,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"

// New data structure for multiple menus
const initialCafeData = {
  info: {
    name: "کافه من",
    description: "بهترین قهوه و غذاهای خوشمزه",
    address: "آدرس کافه شما",
    phone: "شماره تماس",
    logo: "",
    selectedTheme: "modern-dark",
  },
  menus: [
    {
      id: 1,
      name: "منوی اصلی",
      timeSlots: [
        { day: "all", from: "08:00", to: "23:00" },
      ],
      categories: [
        {
          id: 101,
          name: "نوشیدنی‌های گرم",
          description: "قهوه‌ها و نوشیدنی‌های گرم",
          icon: "☕",
          order: 1,
          isVisible: true,
          items: [
            {
              id: 1001,
              name: "اسپرسو",
              description: "قهوه خالص و قوی",
              price: 45000,
              originalPrice: 0,
              image: "",
              isAvailable: true,
              isPopular: false,
              preparationTime: "۲-۳ دقیقه",
              calories: 5,
              ingredients: ["قهوه آرابیکا", "آب خالص"],
              order: 1,
            },
          ],
        },
        {
          id: 102,
          name: "نوشیدنی‌های سرد",
          description: "نوشیدنی‌های خنک و منعش",
          icon: "🧊",
          order: 2,
          isVisible: true,
          items: [],
        },
      ],
    },
    {
      id: 2,
      name: "منوی صبحانه",
      timeSlots: [
        { day: "all", from: "08:00", to: "12:00" },
      ],
      categories: [],
    },
  ],
}

const customerThemes = [
  {
    id: "classic",
    name: "کلاسیک",
    description: "طراحی سنتی و گرم",
    preview: "/placeholder.svg?height=200&width=300&text=Classic+Theme",
    colors: {
      primary: "#8B4513",
      secondary: "#D2691E",
      background: "from-amber-50 to-orange-100",
      card: "bg-white",
      text: "text-gray-900",
    },
  },
  {
    id: "modern",
    name: "مدرن",
    description: "طراحی مینیمال و شیک",
    preview: "/placeholder.svg?height=200&width=300&text=Modern+Theme",
    colors: {
      primary: "#2563eb",
      secondary: "#1d4ed8",
      background: "from-slate-50 to-blue-100",
      card: "bg-white/80 backdrop-blur-sm",
      text: "text-slate-900",
    },
  },
  {
    id: "elegant",
    name: "شیک",
    description: "طراحی لوکس و اشرافی",
    preview: "/placeholder.svg?height=200&width=300&text=Elegant+Theme",
    colors: {
      primary: "#7c3aed",
      secondary: "#5b21b6",
      background: "from-purple-50 to-indigo-100",
      card: "bg-white/90 backdrop-blur-md",
      text: "text-purple-900",
    },
  },
  {
    id: "nature",
    name: "طبیعی",
    description: "طراحی سبز و طبیعی",
    preview: "/placeholder.svg?height=200&width=300&text=Nature+Theme",
    colors: {
      primary: "#059669",
      secondary: "#047857",
      background: "from-green-50 to-emerald-100",
      card: "bg-white/85",
      text: "text-green-900",
    },
  },
  {
    id: "dark",
    name: "تیره",
    description: "طراحی مدرن و تیره",
    preview: "/placeholder.svg?height=200&width=300&text=Dark+Theme",
    colors: {
      primary: "#f59e0b",
      secondary: "#d97706",
      background: "from-gray-900 to-gray-800",
      card: "bg-gray-800/80 backdrop-blur-sm",
      text: "text-white",
    },
  },
  {
    id: "warm",
    name: "گرم",
    description: "طراحی گرم و دوستانه",
    preview: "/placeholder.svg?height=200&width=300&text=Warm+Theme",
    colors: {
      primary: "#dc2626",
      secondary: "#b91c1c",
      background: "from-red-50 to-pink-100",
      card: "bg-white/90",
      text: "text-red-900",
    },
  },
  {
    id: "3d-luxury",
    name: "سه‌بعدی لوکس",
    description: "طراحی سه‌بعدی مدرن با افکت‌های شیک",
    preview: "/placeholder.svg?height=200&width=300&text=3D+Luxury+Theme",
    colors: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      background: "from-slate-900 via-purple-900 to-slate-900",
      card: "bg-white/10 backdrop-blur-xl border border-white/20",
      text: "text-white",
    },
  },
]

export default function MenuBuilderPage() {
  const [cafeData, setCafeData] = useState(initialCafeData)
  const [activeTab, setActiveTab] = useState("info")
  const [previewMode, setPreviewMode] = useState(false)

  // Dialog states
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [editingItem, setEditingItem] = useState<any>(null)

  // Form states
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    icon: "📋",
  })

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    categoryId: "",
    image: "",
    preparationTime: "",
    calories: "",
    ingredients: "",
    isPopular: false,
    isAvailable: true,
  })

  // Category management
  const handleAddCategory = () => {
    const category = {
      id: Date.now(),
      name: newCategory.name,
      description: newCategory.description,
      icon: newCategory.icon,
      order: categories.length + 1,
      isVisible: true,
    }
    setCategories([...categories, category])
    setNewCategory({ name: "", description: "", icon: "📋" })
    setIsCategoryDialogOpen(false)
  }

  const handleEditCategory = (category: any) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      description: category.description,
      icon: category.icon,
    })
    setIsCategoryDialogOpen(true)
  }

  const handleUpdateCategory = () => {
    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, name: newCategory.name, description: newCategory.description, icon: newCategory.icon }
            : cat,
        ),
      )
      setEditingCategory(null)
      setNewCategory({ name: "", description: "", icon: "📋" })
      setIsCategoryDialogOpen(false)
    }
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id))
    setMenuItems(menuItems.filter((item) => item.categoryId !== id))
  }

  // Menu item management
  const handleAddItem = () => {
    const item = {
      id: Date.now(),
      categoryId: Number.parseInt(newItem.categoryId),
      name: newItem.name,
      description: newItem.description,
      price: Number.parseInt(newItem.price),
      originalPrice: newItem.originalPrice ? Number.parseInt(newItem.originalPrice) : Number.parseInt(newItem.price),
      image: newItem.image || "/placeholder.svg?height=300&width=300",
      isAvailable: newItem.isAvailable,
      isPopular: newItem.isPopular,
      preparationTime: newItem.preparationTime,
      calories: newItem.calories ? Number.parseInt(newItem.calories) : 0,
      ingredients: newItem.ingredients.split("،").map((i) => i.trim()),
      order: menuItems.filter((item) => item.categoryId === Number.parseInt(newItem.categoryId)).length + 1,
    }
    setMenuItems([...menuItems, item])
    setNewItem({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      categoryId: "",
      image: "",
      preparationTime: "",
      calories: "",
      ingredients: "",
      isPopular: false,
      isAvailable: true,
    })
    setIsItemDialogOpen(false)
  }

  const handleEditItem = (item: any) => {
    setEditingItem(item)
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      originalPrice: item.originalPrice.toString(),
      categoryId: item.categoryId.toString(),
      image: item.image,
      preparationTime: item.preparationTime,
      calories: item.calories.toString(),
      ingredients: item.ingredients.join("، "),
      isPopular: item.isPopular,
      isAvailable: item.isAvailable,
    })
    setIsItemDialogOpen(true)
  }

  const handleUpdateItem = () => {
    if (editingItem) {
      setMenuItems(
        menuItems.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: newItem.name,
                description: newItem.description,
                price: Number.parseInt(newItem.price),
                originalPrice: newItem.originalPrice
                  ? Number.parseInt(newItem.originalPrice)
                  : Number.parseInt(newItem.price),
                categoryId: Number.parseInt(newItem.categoryId),
                image: newItem.image || "/placeholder.svg?height=300&width=300",
                preparationTime: newItem.preparationTime,
                calories: newItem.calories ? Number.parseInt(newItem.calories) : 0,
                ingredients: newItem.ingredients.split("،").map((i) => i.trim()),
                isPopular: newItem.isPopular,
                isAvailable: newItem.isAvailable,
              }
            : item,
        ),
      )
      setEditingItem(null)
      setNewItem({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        categoryId: "",
        image: "",
        preparationTime: "",
        calories: "",
        ingredients: "",
        isPopular: false,
        isAvailable: true,
      })
      setIsItemDialogOpen(false)
    }
  }

  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const getCategoryItems = (categoryId: number) => {
    return menuItems.filter((item) => item.categoryId === categoryId)
  }

  const handleSaveMenu = () => {
    // در پروژه واقعی اینجا داده‌ها را در دیتابیس ذخیره می‌کنید
    alert("منو با موفقیت ذخیره شد!")
  }

  const handlePublishMenu = () => {
    // در پروژه واقعی اینجا منو را منتشر می‌کنید
    alert("منو با موفقیت منتشر شد!")
  }

  const selectedTheme = customerThemes.find((theme) => theme.id === cafeData.info.selectedTheme) || customerThemes[0]

  if (previewMode) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${selectedTheme.colors.background}`} dir="rtl">
        {/* Preview Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={() => setPreviewMode(false)}>
                <ArrowLeft className="h-4 w-4 ml-2" />
                بازگشت به ویرایش
              </Button>
              <Badge variant="secondary">حالت پیش‌نمایش - تم {selectedTheme.name}</Badge>
            </div>
          </div>
        </header>

        {/* Preview Content */}
        <div className="container mx-auto px-4 py-6">
          {/* Cafe Info */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              {cafeData.info.logo ? (
                <Image
                  src={cafeData.info.logo || "/placeholder.svg"}
                  alt="لوگو"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              ) : (
                <div
                  className="w-15 h-15 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: selectedTheme.colors.primary }}
                >
                  <Coffee className="h-8 w-8 text-white" />
                </div>
              )}
              <div>
                <h1 className={`text-3xl font-bold ${selectedTheme.colors.text}`}>{cafeData.info.name}</h1>
                <p className={`${selectedTheme.colors.text} opacity-80`}>{cafeData.info.description}</p>
              </div>
            </div>

            <div className={`flex flex-wrap justify-center gap-4 text-sm ${selectedTheme.colors.text} opacity-70`}>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{cafeData.info.address}</span>
              </div>
              {/* Note: This part needs to be adapted for multiple time slots */}
              {/* <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{cafeData.info.hours}</span>
              </div> */}
            </div>
          </div>

          {/* Menu Categories */}
          <div className="space-y-12">
            {cafeData.menus[0].categories // Assuming we preview the first menu
              .filter((cat) => cat.isVisible)
              .map((category) => (
                <section key={category.id}>
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl">{category.icon}</span>
                      <h2 className={`text-2xl font-bold ${selectedTheme.colors.text}`}>{category.name}</h2>
                    </div>
                    <p className={`${selectedTheme.colors.text} opacity-80`}>{category.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {category.items
                      .filter((item) => item.isAvailable)
                      .map((item) => (
                        <Card
                          key={item.id}
                          className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${selectedTheme.colors.card} border-0 shadow-md`}
                        >
                          <div className="aspect-square relative">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                            {item.isPopular && (
                              <Badge
                                className="absolute top-2 right-2"
                                style={{ backgroundColor: selectedTheme.colors.primary }}
                              >
                                محبوب
                              </Badge>
                            )}
                            {item.originalPrice > item.price && (
                              <Badge className="absolute top-2 left-2 bg-red-500">
                                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% تخفیف
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <h3 className={`font-bold text-lg mb-2 ${selectedTheme.colors.text}`}>{item.name}</h3>
                            <p className={`text-sm mb-3 ${selectedTheme.colors.text} opacity-70`}>{item.description}</p>
                            <div className="flex items-center justify-between">
                              <div>
                                {item.originalPrice > item.price && (
                                  <span
                                    className={`text-sm line-through block ${selectedTheme.colors.text} opacity-50`}
                                  >
                                    {item.originalPrice.toLocaleString("fa-IR")} تومان
                                  </span>
                                )}
                                <span className="font-bold text-lg" style={{ color: selectedTheme.colors.primary }}>
                                  {item.price.toLocaleString("fa-IR")} تومان
                                </span>
                              </div>
                              <div className={`text-sm ${selectedTheme.colors.text} opacity-60`}>
                                <Clock className="h-4 w-4 inline ml-1" />
                                {item.preparationTime}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </section>
              ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <Coffee className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">سازنده منو</h1>
                <p className="text-xs text-gray-600 hidden sm:block">منوی اختصاصی خود را بسازید</p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="outline" size="sm" onClick={() => setPreviewMode(true)} className="text-xs">
                <Eye className="h-4 w-4 sm:ml-2" />
                <span className="hidden sm:inline">پیش‌نمایش</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleSaveMenu} className="text-xs">
                <Save className="h-4 w-4 sm:ml-2" />
                <span className="hidden sm:inline">ذخیره</span>
              </Button>
              <Button
                size="sm"
                onClick={handlePublishMenu}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-xs"
              >
                انتشار
              </Button>
              <Link href="/">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow">
        <div className="bg-white border-b sticky top-[61px] z-30">
          <div className="container mx-auto px-4">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger
                value="info"
                className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm py-3"
              >
                <Settings className="h-5 w-5" />
                <span>اطلاعات کافه</span>
              </TabsTrigger>
              <TabsTrigger
                value="design"
                className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm py-3"
              >
                <Palette className="h-5 w-5" />
                <span>انتخاب تم</span>
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm py-3"
              >
                <Layout className="h-5 w-5" />
                <span>دسته‌بندی‌ها</span>
              </TabsTrigger>
              <TabsTrigger
                value="items"
                className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm py-3"
              >
                <Coffee className="h-5 w-5" />
                <span>آیتم‌های منو</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Cafe Info Tab */}
          <TabsContent value="info" className="space-y-6">
            <Card>
              <CardHeader className="text-right">
                <CardTitle>اطلاعات پایه کافه</CardTitle>
                <CardDescription>اطلاعات اصلی کافه خود را وارد کنید</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-right md:order-last">
                    <Label htmlFor="cafe-name">نام کافه *</Label>
                    <Input
                      id="cafe-name"
                      value={cafeData.info.name}
                      onChange={(e) => setCafeData({ ...cafeData, info: { ...cafeData.info, name: e.target.value } })}
                      placeholder="نام کافه شما"
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2 text-right">
                    <Label htmlFor="cafe-phone">شماره تماس</Label>
                    <Input
                      id="cafe-phone"
                      value={cafeData.info.phone}
                      onChange={(e) => setCafeData({ ...cafeData, info: { ...cafeData.info, phone: e.target.value } })}
                      placeholder="۰۲۱-۱۲۳۴۵۶۷۸"
                      className="text-right"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-right">
                  <Label htmlFor="cafe-description">توضیحات کافه</Label>
                  <Textarea
                    id="cafe-description"
                    value={cafeData.info.description}
                    onChange={(e) =>
                      setCafeData({ ...cafeData, info: { ...cafeData.info, description: e.target.value } })
                    }
                    placeholder="توضیح کوتاهی از کافه شما"
                    rows={3}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2 text-right">
                  <Label htmlFor="cafe-address">آدرس کافه</Label>
                  <Input
                    id="cafe-address"
                    value={cafeData.info.address}
                    onChange={(e) =>
                      setCafeData({ ...cafeData, info: { ...cafeData.info, address: e.target.value } })
                    }
                    placeholder="آدرس کامل کافه"
                    className="text-right"
                  />
                </div>

                <div className="space-y-2 text-right">
                  <Label htmlFor="cafe-logo">لوگوی کافه (لینک تصویر)</Label>
                  <Input
                    id="cafe-logo"
                    value={cafeData.info.logo}
                    onChange={(e) => setCafeData({ ...cafeData, info: { ...cafeData.info, logo: e.target.value } })}
                    placeholder="https://example.com/logo.png"
                    dir="ltr"
                  />
                </div>
              </CardContent>
              <DialogFooter className="px-6 pb-6">
                <Button onClick={handleSaveMenu}>
                  <Save className="h-4 w-4 ml-2" />
                  تأیید و ذخیره اطلاعات
                </Button>
              </DialogFooter>
            </Card>
          </TabsContent>

          {/* Design Tab - Theme Selection */}
          <TabsContent value="design" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>انتخاب تم نمایش برای مشتریان</CardTitle>
                <CardDescription>تمی را انتخاب کنید که مشتریان منوی شما را با آن مشاهده کنند</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {customerThemes.map((theme) => (
                    <Card
                      key={theme.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        cafeData.info.selectedTheme === theme.id ? "ring-2 ring-blue-500 shadow-lg" : ""
                      }`}
                      onClick={() =>
                        setCafeData({ ...cafeData, info: { ...cafeData.info, selectedTheme: theme.id } })
                      }
                    >
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <Image
                          src={theme.preview || "/placeholder.svg"}
                          alt={theme.name}
                          fill
                          className="object-cover"
                        />
                        {cafeData.info.selectedTheme === theme.id && (
                          <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                            <Badge className="bg-blue-500">انتخاب شده</Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{theme.name}</h3>
                          <div className="flex gap-1">
                            <div
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: theme.colors.primary }}
                            />
                            <div
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: theme.colors.secondary }}
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{theme.description}</p>

                        {/* دکمه پیش‌نمایش برای هر تم */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation() // جلوگیری از انتخاب تم هنگام کلیک روی دکمه
                            const tempTheme = cafeData.info.selectedTheme
                            setCafeData({ ...cafeData, info: { ...cafeData.info, selectedTheme: theme.id } })
                            setTimeout(() => setPreviewMode(true), 100)
                          }}
                        >
                          <Eye className="h-4 w-4 ml-2" />
                          پیش‌نمایش این تم
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">تم انتخاب شده: {selectedTheme.name}</h4>
                  <p className="text-sm text-blue-700 mb-3">{selectedTheme.description}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="bg-transparent" onClick={() => setPreviewMode(true)}>
                      <Eye className="h-4 w-4 ml-2" />
                      پیش‌نمایش تم انتخابی
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => {
                        // باز کردن صفحه مشتری در تب جدید
                        window.open("/customer-menu", "_blank")
                      }}
                    >
                      مشاهده نسخه مشتری
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>مدیریت دسته‌بندی‌ها</CardTitle>
                    <CardDescription>دسته‌بندی‌های منوی خود را ایجاد و مدیریت کنید</CardDescription>
                  </div>
                  <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setEditingCategory(null)}>
                        <Plus className="h-4 w-4 ml-2" />
                        افزودن دسته‌بندی
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{editingCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}</DialogTitle>
                        <DialogDescription>اطلاعات دسته‌بندی را وارد کنید</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="category-name">نام دسته‌بندی *</Label>
                          <Input
                            id="category-name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            placeholder="مثال: نوشیدنی‌های گرم"
                            className="text-right"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category-description">توضیحات</Label>
                          <Input
                            id="category-description"
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            placeholder="توضیح کوتاه از دسته‌بندی"
                            className="text-right"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category-icon">آیکون (ایموجی)</Label>
                          <Input
                            id="category-icon"
                            value={newCategory.icon}
                            onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                            placeholder="☕"
                            className="text-center"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={editingCategory ? handleUpdateCategory : handleAddCategory}>
                          {editingCategory ? "بروزرسانی" : "افزودن"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cafeData.menus[0].categories.map((category) => (
                    <Card key={category.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                            <span className="text-2xl">{category.icon}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-right">{category.name}</h4>
                            <p className="text-sm text-gray-600 text-right">{category.description}</p>
                            <Badge variant="secondary" className="mt-1">
                              {category.items.length} آیتم
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={category.isVisible}
                            onCheckedChange={(checked) => {
                              // This needs to be updated to handle the new data structure
                            }}
                          />
                          <Button variant="outline" size="sm" onClick={() => handleEditCategory(category)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Items Tab */}
          <TabsContent value="items" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>مدیریت آیتم‌های منو</CardTitle>
                    <CardDescription>محصولات و آیتم‌های منوی خود را اضافه کنید</CardDescription>
                  </div>
                  <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setEditingItem(null)}>
                        <Plus className="h-4 w-4 ml-2" />
                        افزودن آیتم جدید
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{editingItem ? "ویرایش آیتم" : "افزودن آیتم جدید"}</DialogTitle>
                        <DialogDescription>اطلاعات کامل آیتم را وارد کنید</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="item-name">نام آیتم *</Label>
                            <Input
                              id="item-name"
                              value={newItem.name}
                              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                              placeholder="مثال: اسپرسو کلاسیک"
                              className="text-right"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="item-category">دسته‌بندی *</Label>
                            <Select
                              value={newItem.categoryId}
                              onValueChange={(value) => setNewItem({ ...newItem, categoryId: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="انتخاب دسته‌بندی" />
                              </SelectTrigger>
                              <SelectContent>
                                {cafeData.menus[0].categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.icon} {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="item-description">توضیحات *</Label>
                          <Textarea
                            id="item-description"
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            placeholder="توضیح کوتاه از آیتم"
                            rows={2}
                            className="text-right"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="item-price">قیمت (تومان) *</Label>
                            <Input
                              id="item-price"
                              type="number"
                              value={newItem.price}
                              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                              placeholder="۴۵۰۰۰"
                              className="text-right"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="item-original-price">قیمت اصلی (تومان)</Label>
                            <Input
                              id="item-original-price"
                              type="number"
                              value={newItem.originalPrice}
                              onChange={(e) => setNewItem({ ...newItem, originalPrice: e.target.value })}
                              placeholder="۵۵۰۰۰"
                              className="text-right"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="item-calories">کالری</Label>
                            <Input
                              id="item-calories"
                              type="number"
                              value={newItem.calories}
                              onChange={(e) => setNewItem({ ...newItem, calories: e.target.value })}
                              placeholder="۱۲۰"
                              className="text-right"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="item-prep-time">زمان آماده‌سازی</Label>
                            <Input
                              id="item-prep-time"
                              value={newItem.preparationTime}
                              onChange={(e) => setNewItem({ ...newItem, preparationTime: e.target.value })}
                              placeholder="۵-۷ دقیقه"
                              className="text-right"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="item-image">لینک تصویر</Label>
                            <Input
                              id="item-image"
                              value={newItem.image}
                              onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                              placeholder="https://example.com/image.jpg"
                              className="text-left"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="item-ingredients">مواد تشکیل‌دهنده</Label>
                          <Input
                            id="item-ingredients"
                            value={newItem.ingredients}
                            onChange={(e) => setNewItem({ ...newItem, ingredients: e.target.value })}
                            placeholder="قهوه آرابیکا، شیر، فوم شیر (با کاما جدا کنید)"
                            className="text-right"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Switch
                              id="item-popular"
                              checked={newItem.isPopular}
                              onCheckedChange={(checked) => setNewItem({ ...newItem, isPopular: checked })}
                            />
                            <Label htmlFor="item-popular">آیتم محبوب</Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Switch
                              id="item-available"
                              checked={newItem.isAvailable}
                              onCheckedChange={(checked) => setNewItem({ ...newItem, isAvailable: checked })}
                            />
                            <Label htmlFor="item-available">موجود</Label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={editingItem ? handleUpdateItem : handleAddItem}>
                          {editingItem ? "بروزرسانی" : "افزودن آیتم"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cafeData.menus[0].categories.map((category) => (
                    <div key={category.id}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">{category.icon}</span>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                        <Badge variant="secondary">{category.items.length} آیتم</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.items.map((item) => (
                          <Card key={item.id} className="overflow-hidden">
                            <div className="aspect-square relative">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                              {item.isPopular && <Badge className="absolute top-2 right-2 bg-orange-500">محبوب</Badge>}
                              {!item.isAvailable && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                  <Badge variant="destructive">ناموجود</Badge>
                                </div>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <h4 className="font-medium mb-1 text-right">{item.name}</h4>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2 text-right">{item.description}</p>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex gap-1">
                                  <Button variant="outline" size="sm" onClick={() => handleEditItem(item)}>
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(item.id)}>
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                                <div className="text-right">
                                  {item.originalPrice > item.price && (
                                    <span className="text-xs text-gray-400 line-through">
                                      {item.originalPrice.toLocaleString("fa-IR")}
                                    </span>
                                  )}
                                  <div className="font-bold text-green-600">
                                    {item.price.toLocaleString("fa-IR")} تومان
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{item.calories} کالری</span>
                                <span>{item.preparationTime}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {category.items.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Coffee className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>هنوز آیتمی در این دسته‌بندی اضافه نشده است</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Coffee, Save, Eye, ArrowLeft, Settings, Palette, Layout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { InfoTab } from "@/components/menu-builder/InfoTab"
import { DesignTab } from "@/components/menu-builder/DesignTab"
import { CategoriesTab } from "@/components/menu-builder/CategoriesTab"
import { ItemsTab } from "@/components/menu-builder/ItemsTab"
import { PreviewMode } from "@/components/menu-builder/PreviewMode"

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
      timeSlots: [{ day: "all", from: "08:00", to: "23:00" }],
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
      timeSlots: [{ day: "all", from: "08:00", to: "12:00" }],
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
  const [editingCategory, setEditingCategory] = useState(null)
  const [editingItem, setEditingItem] = useState(null)

  // Form states for modals
  const [newCategory, setNewCategory] = useState({ name: "", description: "", icon: "📋" })
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

  // Mock handlers - these would interact with a backend in a real app
  const handleSaveMenu = () => alert("منو با موفقیت ذخیره شد!")
  const handlePublishMenu = () => alert("منو با موفقیت منتشر شد!")
  const handleAddCategory = () => {}
  const handleUpdateCategory = () => {}
  const handleDeleteCategory = () => {}
  const handleAddItem = () => {}
  const handleUpdateItem = () => {}
  const handleDeleteItem = () => {}
  const handleEditItem = () => {}

  if (previewMode) {
    return <PreviewMode cafeData={cafeData} setPreviewMode={setPreviewMode} customerThemes={customerThemes} />
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
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
              <Button size="sm" onClick={handlePublishMenu} className="bg-gradient-to-r from-green-500 to-emerald-600 text-xs">
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
              <TabsTrigger value="info" className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm py-3">
                <Settings className="h-5 w-5" />
                <span>اطلاعات کافه</span>
              </TabsTrigger>
              <TabsTrigger value="design" className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm py-3">
                <Palette className="h-5 w-5" />
                <span>انتخاب تم</span>
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm py-3">
                <Layout className="h-5 w-5" />
                <span>دسته‌بندی‌ها</span>
              </TabsTrigger>
              <TabsTrigger value="items" className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm py-3">
                <Coffee className="h-5 w-5" />
                <span>آیتم‌های منو</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <TabsContent value="info">
            <InfoTab cafeData={cafeData} setCafeData={setCafeData} handleSaveMenu={handleSaveMenu} />
          </TabsContent>
          <TabsContent value="design">
            <DesignTab cafeData={cafeData} setCafeData={setCafeData} customerThemes={customerThemes} setPreviewMode={setPreviewMode} />
          </TabsContent>
          <TabsContent value="categories">
            <CategoriesTab
              cafeData={cafeData}
              isCategoryDialogOpen={isCategoryDialogOpen}
              setIsCategoryDialogOpen={setIsCategoryDialogOpen}
              editingCategory={editingCategory}
              setEditingCategory={setEditingCategory}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              handleAddCategory={handleAddCategory}
              handleUpdateCategory={handleUpdateCategory}
              handleDeleteCategory={handleDeleteCategory}
            />
          </TabsContent>
          <TabsContent value="items">
            <ItemsTab
              cafeData={cafeData}
              isItemDialogOpen={isItemDialogOpen}
              setIsItemDialogOpen={setIsItemDialogOpen}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              newItem={newItem}
              setNewItem={setNewItem}
              handleAddItem={handleAddItem}
              handleUpdateItem={handleUpdateItem}
              handleDeleteItem={handleDeleteItem}
              handleEditItem={handleEditItem}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

"use client";

import { useState } from "react"
import {
  Coffee,
  Save,
  Eye,
  ArrowLeft,
  Settings,
  Palette,
  Layout,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { InfoTab } from "@/components/menu-builder/InfoTab"
import { DesignTab } from "@/components/menu-builder/DesignTab"
import { CategoriesTab } from "@/components/menu-builder/CategoriesTab"
import { ItemsTab } from "@/components/menu-builder/ItemsTab"
import { PreviewMode } from "@/components/menu-builder/PreviewMode"
import { useCafe } from "@/context/CafeContext"
import { customerThemes } from "@/lib/themes"
import { MenuManager } from "@/components/menu-builder/MenuManager"

export default function MenuBuilderPage() {
  const { cafeData } = useCafe()
  const [activeTab, setActiveTab] = useState("info")
  const [previewMode, setPreviewMode] = useState(false)

  // Mock handlers - these would interact with a backend in a real app
  const handleSaveMenu = () => alert("منو با موفقیت ذخیره شد!")
  const handlePublishMenu = () => alert("منو با موفقیت منتشر شد!")

  if (!cafeData) {
    return <div>در حال بارگذاری...</div>
  }

  if (previewMode) {
    return (
      <PreviewMode
        cafeData={cafeData}
        setPreviewMode={setPreviewMode}
        customerThemes={customerThemes}
      />
    )
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
                <p className="text-xs text-gray-600 hidden sm:block">
                  منوی اختصاصی خود را بسازید
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(true)}
                className="text-xs"
              >
                <Eye className="h-4 w-4 sm:ml-2" />
                <span className="hidden sm:inline">پیش‌نمایش</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveMenu}
                className="text-xs"
              >
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

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-grow"
        dir="rtl"
      >
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 sm:px-0">
            <TabsList className="flex overflow-x-auto scrollbar-hide">
              <TabsTrigger
                value="info"
                className="flex-row items-center gap-2 text-xs sm:text-sm py-3 whitespace-nowrap"
              >
                <Settings className="h-5 w-5" />
                <span>اطلاعات کافه</span>
              </TabsTrigger>
              <TabsTrigger
                value="design"
                className="flex-row items-center gap-2 text-xs sm:text-sm py-3 whitespace-nowrap"
              >
                <Palette className="h-5 w-5" />
                <span>انتخاب تم</span>
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="flex-row items-center gap-2 text-xs sm:text-sm py-3 whitespace-nowrap"
              >
                <Layout className="h-5 w-5" />
                <span>دسته‌بندی‌ها</span>
              </TabsTrigger>
              <TabsTrigger
                value="items"
                className="flex-row items-center gap-2 text-xs sm:text-sm py-3 whitespace-nowrap"
              >
                <Coffee className="h-5 w-5" />
                <span>آیتم‌های منو</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 space-y-6">
          <MenuManager />
          <TabsContent value="info">
            <InfoTab />
          </TabsContent>
          <TabsContent value="design">
            <DesignTab setPreviewMode={setPreviewMode} />
          </TabsContent>
          <TabsContent value="categories">
            <CategoriesTab />
          </TabsContent>
          <TabsContent value="items">
            <ItemsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

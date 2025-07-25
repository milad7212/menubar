"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Coffee, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import Image from "next/image"

const initialCategories = [
  { id: 1, name: "نوشیدنی گرم" },
  { id: 2, name: "نوشیدنی سرد" },
  { id: 3, name: "غذای اصلی" },
  { id: 4, name: "دسر" },
]

const initialMenuItems = [
  {
    id: 1,
    name: "اسپرسو کلاسیک",
    description: "قهوه خالص و قوی با طعم بی‌نظیر",
    fullDescription: "اسپرسو کلاسیک ما از بهترین دانه‌های قهوه آرابیکا تهیه می‌شود.",
    price: 45000,
    originalPrice: 55000,
    categoryId: 1,
    image: "/placeholder.svg?height=300&width=300",
    video: "",
    ingredients: "قهوه آرابیکا، آب خالص",
    calories: 5,
    prepTime: "2-3 دقیقه",
    isPopular: true,
    discount: 18,
  },
]

export default function AdminPage() {
  const [categories, setCategories] = useState(initialCategories)
  const [menuItems, setMenuItems] = useState(initialMenuItems)
  const [isAddItemOpen, setIsAddItemOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    fullDescription: "",
    price: "",
    originalPrice: "",
    categoryId: "",
    image: "",
    video: "",
    ingredients: "",
    calories: "",
    prepTime: "",
    isPopular: false,
    discount: "",
  })

  const [newCategory, setNewCategory] = useState({ name: "" })

  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.categoryId) {
      const item = {
        id: Date.now(),
        name: newItem.name,
        description: newItem.description,
        fullDescription: newItem.fullDescription,
        price: Number.parseInt(newItem.price),
        originalPrice: newItem.originalPrice ? Number.parseInt(newItem.originalPrice) : Number.parseInt(newItem.price),
        categoryId: Number.parseInt(newItem.categoryId),
        image: newItem.image || "/placeholder.svg?height=300&width=300",
        video: newItem.video,
        ingredients: newItem.ingredients,
        calories: Number.parseInt(newItem.calories) || 0,
        prepTime: newItem.prepTime,
        isPopular: newItem.isPopular,
        discount: newItem.discount ? Number.parseInt(newItem.discount) : 0,
      }
      setMenuItems([...menuItems, item])
      setNewItem({
        name: "",
        description: "",
        fullDescription: "",
        price: "",
        originalPrice: "",
        categoryId: "",
        image: "",
        video: "",
        ingredients: "",
        calories: "",
        prepTime: "",
        isPopular: false,
        discount: "",
      })
      setIsAddItemOpen(false)
    }
  }

  const handleAddCategory = () => {
    if (newCategory.name) {
      const category = {
        id: Date.now(),
        name: newCategory.name,
      }
      setCategories([...categories, category])
      setNewCategory({ name: "" })
      setIsAddCategoryOpen(false)
    }
  }

  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id))
    setMenuItems(menuItems.filter((item) => item.categoryId !== id))
  }

  const getCategoryName = (categoryId: number) => {
    return categories.find((cat) => cat.id === categoryId)?.name || "نامشخص"
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Coffee className="h-8 w-8 text-amber-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">پنل مدیریت کافه</h1>
                <p className="text-gray-600">مدیریت منو و محتوا</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <ArrowRight className="h-4 w-4" />
                بازگشت به منو
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">کل آیتم‌ها</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{menuItems.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">دسته‌بندی‌ها</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">آیتم‌های محبوب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{menuItems.filter((item) => item.isPopular).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">میانگین قیمت</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {menuItems.length > 0
                  ? Math.round(menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length).toLocaleString(
                      "fa-IR",
                    )
                  : 0}{" "}
                تومان
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Management */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>مدیریت دسته‌بندی‌ها</CardTitle>
                <CardDescription>دسته‌بندی‌های منو را مدیریت کنید</CardDescription>
              </div>
              <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    افزودن دسته‌بندی
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>افزودن دسته‌بندی جدید</DialogTitle>
                    <DialogDescription>یک دسته‌بندی جدید برای منوی خود ایجاد کنید</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category-name">نام دسته‌بندی</Label>
                      <Input
                        id="category-name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ name: e.target.value })}
                        placeholder="مثال: نوشیدنی‌های گرم"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddCategory}>افزودن دسته‌بندی</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{category.name}</span>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Menu Items Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>مدیریت آیتم‌های منو</CardTitle>
                <CardDescription>آیتم‌های جدید اضافه کنید یا موجودی‌ها را ویرایش کنید</CardDescription>
              </div>
              <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    افزودن آیتم جدید
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>افزودن آیتم جدید</DialogTitle>
                    <DialogDescription>اطلاعات کامل آیتم جدید را وارد کنید</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="item-name">نام آیتم *</Label>
                        <Input
                          id="item-name"
                          value={newItem.name}
                          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                          placeholder="مثال: اسپرسو کلاسیک"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="item-category">دسته‌بندی *</Label>
                        <Select
                          value={newItem.categoryId}
                          onValueChange={(value) => setNewItem({ ...newItem, categoryId: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="انتخاب دسته‌بندی" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="item-description">توضیحات کوتاه *</Label>
                      <Input
                        id="item-description"
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        placeholder="توضیح کوتاه برای نمایش در کارت"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="item-full-description">توضیحات کامل</Label>
                      <Textarea
                        id="item-full-description"
                        value={newItem.fullDescription}
                        onChange={(e) => setNewItem({ ...newItem, fullDescription: e.target.value })}
                        placeholder="توضیحات کامل برای صفحه جزئیات"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="item-price">قیمت فعلی (تومان) *</Label>
                        <Input
                          id="item-price"
                          type="number"
                          value={newItem.price}
                          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                          placeholder="45000"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="item-original-price">قیمت اصلی (تومان)</Label>
                        <Input
                          id="item-original-price"
                          type="number"
                          value={newItem.originalPrice}
                          onChange={(e) => setNewItem({ ...newItem, originalPrice: e.target.value })}
                          placeholder="55000"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="item-discount">درصد تخفیف</Label>
                        <Input
                          id="item-discount"
                          type="number"
                          value={newItem.discount}
                          onChange={(e) => setNewItem({ ...newItem, discount: e.target.value })}
                          placeholder="18"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="item-calories">کالری</Label>
                        <Input
                          id="item-calories"
                          type="number"
                          value={newItem.calories}
                          onChange={(e) => setNewItem({ ...newItem, calories: e.target.value })}
                          placeholder="120"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="item-prep-time">زمان آماده‌سازی</Label>
                        <Input
                          id="item-prep-time"
                          value={newItem.prepTime}
                          onChange={(e) => setNewItem({ ...newItem, prepTime: e.target.value })}
                          placeholder="5-7 دقیقه"
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="item-ingredients">مواد تشکیل‌دهنده</Label>
                      <Input
                        id="item-ingredients"
                        value={newItem.ingredients}
                        onChange={(e) => setNewItem({ ...newItem, ingredients: e.target.value })}
                        placeholder="قهوه آرابیکا، شیر، فوم شیر (با کاما جدا کنید)"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="item-image">لینک تصویر</Label>
                        <Input
                          id="item-image"
                          value={newItem.image}
                          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="item-video">لینک ویدیو (اختیاری)</Label>
                        <Input
                          id="item-video"
                          value={newItem.video}
                          onChange={(e) => setNewItem({ ...newItem, video: e.target.value })}
                          placeholder="https://example.com/video.mp4"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="item-popular"
                        checked={newItem.isPopular}
                        onCheckedChange={(checked) => setNewItem({ ...newItem, isPopular: checked })}
                      />
                      <Label htmlFor="item-popular">آیتم محبوب</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddItem}>افزودن آیتم</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    {item.isPopular && <Badge className="absolute top-2 right-2 bg-orange-500">محبوب</Badge>}
                    {item.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-red-500">{item.discount}% تخفیف</Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge variant="secondary">{getCategoryName(item.categoryId)}</Badge>
                    </div>
                    <CardDescription className="text-right line-clamp-2">{item.description}</CardDescription>
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-gray-400 line-through block">
                            {item.originalPrice.toLocaleString("fa-IR")} تومان
                          </span>
                        )}
                        <span className="text-lg font-bold text-green-600">
                          {item.price.toLocaleString("fa-IR")} تومان
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

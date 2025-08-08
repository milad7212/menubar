import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Plus, Edit, Trash2, Coffee } from "lucide-react"
import { useCafe } from "@/context/CafeContext"

const initialItemState = {
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
}

export function ItemsTab() {
  const { cafeData, activeMenuId, addItem, updateItem, deleteItem } = useCafe()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [item, setItem] = useState(initialItemState)

  const activeMenu = cafeData.menus.find((m) => m.id === activeMenuId)

  useEffect(() => {
    if (editingItem) {
      setItem({
        ...editingItem,
        price: editingItem.price.toString(),
        originalPrice: editingItem.originalPrice?.toString() || "",
        calories: editingItem.calories?.toString() || "",
        ingredients: Array.isArray(editingItem.ingredients) ? editingItem.ingredients.join(", ") : "",
      })
    } else {
      setItem(initialItemState)
    }
  }, [editingItem])

  const handleOpenDialog = (item = null) => {
    setEditingItem(item)
    setIsDialogOpen(true)
  }

  const handleSaveChanges = () => {
    const itemToSave = {
      ...item,
      price: parseFloat(item.price) || 0,
      originalPrice: parseFloat(item.originalPrice) || 0,
      calories: parseInt(item.calories, 10) || 0,
      ingredients: item.ingredients.split(",").map((s) => s.trim()),
    }
    if (editingItem) {
      updateItem(activeMenuId, item.categoryId, itemToSave)
    } else {
      addItem(activeMenuId, item.categoryId, itemToSave)
    }
    setIsDialogOpen(false)
    setEditingItem(null)
  }

  if (!activeMenu) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>مدیریت آیتم‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <p>لطفا ابتدا یک منو انتخاب کنید.</p>
        </CardContent>
      </Card>
    )
  }

  if (activeMenu.categories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>مدیریت آیتم‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <p>برای افزودن آیتم، ابتدا باید یک دسته‌بندی ایجاد کنید.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>مدیریت آیتم‌های منو</CardTitle>
            <CardDescription>محصولات و آیتم‌های منوی «{activeMenu.name}» را اضافه کنید</CardDescription>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4 ml-2" />
            افزودن آیتم جدید
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activeMenu.categories.map((category) => (
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
                          <Button variant="outline" size="sm" onClick={() => handleOpenDialog(item)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteItem(activeMenuId, category.id, item.id)}
                          >
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                    value={item.name}
                    onChange={(e) => setItem({ ...item, name: e.target.value })}
                    placeholder="مثال: اسپرسو کلاسیک"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-category">دسته‌بندی *</Label>
                  <Select
                    value={item.categoryId}
                    onValueChange={(value) => setItem({ ...item, categoryId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب دسته‌بندی" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeMenu.categories.map((category) => (
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
                  value={item.description}
                  onChange={(e) => setItem({ ...item, description: e.target.value })}
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
                    value={item.price}
                    onChange={(e) => setItem({ ...item, price: e.target.value })}
                    placeholder="۴۵۰۰۰"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-original-price">قیمت اصلی (تومان)</Label>
                  <Input
                    id="item-original-price"
                    type="number"
                    value={item.originalPrice}
                    onChange={(e) => setItem({ ...item, originalPrice: e.target.value })}
                    placeholder="۵۵۰۰۰"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-calories">کالری</Label>
                  <Input
                    id="item-calories"
                    type="number"
                    value={item.calories}
                    onChange={(e) => setItem({ ...item, calories: e.target.value })}
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
                    value={item.preparationTime}
                    onChange={(e) => setItem({ ...item, preparationTime: e.target.value })}
                    placeholder="۵-۷ دقیقه"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-image">لینک تصویر</Label>
                  <Input
                    id="item-image"
                    value={item.image}
                    onChange={(e) => setItem({ ...item, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="text-left"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-ingredients">مواد تشکیل‌دهنده</Label>
                <Input
                  id="item-ingredients"
                  value={item.ingredients}
                  onChange={(e) => setItem({ ...item, ingredients: e.target.value })}
                  placeholder="قهوه آرابیکا، شیر، فوم شیر (با کاما جدا کنید)"
                  className="text-right"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch
                    id="item-popular"
                    checked={item.isPopular}
                    onCheckedChange={(checked) => setItem({ ...item, isPopular: checked })}
                  />
                  <Label htmlFor="item-popular">آیتم محبوب</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch
                    id="item-available"
                    checked={item.isAvailable}
                    onCheckedChange={(checked) => setItem({ ...item, isAvailable: checked })}
                  />
                  <Label htmlFor="item-available">موجود</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveChanges}>
                {editingItem ? "بروزرسانی" : "افزودن آیتم"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

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
import { Plus, Edit, Trash2, GripVertical } from "lucide-react"
import { useCafe } from "@/context/CafeContext"

const initialCategoryState = { name: "", description: "", icon: "📋" }

export function CategoriesTab() {
  const { cafeData, activeMenuId, addCategory, updateCategory, deleteCategory } = useCafe()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [category, setCategory] = useState(initialCategoryState)
  const [isLoading, setIsLoading] = useState(false)

  const activeMenu = cafeData?.menus.find((m) => m.id === activeMenuId)

  useEffect(() => {
    if (editingCategory) {
      setCategory(editingCategory)
    } else {
      setCategory(initialCategoryState)
    }
  }, [editingCategory])

  const handleOpenDialog = (category = null) => {
    setEditingCategory(category)
    setIsDialogOpen(true)
  }

  const handleSaveChanges = async () => {
    if (!activeMenuId) return
    setIsLoading(true)
    try {
      if (editingCategory) {
        await updateCategory(activeMenuId, category)
      } else {
        await addCategory(activeMenuId, category)
      }
      setIsDialogOpen(false)
      setEditingCategory(null)
    } catch (error) {
      alert("خطا در ذخیره دسته‌بندی")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (categoryId: number) => {
    if (!activeMenuId || !confirm("آیا از حذف این دسته‌بندی و تمام آیتم‌های آن مطمئن هستید؟")) return
    setIsLoading(true)
    try {
        await deleteCategory(activeMenuId, categoryId)
    } catch (error) {
        alert("خطا در حذف دسته‌بندی")
    } finally {
        setIsLoading(false)
    }
  }

  if (!activeMenu) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>مدیریت دسته‌بندی‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <p>برای مدیریت دسته‌بندی‌ها، ابتدا یک منو از بالا انتخاب کنید.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>مدیریت دسته‌بندی‌ها</CardTitle>
            <CardDescription>دسته‌بندی‌های منوی «{activeMenu.name}» را مدیریت کنید</CardDescription>
          </div>
          <Button onClick={() => handleOpenDialog()} disabled={isLoading}>
            <Plus className="h-4 w-4 ml-2" />
            افزودن دسته‌بندی
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeMenu.categories.map((cat) => (
            <Card key={cat.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                    <span className="text-2xl">{cat.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-right">{cat.name}</h4>
                    <p className="text-sm text-gray-600 text-right">{cat.description}</p>
                    <Badge variant="secondary" className="mt-1">
                      {cat.items.length} آیتم
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={cat.is_visible}
                    onCheckedChange={(checked) => updateCategory(activeMenuId, { ...cat, is_visible: checked })}
                    disabled={isLoading}
                  />
                  <Button variant="outline" size="sm" onClick={() => handleOpenDialog(cat)} disabled={isLoading}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(cat.id)}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-background">
            <DialogHeader>
              <DialogTitle>{editingCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}</DialogTitle>
              <DialogDescription>اطلاعات دسته‌بندی را وارد کنید</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">نام دسته‌بندی *</Label>
                <Input
                  id="category-name"
                  value={category.name}
                  onChange={(e) => setCategory({ ...category, name: e.target.value })}
                  placeholder="مثال: نوشیدنی‌های گرم"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-description">توضیحات</Label>
                <Input
                  id="category-description"
                  value={category.description}
                  onChange={(e) => setCategory({ ...category, description: e.target.value })}
                  placeholder="توضیح کوتاه از دسته‌بندی"
                  className="text-right"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-icon">آیکون (ایموجی)</Label>
                <Input
                  id="category-icon"
                  value={category.icon}
                  onChange={(e) => setCategory({ ...category, icon: e.target.value })}
                  placeholder="☕"
                  className="text-center"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveChanges} disabled={isLoading}>
                {isLoading ? "در حال ذخیره..." : (editingCategory ? "بروزرسانی" : "افزودن")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

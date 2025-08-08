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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, GripVertical } from "lucide-react"
import { useCafe } from "@/context/CafeContext"

const initialCategoryState = { name: "", description: "", icon: "📋" }

export function CategoriesTab() {
  const { cafeData, activeMenuId, addCategory, updateCategory, deleteCategory } = useCafe()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [category, setCategory] = useState(initialCategoryState)

  const activeMenu = cafeData.menus.find((m) => m.id === activeMenuId)

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

  const handleSaveChanges = () => {
    if (editingCategory) {
      updateCategory(activeMenuId, category)
    } else {
      addCategory(activeMenuId, category)
    }
    setIsDialogOpen(false)
    setEditingCategory(null)
  }

  if (!activeMenu) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>مدیریت دسته‌بندی‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <p>لطفا ابتدا یک منو انتخاب کنید.</p>
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
          <Button onClick={() => handleOpenDialog()}>
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
                    checked={cat.isVisible}
                    onCheckedChange={(checked) => updateCategory(activeMenuId, { ...cat, isVisible: checked })}
                  />
                  <Button variant="outline" size="sm" onClick={() => handleOpenDialog(cat)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteCategory(activeMenuId, cat.id)}
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
              <Button onClick={handleSaveChanges}>{editingCategory ? "بروزرسانی" : "افزودن"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

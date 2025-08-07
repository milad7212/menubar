import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, GripVertical } from "lucide-react"

export function CategoriesTab({
  cafeData,
  isCategoryDialogOpen,
  setIsCategoryDialogOpen,
  editingCategory,
  setEditingCategory,
  newCategory,
  setNewCategory,
  handleAddCategory,
  handleUpdateCategory,
  handleDeleteCategory,
  setCategories, // Assuming you'll pass this down
}) {
  return (
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
                  <Button variant="outline" size="sm" onClick={() => setEditingCategory(category)}>
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
  )
}

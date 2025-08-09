"use client";

import { useState } from "react";
import { useCafe } from "@/context/CafeContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2 } from "lucide-react";

export function MenuManager() {
  const {
    cafeData,
    activeMenuId,
    setActiveMenuId,
    addMenu,
    updateMenu,
    deleteMenu,
  } = useCafe();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newMenuName, setNewMenuName] = useState("");
  const [editingMenu, setEditingMenu] = useState(null);

  const handleAddMenu = () => {
    if (newMenuName.trim()) {
      addMenu(newMenuName.trim());
      setNewMenuName("");
      setIsAddDialogOpen(false);
    }
  };

  const handleUpdateMenu = () => {
    if (editingMenu && editingMenu.name.trim()) {
      updateMenu(editingMenu.id, editingMenu.name.trim());
      setEditingMenu(null);
      setIsEditDialogOpen(false);
    }
  };

  const openEditDialog = (menu) => {
    setEditingMenu(menu);
    setIsEditDialogOpen(true);
  };

  const activeMenu = cafeData.menus.find((m) => m.id === activeMenuId);

  return (
    <div className="p-4 bg-gray-100 rounded-lg flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Label
          htmlFor="menu-select"
          className="text-sm font-medium whitespace-nowrap"
        >
          منوی فعال:
        </Label>
        <Select
          dir="rtl"
          value={activeMenuId?.toString()}
          onValueChange={(val) => setActiveMenuId(Number(val))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="یک منو انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            {cafeData.menus.map((menu) => (
              <SelectItem key={menu.id} value={menu.id.toString()}>
                {menu.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Dialog
          dir="rtl"
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
        >
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 ml-2" />
              منوی جدید
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ایجاد منوی جدید</DialogTitle>
              <DialogDescription>
                یک نام برای منوی جدید خود وارد کنید.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="new-menu-name">نام منو</Label>
              <Input
                id="new-menu-name"
                value={newMenuName}
                onChange={(e) => setNewMenuName(e.target.value)}
                placeholder="مثلا: منوی نوشیدنی"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleAddMenu}>ایجاد</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {activeMenu && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openEditDialog(activeMenu)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteMenu(activeMenuId)}
              disabled={cafeData.menus.length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ویرایش نام منو</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="edit-menu-name">نام منو</Label>
            <Input
              id="edit-menu-name"
              value={editingMenu?.name || ""}
              onChange={(e) =>
                setEditingMenu({ ...editingMenu, name: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateMenu}>ذخیره</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

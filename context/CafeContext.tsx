"use client"

import React, { createContext, useState, useContext, ReactNode } from "react"

// Define types for our data structure
interface Item {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image?: string
  isAvailable: boolean
  isPopular: boolean
  preparationTime?: string
  calories?: number
  ingredients?: string[]
  order: number
}

interface Category {
  id: number
  name: string
  description: string
  icon: string
  order: number
  isVisible: boolean
  items: Item[]
}

interface TimeSlot {
  day: string
  from: string
  to: string
}

interface Menu {
  id: number
  name: string
  timeSlots: TimeSlot[]
  categories: Category[]
}

interface CafeInfo {
  name: string
  description: string
  address: string
  phone: string
  logo: string
  selectedTheme: string
}

interface CafeData {
  info: CafeInfo
  menus: Menu[]
}

interface CafeContextType {
  cafeData: CafeData
  setCafeData: React.Dispatch<React.SetStateAction<CafeData>>
  activeMenuId: number | null
  setActiveMenuId: (id: number) => void
  addMenu: (name: string) => void
  updateMenu: (id: number, name: string) => void
  deleteMenu: (id: number) => void
  addCategory: (menuId: number, category: Omit<Category, "id" | "items" | "order" | "isVisible">) => void
  updateCategory: (menuId: number, category: Omit<Category, "items">) => void
  deleteCategory: (menuId: number, categoryId: number) => void
  addItem: (menuId: number, categoryId: number, item: Omit<Item, "id" | "order">) => void
  updateItem: (menuId: number, categoryId: number, item: Item) => void
  deleteItem: (menuId: number, categoryId: number, itemId: number) => void
}

// Create the context
const CafeContext = createContext<CafeContextType | undefined>(undefined)

// Initial data
const initialCafeData: CafeData = {
  info: {
    name: "کافه من",
    description: "بهترین قهوه و غذاهای خوشمزه",
    address: "آدرس کافه شما",
    phone: "شماره تماس",
    logo: "",
    selectedTheme: "modern",
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
              image: "/images/espresso.jpg",
              isAvailable: true,
              isPopular: false,
              preparationTime: "۲-۳ دقیقه",
              calories: 5,
              ingredients: ["قهوه آرابیکا", "آب خالص"],
              order: 1,
            },
            {
              id: 1002,
              name: "کاپوچینو",
              description: "اسپرسو با شیر بخار داده شده و فوم شیر",
              price: 60000,
              isAvailable: true,
              isPopular: true,
              image: "/images/cappuccino.jpg",
              preparationTime: "۳-۵ دقیقه",
              calories: 120,
              ingredients: ["اسپرسو", "شیر", "فوم شیر"],
              order: 2,
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
          items: [
            {
              id: 2001,
              name: "آیس کافی",
              description: "قهوه سرد با یخ",
              price: 55000,
              isAvailable: true,
              isPopular: true,
              image: "/images/ice-coffee.jpg",
              preparationTime: "۳-۴ دقیقه",
              calories: 150,
              ingredients: ["قهوه", "یخ", "شیر"],
              order: 1,
            },
          ],
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

// Create the provider component
export const CafeProvider = ({ children }: { children: ReactNode }) => {
  const [cafeData, setCafeData] = useState<CafeData>(initialCafeData)
  const [activeMenuId, setActiveMenuId] = useState<number | null>(
    initialCafeData.menus.length > 0 ? initialCafeData.menus[0].id : null
  )

  // Menu functions
  const addMenu = (name: string) => {
    setCafeData((prev) => {
      const newMenu: Menu = {
        id: Date.now(),
        name,
        timeSlots: [{ day: "all", from: "08:00", to: "23:00" }],
        categories: [],
      }
      return { ...prev, menus: [...prev.menus, newMenu] }
    })
  }

  const updateMenu = (id: number, name: string) => {
    setCafeData((prev) => ({
      ...prev,
      menus: prev.menus.map((menu) => (menu.id === id ? { ...menu, name } : menu)),
    }))
  }

  const deleteMenu = (id: number) => {
    setCafeData((prev) => ({
      ...prev,
      menus: prev.menus.filter((menu) => menu.id !== id),
    }))
    if (activeMenuId === id) {
      setActiveMenuId(cafeData.menus.length > 1 ? cafeData.menus.filter((menu) => menu.id !== id)[0].id : null)
    }
  }

  // Category functions
  const addCategory = (menuId: number, category: Omit<Category, "id" | "items" | "order" | "isVisible">) => {
    setCafeData((prev) => ({
      ...prev,
      menus: prev.menus.map((menu) =>
        menu.id === menuId
          ? {
              ...menu,
              categories: [
                ...menu.categories,
                {
                  ...category,
                  id: Date.now(),
                  items: [],
                  order: menu.categories.length + 1,
                  isVisible: true,
                },
              ],
            }
          : menu
      ),
    }))
  }

  const updateCategory = (menuId: number, updatedCategory: Omit<Category, "items">) => {
    setCafeData((prev) => ({
      ...prev,
      menus: prev.menus.map((menu) =>
        menu.id === menuId
          ? {
              ...menu,
              categories: menu.categories.map((cat) =>
                cat.id === updatedCategory.id ? { ...cat, ...updatedCategory } : cat
              ),
            }
          : menu
      ),
    }))
  }

  const deleteCategory = (menuId: number, categoryId: number) => {
    setCafeData((prev) => ({
      ...prev,
      menus: prev.menus.map((menu) =>
        menu.id === menuId
          ? { ...menu, categories: menu.categories.filter((cat) => cat.id !== categoryId) }
          : menu
      ),
    }))
  }

  // Item functions
  const addItem = (menuId: number, categoryId: number, item: Omit<Item, "id" | "order">) => {
    setCafeData((prev) => ({
      ...prev,
      menus: prev.menus.map((menu) =>
        menu.id === menuId
          ? {
              ...menu,
              categories: menu.categories.map((cat) =>
                cat.id === categoryId
                  ? {
                      ...cat,
                      items: [...cat.items, { ...item, id: Date.now(), order: cat.items.length + 1 }],
                    }
                  : cat
              ),
            }
          : menu
      ),
    }))
  }

  const updateItem = (menuId: number, categoryId: number, updatedItem: Item) => {
    setCafeData((prev) => ({
      ...prev,
      menus: prev.menus.map((menu) =>
        menu.id === menuId
          ? {
              ...menu,
              categories: menu.categories.map((cat) =>
                cat.id === categoryId
                  ? { ...cat, items: cat.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)) }
                  : cat
              ),
            }
          : menu
      ),
    }))
  }

  const deleteItem = (menuId: number, categoryId: number, itemId: number) => {
    setCafeData((prev) => ({
      ...prev,
      menus: prev.menus.map((menu) =>
        menu.id === menuId
          ? {
              ...menu,
              categories: menu.categories.map((cat) =>
                cat.id === categoryId ? { ...cat, items: cat.items.filter((item) => item.id !== itemId) } : cat
              ),
            }
          : menu
      ),
    }))
  }

  const contextValue: CafeContextType = {
    cafeData,
    setCafeData,
    activeMenuId,
    setActiveMenuId,
    addMenu,
    updateMenu,
    deleteMenu,
    addCategory,
    updateCategory,
    deleteCategory,
    addItem,
    updateItem,
    deleteItem,
  }

  return <CafeContext.Provider value={contextValue}>{children}</CafeContext.Provider>
}

// Create a custom hook for using the context
export const useCafe = () => {
  const context = useContext(CafeContext)
  if (context === undefined) {
    throw new Error("useCafe must be used within a CafeProvider")
  }
  return context
}

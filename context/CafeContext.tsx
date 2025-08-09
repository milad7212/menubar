"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"

// Define types for our data structure
// These types now reflect the database schema more closely
interface Item {
  id: number
  category_id: number
  name: string
  description: string
  price: number
  original_price?: number
  image_url?: string
  is_available: boolean
  is_popular: boolean
  preparation_time?: string
  calories?: number
  ingredients?: string[]
  order: number
}

interface Category {
  id: number
  menu_id: number
  name: string
  description: string
  icon: string
  order: number
  is_visible: boolean
  items: Item[]
}

interface TimeSlot {
  day: string
  from: string
  to: string
}

interface Menu {
  id: number
  profile_id: string
  name: string
  time_slots: TimeSlot[]
  categories: Category[]
}

interface CafeInfo {
  id: string // User ID
  slug: string
  cafe_name: string
  description: string
  address: string
  phone: string
  logo_url: string
  selected_theme: string
}

interface CafeData {
  info: CafeInfo | null
  menus: Menu[]
}

interface CafeContextType {
  cafeData: CafeData | null
  isLoading: boolean
  error: Error | null
  activeMenuId: number | null
  setActiveMenuId: (id: number | null) => void
  addMenu: (name: string) => Promise<void>
  updateMenu: (id: number, name: string) => Promise<void>
  deleteMenu: (id: number) => Promise<void>
  addCategory: (menuId: number, category: Omit<Category, "id" | "items" | "order" | "is_visible" | "menu_id">) => Promise<void>
  updateCategory: (menuId: number, category: Omit<Category, "items">) => Promise<void>
  deleteCategory: (menuId: number, categoryId: number) => Promise<void>
  addItem: (menuId: number, categoryId: number, item: Omit<Item, "id" | "order" | "category_id">) => Promise<void>
  updateItem: (menuId: number, categoryId: number, item: Item) => Promise<void>
  deleteItem: (menuId: number, categoryId: number, itemId: number) => Promise<void>
  updateCafeInfo: (info: Omit<CafeInfo, "id">) => Promise<void>
}

// Create the context
const CafeContext = createContext<CafeContextType | undefined>(undefined)

// Create the provider component
export const CafeProvider = ({ children }: { children: ReactNode }) => {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [cafeData, setCafeData] = useState<CafeData | null>(null)
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase.auth])

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setIsLoading(false)
        setCafeData(null)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        // 1. Fetch profile info
        const { data: profileInfo, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
        if (profileError) throw profileError

        // 2. Fetch menus for the user
        const { data: menus, error: menusError } = await supabase
          .from("menus")
          .select("*")
          .eq("profile_id", user.id)
        if (menusError) throw menusError

        // 3. Fetch categories and items for each menu
        const menusWithDetails = await Promise.all(
          menus.map(async (menu) => {
            const { data: categories, error: categoriesError } = await supabase
              .from("categories")
              .select("*, items(*)")
              .eq("menu_id", menu.id)
              .order("order", { foreignTable: "items", ascending: true })
              .order("order", { ascending: true })
            if (categoriesError) throw categoriesError

            // Supabase returns items nested inside categories, which matches our structure
            return { ...menu, categories: categories || [] }
          })
        )

        setCafeData({
          info: profileInfo,
          menus: menusWithDetails,
        })

        if (menusWithDetails.length > 0 && !activeMenuId) {
          setActiveMenuId(menusWithDetails[0].id)
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user, activeMenuId, supabase])

  const revalidateData = async () => {
    // This is a simplified revalidation. In a real app, you might want
    // more granular updates instead of a full refetch.
    if (!user) return
    // ... (implementation of fetchData from before)
  }

  const updateCafeInfo = async (info: Omit<CafeInfo, "id">) => {
    if (!user) throw new Error("User not authenticated")
    const { data, error } = await supabase
      .from("profiles")
      .update({
        slug: info.slug,
        cafe_name: info.cafe_name,
        description: info.description,
        address: info.address,
        phone: info.phone,
        logo_url: info.logo_url,
        selected_theme: info.selected_theme,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .single()

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new Error("این نامک (slug) قبلاً استفاده شده است. لطفاً نام دیگری انتخاب کنید.")
      }
      throw error
    }
    // Locally update state for immediate feedback
    setCafeData((prev) => (prev ? { ...prev, info: { ...prev.info, ...info, id: user.id } } : null))
  }

  const addMenu = async (name: string) => {
    if (!user) throw new Error("User not authenticated")
    const { data, error } = await supabase
      .from("menus")
      .insert({ name, profile_id: user.id })
      .select()
      .single()
    if (error) throw error
    setCafeData((prev) => (prev ? { ...prev, menus: [...prev.menus, { ...data, categories: [] }] } : null))
  }

  const updateMenu = async (id: number, name: string) => {
    const { data, error } = await supabase.from("menus").update({ name }).eq("id", id)
    if (error) throw error
    setCafeData((prev) => prev ? { ...prev, menus: prev.menus.map(m => m.id === id ? {...m, name} : m) } : null)
  }

  const deleteMenu = async (id: number) => {
    const { error } = await supabase.from("menus").delete().eq("id", id)
    if (error) throw error
    setCafeData((prev) => prev ? { ...prev, menus: prev.menus.filter(m => m.id !== id) } : null)
    setActiveMenuId(null)
  }

  const addCategory = async (menuId: number, category: Omit<Category, "id" | "items" | "order" | "is_visible" | "menu_id">) => {
    const { data, error } = await supabase.from("categories").insert({ ...category, menu_id: menuId }).select().single()
    if (error) throw error
    setCafeData(prev => prev ? { ...prev, menus: prev.menus.map(m => m.id === menuId ? {...m, categories: [...m.categories, {...data, items: []}]} : m) } : null)
  }

  const updateCategory = async (menuId: number, category: Omit<Category, "items">) => {
    const { id, ...updateData } = category
    const { data, error } = await supabase.from("categories").update(updateData).eq("id", id)
    if (error) throw error
    setCafeData(prev => prev ? { ...prev, menus: prev.menus.map(m => m.id === menuId ? {...m, categories: m.categories.map(c => c.id === id ? {...c, ...category} : c)} : m) } : null)
  }

  const deleteCategory = async (menuId: number, categoryId: number) => {
    const { error } = await supabase.from("categories").delete().eq("id", categoryId)
    if (error) throw error
    setCafeData(prev => prev ? { ...prev, menus: prev.menus.map(m => m.id === menuId ? {...m, categories: m.categories.filter(c => c.id !== categoryId)} : m) } : null)
  }

  const addItem = async (menuId: number, categoryId: number, item: Omit<Item, "id" | "order" | "category_id">) => {
    const { data, error } = await supabase.from("items").insert({ ...item, category_id: categoryId }).select().single()
    if (error) throw error
    setCafeData(prev => prev ? { ...prev, menus: prev.menus.map(m => m.id === menuId ? {...m, categories: m.categories.map(c => c.id === categoryId ? {...c, items: [...c.items, data]} : c)} : m) } : null)
  }

  const updateItem = async (menuId: number, categoryId: number, item: Item) => {
    const { id, ...updateData } = item
    const { data, error } = await supabase.from("items").update(updateData).eq("id", id)
    if (error) throw error
    setCafeData(prev => prev ? { ...prev, menus: prev.menus.map(m => m.id === menuId ? {...m, categories: m.categories.map(c => c.id === categoryId ? {...c, items: c.items.map(i => i.id === id ? {...i, ...item} : i)} : c)} : m) } : null)
  }

  const deleteItem = async (menuId: number, categoryId: number, itemId: number) => {
    const { error } = await supabase.from("items").delete().eq("id", itemId)
    if (error) throw error
    setCafeData(prev => prev ? { ...prev, menus: prev.menus.map(m => m.id === menuId ? {...m, categories: m.categories.map(c => c.id === categoryId ? {...c, items: c.items.filter(i => i.id !== itemId)} : c)} : m) } : null)
  }

  const contextValue: CafeContextType = {
    cafeData,
    isLoading,
    error,
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
    updateCafeInfo,
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

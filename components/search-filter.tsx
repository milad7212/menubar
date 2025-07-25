"use client"

import { useState } from "react"
import { Search, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

interface SearchFilterProps {
  onSearch: (query: string) => void
  onFilter: (filters: FilterOptions) => void
  categories: Array<{ id: number; name: string }>
}

interface FilterOptions {
  priceRange: [number, number]
  categories: number[]
  calorieRange: [number, number]
  isPopular: boolean
  hasDiscount: boolean
}

export function SearchFilter({ onSearch, onFilter, categories }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 200000],
    categories: [],
    calorieRange: [0, 1000],
    isPopular: false,
    hasDiscount: false,
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
  }

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilter(updatedFilters)
  }

  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      priceRange: [0, 200000],
      categories: [],
      calorieRange: [0, 1000],
      isPopular: false,
      hasDiscount: false,
    }
    setFilters(defaultFilters)
    onFilter(defaultFilters)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.categories.length > 0) count++
    if (filters.isPopular) count++
    if (filters.hasDiscount) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200000) count++
    if (filters.calorieRange[0] > 0 || filters.calorieRange[1] < 1000) count++
    return count
  }

  return (
    <div className="flex gap-2 mb-6">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="جستجو در منو..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pr-10 text-right"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => handleSearch("")}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Filter Button */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative bg-transparent">
            <SlidersHorizontal className="h-4 w-4 ml-2" />
            فیلتر
            {getActiveFiltersCount() > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>فیلتر محصولات</SheetTitle>
            <SheetDescription>محصولات را بر اساس معیارهای مختلف فیلتر کنید</SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Price Range */}
            <div className="space-y-3">
              <Label>محدوده قیمت (تومان)</Label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange({ priceRange: value as [number, number] })}
                max={200000}
                min={0}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{filters.priceRange[0].toLocaleString("fa-IR")}</span>
                <span>{filters.priceRange[1].toLocaleString("fa-IR")}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <Label>دسته‌بندی‌ها</Label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={filters.categories.includes(category.id)}
                      onCheckedChange={(checked) => {
                        const newCategories = checked
                          ? [...filters.categories, category.id]
                          : filters.categories.filter((id) => id !== category.id)
                        handleFilterChange({ categories: newCategories })
                      }}
                    />
                    <Label htmlFor={`category-${category.id}`} className="text-sm">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Calorie Range */}
            <div className="space-y-3">
              <Label>محدوده کالری</Label>
              <Slider
                value={filters.calorieRange}
                onValueChange={(value) => handleFilterChange({ calorieRange: value as [number, number] })}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{filters.calorieRange[0]}</span>
                <span>{filters.calorieRange[1]}</span>
              </div>
            </div>

            {/* Special Filters */}
            <div className="space-y-3">
              <Label>فیلترهای ویژه</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="popular"
                    checked={filters.isPopular}
                    onCheckedChange={(checked) => handleFilterChange({ isPopular: !!checked })}
                  />
                  <Label htmlFor="popular" className="text-sm">
                    فقط محصولات محبوب
                  </Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="discount"
                    checked={filters.hasDiscount}
                    onCheckedChange={(checked) => handleFilterChange({ hasDiscount: !!checked })}
                  />
                  <Label htmlFor="discount" className="text-sm">
                    فقط محصولات تخفیف‌دار
                  </Label>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
              پاک کردن فیلترها
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

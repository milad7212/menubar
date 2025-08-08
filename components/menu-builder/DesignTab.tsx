import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Eye } from "lucide-react"
import { useCafe } from "@/context/CafeContext"
import { customerThemes } from "@/lib/themes"

export function DesignTab({ setPreviewMode }) {
  const { cafeData, setCafeData } = useCafe()

  const handleThemeSelect = (themeId: string) => {
    setCafeData({ ...cafeData, info: { ...cafeData.info, selectedTheme: themeId } })
  }

  const selectedTheme =
    customerThemes.find((theme) => theme.id === cafeData.info.selectedTheme) || customerThemes[0]

  return (
    <Card>
      <CardHeader>
        <CardTitle>انتخاب تم نمایش برای مشتریان</CardTitle>
        <CardDescription>تمی را انتخاب کنید که مشتریان منوی شما را با آن مشاهده کنند</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customerThemes.map((theme) => (
            <Card
              key={theme.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                cafeData.info.selectedTheme === theme.id ? "ring-2 ring-blue-500 shadow-lg" : ""
              }`}
              onClick={() => handleThemeSelect(theme.id)}
            >
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src={theme.preview || "/placeholder.svg"}
                  alt={theme.name}
                  fill
                  className="object-cover"
                />
                {cafeData.info.selectedTheme === theme.id && (
                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                    <Badge className="bg-blue-500">انتخاب شده</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">{theme.name}</h3>
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{theme.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleThemeSelect(theme.id)
                    setTimeout(() => setPreviewMode(true), 100)
                  }}
                >
                  <Eye className="h-4 w-4 ml-2" />
                  پیش‌نمایش این تم
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">تم انتخاب شده: {selectedTheme.name}</h4>
          <p className="text-sm text-blue-700 mb-3">{selectedTheme.description}</p>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-transparent" onClick={() => setPreviewMode(true)}>
              <Eye className="h-4 w-4 ml-2" />
              پیش‌نمایش تم انتخابی
            </Button>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => window.open("/customer-menu", "_blank")}
            >
              مشاهده نسخه مشتری
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ArrowLeft, Coffee, Clock, MapPin } from "lucide-react"

export function PreviewMode({ cafeData, setPreviewMode, customerThemes }) {
  const selectedTheme = customerThemes.find((theme) => theme.id === cafeData.info.selectedTheme) || customerThemes[0]

  return (
    <div className={`min-h-screen bg-gradient-to-br ${selectedTheme.colors.background}`} dir="rtl">
      {/* Preview Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setPreviewMode(false)}>
              <ArrowLeft className="h-4 w-4 ml-2" />
              بازگشت به ویرایش
            </Button>
            <Badge variant="secondary">حالت پیش‌نمایش - تم {selectedTheme.name}</Badge>
          </div>
        </div>
      </header>

      {/* Preview Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Cafe Info */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {cafeData.info.logo ? (
              <Image
                src={cafeData.info.logo || "/placeholder.svg"}
                alt="لوگو"
                width={60}
                height={60}
                className="rounded-full"
              />
            ) : (
              <div
                className="w-15 h-15 rounded-full flex items-center justify-center"
                style={{ backgroundColor: selectedTheme.colors.primary }}
              >
                <Coffee className="h-8 w-8 text-white" />
              </div>
            )}
            <div>
              <h1 className={`text-3xl font-bold ${selectedTheme.colors.text}`}>{cafeData.info.name}</h1>
              <p className={`${selectedTheme.colors.text} opacity-80`}>{cafeData.info.description}</p>
            </div>
          </div>
          <div className={`flex flex-wrap justify-center gap-4 text-sm ${selectedTheme.colors.text} opacity-70`}>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{cafeData.info.address}</span>
            </div>
            {/* This needs to be adapted for multiple time slots from the main menu object */}
          </div>
        </div>

        {/* Menu Categories */}
        <div className="space-y-12">
          {cafeData.menus[0].categories // Assuming we preview the first menu
            .filter((cat) => cat.isVisible)
            .map((category) => (
              <section key={category.id}>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl">{category.icon}</span>
                    <h2 className={`text-2xl font-bold ${selectedTheme.colors.text}`}>{category.name}</h2>
                  </div>
                  <p className={`${selectedTheme.colors.text} opacity-80`}>{category.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.items
                    .filter((item) => item.isAvailable)
                    .map((item) => (
                      <Card
                        key={item.id}
                        className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${selectedTheme.colors.card} border-0 shadow-md`}
                      >
                        <div className="aspect-square relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          {item.isPopular && (
                            <Badge
                              className="absolute top-2 right-2"
                              style={{ backgroundColor: selectedTheme.colors.primary }}
                            >
                              محبوب
                            </Badge>
                          )}
                          {item.originalPrice > item.price && (
                            <Badge className="absolute top-2 left-2 bg-red-500">
                              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% تخفیف
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className={`font-bold text-lg mb-2 ${selectedTheme.colors.text}`}>{item.name}</h3>
                          <p className={`text-sm mb-3 ${selectedTheme.colors.text} opacity-70`}>{item.description}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              {item.originalPrice > item.price && (
                                <span
                                  className={`text-sm line-through block ${selectedTheme.colors.text} opacity-50`}
                                >
                                  {item.originalPrice.toLocaleString("fa-IR")} تومان
                                </span>
                              )}
                              <span className="font-bold text-lg" style={{ color: selectedTheme.colors.primary }}>
                                {item.price.toLocaleString("fa-IR")} تومان
                              </span>
                            </div>
                            <div className={`text-sm ${selectedTheme.colors.text} opacity-60`}>
                              <Clock className="h-4 w-4 inline ml-1" />
                              {item.preparationTime}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </section>
            ))}
        </div>
      </div>
    </div>
  )
}

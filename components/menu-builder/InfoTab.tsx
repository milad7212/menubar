import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useCafe } from "@/context/CafeContext"

export function InfoTab() {
  const { cafeData, setCafeData } = useCafe()

  const handleInputChange = (field: string, value: string) => {
    setCafeData({ ...cafeData, info: { ...cafeData.info, [field]: value } })
  }

  const handleSaveMenu = () => {
    // In a real app, this would save to a backend.
    // For now, we can show a toast notification.
    alert("اطلاعات با موفقیت ذخیره شد!")
  }

  return (
    <Card>
      <CardHeader className="text-right">
        <CardTitle>اطلاعات پایه کافه</CardTitle>
        <CardDescription>اطلاعات اصلی کافه خود را وارد کنید</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 text-right md:order-last">
            <Label htmlFor="cafe-name">نام کافه *</Label>
            <Input
              id="cafe-name"
              value={cafeData.info.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="نام کافه شما"
              className="text-right"
            />
          </div>
          <div className="space-y-2 text-right">
            <Label htmlFor="cafe-phone">شماره تماس</Label>
            <Input
              id="cafe-phone"
              value={cafeData.info.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="۰۲۱-۱۲۳۴۵۶۷۸"
              className="text-right"
            />
          </div>
        </div>

        <div className="space-y-2 text-right">
          <Label htmlFor="cafe-description">توضیحات کافه</Label>
          <Textarea
            id="cafe-description"
            value={cafeData.info.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="توضیح کوتاهی از کافه شما"
            rows={3}
            className="text-right"
          />
        </div>

        <div className="space-y-2 text-right">
          <Label htmlFor="cafe-address">آدرس کافه</Label>
          <Input
            id="cafe-address"
            value={cafeData.info.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="آدرس کامل کافه"
            className="text-right"
          />
        </div>

        <div className="space-y-2 text-right">
          <Label htmlFor="cafe-logo">لوگوی کافه (لینک تصویر)</Label>
          <Input
            id="cafe-logo"
            value={cafeData.info.logo}
            onChange={(e) => handleInputChange("logo", e.target.value)}
            placeholder="https://example.com/logo.png"
            dir="ltr"
          />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <Button onClick={handleSaveMenu}>
          <Save className="h-4 w-4 ml-2" />
          تأیید و ذخیره اطلاعات
        </Button>
      </CardFooter>
    </Card>
  )
}

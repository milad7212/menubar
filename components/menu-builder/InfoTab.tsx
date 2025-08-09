import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useCafe } from "@/context/CafeContext"

export function InfoTab() {
  const { cafeData, updateCafeInfo } = useCafe()
  const [info, setInfo] = useState(cafeData?.info)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setInfo(cafeData?.info)
  }, [cafeData])

  const handleInputChange = (field: string, value: string) => {
    setInfo((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const handleSaveChanges = async () => {
    if (!info) return
    setIsSaving(true)
    try {
      await updateCafeInfo(info)
      alert("اطلاعات با موفقیت ذخیره شد!")
    } catch (error: any) {
      alert(`خطا در ذخیره اطلاعات: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  if (!info) {
    return <div>اطلاعات کافه در حال بارگذاری است...</div>
  }

  return (
    <Card>
      <CardHeader className="text-right">
        <CardTitle>اطلاعات پایه کافه</CardTitle>
        <CardDescription>اطلاعات اصلی کافه خود را وارد کنید</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 text-right">
            <Label htmlFor="cafe-name">نام کافه *</Label>
            <Input
              id="cafe-name"
              value={info.cafe_name || ""}
              onChange={(e) => handleInputChange("cafe_name", e.target.value)}
              placeholder="نام کافه شما"
              className="text-right"
            />
          </div>
          <div className="space-y-2 text-right">
            <Label htmlFor="cafe-slug">آدرس صفحه منو (Slug) *</Label>
            <Input
              id="cafe-slug"
              value={info.slug || ""}
              onChange={(e) => handleInputChange("slug", e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              placeholder="your-cafe-name"
              className="text-left"
              dir="ltr"
            />
             <p className="text-xs text-muted-foreground text-right">فقط حروف انگلیسی کوچک، اعداد و خط تیره (-)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 text-right md:order-last">
             <Label htmlFor="cafe-phone">شماره تماس</Label>
            <Input
              id="cafe-phone"
              value={info.phone || ""}
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
            value={info.description || ""}
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
            value={info.address || ""}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="آدرس کامل کافه"
            className="text-right"
          />
        </div>

        <div className="space-y-2 text-right">
          <Label htmlFor="cafe-logo">لوگوی کافه (لینک تصویر)</Label>
          <Input
            id="cafe-logo"
            value={info.logo_url || ""}
            onChange={(e) => handleInputChange("logo_url", e.target.value)}
            placeholder="https://example.com/logo.png"
            dir="ltr"
          />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          <Save className="h-4 w-4 ml-2" />
          {isSaving ? "در حال ذخیره..." : "تأیید و ذخیره اطلاعات"}
        </Button>
      </CardFooter>
    </Card>
  )
}

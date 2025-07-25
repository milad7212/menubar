"use client"

import { useState } from "react"
import { QrCode, Download, Share2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface QRGeneratorProps {
  cafeInfo: {
    name: string
    description: string
    selectedTheme: string
  }
}

export function QRGenerator({ cafeInfo }: QRGeneratorProps) {
  const [qrSize, setQrSize] = useState(256)
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const menuUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/customer-menu?theme=${cafeInfo.selectedTheme}`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    menuUrl,
  )}&size=${qrSize}x${qrSize}`

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const downloadQR = () => {
    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `${cafeInfo.name}-menu-qr.png`
    link.click()
  }

  const shareMenu = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `منوی ${cafeInfo.name}`,
          text: cafeInfo.description,
          url: menuUrl,
        })
      } catch (err) {
        console.error("Error sharing: ", err)
      }
    } else {
      copyToClipboard(menuUrl)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <QrCode className="h-4 w-4" />
          تولید QR کد
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md text-right">
        <DialogHeader>
          <DialogTitle>QR کد منوی دیجیتال</DialogTitle>
          <DialogDescription>QR کد منوی کافه خود را تولید و اشتراک‌گذاری کنید</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="qr" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="qr">QR کد</TabsTrigger>
            <TabsTrigger value="link">لینک مستقیم</TabsTrigger>
          </TabsList>

          <TabsContent value="qr" className="space-y-4">
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
                  <img
                    src={qrCodeUrl || "/placeholder.svg"}
                    alt="QR Code"
                    width={qrSize}
                    height={qrSize}
                    className="border border-gray-200 rounded"
                  />
                </div>

                <div className="text-center mb-4">
                  <h3 className="font-semibold text-lg">{cafeInfo.name}</h3>
                  <p className="text-sm text-gray-600">منوی دیجیتال</p>
                  <Badge variant="secondary" className="mt-2">
                    تم: {cafeInfo.selectedTheme}
                  </Badge>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex gap-2">
                    <Button onClick={downloadQR} className="flex-1">
                      <Download className="h-4 w-4 ml-2" />
                      دانلود
                    </Button>
                    <Button onClick={shareMenu} variant="outline" className="flex-1 bg-transparent">
                      <Share2 className="h-4 w-4 ml-2" />
                      اشتراک
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="qr-size">اندازه QR کد: {qrSize}px</Label>
              <input
                id="qr-size"
                type="range"
                min="128"
                max="512"
                step="32"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </TabsContent>

          <TabsContent value="link" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="menu-url">لینک منوی دیجیتال</Label>
              <div className="flex gap-2">
                <Input id="menu-url" value={menuUrl} readOnly />
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(menuUrl)} className="px-3">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">نحوه استفاده:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• QR کد را روی میزها قرار دهید</li>
                <li>• لینک را در شبکه‌های اجتماعی به اشتراک بگذارید</li>
                <li>• در تابلوهای دیجیتال نمایش دهید</li>
                <li>• در کارت‌های ویزیت چاپ کنید</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

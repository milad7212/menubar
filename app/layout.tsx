import type React from "react"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import "./globals.css"
import { CafeProvider } from "@/context/CafeContext"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "کافه ساز | منوی کافه خود را بسازید",
  description: "ابزاری برای ساخت آسان و سریع منوی دیجیتال برای کافه‌ها و رستوران‌ها",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        <CafeProvider>{children}</CafeProvider>
      </body>
    </html>
  )
}

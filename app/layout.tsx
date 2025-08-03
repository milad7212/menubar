import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Vazirmatn } from "next/font/google"
import "./globals.css"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "سیستم مدیریت منوی کافه",
  description: "سیستم جامع مدیریت منو برای کافه‌ها و رستوران‌ها",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>{children}</body>
    </html>
  )
}

"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { NextIntlClientProvider } from "next-intl"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface ClientLayoutProps {
  children: React.ReactNode
  locale: string
  messages: any
}

export default function ClientLayout({ children, locale, messages }: ClientLayoutProps) {
  // Client-side only rendering to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Set the direction based on locale
  const isRtl = locale === "ar"

  // During SSR or before hydration, render a minimal layout
  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="h-16 border-b"></div>
        <main className="flex-1">{children}</main>
        <div className="border-t"></div>
      </div>
    )
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="flex min-h-screen flex-col">
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

import type React from "react"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { createTranslator, NextIntlClientProvider } from "next-intl"

import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

// List of supported locales
export const locales = ["en", "ar", "tr"]

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  try {
    const messages = (await import(`../../messages/${locale}.json`)).default
    const t = createTranslator({ locale, messages })

    return {
      title: t("metadata.title"),
      description: t("metadata.description"),
    }
  } catch (error) {
    return {
      title: "Orchid Group - Import & Export",
      description: "A subsidiary of Orchid Dates Corp",
    }
  }
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate locale
  if (!locales.includes(locale)) {
    notFound()
  }

  // Load messages for the current locale
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  // Set the direction based on locale
  const isRtl = locale === "ar"

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="flex min-h-screen flex-col">
              <Header locale={locale} />
              <main className="flex-1">{children}</main>
              <Footer locale={locale} />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

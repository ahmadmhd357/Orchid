"use client"

import type React from "react"

import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { useTranslations } from "next-intl"

import { authOptions } from "@/lib/auth"
import DashboardNav from "@/components/dashboard-nav"

export default async function DashboardLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const t = useTranslations("dashboard")
  const session = await getServerSession(authOptions)

  // Redirect to login if not authenticated
  if (!session) {
    redirect(`/${locale}/login`)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">
          <DashboardNav locale={locale} />
        </aside>
        <main>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
            <p className="text-muted-foreground">{t("description")}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}

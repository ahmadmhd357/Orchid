"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { BarChart3, Package, Settings, ShoppingCart, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DashboardNavProps {
  locale: string
}

export default function DashboardNav({ locale }: DashboardNavProps) {
  const t = useTranslations("dashboard.nav")
  const pathname = usePathname()

  const navItems = [
    {
      title: t("dashboard"),
      href: `/${locale}/dashboard`,
      icon: BarChart3,
    },
    {
      title: t("products"),
      href: `/${locale}/dashboard/products`,
      icon: Package,
    },
    {
      title: t("orders"),
      href: `/${locale}/dashboard/orders`,
      icon: ShoppingCart,
    },
    {
      title: t("customers"),
      href: `/${locale}/dashboard/customers`,
      icon: Users,
    },
    {
      title: t("settings"),
      href: `/${locale}/dashboard/settings`,
      icon: Settings,
    },
  ]

  return (
    <nav className="grid gap-2">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn("justify-start", pathname === item.href && "bg-muted font-medium")}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}

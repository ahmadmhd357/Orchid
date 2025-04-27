"use client"

import { useTranslations } from "next-intl"
import { formatDistanceToNow } from "date-fns"
import { enUS, ar, tr } from "date-fns/locale"
import { useParams } from "next/navigation"
import { Check, Package, ShoppingCart, User } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentActivity() {
  const t = useTranslations("dashboard.activity")
  const { locale } = useParams()

  // Select locale for date formatting
  const dateLocale = locale === "ar" ? ar : locale === "tr" ? tr : enUS

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "order",
      title: t("items.1.title"),
      description: t("items.1.description"),
      icon: ShoppingCart,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: 2,
      type: "product",
      title: t("items.2.title"),
      description: t("items.2.description"),
      icon: Package,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: 3,
      type: "user",
      title: t("items.3.title"),
      description: t("items.3.description"),
      icon: User,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    },
    {
      id: 4,
      type: "order",
      title: t("items.4.title"),
      description: t("items.4.description"),
      icon: Check,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    },
  ]

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-9 w-9 border">
            <AvatarFallback className="bg-primary/10">
              <activity.icon className="h-4 w-4 text-primary" />
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">{activity.title}</p>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(activity.timestamp, {
                addSuffix: true,
                locale: dateLocale,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

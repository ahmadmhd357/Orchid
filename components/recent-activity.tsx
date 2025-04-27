"use client"

import { useTranslations } from "next-intl"
import { formatDistanceToNow } from "date-fns"
import { enUS, ar, tr } from "date-fns/locale"
import { useParams } from "next/navigation"
import { Check, Package, ShoppingCart, User } from "lucide-react"
import { useEffect, useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentActivity() {
  const t = useTranslations("dashboard.activity")
  const { locale } = useParams()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Select locale for date formatting
  const dateLocale = locale === "ar" ? ar : locale === "tr" ? tr : enUS

  // Mock activity data with fixed timestamps to prevent hydration mismatches
  const activities = [
    {
      id: 1,
      type: "order",
      title: t("items.1.title"),
      description: t("items.1.description"),
      icon: ShoppingCart,
      timestamp: new Date(2023, 5, 15, 10, 30), // Fixed date
    },
    {
      id: 2,
      type: "product",
      title: t("items.2.title"),
      description: t("items.2.description"),
      icon: Package,
      timestamp: new Date(2023, 5, 15, 8, 0), // Fixed date
    },
    {
      id: 3,
      type: "user",
      title: t("items.3.title"),
      description: t("items.3.description"),
      icon: User,
      timestamp: new Date(2023, 5, 14, 16, 0), // Fixed date
    },
    {
      id: 4,
      type: "order",
      title: t("items.4.title"),
      description: t("items.4.description"),
      icon: Check,
      timestamp: new Date(2023, 5, 14, 12, 0), // Fixed date
    },
  ]

  // Don't format dates on the server
  if (!isMounted) {
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
              <p className="text-xs text-muted-foreground">-</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

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

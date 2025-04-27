"use client"

import { useTranslations } from "next-intl"
import { BarChart3, Package, ShoppingCart, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardChart } from "@/components/dashboard-chart"
import { RecentActivity } from "@/components/recent-activity"

export default function DashboardPage() {
  const t = useTranslations("dashboard")

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("stats.products")}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254</div>
            <p className="text-xs text-muted-foreground">+12 {t("stats.lastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("stats.orders")}</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">+24% {t("stats.lastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("stats.customers")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+8% {t("stats.lastMonth")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("stats.revenue")}</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">+15% {t("stats.lastMonth")}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">{t("tabs.overview")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("tabs.analytics")}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("overview.title")}</CardTitle>
              <CardDescription>{t("overview.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("activity.title")}</CardTitle>
              <CardDescription>{t("activity.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("analytics.title")}</CardTitle>
              <CardDescription>{t("analytics.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

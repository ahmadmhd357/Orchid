"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"

export default function AboutPage() {
  const t = useTranslations("about")

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">{t("title")}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
      </div>

      {/* Company Overview */}
      <section className="mb-20">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=800&width=1200&text=About+Orchid+Group"
              alt="About Orchid Group"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">{t("overview.title")}</h2>
            <p className="text-muted-foreground">{t("overview.description1")}</p>
            <p className="text-muted-foreground">{t("overview.description2")}</p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">{t("values.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t("values.subtitle")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col p-6 bg-card rounded-xl border shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t(`values.items.${i}.title`)}</h3>
              <p className="text-muted-foreground">{t(`values.items.${i}.description`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Parent Company */}
      <section className="mb-20 bg-muted rounded-xl p-8">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">{t("parent.title")}</h2>
            <p className="text-muted-foreground">{t("parent.description1")}</p>
            <p className="text-muted-foreground">{t("parent.description2")}</p>
          </div>
          <div className="relative h-[300px] rounded-xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=800&text=Orchid+Dates+Corp"
              alt="Orchid Dates Corp"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

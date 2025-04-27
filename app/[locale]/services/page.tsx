"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Check } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  const t = useTranslations("services")

  // Mock services data
  const services = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    features: Array.from({ length: 4 }, (_, j) => j + 1),
  }))

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">{t("title")}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t("description")}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Image
                  src={`/placeholder.svg?height=64&width=64&text=Icon+${service.id}`}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
              </div>
              <CardTitle>{t(`items.${service.id}.title`)}</CardTitle>
              <CardDescription>{t(`items.${service.id}.subtitle`)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="mb-4 text-muted-foreground">{t(`items.${service.id}.description`)}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{t(`items.${service.id}.features.${feature}`)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductsPage() {
  const t = useTranslations("products")

  // Mock product categories and products
  const categories = ["all", "category1", "category2", "category3"]
  const products = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    category: `category${(i % 3) + 1}`,
  }))

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">{t("title")}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t("description")}</p>
      </div>

      <Tabs defaultValue="all" className="mb-12">
        <TabsList className="w-full flex justify-center mb-8 flex-wrap">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-lg px-6">
              {t(`categories.${category}`)}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products
                .filter((product) => category === "all" || product.category === category)
                .map((product) => (
                  <div key={product.id} className="group overflow-hidden rounded-xl border">
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=400&width=600&text=Product+${product.id}`}
                        alt={t(`items.${product.id}.title`)}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{t(`items.${product.id}.title`)}</h3>
                      <p className="text-muted-foreground mb-4">{t(`items.${product.id}.description`)}</p>
                      <Button variant="outline" asChild>
                        <Link href={`/products/${product.id}`}>{t("viewDetails")}</Link>
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

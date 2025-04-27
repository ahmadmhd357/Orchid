"use client"

import type React from "react"

import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductImageUpload } from "@/components/product-image-upload"

export default function ProductEditPage() {
  const t = useTranslations("dashboard.productEdit")
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isNewProduct = params.id === "new"
  const productId = isNewProduct ? null : Number(params.id)

  // Mock product data (would be fetched from API in a real app)
  const [product, setProduct] = useState({
    name: isNewProduct ? "" : `Product ${productId}`,
    description: isNewProduct ? "" : `Description for Product ${productId}`,
    category: isNewProduct ? "" : `Category ${productId ? (productId % 3) + 1 : 1}`,
    price: isNewProduct ? "" : `${Math.floor(Math.random() * 1000) + 100}`,
    stock: isNewProduct ? "" : `${Math.floor(Math.random() * 100)}`,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setProduct((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: isNewProduct ? t("toasts.created.title") : t("toasts.updated.title"),
      description: isNewProduct ? t("toasts.created.description") : t("toasts.updated.description"),
    })

    setIsSubmitting(false)

    if (isNewProduct) {
      router.push("/dashboard/products")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{isNewProduct ? t("titleNew") : t("titleEdit")}</h2>
        <p className="text-muted-foreground">{isNewProduct ? t("descriptionNew") : t("descriptionEdit")}</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{t("tabs.general")}</TabsTrigger>
          <TabsTrigger value="images">{t("tabs.images")}</TabsTrigger>
          <TabsTrigger value="translations">{t("tabs.translations")}</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("form.name")}</Label>
                  <Input id="name" name="name" value={product.name} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t("form.description")}</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">{t("form.category")}</Label>
                  <Select value={product.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder={t("form.selectCategory")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Category 1">{t("form.categories.1")}</SelectItem>
                      <SelectItem value="Category 2">{t("form.categories.2")}</SelectItem>
                      <SelectItem value="Category 3">{t("form.categories.3")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">{t("form.price")}</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={product.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">{t("form.stock")}</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={product.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => router.push("/dashboard/products")}>
                    {t("form.cancel")}
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? t("form.saving") : t("form.save")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images">
          <Card>
            <CardContent className="pt-6">
              <ProductImageUpload />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="translations">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">{t("translations.english")}</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name-en">{t("form.name")}</Label>
                      <Input id="name-en" defaultValue={product.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description-en">{t("form.description")}</Label>
                      <Textarea id="description-en" defaultValue={product.description} rows={3} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">{t("translations.arabic")}</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name-ar">{t("form.name")}</Label>
                      <Input id="name-ar" dir="rtl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description-ar">{t("form.description")}</Label>
                      <Textarea id="description-ar" dir="rtl" rows={3} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">{t("translations.turkish")}</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name-tr">{t("form.name")}</Label>
                      <Input id="name-tr" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description-tr">{t("form.description")}</Label>
                      <Textarea id="description-tr" rows={3} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button type="button" variant="outline">
                    {t("form.cancel")}
                  </Button>
                  <Button type="button">{t("form.save")}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

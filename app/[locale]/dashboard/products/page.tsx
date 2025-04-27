"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductActions } from "@/components/product-actions"

// Mock products data
const mockProducts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: `Category ${(i % 3) + 1}`,
  price: Math.floor(Math.random() * 1000) + 100,
  stock: Math.floor(Math.random() * 100),
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
}))

export default function ProductsPage() {
  const t = useTranslations("dashboard.products")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <Plus className="mr-2 h-4 w-4" /> {t("addNew")}
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder={t("search")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">{t("table.image")}</TableHead>
              <TableHead>{t("table.name")}</TableHead>
              <TableHead>{t("table.category")}</TableHead>
              <TableHead className="text-right">{t("table.price")}</TableHead>
              <TableHead className="text-right">{t("table.stock")}</TableHead>
              <TableHead className="text-right">{t("table.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="h-10 w-10 relative rounded overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=40&width=40&text=${product.id}`}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">${product.price}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell className="text-right">
                  <ProductActions product={product} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function ProductImageUpload() {
  const t = useTranslations("dashboard.productEdit.images")
  const { toast } = useToast()
  const [images, setImages] = useState<string[]>([
    "/placeholder.svg?height=200&width=200&text=Product+Image+1",
    "/placeholder.svg?height=200&width=200&text=Product+Image+2",
  ])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    // In a real app, you would handle file uploads here
    toast({
      title: t("uploadSuccess.title"),
      description: t("uploadSuccess.description"),
    })

    // Simulate adding a new image
    setImages([...images, "/placeholder.svg?height=200&width=200&text=New+Image"])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would handle file uploads here
      toast({
        title: t("uploadSuccess.title"),
        description: t("uploadSuccess.description"),
      })

      // Simulate adding a new image
      setImages([...images, "/placeholder.svg?height=200&width=200&text=New+Image"])
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    toast({
      title: t("removeSuccess.title"),
      description: t("removeSuccess.description"),
    })
  }

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">{t("dropzone.title")}</h3>
        <p className="text-sm text-muted-foreground mb-4">{t("dropzone.description")}</p>
        <div>
          <label htmlFor="file-upload">
            <Button type="button" variant="outline" className="relative">
              {t("dropzone.browse")}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={handleFileChange}
              />
            </Button>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">{t("gallery.title")}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square relative rounded-md overflow-hidden border">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">{t("gallery.remove")}</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

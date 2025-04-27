"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const t = useTranslations("contact")
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: t("form.success.title"),
      description: t("form.success.message"),
    })

    setIsSubmitting(false)
    event.currentTarget.reset()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">{t("title")}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t("description")}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">{t("form.title")}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">{t("form.firstName")}</Label>
                  <Input id="first-name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">{t("form.lastName")}</Label>
                  <Input id="last-name" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("form.email")}</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{t("form.subject")}</Label>
                <Input id="subject" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t("form.message")}</Label>
                <Textarea id="message" rows={5} required />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("form.submitting") : t("form.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">{t("info.title")}</h2>
            <p className="text-muted-foreground mb-8">{t("info.description")}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-primary mr-4 mt-0.5" />
              <div>
                <h3 className="font-medium">{t("info.address.title")}</h3>
                <p className="text-muted-foreground">{t("info.address.line1")}</p>
                <p className="text-muted-foreground">{t("info.address.line2")}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-6 w-6 text-primary mr-4 mt-0.5" />
              <div>
                <h3 className="font-medium">{t("info.phone.title")}</h3>
                <p className="text-muted-foreground">{t("info.phone.office")}: +90 123 456 7890</p>
                <p className="text-muted-foreground">{t("info.phone.mobile")}: +90 123 456 7891</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="h-6 w-6 text-primary mr-4 mt-0.5" />
              <div>
                <h3 className="font-medium">{t("info.email.title")}</h3>
                <p className="text-muted-foreground">{t("info.email.general")}: info@orchidgroup.com</p>
                <p className="text-muted-foreground">{t("info.email.support")}: support@orchidgroup.com</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative h-[300px] rounded-xl overflow-hidden mt-8">
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">{t("info.map")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

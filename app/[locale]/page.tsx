"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Home() {
  const t = useTranslations("home")

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{t("hero.title")}</h1>
            <p className="text-muted-foreground md:text-xl">{t("hero.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link href="/products">{t("hero.cta.products")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">{t("hero.cta.contact")}</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=800&width=1200"
              alt="Orchid Group Import Export"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">{t("services.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("services.subtitle")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col p-6 bg-card rounded-xl border shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t(`services.items.${i}.title`)}</h3>
              <p className="text-muted-foreground flex-1">{t(`services.items.${i}.description`)}</p>
              <Button variant="link" className="px-0 mt-4" asChild>
                <Link href="/services">{t("services.learnMore")}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">{t("products.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("products.subtitle")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group overflow-hidden rounded-xl border">
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=400&width=600&text=Product+${i}`}
                  alt={t(`products.items.${i}.title`)}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{t(`products.items.${i}.title`)}</h3>
                <p className="text-muted-foreground mb-4">{t(`products.items.${i}.description`)}</p>
                <Button variant="outline" asChild>
                  <Link href={`/products/${i}`}>{t("products.viewDetails")}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild size="lg">
            <Link href="/products">{t("products.viewAll")}</Link>
          </Button>
        </div>
      </section>

      {/* About Preview */}
      <section className="mb-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="relative h-[400px] rounded-xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/placeholder.svg?height=800&width=1200&text=About+Orchid+Group"
              alt="About Orchid Group"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4 order-1 lg:order-2">
            <h2 className="text-3xl font-bold tracking-tight">{t("about.title")}</h2>
            <p className="text-muted-foreground">{t("about.description")}</p>
            <Button asChild>
              <Link href="/about">{t("about.learnMore")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="rounded-xl bg-primary text-primary-foreground p-8 md:p-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">{t("cta.title")}</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">{t("cta.description")}</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">{t("cta.button")}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

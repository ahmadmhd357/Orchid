"use client"

import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

interface FooterProps {
  locale: string
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer")

  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-1 lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="relative h-8 w-8">
                <Image
                  src="/placeholder.svg?height=32&width=32&text=OG"
                  alt="Orchid Group Logo"
                  fill
                  className="rounded"
                />
              </div>
              <div className="text-lg font-bold">Orchid Group</div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">{t("description")}</p>
            <p className="text-xs text-muted-foreground">{t("subsidiary")}</p>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">{t("links.company.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="text-sm text-muted-foreground hover:text-primary">
                  {t("links.company.about")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-sm text-muted-foreground hover:text-primary">
                  {t("links.company.services")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products`} className="text-sm text-muted-foreground hover:text-primary">
                  {t("links.company.products")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-sm text-muted-foreground hover:text-primary">
                  {t("links.company.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">{t("links.legal.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/privacy`} className="text-sm text-muted-foreground hover:text-primary">
                  {t("links.legal.privacy")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-sm text-muted-foreground hover:text-primary">
                  {t("links.legal.terms")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">{t("contact.title")}</h3>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground mb-2">{t("contact.address")}</p>
              <p className="text-sm text-muted-foreground mb-2">{t("contact.email")}: info@orchidgroup.com</p>
              <p className="text-sm text-muted-foreground">{t("contact.phone")}: +90 123 456 7890</p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Orchid Group. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}

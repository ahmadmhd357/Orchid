"use client"

import { usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { Check, Globe } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { locales } from "@/app/[locale]/layout"

interface LanguageSwitcherProps {
  locale: string
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const t = useTranslations("languageSwitcher")
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    // Replace the current locale in the path with the new one
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  const languageNames: Record<string, string> = {
    en: t("languages.en"),
    ar: t("languages.ar"),
    tr: t("languages.tr"),
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t("label")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((l) => (
          <DropdownMenuItem key={l} onClick={() => switchLocale(l)} className="flex items-center gap-2">
            {l === locale && <Check className="h-4 w-4" />}
            <span className={l === locale ? "font-medium" : ""}>{languageNames[l]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

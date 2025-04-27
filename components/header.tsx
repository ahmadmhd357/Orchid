"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"
import { cn } from "@/lib/utils"

interface HeaderProps {
  locale: string
}

export default function Header({ locale }: HeaderProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Remove locale prefix from pathname for matching
  const path = pathname.replace(`/${locale}`, "")

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image
                src="/placeholder.svg?height=32&width=32&text=OG"
                alt="Orchid Group Logo"
                fill
                className="rounded"
              />
            </div>
            <div>
              <div className="text-lg font-bold">Orchid Group</div>
              <div className="text-xs text-muted-foreground">A subsidiary of Orchid Dates Corp</div>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={`/${locale}${item.href}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                path === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher locale={locale} />

          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
            <Link href={`/${locale}/login`}>Login</Link>
          </Button>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <div className="flex flex-col gap-4 px-6">
                <Link href={`/${locale}`} className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
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

                <div className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={`/${locale}${item.href}`}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        path === item.href ? "text-primary" : "text-muted-foreground",
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-4">
                  <Button asChild className="w-full" size="sm">
                    <Link href={`/${locale}/login`} onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

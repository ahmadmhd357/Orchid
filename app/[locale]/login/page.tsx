"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations("login")
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        toast({
          title: t("error.title"),
          description: t("error.message"),
          variant: "destructive",
        })
      } else {
        router.push(`/${locale}/dashboard`)
      }
    } catch (error) {
      toast({
        title: t("error.title"),
        description: t("error.message"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("form.email")}</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("form.password")}</Label>
                <Link
                  href={`/${locale}/forgot-password`}
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  {t("form.forgot")}
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? t("form.loading") : t("form.submit")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

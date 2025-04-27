"use client"

import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface ProductActionsProps {
  product: {
    id: number
    name: string
  }
}

export function ProductActions({ product }: ProductActionsProps) {
  const t = useTranslations("dashboard.products.actions")
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    toast({
      title: t("deleteSuccess.title"),
      description: t("deleteSuccess.description", { name: product.name }),
    })
  }

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">{t("open")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push(`/dashboard/products/${product.id}`)}>
            <Pencil className="mr-2 h-4 w-4" />
            <span>{t("edit")}</span>
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>{t("delete")}</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deleteConfirm.title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("deleteConfirm.description", { name: product.name })}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("deleteConfirm.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
            {t("deleteConfirm.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

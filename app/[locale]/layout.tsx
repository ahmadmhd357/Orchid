"use client";
import type React from "react";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { createTranslator } from "next-intl";

import ClientLayout from "@/components/client-layout";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

// List of supported locales
export const locales = ["en", "ar", "tr"];

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  // Load messages for the current locale
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  // Set the direction based on locale
  const isRtl = locale === "ar";

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout locale={locale} messages={messages}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

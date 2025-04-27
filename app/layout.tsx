import type { ReactNode } from "react";
import { createTranslator } from "next-intl";
import type { Metadata } from "next";
import "./globals.css";

export const locales = ["en", "ar", "tr"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    console.log(locale, messages);

    const t = createTranslator({ locale, messages });

    return {
      title: t("Orchid Group"),
      description: t("Orchid Group"),
    };
  } catch (error) {
    return {
      title: "Orchid Group - Import & Export",
      description: "A subsidiary of Orchid Dates Corp",
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

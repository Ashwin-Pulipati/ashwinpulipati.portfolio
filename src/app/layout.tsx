import type { Metadata } from "next";
import { Arizonia, Nunito, Nunito_Sans } from "next/font/google";
import { ThemeProvider as NextJSThemeProvider } from "next-themes";

import "./globals.css";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Scroller from "@/components/scroller";
import { Toaster } from "@/components/ui/sonner";

const arizonia = Arizonia({
  variable: "--font-arizonia",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunitoSans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashwin Pulipati Portfolio",
  description:
    "The portfolio of Ashwin Pulipati - building modern, scalable software across the stack. If it runs on code, I build it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${arizonia.variable} ${nunito.variable} ${nunitoSans.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <NextJSThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main
            id="main-content"
            className="min-h-screen mx-auto max-w-7xl px-4 py-8 lg:pt-18"
          >
            {children}
          </main>
          <Footer />
          <Scroller />
          <Toaster richColors closeButton />
        </NextJSThemeProvider>
      </body>
    </html>
  );
}

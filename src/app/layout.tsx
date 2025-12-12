import type { Metadata } from "next";
import { Arizonia, Nunito, Nunito_Sans } from "next/font/google";
import { ThemeProvider as NextJSThemeProvider } from "next-themes";

import "./globals.css";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Scroller from "@/components/scroller";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

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
  title: {
    default: "Ashwin Pulipati",
    template: `%s - Ashwin Pulipati`,
  },
  description:
    "The official portfolio of Ashwin Pulipati – a software engineer specializing in building modern, scalable web applications and innovative solutions. Explore projects, experience, and expertise.",
  keywords: [
    "Ashwin Pulipati",
    "portfolio",
    "software engineer",
    "web development",
    "Next.js",
    "React",
    "TypeScript",
    "full-stack",
    "frontend",
    "backend",
  ],
  authors: [
    { name: "Ashwin Pulipati", url: "https://github.com/Ashwin-Pulipati" },
  ],
  creator: "Ashwin Pulipati",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ashwinpulipati.vercel.app/",
    title: "Ashwin Pulipati's Portfolio",
    description:
      "The official portfolio of Ashwin Pulipati – a software engineer specializing in building modern, scalable web applications and innovative solutions. Explore projects, experience, and expertise.",
    siteName: "Ashwin Pulipati's Portfolio",
  },
};

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${arizonia.variable} ${nunito.variable} ${nunitoSans.variable}`}
    >
      <body className="bg-background text-foreground antialiased min-h-screen overflow-y-auto overflow-x-hidden">
        <NextJSThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              <main
                id="main-content"
                role="main"
                className="mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-8"
              >
                {children}
              </main>
              <Footer />
            </SidebarInset>
          </SidebarProvider>
          <Scroller />
          <Toaster richColors closeButton position="top-right" />
        </NextJSThemeProvider>
      </body>
    </html>
  );
}

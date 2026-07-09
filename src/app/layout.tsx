import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { PageTransition } from "@/components/providers/page-transition";
import { Toaster } from "@/components/ui/sonner";
import { WhatsappFloat } from "@/components/shared/whatsapp-float";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { ServiceWorkerRegister } from "@/components/pwa/sw-register";
import { siteConfig } from "@/config/site.config";
import { eventConfig } from "@/config/event.config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const seoTitle = `${eventConfig.name} ${eventConfig.edition} — ${eventConfig.officialName}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seoTitle,
    template: `%s · ${eventConfig.name} ${eventConfig.edition}`,
  },
  description: eventConfig.description,
  keywords: [
    "curso de enfermería",
    "enfermería en centro quirúrgico",
    "seguridad del paciente",
    "EsSalud",
    "colegio de enfermeros del perú",
    "enfermería quirúrgica",
    "curso virtual enfermería",
    "certificación enfermería",
    "quirófano del futuro",
  ],
  authors: [{ name: siteConfig.organizer.name }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: `${eventConfig.name} ${eventConfig.edition}`,
    title: seoTitle,
    description: eventConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: eventConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: eventConfig.shortName,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#060b14" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-100 focus-visible:rounded-lg focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-primary-foreground"
        >
          Saltar al contenido
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <QueryProvider>
              <PageTransition>{children}</PageTransition>
              <WhatsappFloat />
              <Toaster richColors position="top-center" />
            </QueryProvider>
          </MotionProvider>
        </ThemeProvider>
        <AnalyticsScripts />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}

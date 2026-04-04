import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { ThemeScript } from '@/components/layout/ThemeScript'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import ServiceWorkerRegistration from '@/components/common/ServiceWorkerRegistration'
import ScrollProgress from '@/components/common/ScrollProgress'
import BackToTop from '@/components/common/BackToTop'
import CursorSpotlight from '@/components/common/CursorSpotlight'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Mateusz Paulus — Fullstack Developer',
    template: '%s | Mateusz Paulus',
  },
  description: 'Portfolio fullstack developera. Next.js, TypeScript, Node.js, PostgreSQL.',
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Paulus.dev',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    apple: '/icons/icon-192x192.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Mateusz Paulus',
    title: 'Mateusz Paulus — Fullstack Developer',
    description: 'Portfolio fullstack developera. Next.js, TypeScript, Node.js.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mateusz Paulus — Fullstack Developer',
    description: 'Portfolio fullstack developera. Next.js, TypeScript, Node.js.',
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <CursorSpotlight />
        <ScrollProgress />
        <ThemeScript />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
        <BackToTop />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { ThemeScript } from '@/components/layout/ThemeScript'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import ServiceWorkerRegistration from '@/components/common/ServiceWorkerRegistration'
import ScrollProgress from '@/components/common/ScrollProgress'
import BackToTop from '@/components/common/BackToTop'
import CursorSpotlight from '@/components/common/CursorSpotlight'
import CustomCursor from '@/components/common/CustomCursor'
import ShaderBackgroundLoader from '@/components/common/ShaderBackgroundLoader'
import JsonLd from '@/components/common/JsonLd'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const BASE_URL = 'https://mateuszpaulus.dev'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'

  const title = 'Mateusz Paulus — Fullstack Developer'
  const description = isEn
    ? 'Fullstack Developer specializing in Next.js, TypeScript and Node.js. Building fast, scalable web applications with focus on performance and clean architecture.'
    : 'Fullstack Developer specjalizujący się w Next.js, TypeScript i Node.js. Tworzę szybkie, skalowalne aplikacje webowe z naciskiem na wydajność i czystą architekturę.'

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: title,
      template: '%s | Mateusz Paulus',
    },
    description,
    keywords: [
      'Fullstack Developer',
      'Next.js Developer',
      'TypeScript',
      'React',
      'Node.js',
      'PostgreSQL',
      'Web Developer Poland',
      'Mateusz Paulus',
    ],
    authors: [{ name: 'Mateusz Paulus', url: BASE_URL }],
    creator: 'Mateusz Paulus',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        pl: `${BASE_URL}/pl`,
        en: `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/pl`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      url: `${BASE_URL}/${locale}`,
      siteName: 'Mateusz Paulus',
      title,
      description,
      images: [
        {
          url: `/api/og?locale=${locale}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og?locale=${locale}`],
    },
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Paulus.dev',
    },
    formatDetection: { telephone: false },
    icons: { apple: '/icons/icon-192x192.png' },
  }
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
        <JsonLd locale={locale} />
        <CustomCursor />
        <CursorSpotlight />
        <ScrollProgress />
        <ThemeScript />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ShaderBackgroundLoader />
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

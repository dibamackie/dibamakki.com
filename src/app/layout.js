import { DM_Sans, Manrope } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const sans = DM_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const display = Manrope({ subsets: ['latin'], variable: '--font-display', display: 'swap' })

import { siteUrl } from '@/data/site'
const title = 'Diba Makki — Apps, Automations & Websites'
const description = 'Diba Makki is a developer in Toronto who builds web apps, automations, websites, animation, browser extensions, AI integrations, and games.'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s — Diba Makki' },
  description,
  applicationName: 'Diba Makki',
  authors: [{ name: 'Diba Makki', url: siteUrl }],
  creator: 'Diba Makki',
  keywords: ['Diba Makki', 'full stack developer', 'Toronto developer', 'web app development', 'business automation', 'web design', 'Chrome extension developer', 'AI integration', 'Next.js developer', 'React developer'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', siteName: 'Diba Makki', title, description, locale: 'en_CA' },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>{children}<SpeedInsights /></body>
    </html>
  )
}

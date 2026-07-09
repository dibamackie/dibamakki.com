import { DM_Sans, Manrope } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const sans = DM_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const display = Manrope({ subsets: ['latin'], variable: '--font-display', display: 'swap' })

export const metadata = {
  title: 'Diba Makki — Creative Full Stack Developer',
  description: 'Creative developer crafting animated, interactive web experiences with React, Next.js, Three.js, and GSAP.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>{children}<SpeedInsights /></body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Header from './header'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from '@/components/ui/toaster'
import LayoutBg from './layoutBg'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dev Finder',
  description: 'Application to help pair program with ramdom devs online',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
        <LayoutBg>
          <NextTopLoader />
          <Toaster />
          <Providers>
            <Header />
            {children}
          </Providers>
        </LayoutBg>
        </body>
      </html>
    </>
  )
}

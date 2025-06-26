import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: 'Medici - Fund a Students Future',
  description: 'Fund a Students Future',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

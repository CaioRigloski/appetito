import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const braxton = localFont({ src: '../../public/fonts/braxton.otf' })

export const metadata: Metadata = {
  title: "Appetito",
  description: "Italian Gastronomy",
  icons: {
    icon: "./icon.png"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={braxton.className}>{children}</body>
    </html>
  )
}

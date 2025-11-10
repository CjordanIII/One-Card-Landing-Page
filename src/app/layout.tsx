import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "One Card — Combine Your Balances at Checkout",
  description: "Link your existing cards and set how to fund every purchase — sequentially or by percentage. Tokenized, secure, and JIT-funded.",
  icons: {
    icon: [
      {
        url: "/small-logo.png",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/small-logo.png",
        sizes: "any",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}

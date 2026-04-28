import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { CartProvider } from '@/contexts/CartContext'

export const metadata: Metadata = {
  title: 'プレイショップ - Playwright Playground',
  description: 'Playwright MCPハンズオン用のサンプルECサイト',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="font-sans">
        <CartProvider>
          <Header />
          <main className="min-h-screen bg-gray-50">{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}

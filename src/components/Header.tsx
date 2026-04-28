'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const { itemCount } = useCart()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2" data-testid="header-logo">
            <span className="text-2xl font-bold text-indigo-600">🛍️ プレイショップ</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              data-testid="nav-products"
            >
              商品一覧
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              data-testid="nav-dashboard"
            >
              ダッシュボード
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              data-testid="nav-cart"
            >
              🛒 カート
              {itemCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  data-testid="cart-badge"
                >
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

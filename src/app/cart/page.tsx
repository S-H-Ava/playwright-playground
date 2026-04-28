'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart()
  const [checkedOut, setCheckedOut] = useState(false)

  const handleCheckout = () => {
    setCheckedOut(true)
    clearCart()
  }

  if (checkedOut) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center" data-testid="checkout-success">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">ご注文ありがとうございます！</h1>
        <p className="text-gray-600 mb-8">
          ご注文を受け付けました。商品の発送をお待ちください。
        </p>
        <Link
          href="/"
          className="inline-block bg-indigo-600 text-white font-bold px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
          data-testid="back-to-home"
        >
          ホームに戻る
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10" data-testid="cart-page">
      <h1 className="text-3xl font-bold text-gray-900 mb-8" data-testid="cart-title">
        ショッピングカート
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20" data-testid="empty-cart">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-500 text-lg mb-6">カートに商品がありません</p>
          <Link
            href="/products"
            className="inline-block bg-indigo-600 text-white font-bold px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
            data-testid="shop-now-button"
          >
            商品を探す
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4" data-testid="cart-items">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-4"
                data-testid={`cart-item-${item.id}`}
              >
                <div className="bg-gray-100 h-16 w-16 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  📦
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-semibold text-gray-900 truncate"
                    data-testid={`cart-item-name-${item.id}`}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="text-indigo-600 font-bold"
                    data-testid={`cart-item-price-${item.id}`}
                  >
                    ¥{item.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold"
                    data-testid={`decrease-quantity-${item.id}`}
                  >
                    −
                  </button>
                  <span
                    className="w-8 text-center font-semibold"
                    data-testid={`quantity-${item.id}`}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold"
                    data-testid={`increase-quantity-${item.id}`}
                  >
                    ＋
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900" data-testid={`cart-item-subtotal-${item.id}`}>
                    ¥{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-600 text-sm mt-1 transition-colors"
                    data-testid={`remove-item-${item.id}`}
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1" data-testid="order-summary">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">注文サマリー</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>商品合計 ({itemCount}点)</span>
                  <span data-testid="cart-subtotal">¥{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>送料</span>
                  <span className="text-green-600">
                    {total >= 5000 ? '無料' : '¥500'}
                  </span>
                </div>
              </div>
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-bold text-gray-900 text-lg">
                  <span>合計</span>
                  <span data-testid="cart-total">
                    ¥{(total >= 5000 ? total : total + 500).toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors"
                data-testid="checkout-button"
              >
                購入する
              </button>
              <Link
                href="/products"
                className="block text-center mt-3 text-indigo-600 hover:underline text-sm"
                data-testid="continue-shopping"
              >
                買い物を続ける
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

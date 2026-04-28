'use client'

import { use, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductById } from '@/lib/mockData'
import { useCart } from '@/contexts/CartContext'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const product = getProductById(id)
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case '電子機器':
        return '📱'
      case '衣類':
        return '👕'
      case '食品':
        return '🍵'
      default:
        return '📦'
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10" data-testid="product-detail">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-indigo-600">
          ホーム
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-indigo-600">
          商品一覧
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div
          className="bg-gray-100 rounded-2xl h-80 md:h-96 flex items-center justify-center"
          data-testid="product-image"
        >
          <span className="text-9xl">{getCategoryEmoji(product.category)}</span>
        </div>

        {/* Product Info */}
        <div data-testid="product-info">
          <span className="inline-block text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-3">
            {product.category}
          </span>
          <h1
            className="text-3xl font-bold text-gray-900 mb-3"
            data-testid="product-title"
          >
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4" data-testid="product-rating">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating} ({product.reviewCount}件のレビュー)
            </span>
          </div>

          {/* Price */}
          <p
            className="text-4xl font-bold text-gray-900 mb-6"
            data-testid="product-price"
          >
            ¥{product.price.toLocaleString()}
          </p>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed" data-testid="product-description">
            {product.description}
          </p>

          {/* Stock */}
          <p
            className={`text-sm mb-6 ${product.stock > 10 ? 'text-green-600' : 'text-orange-500'}`}
            data-testid="product-stock"
          >
            {product.stock > 10 ? `✓ 在庫あり (残り${product.stock}点)` : `⚠ 残りわずか (残り${product.stock}点)`}
          </p>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
            }`}
            data-testid="add-to-cart-button"
          >
            {added ? '✓ カートに追加しました！' : 'カートに追加'}
          </button>

          <Link
            href="/cart"
            className="block text-center mt-3 text-indigo-600 hover:underline"
            data-testid="go-to-cart-link"
          >
            カートを見る →
          </Link>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-16" data-testid="reviews-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          カスタマーレビュー ({product.reviews.length}件)
        </h2>
        <div className="space-y-4">
          {product.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              data-testid={`review-${review.id}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{review.author}</span>
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
              <div className="flex text-yellow-400 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

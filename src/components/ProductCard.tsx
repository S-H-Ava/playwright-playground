import Link from 'next/link'
import { Product } from '@/lib/mockData'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
      data-testid={`product-card-${product.id}`}
    >
      <div className="bg-gray-100 h-48 flex items-center justify-center">
        <span className="text-6xl">{getCategoryEmoji(product.category)}</span>
      </div>
      <div className="p-4">
        <span className="inline-block text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full mb-2">
          {product.category}
        </span>
        <h3
          className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-1"
          data-testid={`product-name-${product.id}`}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-400">★</span>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount}件)
          </span>
        </div>
        <p
          className="text-xl font-bold text-gray-900"
          data-testid={`product-price-${product.id}`}
        >
          ¥{product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  )
}

function getCategoryEmoji(category: string): string {
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

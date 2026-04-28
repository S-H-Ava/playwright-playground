'use client'

import { useState, useMemo } from 'react'
import ProductCard from '@/components/ProductCard'
import { products, CATEGORIES } from '@/lib/mockData'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全て')

  const filteredProducts = useMemo(() => {
    let result = products

    if (selectedCategory !== '全て') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    return result
  }, [searchQuery, selectedCategory])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8" data-testid="page-title">
        商品一覧
      </h1>

      {/* Search Bar */}
      <div className="mb-6" data-testid="search-container">
        <input
          type="text"
          placeholder="商品を検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          data-testid="search-input"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8" data-testid="category-filter">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:border-indigo-400'
            }`}
            data-testid={`category-${category}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-gray-500 mb-4" data-testid="results-count">
        {filteredProducts.length}件の商品
      </p>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16" data-testid="no-results">
          <p className="text-gray-500 text-lg">該当する商品が見つかりませんでした。</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('全て')
            }}
            className="mt-4 text-indigo-600 hover:underline"
            data-testid="clear-filters"
          >
            フィルターをクリア
          </button>
        </div>
      )}
    </div>
  )
}

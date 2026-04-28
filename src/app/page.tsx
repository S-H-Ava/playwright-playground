import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/mockData'

export default function HomePage() {
  const featured = products.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section
        className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 px-4"
        data-testid="hero-section"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="hero-title">
            プレイショップへようこそ
          </h1>
          <p className="text-xl text-indigo-100 mb-8" data-testid="hero-subtitle">
            Playwright MCPハンズオン用のサンプルECサイトです
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-indigo-600 font-bold px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors text-lg"
            data-testid="hero-cta"
          >
            全商品を見る →
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 py-16" data-testid="featured-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-8" data-testid="featured-title">
          おすすめ商品
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="featured-products">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block border-2 border-indigo-600 text-indigo-600 font-semibold px-8 py-3 rounded-full hover:bg-indigo-600 hover:text-white transition-colors"
            data-testid="view-all-link"
          >
            すべての商品を見る
          </Link>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-white py-16 px-4" data-testid="features-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            特徴
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6" data-testid="feature-1">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-semibold text-gray-900 mb-2">送料無料</h3>
              <p className="text-gray-600">5,000円以上のお買い上げで全国送料無料</p>
            </div>
            <div className="text-center p-6" data-testid="feature-2">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">安心・安全</h3>
              <p className="text-gray-600">SSL暗号化通信で安全なお買い物が可能</p>
            </div>
            <div className="text-center p-6" data-testid="feature-3">
              <div className="text-4xl mb-4">↩️</div>
              <h3 className="font-semibold text-gray-900 mb-2">30日返品保証</h3>
              <p className="text-gray-600">お気に召さない場合は30日以内に返品可能</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

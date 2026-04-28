import { NextResponse } from 'next/server'
import { products } from '@/lib/mockData'

/**
 * 重い処理のデモ用APIエンドポイント
 * 意図的に処理を遅くしてデバッグ演習で検出できるようにしています
 */

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 意図的に遅い集計処理（デバッグ演習用）
 * 大量のデータ処理をシミュレートします
 */
function heavyDataProcessing(): {
  categoryBreakdown: Array<{ category: string; sales: number; orders: number }>
  topProducts: Array<{ name: string; sales: number; orders: number }>
  totalSales: number
  orderCount: number
} {
  // 意図的に重い処理: 大量のループで集計をシミュレート
  const iterations = 5_000_000
  let checksum = 0
  for (let i = 0; i < iterations; i++) {
    checksum += Math.sqrt(i) * Math.sin(i)
  }
  // checksumは結果に使わないが、最適化で消されないよう念のため参照
  void checksum

  // 実際の集計処理
  const mockOrders = products.flatMap((product) => {
    const orderCount = Math.floor(product.reviewCount * 1.5)
    return Array.from({ length: orderCount }, () => ({
      productId: product.id,
      productName: product.name,
      category: product.category,
      price: product.price,
      quantity: Math.floor(Math.random() * 3) + 1,
    }))
  })

  const categoryMap = new Map<string, { sales: number; orders: number }>()
  const productMap = new Map<string, { name: string; sales: number; orders: number }>()

  for (const order of mockOrders) {
    const salesAmount = order.price * order.quantity

    const catData = categoryMap.get(order.category) ?? { sales: 0, orders: 0 }
    categoryMap.set(order.category, {
      sales: catData.sales + salesAmount,
      orders: catData.orders + 1,
    })

    const prodData = productMap.get(order.productId) ?? {
      name: order.productName,
      sales: 0,
      orders: 0,
    }
    productMap.set(order.productId, {
      name: prodData.name,
      sales: prodData.sales + salesAmount,
      orders: prodData.orders + 1,
    })
  }

  const categoryBreakdown = Array.from(categoryMap.entries())
    .map(([category, data]) => ({ category, ...data }))
    .sort((a, b) => b.sales - a.sales)

  const topProducts = Array.from(productMap.values())
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5)

  const totalSales = categoryBreakdown.reduce((sum, cat) => sum + cat.sales, 0)
  const orderCount = categoryBreakdown.reduce((sum, cat) => sum + cat.orders, 0)

  return { categoryBreakdown, topProducts, totalSales, orderCount }
}

export async function GET() {
  const startTotal = Date.now()

  // ステップ1: データ取得のシミュレーション（意図的な遅延）
  const fetchStart = Date.now()
  await sleep(1500) // 外部データベースへのアクセスをシミュレート
  const dataFetchDuration = Date.now() - fetchStart

  // ステップ2: 重いデータ処理
  const processingStart = Date.now()
  const { categoryBreakdown, topProducts, totalSales, orderCount } =
    heavyDataProcessing()
  const processingDuration = Date.now() - processingStart

  const totalDuration = Date.now() - startTotal

  return NextResponse.json({
    summary: {
      totalSales,
      orderCount,
      avgOrderValue: Math.round(totalSales / orderCount),
      topCategory: categoryBreakdown[0]?.category ?? '不明',
    },
    performanceMetrics: {
      dataFetchDuration,
      processingDuration,
      totalDuration,
    },
    categoryBreakdown,
    topProducts,
  })
}

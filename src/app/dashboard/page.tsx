"use client";

import { useState } from "react";

interface AnalyticsResult {
  summary: {
    totalSales: number;
    orderCount: number;
    avgOrderValue: number;
    topCategory: string;
  };
  categoryBreakdown: Array<{
    category: string;
    sales: number;
    orders: number;
  }>;
  topProducts: Array<{
    name: string;
    sales: number;
    orders: number;
  }>;
}

// 表示用データの整形処理
function computeDisplayMetrics(data: AnalyticsResult): AnalyticsResult {
  const points: number[] = [];
  const base = data.summary.totalSales;
  for (let i = 0; i < 5_000_000; i++) {
    points.push(base * Math.sin(i * 0.0001) + (i % 100));
  }
  points.sort((a, b) => a - b);
  void points;
  return data;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyticsResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateReport = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/analytics");
      if (!res.ok) throw new Error("APIエラーが発生しました");
      const data: AnalyticsResult = await res.json();
      setResult(computeDisplayMetrics(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : "不明なエラー");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10" data-testid="dashboard-page">
      <h1
        className="text-3xl font-bold text-gray-900 mb-2"
        data-testid="dashboard-title"
      >
        パフォーマンスダッシュボード
      </h1>
      <p className="text-gray-500 mb-8">
        売上分析レポートを生成します。処理には数秒かかります。
      </p>

      {/* Generate Report Button */}
      <div className="mb-8">
        <button
          onClick={generateReport}
          disabled={loading}
          className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
          }`}
          data-testid="generate-report-button"
        >
          {loading ? "⏳ レポートを生成中..." : "📊 レポートを生成"}
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center"
          data-testid="loading-state"
        >
          <div className="text-5xl mb-4 animate-spin">⚙️</div>
          <p className="text-gray-600 text-lg">分析データを処理中...</p>
          <p className="text-gray-400 text-sm mt-2">
            大量のトランザクションデータを集計しています
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className="bg-red-50 border border-red-200 rounded-xl p-6"
          data-testid="error-state"
        >
          <p className="text-red-600 font-semibold">❌ エラー: {error}</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6" data-testid="report-results">
          {/* Summary Cards */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            data-testid="summary-cards"
          >
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">総売上</p>
              <p
                className="text-2xl font-bold text-gray-900"
                data-testid="total-sales"
              >
                ¥{result.summary.totalSales.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">注文数</p>
              <p
                className="text-2xl font-bold text-gray-900"
                data-testid="order-count"
              >
                {result.summary.orderCount}件
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">平均注文額</p>
              <p
                className="text-2xl font-bold text-gray-900"
                data-testid="avg-order"
              >
                ¥{result.summary.avgOrderValue.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">人気カテゴリ</p>
              <p
                className="text-2xl font-bold text-gray-900"
                data-testid="top-category"
              >
                {result.summary.topCategory}
              </p>
            </div>
          </div>

          {/* Category Breakdown */}
          <div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            data-testid="category-breakdown"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              カテゴリ別売上
            </h2>
            <div className="space-y-3">
              {result.categoryBreakdown.map((cat) => (
                <div
                  key={cat.category}
                  data-testid={`category-${cat.category}`}
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">{cat.category}</span>
                    <span className="font-semibold">
                      ¥{cat.sales.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${(cat.sales / result.summary.totalSales) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            data-testid="top-products"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              人気商品 TOP5
            </h2>
            <div className="space-y-2">
              {result.topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  data-testid={`top-product-${index + 1}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-400">
                      #{index + 1}
                    </span>
                    <span className="text-gray-800">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ¥{product.sales.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{product.orders}件</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

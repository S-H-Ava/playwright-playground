import { NextResponse } from "next/server";
import { products } from "@/lib/mockData";

function buildAnalyticsReport(): {
  categoryBreakdown: Array<{ category: string; sales: number; orders: number }>;
  topProducts: Array<{ name: string; sales: number; orders: number }>;
  totalSales: number;
  orderCount: number;
} {
  const mockOrders = products.flatMap((product) => {
    const orderCount = Math.floor(product.reviewCount * 1.5);
    return Array.from({ length: orderCount }, () => ({
      productId: product.id,
      productName: product.name,
      category: product.category,
      price: product.price,
      quantity: Math.floor(Math.random() * 3) + 1,
    }));
  });

  const categoryMap = new Map<string, { sales: number; orders: number }>();
  const productMap = new Map<
    string,
    { name: string; sales: number; orders: number }
  >();

  for (const order of mockOrders) {
    const salesAmount = order.price * order.quantity;

    const catData = categoryMap.get(order.category) ?? { sales: 0, orders: 0 };
    categoryMap.set(order.category, {
      sales: catData.sales + salesAmount,
      orders: catData.orders + 1,
    });

    const prodData = productMap.get(order.productId) ?? {
      name: order.productName,
      sales: 0,
      orders: 0,
    };
    productMap.set(order.productId, {
      name: prodData.name,
      sales: prodData.sales + salesAmount,
      orders: prodData.orders + 1,
    });
  }

  const categoryBreakdown = Array.from(categoryMap.entries())
    .map(([category, data]) => ({ category, ...data }))
    .sort((a, b) => b.sales - a.sales);

  const topProducts = Array.from(productMap.values())
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const totalSales = categoryBreakdown.reduce((sum, cat) => sum + cat.sales, 0);
  const orderCount = categoryBreakdown.reduce(
    (sum, cat) => sum + cat.orders,
    0,
  );

  return { categoryBreakdown, topProducts, totalSales, orderCount };
}

export async function GET() {
  const { categoryBreakdown, topProducts, totalSales, orderCount } =
    buildAnalyticsReport();

  return NextResponse.json({
    summary: {
      totalSales,
      orderCount,
      avgOrderValue: Math.round(totalSales / orderCount),
      topCategory: categoryBreakdown[0]?.category ?? "不明",
    },
    categoryBreakdown,
    topProducts,
  });
}

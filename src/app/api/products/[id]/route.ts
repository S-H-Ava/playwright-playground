import { NextRequest, NextResponse } from 'next/server'
import { getProductById } from '@/lib/mockData'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return NextResponse.json({ error: '商品が見つかりません' }, { status: 404 })
  }

  return NextResponse.json(product)
}

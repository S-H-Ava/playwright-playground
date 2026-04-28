import { test, expect } from '@playwright/test'

/**
 * プレイショップ E2Eテストサンプル
 *
 * このファイルはPlaywright MCPを使って生成されたE2Eテストのサンプルです。
 * 演習1（テスト自動化）で生成するテストの参考にしてください。
 */

test.describe('プレイショップ - 基本動作確認', () => {
  test('ホームページが正しく表示される', async ({ page }) => {
    await page.goto('/')

    // タイトルの確認
    await expect(page.getByTestId('hero-title')).toContainText('プレイショップへようこそ')

    // おすすめ商品が3件表示されていることを確認
    const featuredProducts = page.getByTestId('featured-products')
    await expect(featuredProducts.locator('[data-testid^="product-card-"]')).toHaveCount(3)

    // CTAボタンが表示されていることを確認
    await expect(page.getByTestId('hero-cta')).toBeVisible()
  })

  test('商品一覧ページに全10件の商品が表示される', async ({ page }) => {
    await page.goto('/products')

    // 件数の確認
    await expect(page.getByTestId('results-count')).toHaveText('10件の商品')

    // 商品グリッドの確認
    await expect(page.getByTestId('products-grid')).toBeVisible()
  })

  test('カテゴリフィルターが機能する', async ({ page }) => {
    await page.goto('/products')

    // 「電子機器」カテゴリでフィルタリング
    await page.getByTestId('category-電子機器').click()
    await expect(page.getByTestId('results-count')).toHaveText('3件の商品')

    // 「食品」カテゴリでフィルタリング
    await page.getByTestId('category-食品').click()
    await expect(page.getByTestId('results-count')).toHaveText('4件の商品')

    // 「全て」に戻す
    await page.getByTestId('category-全て').click()
    await expect(page.getByTestId('results-count')).toHaveText('10件の商品')
  })
})

---
mode: agent
description: テスト自動化演習 - Playwright MCPを使ってE2Eテストコードを自動生成する
---

# テスト自動化演習 - プロンプトテンプレート

以下の手順でPlaywright MCPを使ってブラウザを操作し、E2Eテストコードを生成してください。

## ステップ1: アプリケーションの起動確認

まず、`browser_navigate` を使って `http://localhost:3000` を開き、`browser_snapshot` でページの状態を確認してください。

## ステップ2: ブラウザ操作の実施

以下の操作をPlaywright MCPで順番に実施してください：

1. ホームページ (`http://localhost:3000`) を開く
2. `data-testid="hero-cta"` の「全商品を見る →」ボタンをクリックして商品一覧ページに遷移する
3. `data-testid="category-電子機器"` のカテゴリボタンをクリックして電子機器だけを絞り込む
4. `data-testid="results-count"` のテキストを確認して、表示件数が正しいか確認する
5. 最初の商品カード（`data-testid="product-card-1"`）をクリックして商品詳細ページに遷移する
6. `data-testid="product-title"` で商品名を確認する
7. `data-testid="product-price"` で価格を確認する
8. `data-testid="add-to-cart-button"` をクリックしてカートに追加する
9. `data-testid="nav-cart"` をクリックしてカートページに遷移する
10. `data-testid="cart-items"` でカートに商品が追加されていることを確認する
11. `data-testid="cart-total"` で合計金額を確認する

## ステップ3: テストコードの生成

上記のブラウザ操作をもとに、以下の要件を満たすPlaywrightのE2Eテストコードを `e2e/shopping-flow.spec.ts` として生成してください：

- `@playwright/test` を使用すること
- `test.describe` で「ショッピングフローのテスト」というグループを作成すること
- `data-testid` 属性を使ってセレクタを指定すること
- 各ステップに適切なアサーション（`expect`）を追加すること
- ページ遷移後は `waitForURL` や `waitForSelector` で安定性を確保すること
- 日本語でテスト名・コメントを記述すること

## 期待するテストの構造

```typescript
import { test, expect } from '@playwright/test'

test.describe('ショッピングフローのテスト', () => {
  test('商品検索からカートへの追加まで', async ({ page }) => {
    // ホームページを開く
    await page.goto('/')
    await expect(page.getByTestId('hero-title')).toContainText('プレイショップ')
    
    // 商品一覧へ遷移
    await page.getByTestId('hero-cta').click()
    await page.waitForURL('**/products')
    
    // 電子機器でフィルタリング
    await page.getByTestId('category-電子機器').click()
    // ... 以下続く
  })
})
```

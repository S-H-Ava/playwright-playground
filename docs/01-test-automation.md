# 演習1: テスト自動化 - Playwright MCPを使ったE2Eテストコードの自動生成

## 概要

この演習では、Playwright MCPを使ってブラウザを実際に操作し、その操作記録をもとにE2Eテストコードを自動生成します。

## 学習目標

- Playwright MCPを使ってブラウザを自動操作できる
- `data-testid` を使った安定したセレクタの書き方を理解できる
- ページ遷移・クリック・フォーム入力を含むE2Eテストコードを生成できる
- `expect` アサーションで正しい値を検証できる

## 前提条件

- アプリが起動していること（`npm run dev`）
- Playwright MCPが有効になっていること
- GitHub Copilot Chatが利用できること

---

## 演習手順

### ステップ1: アプリの起動確認

ターミナルで以下のコマンドを実行してアプリを起動してください：

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開き、プレイショップが表示されることを確認してください。

---

### ステップ2: GitHub Copilot Chatに以下のプロンプトを入力

> 💡 **プロンプト例**（コピーして使用してください）

```
Playwright MCPを使って、以下の操作を実際にブラウザで実行してください：

1. http://localhost:3000 を開く
2. 「全商品を見る →」ボタンをクリックして商品一覧ページに移動する
3. 「電子機器」カテゴリボタンをクリックして絞り込みを行う
4. 表示された商品件数を確認する
5. 「ワイヤレスイヤホン Pro」の商品カードをクリックして詳細ページに移動する
6. 商品名と価格を確認する
7. 「カートに追加」ボタンをクリックする
8. ヘッダーのカートボタンをクリックしてカートページに移動する
9. カートに商品が追加されていることと合計金額を確認する

操作が完了したら、この一連の流れをPlaywrightのE2Eテストコードとして e2e/shopping-flow.spec.ts に出力してください。
```

---

### ステップ3: 生成されたテストコードを確認・実行

Copilotが生成したテストコードを `e2e/shopping-flow.spec.ts` として保存し、以下のコマンドで実行してください：

```bash
npm run test:e2e
```

---

### ステップ4: テスト結果を確認

テストが成功したら、HTMLレポートを確認できます：

```bash
npx playwright show-report
```

---

## テストコードのポイント

Copilotが生成するテストコードには以下の要素が含まれます：

### ページ遷移の待機

```typescript
// URLが変わるまで待機
await page.waitForURL('**/products')

// 要素が表示されるまで待機
await page.waitForSelector('[data-testid="products-grid"]')
```

### テキストのアサーション

```typescript
// タイトルに特定のテキストが含まれているか確認
await expect(page.getByTestId('hero-title')).toContainText('プレイショップ')

// 正確な件数が表示されているか確認
await expect(page.getByTestId('results-count')).toHaveText('3件の商品')
```

### カートの確認

```typescript
// カートバッジに数量が表示されているか確認
await expect(page.getByTestId('cart-badge')).toHaveText('1')

// カート合計金額を確認
await expect(page.getByTestId('cart-total')).toContainText('¥')
```

---

## アプリの `data-testid` 一覧

| ページ | data-testid | 説明 |
|--------|-------------|------|
| ホーム | `hero-title` | ヒーローセクションのタイトル |
| ホーム | `hero-cta` | 「全商品を見る」ボタン |
| ホーム | `featured-products` | おすすめ商品グリッド |
| 商品一覧 | `search-input` | 検索入力フィールド |
| 商品一覧 | `category-全て` | 全てカテゴリボタン |
| 商品一覧 | `category-電子機器` | 電子機器フィルター |
| 商品一覧 | `category-衣類` | 衣類フィルター |
| 商品一覧 | `category-食品` | 食品フィルター |
| 商品一覧 | `results-count` | 検索結果件数 |
| 商品一覧 | `product-card-{id}` | 商品カード（1〜10） |
| 商品詳細 | `product-title` | 商品名 |
| 商品詳細 | `product-price` | 商品価格 |
| 商品詳細 | `product-stock` | 在庫状況 |
| 商品詳細 | `add-to-cart-button` | カートに追加ボタン |
| 商品詳細 | `reviews-section` | レビューセクション |
| カート | `cart-items` | カートアイテムリスト |
| カート | `cart-total` | 合計金額 |
| カート | `checkout-button` | 購入するボタン |
| ヘッダー | `nav-cart` | カートナビゲーション |
| ヘッダー | `cart-badge` | カートアイテム数バッジ |

---

## 追加チャレンジ

基本演習が完了したら、以下のテストも追加してみてください：

1. **検索機能のテスト**：検索バーにキーワードを入力して検索結果が絞り込まれることを確認
2. **カート操作のテスト**：商品の数量変更・削除が正しく動作することを確認
3. **購入フローのテスト**：カートから「購入する」ボタンをクリックして完了画面が表示されることを確認

> 💡 **追加プロンプト例**
> ```
> カートに商品を2つ追加して、数量を変更し、合計金額が正しく更新されることを
> PlaywrightのE2Eテストとして生成してください。
> ```

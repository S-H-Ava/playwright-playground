# GitHub Copilot 使用ガイド

このリポジトリは **Playwright MCP** を使ったハンズオン学習のための環境です。

## ⚠️ 重要な指示

- **すべての返答を日本語で行うこと**
- ブラウザ操作が必要な場合は必ず **Playwright MCP** を使用すること
- コードの説明・ドキュメント・コメントも日本語で作成すること
- エラーや問題が発生した場合も日本語で説明すること

## 🎭 Playwright MCP の使い方

ブラウザを操作するには、Playwright MCPのツールを使用してください：

| ツール | 用途 |
|--------|------|
| `browser_navigate` | URLに移動する |
| `browser_click` | 要素をクリックする |
| `browser_type` | テキストを入力する |
| `browser_screenshot` | スクリーンショットを撮影する |
| `browser_snapshot` | ページのアクセシビリティスナップショットを取得する |
| `browser_scroll` | ページをスクロールする |
| `browser_evaluate` | JavaScriptを実行する |
| `browser_wait_for` | 要素や条件が揃うまで待機する |

### 基本的な使い方の例

```
# ブラウザでサイトを開く
browser_navigate で http://localhost:3000 に移動してください

# 要素をクリックする
browser_snapshot でページ構造を確認して、
data-testid="hero-cta" のボタンをクリックしてください

# スクリーンショットを撮影する
browser_screenshot でページのスクリーンショットを撮影してください
```

## 🏪 ハンズオン用アプリケーション（プレイショップ）

このリポジトリには学習用のECサイト「プレイショップ」が含まれています。

### ページ一覧

| ページ | URL | 説明 |
|--------|-----|------|
| ホーム | `/` | トップページ・おすすめ商品 |
| 商品一覧 | `/products` | 検索・カテゴリフィルター付き商品一覧 |
| 商品詳細 | `/products/{id}` | 商品の詳細・レビュー・カートに追加 |
| カート | `/cart` | ショッピングカート・購入フロー |
| ダッシュボード | `/dashboard` | 売上分析レポート（重い処理あり） |

### API エンドポイント

| エンドポイント | メソッド | 説明 |
|----------------|----------|------|
| `/api/products` | GET | 商品一覧（モック） |
| `/api/products/{id}` | GET | 商品詳細（モック） |
| `/api/analytics` | GET | 売上分析（意図的に遅い処理） |

## 📚 ハンズオン演習ドキュメント

演習ドキュメントは `docs/` ディレクトリに格納されています：

1. `docs/01-test-automation.md` - **テスト自動化演習**
   - E2Eテストコードの自動生成
2. `docs/02-verification.md` - **動作確認演習**
   - スクリーンショットによるエビデンス取得
3. `docs/03-debugging.md` - **デバッグ演習**
   - パフォーマンス問題の特定と分析

## 💡 プロンプトテンプレート

各演習の正答プロンプトは `.github/prompts/` に格納されています：

- `.github/prompts/test-automation.prompt.md`
- `.github/prompts/verification.prompt.md`
- `.github/prompts/debugging.prompt.md`

## 🚀 アプリの起動方法

```bash
# 開発サーバーを起動する
npm run dev

# http://localhost:3000 でアクセス可能
```

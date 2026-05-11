# 🎭 Playwright Playground

GitHub Copilot & Playwright MCPを使ったハンズオン学習用リポジトリです。

## 概要

このリポジトリには、Playwright MCPを使った3つのハンズオン演習のための環境が含まれています。

- **演習1: テスト自動化** — ブラウザ操作からE2Eテストコードを自動生成する
- **演習2: 動作確認** — スクリーンショットによるエビデンス取得
- **演習3: デバッグ** — パフォーマンス問題の特定と分析

## 🚀 クイックスタート

### GitHub Codespacesを使う場合（推奨）

1. このリポジトリの「Code」ボタンから「Create codespace on main」をクリック
2. Codespacesが起動したら、ターミナルで以下を実行：

```bash
npm run dev
```

3. ポート3000が自動的に転送され、ブラウザでプレイショップにアクセスできます

### ローカルで使う場合

- `Node.js 20.x 以上` が必要です。n/nvm/voltaなどでローカルにインストールしてください。

```bash
# 依存パッケージのインストール
npm install

# Playwrightブラウザのインストール（システム依存関係も含む）
npx playwright install --with-deps chrome

# 開発サーバーの起動
npm run dev
```

## 🏪 ハンズオン用アプリ（プレイショップ）

| ページ         | URL                                   | 説明                         |
| -------------- | ------------------------------------- | ---------------------------- |
| ホーム         | `http://localhost:3000`               | トップページ                 |
| 商品一覧       | `http://localhost:3000/products`      | 検索・フィルター付き商品一覧 |
| 商品詳細       | `http://localhost:3000/products/{id}` | 商品詳細・カート追加         |
| カート         | `http://localhost:3000/cart`          | ショッピングカート           |
| ダッシュボード | `http://localhost:3000/dashboard`     | 分析レポート（重い処理あり） |

## 📚 ハンズオンドキュメント

| ファイル                     | 内容             |
| ---------------------------- | ---------------- |
| `docs/01-test-automation.md` | テスト自動化演習 |
| `docs/02-verification.md`    | 動作確認演習     |
| `docs/03-debugging.md`       | デバッグ演習     |

## 🧪 E2Eテストの実行

```bash
# テストの実行
npm run test:e2e
```

## 📁 ディレクトリ構成

```
.
├── .devcontainer/          # GitHub Codespaces設定
├── .github/
│   ├── copilot-instructions.md   # Copilot使用ガイド
│   └── prompts/            # 演習用プロンプトテンプレート
├── .vscode/
│   └── mcp.json            # Playwright MCP設定
├── docs/                   # ハンズオンドキュメント
├── e2e/                    # E2Eテストファイル
└── src/
    ├── app/                # Next.js App Router
    │   ├── api/            # APIルート（モックレスポンス）
    │   ├── products/       # 商品ページ
    │   ├── cart/           # カートページ
    │   └── dashboard/      # ダッシュボード（重い処理デモ）
    ├── components/         # 共通コンポーネント
    ├── contexts/           # React Context（カート状態管理）
    └── lib/                # モックデータ・ユーティリティ
```

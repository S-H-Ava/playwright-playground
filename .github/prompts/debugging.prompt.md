---
agent: agent
description: デバッグ演習 - GitHub Copilot と Playwright MCP を使ってフロントエンドのパフォーマンス問題を調査する
---

# デバッグ演習 - 正解プロンプト例

プレイショップのダッシュボードでパフォーマンス問題が報告されています。GitHub Copilot と Playwright MCP を使って原因を調査し、パフォーマンス分析レポートを作成してください。

## 背景

`http://localhost:3000/dashboard` の「レポートを生成」ボタンを押すと処理に数秒かかると報告があります。コードにはパフォーマンスに関するログや計測情報が一切ありません。

## 依頼内容

### 手順 1: 問題の再現

`http://localhost:3000/dashboard` を開き、「レポートを生成」ボタンを押して処理が完了するまで待機し、完了した画面のスクリーンショットを撮影してください。

### 手順 2: Performance API でネットワークを確認する

`browser_evaluate` で以下のJavaScriptを実行し、`/api/` の通信時間を取得してください。

```javascript
performance
  .getEntriesByType("resource")
  .filter((e) => e.name.includes("/api/"))
  .map((e) => ({ url: e.name, duration: Math.round(e.duration) }));
```

### 手順 3: フロントエンドコードに計測ログを追加する

`src/app/dashboard/page.tsx` を確認し、データ取得後に実行される各関数に `console.time` / `console.timeEnd` を追加してください。どの処理にどれくらい時間がかかっているかがブラウザコンソールに出力されるようにしてください。

### 手順 4: ログを収集して分析する

計測ログを追加したら、ダッシュボードで再度レポートを生成し、`browser_console_messages` でブラウザコンソールのログを確認してください。

### 手順 5: コードを読んで根本原因を特定する

ログから特定した遅い関数について、`src/app/dashboard/page.tsx` のコードを読んでなぜ遅いのか具体的に説明してください。

### 手順 6: パフォーマンス分析レポート

調査結果をもとに、以下の形式でレポートを作成してください。

| 処理                                   | 所要時間 | 評価  |
| -------------------------------------- | -------- | ----- |
| /api/analytics （Performance API計測） | Xms      | ✅    |
| （ログで特定した各関数）               | Xms      | 🐌/✅ |

**ボトルネックはフロントエンドのJS処理にあります。** 原因なる関数とコード上の原因、短期・中長期的改善提案をまとめてください。

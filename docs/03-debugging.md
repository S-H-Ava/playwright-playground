# 演習3: デバッグ - Playwright MCPを使ったパフォーマンス問題の特定

## 概要

この演習では、Playwright MCPを使ってJavaScriptを実行し、ダッシュボードの「レポート生成」機能に存在するパフォーマンス問題を特定します。ログ・トレース・パフォーマンスAPIを活用したデバッグ手法を学びます。

## 学習目標

- Playwright MCPの `browser_evaluate` を使ってJavaScriptを実行できる
- ブラウザのPerformance APIを使ってAPIコールの時間を計測できる
- 重い処理（データ取得 vs データ処理）を特定できる
- パフォーマンス改善の提案ができる

## 前提条件

- アプリが起動していること（`npm run dev`）
- Playwright MCPが有効になっていること
- GitHub Copilot Chatが利用できること

---

## 背景: ダッシュボードの問題

「パフォーマンスダッシュボード」ページ（`/dashboard`）で「レポートを生成」ボタンをクリックすると、**非常に時間がかかる**という報告があります。

ユーザーからのフィードバック：
> 「レポート生成に数秒かかっていて、使いにくい。どこが遅いのか調べてほしい。」

この演習では、Playwright MCPを使って何が重いのかを特定し、改善案を提案します。

---

## 演習手順

### ステップ1: 問題の再現

> 💡 **プロンプト例1**（コピーして使用してください）

```
Playwright MCPを使って以下の操作を実行してください：

1. http://localhost:3000/dashboard を開く
2. browser_snapshot でページの状態を確認する
3. 「レポートを生成」ボタン（data-testid="generate-report-button"）をクリックする
4. レポートが表示されるまで待機する（data-testid="report-results" が表示されるまで）
5. スクリーンショットを撮影する
6. 画面に表示されている処理時間の内訳を読み取る

何秒かかりましたか？どの処理が遅かったですか？
```

---

### ステップ2: ブラウザのPerformance APIで詳細計測

> 💡 **プロンプト例2**（コピーして使用してください）

```
Playwright MCPのbrowser_evaluateを使って、以下のJavaScriptを実行して
APIコールのパフォーマンス情報を取得してください：

const entries = performance.getEntriesByType('resource')
const apiCalls = entries.filter(e => e.name.includes('/api/'))
return JSON.stringify(apiCalls.map(e => ({
  url: e.name.split('/').slice(-2).join('/'),
  duration: Math.round(e.duration) + 'ms',
  size: e.transferSize + ' bytes'
})), null, 2)

その結果から、最も遅いAPIエンドポイントを特定してください。
```

---

### ステップ3: 処理時間の内訳を取得

> 💡 **プロンプト例3**（コピーして使用してください）

```
Playwright MCPのbrowser_evaluateを使って、
ダッシュボードに表示されている処理時間データを取得してください：

return JSON.stringify({
  データ取得時間: document.querySelector('[data-testid="data-fetch-duration"]')?.textContent,
  データ処理時間: document.querySelector('[data-testid="processing-duration"]')?.textContent,
  合計処理時間: document.querySelector('[data-testid="total-duration"]')?.textContent,
  クライアント計測: document.querySelector('[data-testid="client-elapsed"]')?.textContent,
  パフォーマンス警告: document.querySelector('[data-testid="performance-warning"]')?.textContent?.trim()
})

この結果から、ボトルネックとなっている処理を特定してください。
```

---

### ステップ4: コードレベルでの原因調査

> 💡 **プロンプト例4**（コピーして使用してください）

```
src/app/api/analytics/route.ts のコードを確認して、
以下の質問に答えてください：

1. なぜデータ取得に時間がかかっているのか？
2. なぜデータ処理に時間がかかっているのか？
3. それぞれの処理を改善するためのコード修正案を提示してください。
```

---

### ステップ5: パフォーマンス分析レポートの作成

> 💡 **プロンプト例5**（コピーして使用してください）

```
これまでの調査結果をもとに、以下の形式でパフォーマンス分析レポートを作成してください：

# パフォーマンス分析レポート

## 計測結果

| 処理 | 所要時間 | 評価 |
|------|---------|------|
| データ取得（/api/analytics） | Xms | 🐌/✅ |
| データ処理（集計計算） | Xms | 🐌/✅ |
| 合計 | Xms | - |

## ボトルネックの特定

- 最も遅い処理: [特定した処理名]
- 原因: [コードから分かった原因]

## 改善提案

1. 短期的な改善: [すぐに実装できる改善案]
2. 中長期的な改善: [アーキテクチャレベルの改善案]

## 改善後の期待値

改善後、処理時間を何ms削減できると想定されるか？
```

---

## デバッグに使えるブラウザ API

### Performance API

```javascript
// すべてのリソース計測を取得
performance.getEntriesByType('resource')

// 特定のURLを計測
performance.getEntriesByName('http://localhost:3000/api/analytics')

// カスタムマーカーで計測
performance.mark('start')
// ... 処理 ...
performance.mark('end')
performance.measure('処理時間', 'start', 'end')
```

### Console API（デバッグログ）

```javascript
// タイマーの開始
console.time('analytics-report')

// ... 処理 ...

// タイマーの終了と表示
console.timeEnd('analytics-report')

// コンソールログを取得
// ※ Playwright MCPのbrowser_console_messagesで確認できます
```

---

## 実際のボトルネック（ヒント）

この演習で見つかるボトルネックには2つあります：

### ボトルネック1: 意図的な遅延
`/api/analytics` エンドポイントには **1500ms** の意図的な `sleep` が含まれています。
これは「外部データベースへのアクセスが遅い」状況をシミュレートしています。

### ボトルネック2: 重いCPU処理
エンドポイントには **500万回のループ処理** が含まれており、これがCPUを大量に消費します。
これは「非効率な集計アルゴリズム」をシミュレートしています。

---

## 改善案（参考）

| 問題 | 改善案 | 期待効果 |
|------|--------|---------|
| 意図的な遅延（DB遅延） | キャッシュの導入（Redis等）| 2回目以降の呼び出しが即座に返る |
| 重いCPU処理 | アルゴリズムの最適化 | 処理時間を大幅に削減 |
| 同期処理 | 非同期処理・並列化 | 処理時間を50%削減 |
| 大量データ処理 | ページネーション導入 | メモリ・CPU使用量の削減 |

---

## 追加チャレンジ

基本演習が完了したら、実際にコードを修正してパフォーマンスを改善してみてください：

> 💡 **追加プロンプト例**
> ```
> src/app/api/analytics/route.ts を修正して、以下の改善を実装してください：
> 1. sleep時間を100msに短縮する
> 2. ループ処理の回数を1,000,000回に削減する
> 修正後に再度レポートを生成して、改善前後の処理時間を比較してください。
> ```

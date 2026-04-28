---
mode: agent
description: デバッグ演習 - Playwright MCPを使ってパフォーマンス問題を特定する
---

# デバッグ演習 - プロンプトテンプレート

以下の手順でPlaywright MCPを使ってJavaScriptを実行し、ダッシュボードの重い処理を特定してください。

## ステップ1: ダッシュボードページを開く

`browser_navigate` を使って `http://localhost:3000/dashboard` を開き、
`browser_snapshot` でページの状態を確認してください。

## ステップ2: パフォーマンス計測の準備

`browser_evaluate` を使って以下のJavaScriptを実行し、パフォーマンス計測の準備をしてください：

```javascript
// パフォーマンス計測の開始
performance.clearMarks()
performance.clearMeasures()
console.log('パフォーマンス計測の準備完了')
```

## ステップ3: レポート生成の実行と計測

1. `data-testid="generate-report-button"` ボタンをクリックしてレポート生成を開始する
2. `browser_wait_for` を使って `data-testid="report-results"` が表示されるまで待機する（タイムアウト: 30秒）
3. `browser_screenshot` でレポート生成後の画面を撮影する

## ステップ4: パフォーマンス情報の収集

`browser_evaluate` を使って以下のJavaScriptを実行し、パフォーマンス情報を収集してください：

```javascript
// パフォーマンスエントリの取得
const entries = performance.getEntriesByType('resource')
const apiCalls = entries.filter(e => e.name.includes('/api/'))

return apiCalls.map(e => ({
  url: e.name,
  duration: Math.round(e.duration),
  startTime: Math.round(e.startTime),
  transferSize: e.transferSize,
}))
```

## ステップ5: 処理時間の内訳を確認

`browser_evaluate` を使って、ダッシュボードに表示されている処理時間の内訳を取得してください：

```javascript
// 画面上の処理時間データを取得
const dataFetch = document.querySelector('[data-testid="data-fetch-duration"]')?.textContent
const processing = document.querySelector('[data-testid="processing-duration"]')?.textContent
const total = document.querySelector('[data-testid="total-duration"]')?.textContent

return {
  dataFetchDuration: dataFetch,
  processingDuration: processing,
  totalDuration: total,
}
```

## ステップ6: ボトルネックの特定と分析

収集した情報をもとに、以下の分析を行ってください：

1. **最も時間がかかった処理はどれか？**
   - データ取得（`/api/analytics` APIの呼び出し）
   - データ処理（集計・ソート処理）

2. **改善案を提案する**
   - APIのレスポンスキャッシュ
   - 処理の非同期化・並列化
   - ページネーションによるデータ量の削減
   - Webワーカーを使ったバックグラウンド処理

## 期待する分析レポートの形式

```markdown
# パフォーマンス分析レポート

## 計測結果

| 処理 | 所要時間 | 評価 |
|------|---------|------|
| データ取得（API呼び出し） | XXXms | 🐌 遅い / ✅ 正常 |
| データ処理（集計処理） | XXXms | 🐌 遅い / ✅ 正常 |
| 合計 | XXXms | - |

## ボトルネック

最も時間がかかっている処理: **{処理名}**
理由: ...

## 改善提案

1. ...
2. ...
```

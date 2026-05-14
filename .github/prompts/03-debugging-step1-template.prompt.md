---
agent: agent
description: 指定した操作のパフォーマンス問題を詳細に調査する
---

## 依頼内容

ユーザが指定した操作フローに従い、Webアプリケーションの性能デバッグを実施してください。

以下を目的として行動してください。

- 実ユーザー操作を再現すること
- 性能指標を定量的に計測すること
- ブランチや実装差分による性能変化を比較すること
- JavaScript実行、描画、ネットワーク、メモリのボトルネックを特定すること

## 前提

- Playwright MCPをつかってEdgeブラウザを操作すること

## 実行方針

### 1. ブラウザ初期化

- 各計測ごとに新しいブラウザセッションを開始すること
- キャッシュや前回の状態を使い回さないこと

### 2. 計測インフラ注入

ページロード直後に、以下の計測インフラを注入すること。

- PerformanceObserver(type = longtask) を用いた Long Task 計測
- fetch / XMLHttpRequest などをフックした API 呼び出し監視
- 計測用タイムスタンプの記録

### 3. 操作シナリオ実行

- 指定された操作を順序通りに実行すること
- DOM の描画完了およびネットワーク完了を必ず待つこと
- 最終操作後、指定時間待機してから計測結果を取得すること

## 取得必須指標

### 表示・UX

- DOMContentLoaded
- Load 完了時間
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)

### メインスレッド負荷

- Long Task 発生回数
- Long Task 合計時間
- Long Task 最大時間
- 1000ms 超の Long Task の有無
- 最長タスク上位5件

### ネットワーク / API

- API 呼び出し回数
- API 総待機時間
- 平均応答時間
- 最も遅い API 上位5件
- エンドポイント単位の集計

### メモリ

- JavaScript Heap 使用量
- JavaScript Heap 合計量

### リソース（取得可能な場合）

- JS / CSS / 画像などのリソース数とサイズ

## 出力フォーマット

### 計測結果サマリ

```markdown
## 計測結果: <ブランチ名>

- DOMContentLoaded: xxx ms
- LCP: xxx ms
- Long Task 最大: xxx ms
- Long Task 合計: xxx ms
- API 呼出し数: xx
- API 総待機時間: xxxx ms
- JS Heap 使用量: xxx MB
```

## 性能低下要因の分析

以下の観点を必ず文章で分析すること。

- JavaScript 実行負荷が支配的か
- レイアウト・描画コストが高いか
- 特定の API がボトルネックになっていないか
- Long Task による UI フリーズが発生していないか
- メモリ肥大やリークの兆候がないか

## 改善案

```markdown
## 改善案

課題:
Long Task 最大時間が許容値を超えている

原因仮説:
重い同期 JavaScript 処理がメインスレッドをブロックしている

対策:
- Web Worker への処理移譲
- requestIdleCallback の活用
```

## 禁止事項

- 数値を伴わない主観的な評価をしないこと
- 異なる操作条件の結果を比較しないこと
- 根拠のない断定をしないこと

## 実装上の補足

- 可能であれば CDP (Performance.getMetrics) を使用すること
- 利用できない場合は Performance API による近似値を用いること
- Playwright 等での自動操作を推奨する

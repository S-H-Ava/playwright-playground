---
agent: agent
description: レポート作成のパフォーマンス問題を調査・修正する
---

## 背景

`http://localhost:3000/dashboard` の「レポートを生成」ボタンを押すと処理に数秒かかると報告があります。コードにはパフォーマンスに関するログや計測情報が一切ありません。

## 依頼内容

`http://localhost:3000/dashboard` を開き、「レポートを生成」ボタンを押して処理が完了するまでの時間が長いです。
Playwright MCPを使ってChromeブラウザを操作し、処理時間を計測・遅い原因を調査してください。

以下の手段を利用して調査してください。

- ネットワーク通信時間の確認: `browser_evaluate` で `performance.getEntriesByType('resource')` を実行など
- JavaScriptを使ったevaluate: `browser_evaluate` でフロントエンドの状態・状況を取得など
- フロントエンドコードへのログ追加: ブラウザで動く JS の各処理に計測ログを埋め込み、 `browser_console_messages` でログを確認など
- ソースコード調査: フロントエンドのコードを読んで怪しい処理を探すなど

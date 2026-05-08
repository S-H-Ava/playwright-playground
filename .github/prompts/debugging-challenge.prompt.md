---
agent: agent
description: デバッグ演習 追加チャレンジ - コードを修正してフロントエンドのパフォーマンスを改善し比較する
---

# デバッグ演習 追加チャレンジ - 正解プロンプト例

パフォーマンスのボトルネックを特定した後、実際にコードを修正して改善効果を測定してください。

## 依頼内容

以下の手順でボトルネックを修正し、改善効果を測定してください。

### 手順 1: 修正前の計測（ベースライン取得）

`src/app/dashboard/page.tsx` の `generateReport` 関数内に `console.time` / `console.timeEnd` を追加して、`computeDisplayMetrics` の実行時間を計測できるようにしてください。

`http://localhost:3000/dashboard` でレポートを生成し、`browser_console_messages` で修正前の処理時間を記録してください。

### 手順 2: ボトルネックを修正する

`src/app/dashboard/page.tsx` の `computeDisplayMetrics` 関数のループ回数を `5_000_000` から `10_000` に削減する修正を行ってください。

### 手順 3: 修正後の計測と比較

修正後、`http://localhost:3000/dashboard` でレポートを再生成し、以下の内容を確認してください。

1. `browser_console_messages` で修正後の処理時間を取得する
2. スクリーンショットを撮影する
3. 修正前後の処理時間を以下の形式で比較レポートとしてまとめる

| 処理                                  | 修正前      | 修正後 | 削減量 |
| ------------------------------------- | ----------- | ------ | ------ |
| computeDisplayMetrics                 | ~1700ms     | ...    | ...    |
| /api/analytics（Performance API計測） | ~Xms        | ~Xms   | -      |
| レポート表示までの全体                | ~2000ms以上 | ...    | ...    |

改善の効果と、今後さらに改善するための提案をまとめてください。

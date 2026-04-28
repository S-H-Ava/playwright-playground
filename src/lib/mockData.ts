export interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  rating: number
  reviewCount: number
  stock: number
  image: string
  reviews: Review[]
}

export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export const CATEGORIES = ['全て', '電子機器', '衣類', '食品'] as const

export const products: Product[] = [
  {
    id: '1',
    name: 'ワイヤレスイヤホン Pro',
    price: 12800,
    category: '電子機器',
    description:
      '高音質・ノイズキャンセリング機能搭載のワイヤレスイヤホン。最大30時間の連続再生が可能。Bluetooth 5.3対応で安定した接続を実現。マルチポイント接続で2台同時に繋げることができます。',
    rating: 4.5,
    reviewCount: 128,
    stock: 23,
    image: '/images/earphones.svg',
    reviews: [
      {
        id: 'r1-1',
        author: '田中太郎',
        rating: 5,
        comment: '音質が素晴らしい！ノイズキャンセリングも効果的で、通勤中に重宝しています。',
        date: '2024-03-15',
      },
      {
        id: 'r1-2',
        author: '鈴木花子',
        rating: 4,
        comment: 'コスパが良く満足しています。装着感も快適です。',
        date: '2024-03-20',
      },
      {
        id: 'r1-3',
        author: '佐藤健',
        rating: 5,
        comment: '音の遮断性が高く、仕事に集中できます。買って良かったです。',
        date: '2024-04-01',
      },
    ],
  },
  {
    id: '2',
    name: 'スマートウォッチ Ultra',
    price: 45000,
    category: '電子機器',
    description:
      '心拍数・血中酸素・睡眠品質をモニタリングするスマートウォッチ。GPS内蔵で運動中のルート記録も可能。防水性能IPX8。バッテリー最大7日間持続。',
    rating: 4.3,
    reviewCount: 89,
    stock: 12,
    image: '/images/watch.svg',
    reviews: [
      {
        id: 'r2-1',
        author: '山田次郎',
        rating: 4,
        comment: 'ランニング時のGPS精度が高く、フィットネス管理に最適です。',
        date: '2024-02-10',
      },
      {
        id: 'r2-2',
        author: '伊藤あかね',
        rating: 5,
        comment: 'デザインもシンプルで洗練されていて、日常使いにぴったりです。',
        date: '2024-03-05',
      },
    ],
  },
  {
    id: '3',
    name: 'メカニカルキーボード TKL',
    price: 18500,
    category: '電子機器',
    description:
      'テンキーレスのメカニカルキーボード。青軸スイッチ採用で快適なタイピングを実現。RGBバックライト搭載。Windows・Mac両対応。有線接続でゲームにも最適。',
    rating: 4.7,
    reviewCount: 203,
    stock: 45,
    image: '/images/keyboard.svg',
    reviews: [
      {
        id: 'r3-1',
        author: '中村大輔',
        rating: 5,
        comment: 'タイピング感が最高！長時間の作業でも疲れにくいです。',
        date: '2024-01-20',
      },
      {
        id: 'r3-2',
        author: '小林なつみ',
        rating: 4,
        comment: 'キーの打鍵感は良いですが、音が少し大きめです。在宅勤務で重宝しています。',
        date: '2024-02-15',
      },
    ],
  },
  {
    id: '4',
    name: 'オーガニックコットンTシャツ',
    price: 3200,
    category: '衣類',
    description:
      '100%オーガニックコットン使用のシンプルなTシャツ。環境に優しい素材で肌触りも抜群。洗濯を繰り返しても型崩れしにくい高品質な縫製。カラー5色展開。',
    rating: 4.2,
    reviewCount: 312,
    stock: 156,
    image: '/images/tshirt.svg',
    reviews: [
      {
        id: 'r4-1',
        author: '渡辺麻衣',
        rating: 4,
        comment: '素材が柔らかくて気持ちいい！普段使いにぴったりです。',
        date: '2024-03-01',
      },
      {
        id: 'r4-2',
        author: '高橋雄一',
        rating: 5,
        comment: 'デザインがシンプルで何にでも合わせやすい。リピート購入しています。',
        date: '2024-04-10',
      },
    ],
  },
  {
    id: '5',
    name: 'デニムジャケット クラシック',
    price: 12000,
    category: '衣類',
    description:
      'ヴィンテージ加工が施されたクラシックなデニムジャケット。少し大きめのシルエットでレイヤードスタイルに最適。季節の変わり目に重宝する1枚。ユニセックスデザイン。',
    rating: 4.0,
    reviewCount: 87,
    stock: 34,
    image: '/images/jacket.svg',
    reviews: [
      {
        id: 'r5-1',
        author: '松本さくら',
        rating: 4,
        comment: '色落ち加工がおしゃれで気に入っています。サイズ感も良好でした。',
        date: '2024-02-28',
      },
    ],
  },
  {
    id: '6',
    name: 'ランニングシューズ Air',
    price: 15800,
    category: '衣類',
    description:
      '軽量クッション素材を採用したランニングシューズ。通気性の高いメッシュアッパーで長距離走でも快適。反発性の高いミッドソールがランニングをサポート。',
    rating: 4.6,
    reviewCount: 445,
    stock: 78,
    image: '/images/shoes.svg',
    reviews: [
      {
        id: 'r6-1',
        author: '藤田健太',
        rating: 5,
        comment: '軽くてクッションも良い！ハーフマラソンで初めてPBが出ました。',
        date: '2024-03-22',
      },
      {
        id: 'r6-2',
        author: '西田佳代',
        rating: 4,
        comment: '足幅が少し狭めですが、全体的に満足しています。',
        date: '2024-04-05',
      },
    ],
  },
  {
    id: '7',
    name: '有機抹茶パウダー プレミアム',
    price: 2400,
    category: '食品',
    description:
      '宇治産の厳選茶葉を使用した最高級の有機抹茶パウダー。茶道から料理・スイーツまで幅広く使用可能。一番摘みの茶葉のみ使用で、鮮やかな緑色と豊かな旨味が特徴。30g入り。',
    rating: 4.8,
    reviewCount: 567,
    stock: 200,
    image: '/images/matcha.svg',
    reviews: [
      {
        id: 'r7-1',
        author: '木村恵子',
        rating: 5,
        comment: '色が鮮やかで香りも良い！ラテにして毎朝飲んでいます。',
        date: '2024-01-10',
      },
      {
        id: 'r7-2',
        author: '斎藤浩二',
        rating: 5,
        comment: '他の抹茶パウダーと比べて格段に品質が良い。お菓子作りに重宝しています。',
        date: '2024-02-20',
      },
    ],
  },
  {
    id: '8',
    name: '国産はちみつ 百花蜜',
    price: 1800,
    category: '食品',
    description:
      '北海道産の天然百花蜜。農薬を使用しない環境で採取された純粋なはちみつ。まろやかな甘みとほのかな花の香りが特徴。非加熱処理で酵素・ビタミンを豊富に含有。180g入り。',
    rating: 4.4,
    reviewCount: 234,
    stock: 89,
    image: '/images/honey.svg',
    reviews: [
      {
        id: 'r8-1',
        author: '橋本ゆきな',
        rating: 4,
        comment: '甘みがやさしくて美味しい！紅茶に入れて毎日飲んでいます。',
        date: '2024-03-08',
      },
    ],
  },
  {
    id: '9',
    name: 'コールドプレスオリーブオイル',
    price: 3600,
    category: '食品',
    description:
      'スペイン産エクストラバージンオリーブオイル。コールドプレス製法により香りと栄養素をしっかり保持。豊かな果実香とフレッシュな風味。サラダドレッシングや仕上げのオイルに最適。250ml入り。',
    rating: 4.6,
    reviewCount: 178,
    stock: 63,
    image: '/images/olive.svg',
    reviews: [
      {
        id: 'r9-1',
        author: '清水隆',
        rating: 5,
        comment: 'フルーティーな香りが素晴らしい！パスタにかけるだけで絶品になります。',
        date: '2024-02-05',
      },
      {
        id: 'r9-2',
        author: '野田美香',
        rating: 4,
        comment: '少し価格が高いですが、品質は間違いなし。特別な料理に使っています。',
        date: '2024-03-15',
      },
    ],
  },
  {
    id: '10',
    name: 'スペシャルティコーヒー豆 エチオピア',
    price: 2200,
    category: '食品',
    description:
      'エチオピア・イルガチェフェ産のシングルオリジン豆。ナチュラル精製による複雑なフルーツ感と花のような香りが特徴。浅煎りから中煎りでその個性が光る。200g入り。',
    rating: 4.7,
    reviewCount: 389,
    stock: 115,
    image: '/images/coffee.svg',
    reviews: [
      {
        id: 'r10-1',
        author: '加藤誠',
        rating: 5,
        comment: 'フルーティーで甘みがある！コーヒーの概念が変わりました。',
        date: '2024-01-30',
      },
      {
        id: 'r10-2',
        author: '山本奈々',
        rating: 5,
        comment: 'ハンドドリップで淹れると最高の香りと味わいになります。',
        date: '2024-03-10',
      },
    ],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === '全て') return products
  return products.filter((p) => p.category === category)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  )
}

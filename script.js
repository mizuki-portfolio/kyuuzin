// バイトデータの初期化（localStorageから読み込み、なければデフォルト値を保存）
let jobs = JSON.parse(localStorage.getItem('jobs') || 'null');

// デフォルトのバイト求人データ（40件）
const defaultJobs = [
  {
    id: 1,
    title: 'コンビニ店員',
    type: 'コンビニ',
    salary: '時給 1,100円～',
    location: '東京都渋谷区',
    company: 'コンビニエース',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=250&fit=crop',
    appeal: '未経験OK・シフト自由',
    comment: '明るいスタッフと一緒に働けます'
  },
  {
    id: 2,
    title: 'レストランスタッフ',
    type: 'レストラン',
    salary: '時給 1,200円～',
    location: '東京都新宿区',
    company: 'レストラン サクラ',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
    appeal: '食事補助あり・明るい職場',
    comment: 'チームワーク抜群の楽しい職場です'
  },
  {
    id: 3,
    title: '配送ドライバー',
    type: '配送',
    salary: '時給 1,300円～',
    location: '東京都港区',
    company: 'スピード配送',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+6L+O5pys44OP44Kk44OrPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+55Sf5rS7PC90ZXh0Pjwvc3ZnPg==',
    appeal: '高時給・一人でマイペース',
    comment: '自由な時間管理で働けます'
  },
  {
    id: 4,
    title: '接客スタッフ',
    type: '接客',
    salary: '時給 1,150円～',
    location: '東京都世田谷区',
    company: 'アパレル モダン',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop',
    appeal: 'スタッフ割引・接客スキル向上',
    comment: 'お客様に喜ばれる仕事ができます'
  },
  {
    id: 5,
    title: 'コンビニ店員',
    type: 'コンビニ',
    salary: '時給 1,050円～',
    location: '神奈川県横浜市',
    company: 'コンビニ スマイル',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=250&fit=crop',
    appeal: '研修充実・短期勤務OK',
    comment: '丁寧に指導しますので安心です'
  },
  {
    id: 6,
    title: 'カフェスタッフ',
    type: 'カフェ',
    salary: '時給 1,100円～',
    location: '東京都渋谷区',
    company: 'カフェ リラックス',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=250&fit=crop',
    appeal: 'ドリンク無料・雰囲気良い',
    comment: 'おいしいコーヒーを作る喜びを'
  },
  {
    id: 7,
    title: 'レストランスタッフ',
    type: 'レストラン',
    salary: '時給 1,180円～',
    location: '神奈川県川崎市',
    company: 'レストラン パスタ',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
    appeal: '食事50%OFF・初心者歓迎',
    comment: '明るく楽しいスタッフが自慢です'
  },
  {
    id: 8,
    title: 'スーパー店員',
    type: 'スーパー',
    salary: '時給 1,000円～',
    location: '埼玉県さいたま市',
    company: 'スーパー フレッシュ',
    image: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=400&h=250&fit=crop',
    appeal: '商品割引・安定した勤務',
    comment: '地域密着で働きやすい環境です'
  },
  {
    id: 9,
    title: '配送ドライバー',
    type: '配送',
    salary: '時給 1,250円～',
    location: '千葉県千葉市',
    company: 'スピーディ配送',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+6L+O5pys44OP44Kk44OrPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+55Sf5rS7PC90ZXh0Pjwvc3ZnPg==',
    appeal: 'ガソリン代支給・高収入',
    comment: '一人でマイペースに働けます'
  },
  {
    id: 10,
    title: 'コンビニ店員',
    type: 'コンビニ',
    salary: '時給 1,080円～',
    location: '大阪府大阪市',
    company: 'コンビニ エコ',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=250&fit=crop',
    appeal: '夜勤手当あり・シフト相談OK',
    comment: '働きやすいシフトで応援します'
  },
  {
    id: 11,
    title: 'カフェスタッフ',
    type: 'カフェ',
    salary: '時給 1,120円～',
    location: '東京都新宿区',
    company: 'カフェ アロマ',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=250&fit=crop',
    appeal: 'ドリンク割引・落ち着いた空間',
    comment: 'ゆったりとした時間を過ごせます'
  },
  {
    id: 12,
    title: 'レストランスタッフ',
    type: 'レストラン',
    salary: '時給 1,200円～',
    location: '東京都港区',
    company: 'レストラン ダイナー',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
    appeal: '食事補助・活気ある職場',
    comment: 'チーム一丸となって働けます'
  },
  {
    id: 13,
    title: 'スーパー店員',
    type: 'スーパー',
    salary: '時給 1,050円～',
    location: '神奈川県横浜市',
    company: 'スーパー グリーン',
    image: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=400&h=250&fit=crop',
    appeal: '商品割引・福利厚生充実',
    comment: '地元の方とふれあえる仕事です'
  },
  {
    id: 14,
    title: '接客スタッフ',
    type: '接客',
    salary: '時給 1,100円～',
    location: '東京都渋谷区',
    company: 'ライフスタイル シンプル',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop',
    appeal: '社員割引・デザイン学べる',
    comment: 'シンプルで快適な職場環境です'
  },
  {
    id: 15,
    title: '配送ドライバー',
    type: '配送',
    salary: '時給 1,280円～',
    location: '埼玉県川口市',
    company: 'メール配送サービス',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+6L+O5pys44OP44Kk44OrPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+55Sf5rS7PC90ZXh0Pjwvc3ZnPg==',
    appeal: '高時給・安定勤務',
    comment: '地域に貢献できるやりがいのある仕事'
  },
  {
    id: 16,
    title: 'コンビニ店員',
    type: 'コンビニ',
    salary: '時給 1,090円～',
    location: '千葉県船橋市',
    company: 'コンビニ ミニマル',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=250&fit=crop',
    appeal: 'シフト自由・未経験OK',
    comment: '学生にも人気の職場です'
  },
  {
    id: 17,
    title: 'レストランスタッフ',
    type: 'レストラン',
    salary: '時給 1,220円～',
    location: '東京都千代田区',
    company: 'レストラン ビストロ',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
    appeal: '食事無料・充実した研修',
    comment: 'プロの技術を学べる環境です'
  },
  {
    id: 18,
    title: 'カフェスタッフ',
    type: 'カフェ',
    salary: '時給 1,130円～',
    location: '神奈川県藤沢市',
    company: 'カフェ マイル',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=250&fit=crop',
    appeal: 'ドリンク割引・駅近',
    comment: '明るく活気のある職場です'
  },
  {
    id: 19,
    title: 'スーパー店員',
    type: 'スーパー',
    salary: '時給 1,080円～',
    location: '東京都練馬区',
    company: 'スーパー マート',
    image: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=400&h=250&fit=crop',
    appeal: '商品割引・福利厚生充実',
    comment: '地域密着型の働きやすい環境'
  },
  {
    id: 20,
    title: '配送ドライバー',
    type: '配送',
    salary: '時給 1,320円～',
    location: '東京都足立区',
    company: 'クイック配送',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+6L+O5pys44OP44Kk44OrPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+55Sf5rS7PC90ZXh0Pjwvc3ZnPg==',
    appeal: '高時給・時間自由',
    comment: '自分のペースで働けます'
  },
  {
    id: 21,
    title: '接客スタッフ',
    type: '接客',
    salary: '時給 1,140円～',
    location: '東京都文京区',
    company: 'ファッション プラザ',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop',
    appeal: 'スタッフ割引・接客スキル向上',
    comment: 'トレンドを学べる職場です'
  },
  {
    id: 22,
    title: 'コンビニ店員',
    type: 'コンビニ',
    salary: '時給 1,070円～',
    location: '神奈川県相模原市',
    company: 'コンビニ デイリー',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=250&fit=crop',
    appeal: 'シフト調整可能・未経験歓迎',
    comment: '柔軟な働き方ができます'
  },
  {
    id: 23,
    title: 'レストランスタッフ',
    type: 'レストラン',
    salary: '時給 1,190円～',
    location: '埼玉県越谷市',
    company: 'レストラン オアシス',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
    appeal: '食事補助・チームワーク重視',
    comment: '温かい雰囲気の職場です'
  },
  {
    id: 24,
    title: 'カフェスタッフ',
    type: 'カフェ',
    salary: '時給 1,110円～',
    location: '千葉県柏市',
    company: 'カフェ ブレンド',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=250&fit=crop',
    appeal: 'ドリンク無料・ゆったり勤務',
    comment: 'リラックスした雰囲気です'
  },
  {
    id: 25,
    title: 'スーパー店員',
    type: 'スーパー',
    salary: '時給 1,040円～',
    location: '大阪府堺市',
    company: 'スーパー マックス',
    image: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=400&h=250&fit=crop',
    appeal: '商品割引・長期勤務可',
    comment: '安定した働き方ができます'
  },
  {
    id: 26,
    title: 'コンビニ店員',
    type: 'コンビニ',
    salary: '時給 1,060円～',
    location: '東京都台東区',
    company: 'コンビニ ストリート',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=250&fit=crop',
    appeal: '駅直結・24時間営業',
    comment: '便利な立地で働けます'
  },
  {
    id: 27,
    title: 'レストランスタッフ',
    type: 'レストラン',
    salary: '時給 1,210円～',
    location: '東京都品川区',
    company: 'レストラン サンセット',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
    appeal: '食事補助・明るい職場',
    comment: 'チームで楽しく働けます'
  },
  {
    id: 28,
    title: 'カフェスタッフ',
    type: 'カフェ',
    salary: '時給 1,090円～',
    location: '東京都目黒区',
    company: 'カフェ モーニング',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=250&fit=crop',
    appeal: '朝食無料・落ち着いた空間',
    comment: 'ゆったりとした朝の時間を'
  },
  {
    id: 29,
    title: '配送ドライバー',
    type: '配送',
    salary: '時給 1,310円～',
    location: '神奈川県厚木市',
    company: 'スムーズ配送',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+6L+O5pys44OP44Kk44OrPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+55Sf5rS7PC90ZXh0Pjwvc3ZnPg==',
    appeal: '高時給・福利厚生充実',
    comment: '安定した働き方ができます'
  },
  {
    id: 30,
    title: '接客スタッフ',
    type: '接客',
    salary: '時給 1,130円～',
    location: '東京都杉並区',
    company: 'ショップ コレクション',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop',
    appeal: 'スタッフ割引・接客スキル向上',
    comment: 'ファッションが好きな方歓迎'
  },
  {
    id: 31,
    title: 'コンビニ店員',
    type: 'コンビニ',
    salary: '時給 1,080円～',
    location: '埼玉県所沢市',
    company: 'コンビニ ローカル',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=250&fit=crop',
    appeal: '地域密着・シフト調整可',
    comment: '地元の方とふれあえます'
  },
  {
    id: 32,
    title: 'レストランスタッフ',
    type: 'レストラン',
    salary: '時給 1,170円～',
    location: '千葉県松戸市',
    company: 'レストラン ハーモニー',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
    appeal: '食事補助・チームワーク重視',
    comment: '和気あいあいとした職場です'
  },
  {
    id: 33,
    title: 'カフェスタッフ',
    type: 'カフェ',
    salary: '時給 1,100円～',
    location: '東京都中野区',
    company: 'カフェ ベイジー',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=250&fit=crop',
    appeal: 'ドリンク無料・雰囲気良い',
    comment: 'コーヒー好きの方におすすめ'
  },
  {
    id: 34,
    title: 'スーパー店員',
    type: 'スーパー',
    salary: '時給 1,030円～',
    location: '神奈川県厚木市',
    company: 'スーパー ナチュラル',
    image: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=400&h=250&fit=crop',
    appeal: '商品割引・長期勤務可',
    comment: '安定した働き方ができます'
  },
  {
    id: 35,
    title: '配送ドライバー',
    type: '配送',
    salary: '時給 1,290円～',
    location: '埼玉県大宮市',
    company: '運送 ネットワーク',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+6L+O5pys44OP44Kk44OrPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+55Sf5rS7PC90ZXh0Pjwvc3ZnPg==',
    appeal: '高時給・一人でマイペース',
    comment: '自由な働き方ができます'
  },
  {
    id: 36,
    title: '接客スタッフ',
    type: '接客',
    salary: '時給 1,120円～',
    location: '東京都板橋区',
    company: 'アパレル サンプル',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop',
    appeal: 'スタッフ割引・接客スキル向上',
    comment: 'ファッションに興味がある方歓迎'
  },
  {
    id: 37,
    title: 'コンビニ店員',
    type: 'コンビニ',
    salary: '時給 1,050円～',
    location: '千葉県市川市',
    company: 'コンビニ イージー',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=250&fit=crop',
    appeal: 'シフト自由・未経験OK',
    comment: '柔軟な働き方ができます'
  },
  {
    id: 38,
    title: 'レストランスタッフ',
    type: 'レストラン',
    salary: '時給 1,160円～',
    location: '東京都北区',
    company: 'レストラン ファミリー',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
    appeal: '食事補助・家族経営',
    comment: '温かい雰囲気の職場です'
  },
  {
    id: 39,
    title: 'カフェスタッフ',
    type: 'カフェ',
    salary: '時給 1,080円～',
    location: '神奈川県茅ヶ崎市',
    company: 'カフェ シーサイド',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=250&fit=crop',
    appeal: 'ドリンク割引・海近く',
    comment: 'リラックスした環境で働けます'
  },
  {
    id: 40,
    title: 'スーパー店員',
    type: 'スーパー',
    salary: '時給 1,020円～',
    location: '埼玉県川越市',
    company: 'スーパー トラディション',
    image: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=400&h=250&fit=crop',
    appeal: '商品割引・地域密着',
    comment: '伝統ある店舗で働けます'
  }
];

// 既存のjobsが存在しない、または40件未満の場合はデフォルトデータを設定
if (!jobs || !Array.isArray(jobs) || jobs.length < 40) {
  // 既存のjobsの最大IDを取得
  let maxId = 0;
  if (jobs && Array.isArray(jobs) && jobs.length > 0) {
    maxId = Math.max(...jobs.map(j => j.id || 0));
  }
  
  // 既存のjobsに新しいデータを追加（重複を避ける）
  const existingIds = new Set((jobs || []).map(j => j.id));
  const jobsToAdd = defaultJobs.filter(j => !existingIds.has(j.id));
  
  if (jobs && Array.isArray(jobs) && jobs.length > 0) {
    // 既存データがある場合、不足分を追加
    jobs = [...jobs, ...jobsToAdd];
  } else {
    // 既存データがない場合、デフォルトデータをそのまま使用
    jobs = defaultJobs;
  }
  
  // 40件に満たない場合は、デフォルトデータから追加
  if (jobs.length < 40) {
    const currentIds = new Set(jobs.map(j => j.id));
    const additionalJobs = defaultJobs.filter(j => !currentIds.has(j.id));
    jobs = [...jobs, ...additionalJobs.slice(0, 40 - jobs.length)];
  }
  
  localStorage.setItem('jobs', JSON.stringify(jobs));
}

// ページネーション用の変数
let currentPage = 1;
const itemsPerPage = 20;

// カーソル色を適用する関数（より強力な方法）
function applyCaretColor() {
  const allInputs = document.querySelectorAll('input, textarea');
  allInputs.forEach(input => {
    // テキストの色も確実に設定（白にならないように）
    if (!input.style.color || input.style.color === 'white' || input.style.color === '#ffffff' || input.style.color === 'rgb(255, 255, 255)') {
      input.style.setProperty('color', '#2c3e50', 'important');
    }
    
    // setPropertyで!importantを設定（より強力）
    // 複数の方法で確実に適用
    input.style.setProperty('caret-color', '#ff6b35', 'important');
    input.style.setProperty('-webkit-caret-color', '#ff6b35', 'important'); // WebKit用
    input.style.caretColor = '#ff6b35'; // 直接設定も追加
    
    // フォーカスイベントでも再適用（確実に適用）
    if (!input.hasAttribute('data-caret-focus-listener')) {
      input.setAttribute('data-caret-focus-listener', 'true');
      const applyColor = function() {
        this.style.setProperty('caret-color', '#007bff', 'important');
        this.style.setProperty('-webkit-caret-color', '#007bff', 'important');
        this.style.caretColor = '#007bff';
        // テキストの色も確認
        if (!this.style.color || this.style.color === 'white' || this.style.color === '#ffffff') {
          this.style.setProperty('color', '#2c3e50', 'important');
        }
      };
      input.addEventListener('focus', applyColor, { once: false });
      input.addEventListener('click', applyColor, { once: false });
      input.addEventListener('input', applyColor, { once: false });
      input.addEventListener('keydown', applyColor, { once: false });
      input.addEventListener('keyup', applyColor, { once: false });
    }
  });
}

// MutationObserverで新しい入力フィールドを監視
function setupCaretColorObserver() {
  const observer = new MutationObserver(function(mutations) {
    // パフォーマンス最適化：実際に入力フィールドが追加された場合のみ適用
    let hasNewInputs = false;
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) { // Element node
          if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA' || 
              node.querySelector && (node.querySelector('input') || node.querySelector('textarea'))) {
            hasNewInputs = true;
          }
        }
      });
    });
    if (hasNewInputs) {
      applyCaretColor();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// 即座に実行（DOMContentLoadedを待たない）
(function() {
  // 即座に1回実行
  applyCaretColor();
  
  // DOMContentLoadedを待たずに、短い間隔で繰り返し実行
  let checkCount = 0;
  const maxChecks = 50; // 最大50回（約2.5秒間）
  const checkInterval = setInterval(function() {
    applyCaretColor();
    checkCount++;
    if (checkCount >= maxChecks) {
      clearInterval(checkInterval);
    }
  }, 50); // 50msごとにチェック
  
  // DOMContentLoadedでも実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      applyCaretColor();
      setupCaretColorObserver();
      clearInterval(checkInterval); // DOMContentLoaded後は停止
    });
  } else {
    setupCaretColorObserver();
    clearInterval(checkInterval);
  }
})();

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
  console.log('ページが読み込まれました');
  
  // カーソル色を再適用（確実に適用するため）
  applyCaretColor();
  // MutationObserverを設定（既に設定されている場合はスキップ）
  if (!window.caretColorObserverSet) {
    setupCaretColorObserver();
    window.caretColorObserverSet = true;
  }
  
  // requestAnimationFrameでも実行（次のフレームで確実に適用）
  requestAnimationFrame(function() {
    applyCaretColor();
  });
  
  // ヘッダーのアニメーション
  const header = document.querySelector('header h1');
  if (header) {
    header.style.opacity = '0';
    header.style.transition = 'opacity 1s ease-in';
    setTimeout(() => {
      header.style.opacity = '1';
    }, 100);
  }
  
  
  // localStorageから最新のjobsを読み込む（管理者が更新した可能性があるため）
  const latestJobs = JSON.parse(localStorage.getItem('jobs') || 'null');
  if (latestJobs && Array.isArray(latestJobs)) {
    jobs = latestJobs;
  }
  
  // jobsが初期化されているか確認
  if (!jobs || !Array.isArray(jobs) || jobs.length === 0) {
    // 再度localStorageから読み込みを試みる
    const storedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    if (storedJobs && Array.isArray(storedJobs) && storedJobs.length > 0) {
      jobs = storedJobs;
    }
  }
  
  // 初期表示（jobsが存在する場合のみ）
  if (jobs && Array.isArray(jobs)) {
    filterJobs(1);
  }
  
  // 検索機能
  const searchInput = document.getElementById('searchInput');
  const locationFilter = document.getElementById('locationFilter');
  const resetButton = document.getElementById('resetFilter');
  
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      currentPage = 1;
      filterJobs(1);
    });
  }
  if (locationFilter) {
    locationFilter.addEventListener('change', function() {
      currentPage = 1;
      filterJobs(1);
    });
  }
  if (resetButton) {
    resetButton.addEventListener('click', function() {
      if (searchInput) searchInput.value = '';
      if (locationFilter) locationFilter.value = '';
      currentPage = 1;
      filterJobs(1);
    });
  }
  
  // ページネーションの初期化
  setupPagination();
});

// window.loadイベントでも実行（すべてのリソース読み込み後）
window.addEventListener('load', function() {
  applyCaretColor();
  // 読み込み後も定期的にチェック（最大10回、約1秒間）
  let loadCheckCount = 0;
  const loadCheckInterval = setInterval(function() {
    applyCaretColor();
    loadCheckCount++;
    if (loadCheckCount >= 10) {
      clearInterval(loadCheckInterval);
    }
  }, 100);
});

// pageshowイベントでも実行（ページ遷移後、ブラウザのバック/フォワードキャッシュから復元時にも発火）
window.addEventListener('pageshow', function(event) {
  // バック/フォワードキャッシュから復元された場合も含む
  applyCaretColor();
  // 複数回、少し遅延して再適用（確実に適用するため）
  setTimeout(function() {
    applyCaretColor();
  }, 50);
  setTimeout(function() {
    applyCaretColor();
  }, 100);
  setTimeout(function() {
    applyCaretColor();
  }, 200);
  setTimeout(function() {
    applyCaretColor();
  }, 500);
});

// バイトカードをレンダリング
function renderJobs(jobsToRender) {
  const jobCardsContainer = document.getElementById('jobCards');
  const noResults = document.getElementById('noResults');
  
  // 入力チェック
  if (!jobsToRender || !Array.isArray(jobsToRender)) {
    if (jobCardsContainer) jobCardsContainer.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    return;
  }
  
  if (jobsToRender.length === 0) {
    jobCardsContainer.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  
  noResults.style.display = 'none';
  jobCardsContainer.innerHTML = jobsToRender.map(job => {
    // 画像URLをエスケープ
    const imageUrl = job.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+44OP44Kk44Or55Sf5rS7PC90ZXh0Pjwvc3ZnPg==';
    // 未経験OKかどうかを判定（appealに「未経験」が含まれているかチェック）
    const isNoExperienceOK = job.appeal && (job.appeal.includes('未経験') || job.appeal.includes('初心者') || job.appeal.includes('未経験歓迎'));
    return `
    <div class="job-card" data-job-id="${job.id}">
      <div class="job-image-container">
        <img src="${imageUrl}" alt="${job.title || 'バイト画像'}" class="job-image" onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNmM3NTdkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+44OP44Kk44Or55Sf5rS7PC90ZXh0Pjwvc3ZnPg=='">
        ${isNoExperienceOK ? '<span class="no-experience-badge">未経験OK</span>' : ''}
      </div>
      <h3 class="job-title">${job.title}</h3>
      <p class="job-company">${job.company}</p>
      <p class="job-type">${job.type}</p>
      <p class="job-appeal">✨ ${job.appeal || '働きやすい環境'}</p>
      <p class="job-comment">${job.comment || '一緒に働きましょう'}</p>
      <div class="job-salary-container">
        <p class="job-salary">${job.salary}</p>
      </div>
      <p class="job-location">${job.location}</p>
      <span class="job-arrow">→</span>
    </div>
  `;
  }).join('');
  
  // クリックイベントを追加
  const jobCards = document.querySelectorAll('.job-card');
  jobCards.forEach(card => {
    card.addEventListener('click', function() {
      const jobId = this.getAttribute('data-job-id');
      window.location.href = `detail.html?id=${jobId}`;
    });
  });
}

// 検索・フィルター機能（ページネーション対応）
function filterJobs(page = 1) {
  // 最新のjobsをlocalStorageから取得（管理者が更新した可能性があるため）
  let currentJobs = [];
  const latestJobs = JSON.parse(localStorage.getItem('jobs') || 'null');
  
  if (latestJobs && Array.isArray(latestJobs) && latestJobs.length > 0) {
    currentJobs = latestJobs;
  } else if (jobs && Array.isArray(jobs) && jobs.length > 0) {
    currentJobs = jobs;
  } else {
    // jobsが初期化されていない場合、localStorageから再度読み込む
    const storedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    if (storedJobs && Array.isArray(storedJobs)) {
      currentJobs = storedJobs;
    }
  }
  
  // 検索条件を取得
  const searchInput = document.getElementById('searchInput');
  const locationFilterSelect = document.getElementById('locationFilter');
  
  if (!searchInput || !locationFilterSelect) {
    // 要素が存在しない場合は全件表示
    renderJobs(currentJobs);
    return;
  }
  
  const searchTerm = searchInput.value ? searchInput.value.toLowerCase().trim() : '';
  const locationFilter = locationFilterSelect.value || '';
  
  // 検索とフィルタリング
  let filteredJobs = currentJobs.filter(job => {
    // 検索条件チェック
    const matchesSearch = !searchTerm || 
      (job.title && job.title.toLowerCase().includes(searchTerm)) ||
      (job.type && job.type.toLowerCase().includes(searchTerm)) ||
      (job.company && job.company.toLowerCase().includes(searchTerm)) ||
      (job.appeal && job.appeal.toLowerCase().includes(searchTerm)) ||
      (job.comment && job.comment.toLowerCase().includes(searchTerm));
    
    // 地域フィルターチェック
    const matchesLocation = !locationFilter || 
      (job.location && job.location.includes(locationFilter));
    
    return matchesSearch && matchesLocation;
  });
  
  // ページネーション処理
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  currentPage = Math.max(1, Math.min(page, totalPages));
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
  
  // ページネーションUIを表示/非表示
  const pagination = document.getElementById('pagination');
  if (pagination) {
    if (filteredJobs.length > itemsPerPage) {
      pagination.style.display = 'flex';
      updatePaginationUI(currentPage, totalPages);
    } else {
      pagination.style.display = 'none';
    }
  }
  
  renderJobs(paginatedJobs);
}

// ページネーションUIを更新
function updatePaginationUI(page, totalPages) {
  const pageInfo = document.getElementById('pageInfo');
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  
  if (pageInfo) {
    pageInfo.textContent = `${page} / ${totalPages}`;
  }
  
  if (prevPageBtn) {
    prevPageBtn.disabled = page <= 1;
  }
  
  if (nextPageBtn) {
    nextPageBtn.disabled = page >= totalPages;
  }
}

// ページネーションのイベントリスナーを設定
function setupPagination() {
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  
  // リセットボタンの下（バイトカードの先頭）にスクロールする関数
  function scrollToJobCardsTop() {
    const jobCardsElement = document.getElementById('jobCards');
    if (jobCardsElement) {
      const jobCardsTop = jobCardsElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, jobCardsTop);
    }
  }
  
  if (prevPageBtn && !prevPageBtn.hasAttribute('data-pagination-initialized')) {
    prevPageBtn.addEventListener('click', function() {
      if (currentPage > 1) {
        filterJobs(currentPage - 1);
        // リセットボタンの下（バイトカードの先頭）にスクロール
        setTimeout(scrollToJobCardsTop, 100);
      }
    });
    prevPageBtn.setAttribute('data-pagination-initialized', 'true');
  }
  
  if (nextPageBtn && !nextPageBtn.hasAttribute('data-pagination-initialized')) {
    nextPageBtn.addEventListener('click', function() {
      const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      const searchInput = document.getElementById('searchInput');
      const locationFilter = document.getElementById('locationFilter');
      
      const searchTerm = searchInput && searchInput.value ? searchInput.value.toLowerCase().trim() : '';
      const locationFilterValue = locationFilter && locationFilter.value ? locationFilter.value : '';
      
      let filteredJobs = jobs.filter(job => {
        const matchesSearch = !searchTerm || 
          (job.title && job.title.toLowerCase().includes(searchTerm)) ||
          (job.type && job.type.toLowerCase().includes(searchTerm)) ||
          (job.company && job.company.toLowerCase().includes(searchTerm)) ||
          (job.appeal && job.appeal.toLowerCase().includes(searchTerm)) ||
          (job.comment && job.comment.toLowerCase().includes(searchTerm));
        
        const matchesLocation = !locationFilterValue || 
          (job.location && job.location.includes(locationFilterValue));
        
        return matchesSearch && matchesLocation;
      });
      
      const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
      if (currentPage < totalPages) {
        filterJobs(currentPage + 1);
        // リセットボタンの下（バイトカードの先頭）にスクロール
        setTimeout(scrollToJobCardsTop, 100);
      }
    });
    nextPageBtn.setAttribute('data-pagination-initialized', 'true');
  }
}

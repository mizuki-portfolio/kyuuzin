// バイト詳細データの初期化（localStorageから読み込み、なければデフォルト値を保存）
let jobDetails = JSON.parse(localStorage.getItem('jobDetails') || 'null');

if (!jobDetails) {
  jobDetails = {
  '1': {
    title: 'コンビニ店員',
    type: 'アルバイト',
    salary: '時給 1,100円～',
    location: '東京都渋谷区',
    company: 'コンビニエース',
    workTime: '9:00～22:00の間でシフト制',
    description: 'コンビニエンスストアでの接客業務、レジ業務、商品管理などを行います。未経験者でも丁寧に指導いたします。',
    requirements: '18歳以上、コミュニケーション能力、基本的なPC操作',
    benefits: '社会保険完備、交通費支給、研修制度あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '2': {
    title: 'レストランスタッフ',
    type: 'アルバイト',
    salary: '時給 1,200円～',
    location: '東京都新宿区',
    company: 'レストラン サクラ',
    workTime: '11:00～23:00の間でシフト制',
    description: 'レストランでの接客、配膳、テーブルセッティングなどのホール業務を行います。明るく元気な方大歓迎です。',
    requirements: '18歳以上、接客経験歓迎（未経験可）、体力に自信がある方',
    benefits: '食事補助あり、社会保険完備、スタッフ割引あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '3': {
    title: '配送ドライバー',
    type: 'アルバイト',
    salary: '時給 1,300円～',
    location: '東京都港区',
    company: 'スピード配送',
    workTime: '8:00～20:00の間でシフト制',
    description: '宅配便の配達業務を行います。運転業務の経験がある方歓迎。安全第一で業務にあたります。',
    requirements: '18歳以上、普通自動車免許必須、1年以上の運転経験',
    benefits: 'ガソリン代支給、社会保険完備、賞与あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '4': {
    title: '接客スタッフ',
    type: 'アルバイト',
    salary: '時給 1,150円～',
    location: '東京都世田谷区',
    company: 'アパレル モダン',
    workTime: '10:00～22:00の間でシフト制',
    description: 'ショップでの接客、商品説明、レジ業務などを担当します。お客様に寄り添った接客を心がけます。',
    requirements: '18歳以上、接客経験歓迎、明るい性格の方',
    benefits: '社員割引あり、交通費支給、研修制度充実',
    contact: '応募は下記のボタンからお願いします'
  },
  '5': {
    title: 'コンビニ店員',
    type: 'アルバイト',
    salary: '時給 1,050円～',
    location: '神奈川県横浜市',
    company: 'コンビニ スマイル',
    workTime: '9:00～22:00の間でシフト制',
    description: 'コンビニエンスストアでの接客業務、レジ業務、商品管理などを行います。未経験者でも丁寧に指導いたします。',
    requirements: '18歳以上、コミュニケーション能力、基本的なPC操作',
    benefits: '社会保険完備、交通費支給、研修制度あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '6': {
    title: 'カフェスタッフ',
    type: 'アルバイト',
    salary: '時給 1,100円～',
    location: '東京都渋谷区',
    company: 'カフェ リラックス',
    workTime: '7:00～22:00の間でシフト制',
    description: 'カフェでの接客、ドリンク作成、レジ業務などを行います。明るく元気な方大歓迎です。',
    requirements: '18歳以上、接客経験歓迎（未経験可）',
    benefits: 'ドリンク割引あり、社会保険完備、研修制度充実',
    contact: '応募は下記のボタンからお願いします'
  },
  '7': {
    title: 'レストランスタッフ',
    type: 'アルバイト',
    salary: '時給 1,180円～',
    location: '神奈川県川崎市',
    company: 'レストラン パスタ',
    workTime: '11:00～23:00の間でシフト制',
    description: 'レストランでの接客、配膳、テーブルセッティングなどのホール業務を行います。明るく元気な方大歓迎です。',
    requirements: '18歳以上、接客経験歓迎（未経験可）、体力に自信がある方',
    benefits: '食事補助あり、社会保険完備、スタッフ割引あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '8': {
    title: 'スーパー店員',
    type: 'アルバイト',
    salary: '時給 1,000円～',
    location: '埼玉県さいたま市',
    company: 'スーパー フレッシュ',
    workTime: '9:00～21:00の間でシフト制',
    description: 'スーパーマーケットでの接客、レジ業務、商品陳列などを行います。未経験者でも丁寧に指導いたします。',
    requirements: '18歳以上、コミュニケーション能力',
    benefits: '社会保険完備、交通費支給、商品割引あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '9': {
    title: '配送ドライバー',
    type: 'アルバイト',
    salary: '時給 1,250円～',
    location: '千葉県千葉市',
    company: 'スピーディ配送',
    workTime: '8:00～20:00の間でシフト制',
    description: '宅配便の配達業務を行います。運転業務の経験がある方歓迎。安全第一で業務にあたります。',
    requirements: '18歳以上、普通自動車免許必須、1年以上の運転経験',
    benefits: 'ガソリン代支給、社会保険完備、賞与あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '10': {
    title: 'コンビニ店員',
    type: 'アルバイト',
    salary: '時給 1,080円～',
    location: '大阪府大阪市',
    company: 'コンビニ エコ',
    workTime: '9:00～22:00の間でシフト制',
    description: 'コンビニエンスストアでの接客業務、レジ業務、商品管理などを行います。未経験者でも丁寧に指導いたします。',
    requirements: '18歳以上、コミュニケーション能力、基本的なPC操作',
    benefits: '社会保険完備、交通費支給、研修制度あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '11': {
    title: 'カフェスタッフ',
    type: 'アルバイト',
    salary: '時給 1,120円～',
    location: '東京都新宿区',
    company: 'カフェ アロマ',
    workTime: '7:00～22:00の間でシフト制',
    description: 'カフェでの接客、ドリンク作成、レジ業務などを行います。明るく元気な方大歓迎です。',
    requirements: '18歳以上、接客経験歓迎（未経験可）',
    benefits: 'ドリンク割引あり、社会保険完備、研修制度充実',
    contact: '応募は下記のボタンからお願いします'
  },
  '12': {
    title: 'レストランスタッフ',
    type: 'アルバイト',
    salary: '時給 1,200円～',
    location: '東京都港区',
    company: 'レストラン ダイナー',
    workTime: '11:00～23:00の間でシフト制',
    description: 'レストランでの接客、配膳、テーブルセッティングなどのホール業務を行います。明るく元気な方大歓迎です。',
    requirements: '18歳以上、接客経験歓迎（未経験可）、体力に自信がある方',
    benefits: '食事補助あり、社会保険完備、スタッフ割引あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '13': {
    title: 'スーパー店員',
    type: 'アルバイト',
    salary: '時給 1,050円～',
    location: '神奈川県横浜市',
    company: 'スーパー グリーン',
    workTime: '9:00～21:00の間でシフト制',
    description: 'スーパーマーケットでの接客、レジ業務、商品陳列などを行います。未経験者でも丁寧に指導いたします。',
    requirements: '18歳以上、コミュニケーション能力',
    benefits: '社会保険完備、交通費支給、商品割引あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '14': {
    title: '接客スタッフ',
    type: 'アルバイト',
    salary: '時給 1,100円～',
    location: '東京都渋谷区',
    company: 'ライフスタイル シンプル',
    workTime: '10:00～22:00の間でシフト制',
    description: 'ショップでの接客、商品説明、レジ業務などを担当します。お客様に寄り添った接客を心がけます。',
    requirements: '18歳以上、接客経験歓迎、明るい性格の方',
    benefits: '社員割引あり、交通費支給、研修制度充実',
    contact: '応募は下記のボタンからお願いします'
  },
  '15': {
    title: '配送ドライバー',
    type: 'アルバイト',
    salary: '時給 1,280円～',
    location: '埼玉県川口市',
    company: 'メール配送サービス',
    workTime: '8:00～20:00の間でシフト制',
    description: '宅配便の配達業務を行います。運転業務の経験がある方歓迎。安全第一で業務にあたります。',
    requirements: '18歳以上、普通自動車免許必須、1年以上の運転経験',
    benefits: 'ガソリン代支給、社会保険完備、賞与あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '16': {
    title: 'コンビニ店員',
    type: 'アルバイト',
    salary: '時給 1,090円～',
    location: '千葉県船橋市',
    company: 'コンビニ ミニマル',
    workTime: '9:00～22:00の間でシフト制',
    description: 'コンビニエンスストアでの接客業務、レジ業務、商品管理などを行います。未経験者でも丁寧に指導いたします。',
    requirements: '18歳以上、コミュニケーション能力、基本的なPC操作',
    benefits: '社会保険完備、交通費支給、研修制度あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '17': {
    title: 'レストランスタッフ',
    type: 'アルバイト',
    salary: '時給 1,220円～',
    location: '東京都千代田区',
    company: 'レストラン ビストロ',
    workTime: '11:00～23:00の間でシフト制',
    description: 'レストランでの接客、配膳、テーブルセッティングなどのホール業務を行います。プロの技術を学べる環境です。',
    requirements: '18歳以上、接客経験歓迎（未経験可）、体力に自信がある方',
    benefits: '食事無料、社会保険完備、充実した研修制度',
    contact: '応募は下記のボタンからお願いします'
  },
  '18': {
    title: 'カフェスタッフ',
    type: 'アルバイト',
    salary: '時給 1,130円～',
    location: '神奈川県藤沢市',
    company: 'カフェ マイル',
    workTime: '7:00～22:00の間でシフト制',
    description: 'カフェでの接客、ドリンク作成、レジ業務などを行います。明るく活気のある職場です。',
    requirements: '18歳以上、接客経験歓迎（未経験可）',
    benefits: 'ドリンク割引、社会保険完備、駅近で通勤便利',
    contact: '応募は下記のボタンからお願いします'
  },
  '19': {
    title: 'スーパー店員',
    type: 'アルバイト',
    salary: '時給 1,080円～',
    location: '東京都練馬区',
    company: 'スーパー マート',
    workTime: '9:00～21:00の間でシフト制',
    description: 'スーパーマーケットでの接客、レジ業務、商品陳列などを行います。地域密着型の働きやすい環境です。',
    requirements: '18歳以上、コミュニケーション能力',
    benefits: '商品割引、社会保険完備、福利厚生充実',
    contact: '応募は下記のボタンからお願いします'
  },
  '20': {
    title: '配送ドライバー',
    type: 'アルバイト',
    salary: '時給 1,320円～',
    location: '東京都足立区',
    company: 'クイック配送',
    workTime: '8:00～20:00の間でシフト制',
    description: '宅配便の配達業務を行います。自分のペースで働けます。',
    requirements: '18歳以上、普通自動車免許必須、1年以上の運転経験',
    benefits: '高時給、ガソリン代支給、時間自由',
    contact: '応募は下記のボタンからお願いします'
  },
  '21': {
    title: '接客スタッフ',
    type: 'アルバイト',
    salary: '時給 1,140円～',
    location: '東京都文京区',
    company: 'ファッション プラザ',
    workTime: '10:00～22:00の間でシフト制',
    description: 'ショップでの接客、商品説明、レジ業務などを担当します。トレンドを学べる職場です。',
    requirements: '18歳以上、接客経験歓迎、明るい性格の方',
    benefits: 'スタッフ割引、接客スキル向上、交通費支給',
    contact: '応募は下記のボタンからお願いします'
  },
  '22': {
    title: 'コンビニ店員',
    type: 'アルバイト',
    salary: '時給 1,070円～',
    location: '神奈川県相模原市',
    company: 'コンビニ デイリー',
    workTime: '9:00～22:00の間でシフト制',
    description: 'コンビニエンスストアでの接客業務、レジ業務、商品管理などを行います。柔軟な働き方ができます。',
    requirements: '18歳以上、コミュニケーション能力、基本的なPC操作',
    benefits: '社会保険完備、交通費支給、シフト調整可能',
    contact: '応募は下記のボタンからお願いします'
  },
  '23': {
    title: 'レストランスタッフ',
    type: 'アルバイト',
    salary: '時給 1,190円～',
    location: '埼玉県越谷市',
    company: 'レストラン オアシス',
    workTime: '11:00～23:00の間でシフト制',
    description: 'レストランでの接客、配膳、テーブルセッティングなどのホール業務を行います。温かい雰囲気の職場です。',
    requirements: '18歳以上、接客経験歓迎（未経験可）、チームワーク重視',
    benefits: '食事補助、社会保険完備、スタッフ割引あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '24': {
    title: 'カフェスタッフ',
    type: 'アルバイト',
    salary: '時給 1,110円～',
    location: '千葉県柏市',
    company: 'カフェ ブレンド',
    workTime: '7:00～22:00の間でシフト制',
    description: 'カフェでの接客、ドリンク作成、レジ業務などを行います。リラックスした雰囲気です。',
    requirements: '18歳以上、接客経験歓迎（未経験可）',
    benefits: 'ドリンク無料、社会保険完備、ゆったり勤務',
    contact: '応募は下記のボタンからお願いします'
  },
  '25': {
    title: 'スーパー店員',
    type: 'アルバイト',
    salary: '時給 1,040円～',
    location: '大阪府堺市',
    company: 'スーパー マックス',
    workTime: '9:00～21:00の間でシフト制',
    description: 'スーパーマーケットでの接客、レジ業務、商品陳列などを行います。安定した働き方ができます。',
    requirements: '18歳以上、コミュニケーション能力',
    benefits: '商品割引、社会保険完備、長期勤務可',
    contact: '応募は下記のボタンからお願いします'
  },
  '26': {
    title: 'コンビニ店員',
    type: 'アルバイト',
    salary: '時給 1,060円～',
    location: '東京都台東区',
    company: 'コンビニ ストリート',
    workTime: '9:00～22:00の間でシフト制',
    description: 'コンビニエンスストアでの接客業務、レジ業務、商品管理などを行います。便利な立地で働けます。',
    requirements: '18歳以上、コミュニケーション能力、基本的なPC操作',
    benefits: '社会保険完備、交通費支給、駅直結で24時間営業',
    contact: '応募は下記のボタンからお願いします'
  },
  '27': {
    title: 'レストランスタッフ',
    type: 'アルバイト',
    salary: '時給 1,210円～',
    location: '東京都品川区',
    company: 'レストラン サンセット',
    workTime: '11:00～23:00の間でシフト制',
    description: 'レストランでの接客、配膳、テーブルセッティングなどのホール業務を行います。チームで楽しく働けます。',
    requirements: '18歳以上、接客経験歓迎（未経験可）、体力に自信がある方',
    benefits: '食事補助、社会保険完備、明るい職場',
    contact: '応募は下記のボタンからお願いします'
  },
  '28': {
    title: 'カフェスタッフ',
    type: 'アルバイト',
    salary: '時給 1,090円～',
    location: '東京都目黒区',
    company: 'カフェ モーニング',
    workTime: '7:00～22:00の間でシフト制',
    description: 'カフェでの接客、ドリンク作成、レジ業務などを行います。ゆったりとした朝の時間を過ごせます。',
    requirements: '18歳以上、接客経験歓迎（未経験可）',
    benefits: '朝食無料、社会保険完備、落ち着いた空間',
    contact: '応募は下記のボタンからお願いします'
  },
  '29': {
    title: '配送ドライバー',
    type: 'アルバイト',
    salary: '時給 1,310円～',
    location: '神奈川県厚木市',
    company: 'スムーズ配送',
    workTime: '8:00～20:00の間でシフト制',
    description: '宅配便の配達業務を行います。安定した働き方ができます。',
    requirements: '18歳以上、普通自動車免許必須、1年以上の運転経験',
    benefits: '高時給、ガソリン代支給、福利厚生充実',
    contact: '応募は下記のボタンからお願いします'
  },
  '30': {
    title: '接客スタッフ',
    type: 'アルバイト',
    salary: '時給 1,130円～',
    location: '東京都杉並区',
    company: 'ショップ コレクション',
    workTime: '10:00～22:00の間でシフト制',
    description: 'ショップでの接客、商品説明、レジ業務などを担当します。ファッションが好きな方歓迎です。',
    requirements: '18歳以上、接客経験歓迎、明るい性格の方',
    benefits: 'スタッフ割引、接客スキル向上、交通費支給',
    contact: '応募は下記のボタンからお願いします'
  },
  '31': {
    title: 'コンビニ店員',
    type: 'アルバイト',
    salary: '時給 1,080円～',
    location: '埼玉県所沢市',
    company: 'コンビニ ローカル',
    workTime: '9:00～22:00の間でシフト制',
    description: 'コンビニエンスストアでの接客業務、レジ業務、商品管理などを行います。地元の方とふれあえます。',
    requirements: '18歳以上、コミュニケーション能力、基本的なPC操作',
    benefits: '社会保険完備、交通費支給、地域密着',
    contact: '応募は下記のボタンからお願いします'
  },
  '32': {
    title: 'レストランスタッフ',
    type: 'アルバイト',
    salary: '時給 1,170円～',
    location: '千葉県松戸市',
    company: 'レストラン ハーモニー',
    workTime: '11:00～23:00の間でシフト制',
    description: 'レストランでの接客、配膳、テーブルセッティングなどのホール業務を行います。和気あいあいとした職場です。',
    requirements: '18歳以上、接客経験歓迎（未経験可）、チームワーク重視',
    benefits: '食事補助、社会保険完備、スタッフ割引あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '33': {
    title: 'カフェスタッフ',
    type: 'アルバイト',
    salary: '時給 1,100円～',
    location: '東京都中野区',
    company: 'カフェ ベイジー',
    workTime: '7:00～22:00の間でシフト制',
    description: 'カフェでの接客、ドリンク作成、レジ業務などを行います。コーヒー好きの方におすすめです。',
    requirements: '18歳以上、接客経験歓迎（未経験可）',
    benefits: 'ドリンク無料、社会保険完備、雰囲気良い',
    contact: '応募は下記のボタンからお願いします'
  },
  '34': {
    title: 'スーパー店員',
    type: 'アルバイト',
    salary: '時給 1,030円～',
    location: '神奈川県厚木市',
    company: 'スーパー ナチュラル',
    workTime: '9:00～21:00の間でシフト制',
    description: 'スーパーマーケットでの接客、レジ業務、商品陳列などを行います。安定した働き方ができます。',
    requirements: '18歳以上、コミュニケーション能力',
    benefits: '商品割引、社会保険完備、長期勤務可',
    contact: '応募は下記のボタンからお願いします'
  },
  '35': {
    title: '配送ドライバー',
    type: 'アルバイト',
    salary: '時給 1,290円～',
    location: '埼玉県大宮市',
    company: '運送 ネットワーク',
    workTime: '8:00～20:00の間でシフト制',
    description: '宅配便の配達業務を行います。自由な働き方ができます。',
    requirements: '18歳以上、普通自動車免許必須、1年以上の運転経験',
    benefits: '高時給、ガソリン代支給、一人でマイペース',
    contact: '応募は下記のボタンからお願いします'
  },
  '36': {
    title: '接客スタッフ',
    type: 'アルバイト',
    salary: '時給 1,120円～',
    location: '東京都板橋区',
    company: 'アパレル サンプル',
    workTime: '10:00～22:00の間でシフト制',
    description: 'ショップでの接客、商品説明、レジ業務などを担当します。ファッションに興味がある方歓迎です。',
    requirements: '18歳以上、接客経験歓迎、明るい性格の方',
    benefits: 'スタッフ割引、接客スキル向上、交通費支給',
    contact: '応募は下記のボタンからお願いします'
  },
  '37': {
    title: 'コンビニ店員',
    type: 'アルバイト',
    salary: '時給 1,050円～',
    location: '千葉県市川市',
    company: 'コンビニ イージー',
    workTime: '9:00～22:00の間でシフト制',
    description: 'コンビニエンスストアでの接客業務、レジ業務、商品管理などを行います。柔軟な働き方ができます。',
    requirements: '18歳以上、コミュニケーション能力、基本的なPC操作',
    benefits: '社会保険完備、交通費支給、シフト自由',
    contact: '応募は下記のボタンからお願いします'
  },
  '38': {
    title: 'レストランスタッフ',
    type: 'アルバイト',
    salary: '時給 1,160円～',
    location: '東京都北区',
    company: 'レストラン ファミリー',
    workTime: '11:00～23:00の間でシフト制',
    description: 'レストランでの接客、配膳、テーブルセッティングなどのホール業務を行います。温かい雰囲気の職場です。',
    requirements: '18歳以上、接客経験歓迎（未経験可）、家族経営',
    benefits: '食事補助、社会保険完備、スタッフ割引あり',
    contact: '応募は下記のボタンからお願いします'
  },
  '39': {
    title: 'カフェスタッフ',
    type: 'アルバイト',
    salary: '時給 1,080円～',
    location: '神奈川県茅ヶ崎市',
    company: 'カフェ シーサイド',
    workTime: '7:00～22:00の間でシフト制',
    description: 'カフェでの接客、ドリンク作成、レジ業務などを行います。リラックスした環境で働けます。',
    requirements: '18歳以上、接客経験歓迎（未経験可）',
    benefits: 'ドリンク割引、社会保険完備、海近く',
    contact: '応募は下記のボタンからお願いします'
  },
  '40': {
    title: 'スーパー店員',
    type: 'アルバイト',
    salary: '時給 1,020円～',
    location: '埼玉県川越市',
    company: 'スーパー トラディション',
    workTime: '9:00～21:00の間でシフト制',
    description: 'スーパーマーケットでの接客、レジ業務、商品陳列などを行います。伝統ある店舗で働けます。',
    requirements: '18歳以上、コミュニケーション能力',
    benefits: '商品割引、社会保険完備、地域密着',
    contact: '応募は下記のボタンからお願いします'
  }
  };
  localStorage.setItem('jobDetails', JSON.stringify(jobDetails));
}

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', function() {
  // URLパラメータからjobIdを取得
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get('id');
  
  const jobDetailContainer = document.getElementById('jobDetail');
  
  if (jobId && jobDetails[jobId]) {
    const job = jobDetails[jobId];
    
    // jobsデータからappeal情報を取得（未経験OK判定用）
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const jobData = jobs.find(j => j.id === parseInt(jobId));
    const isNoExperienceOK = jobData && jobData.appeal && (
      jobData.appeal.includes('未経験') || 
      jobData.appeal.includes('初心者') || 
      jobData.appeal.includes('未経験歓迎')
    ) || (
      job.requirements && (
        job.requirements.includes('未経験') || 
        job.requirements.includes('未経験可') ||
        job.requirements.includes('未経験歓迎')
      )
    ) || (
      job.description && (
        job.description.includes('未経験') || 
        job.description.includes('未経験者')
      )
    );
    
    jobDetailContainer.innerHTML = `
      <div class="detail-header">
        <h2>${job.title}</h2>
        <span class="detail-type">${job.type}</span>
        ${isNoExperienceOK ? '<span class="no-experience-badge-detail">未経験OK</span>' : ''}
      </div>
      
      <div class="detail-info">
        <div class="info-item">
          <span class="info-label">会社名</span>
          <span class="info-value">${job.company || '未設定'}</span>
        </div>
        <div class="info-item">
          <span class="info-label">給与</span>
          <span class="info-value highlight">${job.salary}</span>
        </div>
        <div class="info-item">
          <span class="info-label">勤務地</span>
          <span class="info-value">${job.location}</span>
        </div>
        ${job.nearestStation ? `
        <div class="info-item">
          <span class="info-label">最寄り駅</span>
          <span class="info-value">${job.nearestStation}</span>
        </div>
        ` : ''}
        <div class="info-item">
          <span class="info-label">勤務時間</span>
          <span class="info-value">${job.workTime}</span>
        </div>
      </div>
      
      <div class="detail-section">
        <h3>仕事内容</h3>
        <p>${job.description}</p>
      </div>
      
      <div class="detail-section">
        <h3>応募条件</h3>
        <p>${job.requirements}</p>
      </div>
      
      <div class="detail-section">
        <h3>待遇・福利厚生</h3>
        <p>${job.benefits}</p>
      </div>
      
      <div class="detail-actions">
        <button class="apply-button">このバイトに応募する</button>
      </div>
    `;
    
    // 応募ボタンのイベント
    const applyButton = document.querySelector('.apply-button');
    if (applyButton) {
      applyButton.addEventListener('click', function() {
        window.location.href = `apply.html?id=${jobId}`;
      });
    }
  } else {
    jobDetailContainer.innerHTML = '<p>バイト情報が見つかりませんでした。</p>';
  }
});

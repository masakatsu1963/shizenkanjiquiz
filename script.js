// ============================================================
//  自然漢字クイズ — script.js
//  カテゴリ: 自然現象 / 動物 / 植物
//  難度: 1=初級 / 2=中級 / 3=上級 / 4=最上級
// ============================================================

// ────────────────────────────────────────────────────────────
// 1. 問題データ（110問）
// ────────────────────────────────────────────────────────────
const QUIZ_DATA = [
  { kanji:"霰",     yomi:"あられ",       katakana:"アラレ",       category:"自然", level:1, origin:"雪雲から降る小さな氷の粒。冬空の贈り物。" },
  { kanji:"霙",     yomi:"みぞれ",       katakana:"ミゾレ",       category:"自然", level:1, origin:"雪と雨が混じって降る。春や秋の移ろいを告げる。" },
  { kanji:"霞",     yomi:"かすみ",       katakana:"カスミ",       category:"自然", level:1, origin:"春の朝、山野を薄く包む白い靄。幻想的な景色。" },
  { kanji:"靄",     yomi:"もや",         katakana:"モヤ",         category:"自然", level:1, origin:"水分が漂い視界をぼかす薄い霧。夜明けや夕暮れに出る。" },
  { kanji:"虹",     yomi:"にじ",         katakana:"ニジ",         category:"自然", level:1, origin:"雨上がりに太陽と反対側の空にかかる七色の弧。" },
  { kanji:"稲妻",   yomi:"いなずま",     katakana:"イナズマ",     category:"自然", level:1, origin:"雷が走る光。稲の妻（穂）が実る頃に多く見られた。" },
  { kanji:"凪",     yomi:"なぎ",         katakana:"ナギ",         category:"自然", level:1, origin:"風が止み、海や湖が穏やかになること。朝凪・夕凪など。" },
  { kanji:"渦",     yomi:"うず",         katakana:"ウズ",         category:"自然", level:1, origin:"水や風が円を描いて回る流れ。川や海峡の名所。" },
  { kanji:"霜",     yomi:"しも",         katakana:"シモ",         category:"自然", level:1, origin:"冷え込んだ夜、地面に白く降りる氷の結晶。" },
  { kanji:"吹雪",   yomi:"ふぶき",       katakana:"フブキ",       category:"自然", level:2, origin:"強風で雪が横殴りに吹き荒れる状態。冬の猛威。" },
  { kanji:"氷柱",   yomi:"つらら",       katakana:"ツララ",       category:"自然", level:2, origin:"軒先から垂れ下がる棒状の氷。冬の風物詩。" },
  { kanji:"霜柱",   yomi:"しもばしら",   katakana:"シモバシラ",   category:"自然", level:2, origin:"地中の水分が凍り、土を押し上げてできる柱状の氷。" },
  { kanji:"時雨",   yomi:"しぐれ",       katakana:"シグレ",       category:"自然", level:2, origin:"秋から初冬、断続的に降る通り雨。俳句の季語。" },
  { kanji:"五月雨", yomi:"さみだれ",     katakana:"サミダレ",     category:"自然", level:2, origin:"旧暦五月（今の梅雨期）に降り続く長雨。" },
  { kanji:"木枯",   yomi:"こがらし",     katakana:"コガラシ",     category:"自然", level:2, origin:"晩秋から初冬に吹く冷たく強い北西の風。木を枯らす。" },
  { kanji:"春一番", yomi:"はるいちばん", katakana:"ハルイチバン",  category:"自然", level:2, origin:"春の最初に吹く強い南寄りの風。立春後に初めて吹く。" },
  { kanji:"雪崩",   yomi:"なだれ",       katakana:"ナダレ",       category:"自然", level:2, origin:"山の斜面に積もった雪が一気に崩れ落ちる現象。" },
  { kanji:"霧雨",   yomi:"きりさめ",     katakana:"キリサメ",     category:"自然", level:2, origin:"霧のように細かい粒の雨。しっとりと濡らす。" },
  { kanji:"潮騒",   yomi:"しおさい",     katakana:"シオサイ",     category:"自然", level:2, origin:"波が打ち寄せ岩や砂浜に砕ける音。海辺の響き。" },
  { kanji:"薄氷",   yomi:"うすごおり",   katakana:"ウスゴオリ",   category:"自然", level:2, origin:"薄く張った氷。一歩で割れそうな儚さを表す言葉。" },
  { kanji:"渦潮",   yomi:"うずしお",     katakana:"ウズシオ",     category:"自然", level:2, origin:"海峡で潮の流れがぶつかり生まれる大きな渦。鳴門が有名。" },
  { kanji:"雹",     yomi:"ひょう",       katakana:"ヒョウ",       category:"自然", level:3, origin:"積乱雲の中で成長した大粒の氷の固まり。農作物を痛める。" },
  { kanji:"颱風",   yomi:"たいふう",     katakana:"タイフウ",     category:"自然", level:3, origin:"「颱風」は台風の旧字体。猛烈な熱帯低気圧を指す。" },
  { kanji:"水脈",   yomi:"みお",         katakana:"ミオ",         category:"自然", level:3, origin:"船が通る深い水の道。水底に続く流れの筋。" },
  { kanji:"海嘯",   yomi:"つなみ",       katakana:"ツナミ",       category:"自然", level:4, origin:"海底地震などで生じる巨大波。「海嘯」は古い漢語表記。" },
  { kanji:"颶風",   yomi:"ぐふう",       katakana:"グフウ",       category:"自然", level:3, origin:"激しく吹き荒れる強風・暴風。颶は疾風の意。" },
  { kanji:"燕",     yomi:"つばめ",       katakana:"ツバメ",       category:"動物", level:1, origin:"春を告げる渡り鳥。泥と草で椀状の巣を軒先に作る。" },
  { kanji:"鶺鴒",   yomi:"せきれい",     katakana:"セキレイ",     category:"動物", level:1, origin:"川沿いに棲む小鳥。尾を上下に振る動きが特徴的。" },
  { kanji:"蛍",     yomi:"ほたる",       katakana:"ホタル",       category:"動物", level:1, origin:"夏の夜、腹部の発光器で緑光を放つ甲虫の仲間。" },
  { kanji:"蝶",     yomi:"ちょう",       katakana:"チョウ",       category:"動物", level:1, origin:"花から花へ蜜を求めて舞う昆虫。鱗粉を持つ翅が美しい。" },
  { kanji:"鷺",     yomi:"さぎ",         katakana:"サギ",         category:"動物", level:1, origin:"水辺に立ち魚を待つ白く長首の大型鳥。静寂を好む。" },
  { kanji:"雀",     yomi:"すずめ",       katakana:"スズメ",       category:"動物", level:1, origin:"人家に最も身近な小型鳥。茶褐色で頬に黒班がある。" },
  { kanji:"鰻",     yomi:"うなぎ",       katakana:"ウナギ",       category:"動物", level:1, origin:"細長い体の淡水魚。夏の土用の丑の日に食べる習慣がある。" },
  { kanji:"蟹",     yomi:"かに",         katakana:"カニ",         category:"動物", level:1, origin:"甲殻類。横歩きする姿と大きなハサミが特徴。" },
  { kanji:"駒鳥",   yomi:"こまどり",     katakana:"コマドリ",     category:"動物", level:2, origin:"山地に棲む小鳥。美しいさえずりが馬の嘶きに似るとされる。" },
  { kanji:"鶯",     yomi:"うぐいす",     katakana:"ウグイス",     category:"動物", level:2, origin:"春告げ鳥。「ホーホケキョ」の鳴き声が春の訪れを知らせる。" },
  { kanji:"梟",     yomi:"ふくろう",     katakana:"フクロウ",     category:"動物", level:2, origin:"夜行性の猛禽類。大きな眼と無音の飛翔が特徴。森の賢者。" },
  { kanji:"目白",   yomi:"めじろ",       katakana:"メジロ",       category:"動物", level:2, origin:"目の周りに白い輪を持つ小鳥。梅や桜の花蜜を好む。" },
  { kanji:"千鳥",   yomi:"ちどり",       katakana:"チドリ",       category:"動物", level:2, origin:"砂浜や干潟に棲む小型の鳥。独特の千鳥足で移動する。" },
  { kanji:"蜻蛉",   yomi:"とんぼ",       katakana:"トンボ",       category:"動物", level:2, origin:"四枚翅を持つ昆虫。前にしか進まぬ姿勢から武士に愛された。" },
  { kanji:"鵜",     yomi:"う",           katakana:"ウ",           category:"動物", level:2, origin:"潜水が得意な水鳥。鵜飼いで魚を捕らえる漁に使われる。" },
  { kanji:"海豚",   yomi:"いるか",       katakana:"イルカ",       category:"動物", level:2, origin:"知性が高い海の哺乳類。群れで泳ぎ、海面から跳ぶ。" },
  { kanji:"海豹",   yomi:"あざらし",     katakana:"アザラシ",     category:"動物", level:2, origin:"寒海に棲む哺乳類。丸い体と大きな目が愛らしい。" },
  { kanji:"鰤",     yomi:"ぶり",         katakana:"ブリ",         category:"動物", level:2, origin:"成長するにつれ名前が変わる出世魚。冬が旬の海魚。" },
  { kanji:"鮪",     yomi:"まぐろ",       katakana:"マグロ",       category:"動物", level:2, origin:"外洋を高速で回遊する大型魚。泳ぎ続けなければ死ぬ。" },
  { kanji:"鯵",     yomi:"あじ",         katakana:"アジ",         category:"動物", level:2, origin:"日本人に馴染み深い小魚。刺身・干物・なめろうと多彩。" },
  { kanji:"鰯",     yomi:"いわし",       katakana:"イワシ",       category:"動物", level:2, origin:"大群で海を泳ぐ小魚。栄養豊富で庶民の魚として親しまれた。" },
  { kanji:"鰹",     yomi:"かつお",       katakana:"カツオ",       category:"動物", level:2, origin:"太平洋を回遊する回遊魚。出汁の王様「かつお節」の原料。" },
  { kanji:"時鳥",   yomi:"ほととぎす",   katakana:"ホトトギス",   category:"動物", level:3, origin:"夏に鳴く渡り鳥。鳴き声が「特許許可局」と聞こえると言われる。" },
  { kanji:"郭公",   yomi:"かっこう",     katakana:"カッコウ",     category:"動物", level:3, origin:"「カッコウ」と鳴く渡り鳥。他の鳥の巣に托卵することで有名。" },
  { kanji:"蜉蝣",   yomi:"かげろう",     katakana:"カゲロウ",     category:"動物", level:4, origin:"一日しか生きない儚い虫。川辺に大量発生し光に群れる。" },
  { kanji:"蜩",     yomi:"ひぐらし",     katakana:"ヒグラシ",     category:"動物", level:3, origin:"夕暮れに「カナカナ」と鳴くセミ。哀愁ある声が秋を呼ぶ。" },
  { kanji:"螻蛄",   yomi:"おけら",       katakana:"オケラ",       category:"動物", level:4, origin:"前肢が大きく土を掘るコオロギの仲間。「おけら」は無一文の意も。" },
  { kanji:"蟋蟀",   yomi:"こおろぎ",     katakana:"コオロギ",     category:"動物", level:4, origin:"秋の夜に「リーリー」と鳴く虫。古来、秋の声として詩歌に詠まれた。" },
  { kanji:"蟷螂",   yomi:"かまきり",     katakana:"カマキリ",     category:"動物", level:4, origin:"鎌状の前肢で昆虫を捕食する肉食性昆虫。交尾後に雌が雄を食べる。" },
  { kanji:"蛞蝓",   yomi:"なめくじ",     katakana:"ナメクジ",     category:"動物", level:4, origin:"殻を持たないカタツムリの仲間。湿気のある夜に活動する。" },
  { kanji:"河馬",   yomi:"かば",         katakana:"カバ",         category:"動物", level:3, origin:"アフリカの川や湖に棲む大型哺乳類。皮膚から赤い汗をかく。" },
  { kanji:"鱈",     yomi:"たら",         katakana:"タラ",         category:"動物", level:3, origin:"北の冷海に棲む大型白身魚。冬の鍋料理に欠かせない。" },
  { kanji:"鮠",     yomi:"はや",         katakana:"ハヤ",         category:"動物", level:3, origin:"川の流れに棲む細長い淡水魚。ハヤの仲間は総称でよく使われる。" },
  { kanji:"蝦蟇",   yomi:"がまがえる",   katakana:"ガマガエル",   category:"動物", level:3, origin:"大型のヒキガエルの俗名。毒腺を持ち、蝦蟇油として知られた。" },
  { kanji:"藤",     yomi:"ふじ",         katakana:"フジ",         category:"植物", level:1, origin:"春に薄紫の花房を垂らすマメ科のつる植物。棚から滝のように咲く。" },
  { kanji:"椿",     yomi:"つばき",       katakana:"ツバキ",       category:"植物", level:1, origin:"冬から春に赤・白・ピンクの花を咲かせる常緑樹。茶道に縁が深い。" },
  { kanji:"蓮",     yomi:"はす",         katakana:"ハス",         category:"植物", level:1, origin:"泥から美しい花を咲かせる水生植物。仏教と深い関わりを持つ。" },
  { kanji:"萩",     yomi:"はぎ",         katakana:"ハギ",         category:"植物", level:1, origin:"秋の七草の一つ。細い枝に小さな紫や白の花を無数に咲かせる。" },
  { kanji:"朝顔",   yomi:"あさがお",     katakana:"アサガオ",     category:"植物", level:1, origin:"夏の朝に開き午後には閉じるラッパ形の花。縁日の風物詩。" },
  { kanji:"百合",   yomi:"ゆり",         katakana:"ユリ",         category:"植物", level:1, origin:"大きく優雅な花を咲かせる球根植物。純潔・無垢の象徴とされる。" },
  { kanji:"薊",     yomi:"あざみ",       katakana:"アザミ",       category:"植物", level:2, origin:"棘のある葉と紫の花が特徴の野草。強い生命力の象徴。" },
  { kanji:"菫",     yomi:"すみれ",       katakana:"スミレ",       category:"植物", level:2, origin:"春の道端に咲く小さな紫の花。古来、日本で最も愛された野草の一つ。" },
  { kanji:"桔梗",   yomi:"ききょう",     katakana:"キキョウ",     category:"植物", level:2, origin:"秋の七草の一つ。青紫の星型の花が風に揺れる。家紋にも多い。" },
  { kanji:"撫子",   yomi:"なでしこ",     katakana:"ナデシコ",     category:"植物", level:2, origin:"秋の七草の一つ。縁がギザギザの薄桃色の花。大和撫子の語源。" },
  { kanji:"竜胆",   yomi:"りんどう",     katakana:"リンドウ",     category:"植物", level:2, origin:"秋の野山に咲く深い紫青色の花。薬草として根が苦く胆に効く。" },
  { kanji:"紫苑",   yomi:"しおん",       katakana:"シオン",       category:"植物", level:2, origin:"晩秋に薄紫の細かい花を咲かせる大型多年草。追憶の花とも呼ばれる。" },
  { kanji:"葛",     yomi:"くず",         katakana:"クズ",         category:"植物", level:2, origin:"秋の七草の一つ。根から葛粉をとる。繁殖力旺盛なつる植物。" },
  { kanji:"鈴蘭",   yomi:"すずらん",     katakana:"スズラン",     category:"植物", level:2, origin:"鈴のような白い小花を連ねるユリ科の植物。可憐だが有毒。" },
  { kanji:"山吹",   yomi:"やまぶき",     katakana:"ヤマブキ",     category:"植物", level:2, origin:"春に鮮やかな黄色の花を咲かせるバラ科の低木。七重八重と詠まれた。" },
  { kanji:"芙蓉",   yomi:"ふよう",       katakana:"フヨウ",       category:"植物", level:2, origin:"夏から秋に淡紅色の大輪の花を咲かせる。朝開いて夕暮れに閉じる。" },
  { kanji:"向日葵", yomi:"ひまわり",     katakana:"ヒマワリ",     category:"植物", level:2, origin:"太陽に向かって咲く大型の黄色い花。夏の象徴。種は食用・油に。" },
  { kanji:"牡丹",   yomi:"ぼたん",       katakana:"ボタン",       category:"植物", level:2, origin:"百花の王と称される大輪の花。中国原産で平安時代に渡来した。" },
  { kanji:"露草",   yomi:"つゆくさ",     katakana:"ツユクサ",     category:"植物", level:2, origin:"夏の朝露に濡れた青い花が美しい野草。青い染料にもなった。" },
  { kanji:"夕顔",   yomi:"ゆうがお",     katakana:"ユウガオ",     category:"植物", level:2, origin:"夕暮れに白い花を開くウリ科の植物。源氏物語の女性の名で知られる。" },
  { kanji:"木蓮",   yomi:"もくれん",     katakana:"モクレン",     category:"植物", level:2, origin:"春に大きな紫や白の花を葉より先に咲かせる落葉樹。" },
  { kanji:"水仙",   yomi:"すいせん",     katakana:"スイセン",     category:"植物", level:2, origin:"冬から春に白や黄の清楚な花を咲かせる球根植物。水辺の仙人の意。" },
  { kanji:"菖蒲",   yomi:"あやめ",       katakana:"アヤメ",       category:"植物", level:2, origin:"初夏に紫の花を咲かせるアヤメ科の植物。花菖蒲・カキツバタと似る。" },
  { kanji:"蒲公英", yomi:"たんぽぽ",     katakana:"タンポポ",     category:"植物", level:3, origin:"春の野に黄色い花を咲かせる多年草。綿毛が風に乗り種を飛ばす。" },
  { kanji:"藺草",   yomi:"いぐさ",       katakana:"イグサ",       category:"植物", level:3, origin:"畳の表面を作る草。清涼感ある香りは日本の夏の記憶。" },
  { kanji:"芍薬",   yomi:"しゃくやく",   katakana:"シャクヤク",   category:"植物", level:3, origin:"立てば芍薬という美人の形容。牡丹に似た豪華な花を咲かせる。" },
  { kanji:"石楠花", yomi:"しゃくなげ",   katakana:"シャクナゲ",   category:"植物", level:3, origin:"山地に咲く大輪の花。アジアの高山に多く、高貴な花と称される。" },
  { kanji:"杜若",   yomi:"かきつばた",   katakana:"カキツバタ",   category:"植物", level:3, origin:"水辺に咲く深い紫のアヤメ科植物。伊勢物語の歌に詠まれた名花。" },
  { kanji:"金木犀", yomi:"きんもくせい", katakana:"キンモクセイ",  category:"植物", level:3, origin:"秋に橙黄色の小花を咲かせる常緑樹。甘い香りが一面に漂う。" },
  { kanji:"木槿",   yomi:"むくげ",       katakana:"ムクゲ",       category:"植物", level:3, origin:"夏から秋に白・紅・紫の花を次々と咲かせる落葉低木。韓国の国花。" },
  { kanji:"枸杞",   yomi:"くこ",         katakana:"クコ",         category:"植物", level:3, origin:"秋に赤い実を実らせる薬用植物。実・葉・根皮が漢方薬に使われる。" },
  { kanji:"柊",     yomi:"ひいらぎ",     katakana:"ヒイラギ",     category:"植物", level:3, origin:"冬に白い花を咲かせる常緑樹。棘のある葉が邪気を払うと信じられた。" },
  { kanji:"躑躅",   yomi:"つつじ",       katakana:"ツツジ",       category:"植物", level:3, origin:"春に鮮やかな赤・桃・白の花を咲かせる低木。日本全土に広く分布。" },
  { kanji:"夢草",   yomi:"なずな",       katakana:"ナズナ",       category:"植物", level:3, origin:"春の七草の一つ。ペンペン草とも呼ばれ、三角形の実が特徴的。" },
  { kanji:"山葵",   yomi:"わさび",       katakana:"ワサビ",       category:"植物", level:3, origin:"清流沿いに育つ日本固有の植物。辛み成分で寿司・刺身に欠かせない。" },
  { kanji:"霶",     yomi:"どしゃぶり",   katakana:"ドシャブリ",   category:"自然", level:3, origin:"激しく降る大雨の俗語。土砂を流すほどの猛烈な雨。" },
  { kanji:"蜃気楼", yomi:"しんきろう",   katakana:"シンキロウ",   category:"自然", level:2, origin:"大気の密度差で遠景が歪んで見える光学現象。蜃は大ハマグリの意。" },
  { kanji:"土竜",   yomi:"もぐら",       katakana:"モグラ",       category:"動物", level:3, origin:"地中に暮らす哺乳類。前肢のシャベル状の手で素早くトンネルを掘る。" },
  { kanji:"鼯鼠",   yomi:"むささび",     katakana:"ムササビ",     category:"動物", level:4, origin:"前後の肢の間に膜を張り、木々の間を滑空するリス科の動物。" },
  { kanji:"翡翠",   yomi:"かわせみ",     katakana:"カワセミ",     category:"動物", level:3, origin:"川辺に棲む宝石のように輝く青緑の小鳥。水面に飛び込み魚を捕る。" },
  { kanji:"款冬",   yomi:"ふきのとう",   katakana:"フキノトウ",   category:"植物", level:3, origin:"雪解けとともに顔を出すフキの花芽。春一番の山菜として珍重される。" },
  { kanji:"苧麻",   yomi:"からむし",     katakana:"カラムシ",     category:"植物", level:3, origin:"古代から衣類の繊維として使われたイラクサ科の植物。越後上布の原料。" },,
  // ── 魚 (level 1) ──────────────────────────────────────────
  { kanji:"鯛",     yomi:"たい",         katakana:"タイ",         category:"魚", level:1, origin:"祝いの魚の王様。赤い色と姿の美しさから「めでたい」の語呂で縁起物に。" },
  { kanji:"鮭",     yomi:"さけ",         katakana:"サケ",         category:"魚", level:1, origin:"秋に故郷の川へ遡上する回遊魚。北海道の象徴として食文化に根ざす。" },
  { kanji:"鯉",     yomi:"こい",         katakana:"コイ",         category:"魚", level:1, origin:"池や川に棲む大型淡水魚。鯉のぼり・錦鯉で日本の風景に溶け込む。" },
  { kanji:"鮎",     yomi:"あゆ",         katakana:"アユ",         category:"魚", level:1, origin:"清流を好む香魚。塩焼きが夏の味覚の王様。友釣りという独特の漁法がある。" },
  { kanji:"鰈",     yomi:"かれい",       katakana:"カレイ",       category:"魚", level:1, origin:"海底に棲む平たい魚。両目が体の左側にある（ヒラメは右）。" },
  { kanji:"鯖",     yomi:"さば",         katakana:"サバ",         category:"魚", level:1, origin:"青光りの背中が美しい回遊魚。鯖缶・しめ鯖など料理が多彩な庶民の魚。" },
  { kanji:"鰊",     yomi:"にしん",       katakana:"ニシン",       category:"魚", level:1, origin:"春に北の海へ大群で現れた魚。数の子・身欠きにしんと多彩に使われる。" },
  { kanji:"鱒",     yomi:"ます",         katakana:"マス",         category:"魚", level:1, origin:"サケの仲間の川魚。ニジマス・ヤマメなど種類が多く釣りの対象魚にも。" },
  { kanji:"鮫",     yomi:"さめ",         katakana:"サメ",         category:"魚", level:1, origin:"海の頂点捕食者。軟骨魚類で鋭い歯が特徴。フカヒレは世界的高級食材。" },
  { kanji:"鱚",     yomi:"きす",         katakana:"キス",         category:"魚", level:1, origin:"浅海の砂地に棲む細長い白身魚。天ぷらの代表食材として夏に愛される。" },
  { kanji:"鰆",     yomi:"さわら",       katakana:"サワラ",       category:"魚", level:2, origin:"春に旬を迎える高級魚。西京漬けが有名で瀬戸内海でも珍重される。" },
  { kanji:"鯰",     yomi:"なまず",       katakana:"ナマズ",       category:"魚", level:2, origin:"川や池の底に棲む淡水魚。ひげが特徴で地震を予知するという言い伝えがある。" },
  { kanji:"鮃",     yomi:"ひらめ",       katakana:"ヒラメ",       category:"魚", level:2, origin:"砂地の海底に棲む高級白身魚。両目が右側にある（カレイは左）。" },
  { kanji:"鯔",     yomi:"ぼら",         katakana:"ボラ",         category:"魚", level:2, origin:"内湾や河口に多い出世魚。成長とともにオボコ→ボラ→トドと名が変わる。" },
  { kanji:"蛤",     yomi:"はまぐり",     katakana:"ハマグリ",     category:"魚", level:2, origin:"砂浜の二枚貝。二枚の殻が同じ貝でしか合わないことから夫婦和合の象徴。" },
  { kanji:"鯊",     yomi:"はぜ",         katakana:"ハゼ",         category:"魚", level:2, origin:"河口や内湾に棲む小型魚。江戸っ子の秋の釣りといえばハゼ釣り。" },
  { kanji:"鮸",     yomi:"にべ",         katakana:"ニベ",         category:"魚", level:2, origin:"浮き袋から高品質の膠が取れた海魚。「にべもない」（愛想がない）の語源。" },
  { kanji:"鯥",     yomi:"むつ",         katakana:"ムツ",         category:"魚", level:2, origin:"深海に棲む高級白身魚。東京・八丈島のむつ煮は名物料理として有名。" },
  { kanji:"鰍",     yomi:"かじか",       katakana:"カジカ",       category:"魚", level:2, origin:"清流の石の下に棲む小魚。卵を守る父親の習性で知られる淡水魚。" },
  { kanji:"鮎並",   yomi:"あいなめ",     katakana:"アイナメ",     category:"魚", level:2, origin:"岩礁に棲む白身魚。珍しく雄が卵を孵化するまで守り続ける献身的な魚。" },
  { kanji:"蛸",     yomi:"たこ",         katakana:"タコ",         category:"魚", level:2, origin:"八本足の軟体動物。吸盤で岩に張り付き、素早く墨を吐いて身を守る。" },
  { kanji:"烏賊",   yomi:"いか",         katakana:"イカ",         category:"魚", level:2, origin:"十本の足を持つ軟体動物。スルメ・塩辛・刺身と多彩な食べ方がある。" },
  { kanji:"鮑",     yomi:"あわび",       katakana:"アワビ",       category:"魚", level:2, origin:"岩礁に棲む一枚貝。コリコリした食感と豊かな旨みを持つ高級食材。" },
  { kanji:"鱧",     yomi:"はも",         katakana:"ハモ",         category:"魚", level:3, origin:"関西の夏の高級魚。骨切りという職人技が必要な細長い魚。祇園祭の魚とも。" },
  { kanji:"鮴",     yomi:"ごり",         katakana:"ゴリ",         category:"魚", level:4, origin:"石川・富山の川に棲むハゼの仲間。甘露煮・唐揚げなど郷土料理として有名。" },
  { kanji:"鱪",     yomi:"しいら",       katakana:"シイラ",       category:"魚", level:4, origin:"熱帯外洋に棲む大型魚。ハワイではマヒマヒと呼ばれ青・金・緑に輝く。" },
  { kanji:"鱶",     yomi:"ふか",         katakana:"フカ",         category:"魚", level:4, origin:"サメの古称。フカヒレは中国料理の高級食材として世界的に珍重される。" },
  { kanji:"鰒",     yomi:"ふぐ",         katakana:"フグ",         category:"魚", level:4, origin:"猛毒テトロドトキシンを持つ冬の高級魚。専門の調理師免許が必要。" },
  { kanji:"鮊",     yomi:"しらうお",     katakana:"シラウオ",     category:"魚", level:4, origin:"春に河川を遡上する半透明の小魚。踊り食いが有名な春の風物詩。" },
  { kanji:"鰌",     yomi:"どじょう",     katakana:"ドジョウ",     category:"魚", level:3, origin:"泥の中に棲む細長い淡水魚。柳川鍋・どじょう鍋として江戸の庶民に愛された。" },
  { kanji:"鷹",     yomi:"たか",         katakana:"タカ",         category:"鳥", level:1, origin:"猛禽類の代表。鷹匠が鷹狩りに使う。鷹揚・鷹の目などの慣用句にも登場。" },
  { kanji:"鷲",     yomi:"わし",         katakana:"ワシ",         category:"鳥", level:1, origin:"大型の猛禽類。空の王者と呼ばれ、勇猛の象徴として紋章にも使われる。" },
  { kanji:"鴨",     yomi:"かも",         katakana:"カモ",         category:"鳥", level:1, origin:"川や池に棲む水鳥。鴨鍋・鴨南蛮と料理にも親しみ深い冬の鳥。" },
  { kanji:"鶴",     yomi:"つる",         katakana:"ツル",         category:"鳥", level:1, origin:"長寿の象徴。千羽鶴・鶴の一声で知られ、白く優雅な大型渡り鳥。" },
  { kanji:"鳩",     yomi:"はと",         katakana:"ハト",         category:"鳥", level:1, origin:"平和の象徴として知られる身近な鳥。伝書鳩として歴史的役割を担った。" },
  { kanji:"鴉",     yomi:"からす",       katakana:"カラス",       category:"鳥", level:1, origin:"黒い羽を持つ賢い鳥。都市環境への適応力が高く高い知能を持つ。" },
  { kanji:"鷗",     yomi:"かもめ",       katakana:"カモメ",       category:"鳥", level:2, origin:"海上を舞う白い鳥。嵐を知らせると言われ、船乗りに親しまれた旅の象徴。" },
  { kanji:"鵲",     yomi:"かささぎ",     katakana:"カササギ",     category:"鳥", level:2, origin:"黒白の羽が美しい鳥。七夕伝説で天の川に橋を架けると言われる。" },
  { kanji:"鶉",     yomi:"うずら",       katakana:"ウズラ",       category:"鳥", level:2, origin:"草むらに潜む小型の鳥。うずらの卵は食材として有名で大きさが均一。" },
  { kanji:"隼",     yomi:"はやぶさ",     katakana:"ハヤブサ",     category:"鳥", level:2, origin:"急降下時に時速300kmにもなる最速の猛禽類。鳥類の中で最も速い。" },
  { kanji:"鴟",     yomi:"とび",         katakana:"トビ",         category:"鳥", level:2, origin:"上昇気流に乗って高く舞い上がる猛禽類。トンビとも呼ぶ。ピーヒョロと鳴く。" },
  { kanji:"鸛",     yomi:"こうのとり",   katakana:"コウノトリ",   category:"鳥", level:2, origin:"赤ちゃんを運ぶ伝説で知られる白黒の大型鳥。日本では絶滅危惧種。" },
  { kanji:"鷦鷯",   yomi:"みそさざい",   katakana:"ミソサザイ",   category:"鳥", level:2, origin:"日本最小級の鳥の一つ。小さな体から想像できない力強い声でさえずる。" },
  { kanji:"鷸",     yomi:"しぎ",         katakana:"シギ",         category:"鳥", level:2, origin:"泥地や干潟でくちばしを刺し貝や虫を食べる渡り鳥。鷸蚌の争いの語源。" },
  { kanji:"啄木鳥", yomi:"きつつき",     katakana:"キツツキ",     category:"鳥", level:2, origin:"木の幹をつついて虫を探す鳥。秒間20回もつつける強い頭骨を持つ。" },
  { kanji:"鸚鵡",   yomi:"おうむ",       katakana:"オウム",       category:"鳥", level:3, origin:"人の声を真似る大型鳥。鸚鵡返しの語源。人語を習得できる高い知能を持つ。" },
  { kanji:"朱鷺",   yomi:"とき",         katakana:"トキ",         category:"鳥", level:3, origin:"淡紅色の翼を持つ日本固有の鳥。一時絶滅したが中国産の個体から復元中。" },
  { kanji:"鳰",     yomi:"にお",         katakana:"ニオ",         category:"鳥", level:3, origin:"カイツブリの古名。水面を器用に泳ぐ小型の水鳥で琵琶湖の象徴とも。" },
  { kanji:"鶸",     yomi:"ひわ",         katakana:"ヒワ",         category:"鳥", level:3, origin:"緑黄色の羽を持つ小鳥。鮮やかな鶸色（黄緑）はこの鳥の羽の色から命名。" },
  { kanji:"鵯",     yomi:"ひよどり",     katakana:"ヒヨドリ",     category:"鳥", level:3, origin:"ヒーヨヒーヨと鳴く中型鳥。実や花の蜜を好み庭木の花を食べに来る。" },
  { kanji:"鶲",     yomi:"ひたき",       katakana:"ヒタキ",       category:"鳥", level:3, origin:"ヒタキ科の小鳥の総称。尾羽を上下に振る習性が特徴の渡り鳥。" },
  { kanji:"蛙",     yomi:"かえる",       katakana:"カエル",       category:"動物", level:1, origin:"雨が降ると鳴き始める両生類。田んぼの守り神として農家に親しまれる。" },
  { kanji:"蜂",     yomi:"はち",         katakana:"ハチ",         category:"虫", level:1, origin:"花の蜜を集め蜂蜜を作る昆虫。女王蜂を中心に社会を形成する。" },
  { kanji:"蟻",     yomi:"あり",         katakana:"アリ",         category:"虫", level:1, origin:"小さな体で協力して巨大な巣を作る昆虫。勤勉の象徴。" },
  { kanji:"蝉",     yomi:"せみ",         katakana:"セミ",         category:"虫", level:1, origin:"夏の象徴。土中で長年過ごし地上に出た後の命は短く、鳴き続ける。" },
  { kanji:"蚊",     yomi:"か",           katakana:"カ",           category:"虫", level:1, origin:"夏に血を吸う昆虫。雌だけが吸血し、高い音のうなりが不快感を与える。" },
  { kanji:"蜘蛛",   yomi:"くも",         katakana:"クモ",         category:"虫", level:1, origin:"八本足を持つ節足動物。糸で精巧な網を張り昆虫を捕食する。" },
  { kanji:"蝸牛",   yomi:"かたつむり",   katakana:"カタツムリ",   category:"虫", level:2, origin:"雨の日に這い出る巻貝の軟体動物。渦巻き状の殻を背負って移動する。" },
  { kanji:"蚯蚓",   yomi:"みみず",       katakana:"ミミズ",       category:"虫", level:2, origin:"土中に棲む細長い環形動物。土を掘り起こして耕す農業の見えない助っ人。" },
  { kanji:"蝮",     yomi:"まむし",       katakana:"マムシ",       category:"動物", level:2, origin:"毒蛇の代表。茶褐色の銭型模様が目印で林道や藪に潜む危険な爬虫類。" },
  { kanji:"蛭",     yomi:"ひる",         katakana:"ヒル",         category:"虫", level:2, origin:"水辺や湿地に棲む吸血性の環形動物。吸血後は何倍にも膨れ上がる。" },
  { kanji:"蠅",     yomi:"はえ",         katakana:"ハエ",         category:"虫", level:2, origin:"素早く飛ぶ双翅類の昆虫。腐食物に集まり病原体を運ぶこともある。" },
  { kanji:"蚤",     yomi:"のみ",         katakana:"ノミ",         category:"虫", level:2, origin:"哺乳類に寄生する血を吸う小さな昆虫。体の100倍以上の跳躍力を持つ。" },
  { kanji:"虻",     yomi:"あぶ",         katakana:"アブ",         category:"虫", level:2, origin:"ハエに似た昆虫。雌が吸血する種が多く、虻蜂取らずの諺で有名。" },
  { kanji:"蜣蜋",   yomi:"ふんころがし", katakana:"フンコロガシ", category:"虫", level:4, origin:"糞を球状に丸めて転がすコガネムシの仲間。古代エジプトでは神聖視された。" },
  { kanji:"蟪蛄",   yomi:"にいにいぜみ", katakana:"ニイニイゼミ", category:"虫", level:4, origin:"梅雨の頃から鳴き始めるセミ。ニーニーという声が名前の由来。" },
  { kanji:"螢",     yomi:"ほたる",       katakana:"ホタル",       category:"虫", level:3, origin:"ホタルの旧字体。源氏蛍・平家蛍など種類があり夏の夜の風物詩。" },
  { kanji:"桜",     yomi:"さくら",       katakana:"サクラ",       category:"木", level:1, origin:"春に一斉に咲き散る花。日本の国民的な花で、花見文化の中心。" },
  { kanji:"松",     yomi:"まつ",         katakana:"マツ",         category:"木", level:1, origin:"長寿・不老の象徴。正月の門松や和歌に多く詠まれる常緑樹。" },
  { kanji:"楓",     yomi:"かえで",       katakana:"カエデ",       category:"木", level:1, origin:"秋に赤や黄に紅葉する落葉樹。紅葉狩りの代表格で庭木にも人気。" },
  { kanji:"檜",     yomi:"ひのき",       katakana:"ヒノキ",       category:"木", level:1, origin:"芳香を放つ日本固有の針葉樹。お風呂・神社建築・まな板に重宝される。" },
  { kanji:"桐",     yomi:"きり",         katakana:"キリ",         category:"木", level:1, origin:"軽くて丈夫な高級木材。五百円硬貨・内閣府の紋章・桐箪笥でお馴染み。" },
  { kanji:"梅",     yomi:"うめ",         katakana:"ウメ",         category:"木", level:1, origin:"早春に咲く花。松竹梅の一つで吉祥の象徴。梅干し・梅酒の原料にも。" },
  { kanji:"竹",     yomi:"たけ",         katakana:"タケ",         category:"木", level:1, origin:"真っ直ぐに力強く伸びるイネ科の植物。松竹梅の一つで正月飾りに。" },
  { kanji:"柳",     yomi:"やなぎ",       katakana:"ヤナギ",       category:"木", level:1, origin:"細い枝が風にしなやかになびく落葉樹。川辺・池のほとりでよく見られる。" },
  { kanji:"欅",     yomi:"けやき",       katakana:"ケヤキ",       category:"木", level:2, origin:"力強い樹形を持つ落葉樹。並木道や公園の街路樹として人気が高い。" },
  { kanji:"楠",     yomi:"くすのき",     katakana:"クスノキ",     category:"木", level:2, origin:"大きく広がる常緑樹。樟脳の原料として知られ、神社の御神木に多い。" },
  { kanji:"橘",     yomi:"たちばな",     katakana:"タチバナ",     category:"木", level:2, origin:"日本固有の野生柑橘。不老不死の果実として古事記に登場する神聖な木。" },
  { kanji:"栃",     yomi:"とち",         katakana:"トチ",         category:"木", level:2, origin:"山地に自生する大型落葉樹。実は栃餅の原料。縄文人も食べた古来の食物。" },
  { kanji:"榎",     yomi:"えのき",       katakana:"エノキ",       category:"木", level:2, origin:"かつて道端の目印として植えられた落葉樹。黄色く熟した実は甘い。" },
  { kanji:"朴",     yomi:"ほお",         katakana:"ホオ",         category:"木", level:2, origin:"大きな葉が特徴の落葉樹。朴葉味噌・朴葉鮨など料理に葉を使う文化がある。" },
  { kanji:"沈丁花", yomi:"じんちょうげ", katakana:"ジンチョウゲ", category:"木", level:2, origin:"春に甘い香りを放つ常緑低木。クチナシ・金木犀と並ぶ三大芳香木の一つ。" },
  { kanji:"山茶花", yomi:"さざんか",     katakana:"サザンカ",     category:"木", level:2, origin:"冬に咲く常緑樹の花。椿と似るが花びらが散り落ちる点で区別される。" },
  { kanji:"柘",     yomi:"つげ",         katakana:"ツゲ",         category:"木", level:3, origin:"緻密な木目を持つ常緑低木。印鑑・将棋駒・くしの素材として古来重宝。" },
  { kanji:"椹",     yomi:"さわら",       katakana:"サワラ",       category:"木", level:3, origin:"水に強く軽い木材。お桶・木樽・寿司桶の素材として最適な針葉樹。" },
  { kanji:"栴檀",   yomi:"せんだん",     katakana:"センダン",     category:"木", level:4, origin:"初夏に薄紫の花を咲かせる落葉高木。栴檀は双葉より芳しの諺で有名。" },
  { kanji:"三椏",   yomi:"みつまた",     katakana:"ミツマタ",     category:"木", level:4, origin:"枝が三叉に分かれる落葉低木。樹皮から丈夫な和紙を作る。お札の原料。" },
  { kanji:"楮",     yomi:"こうぞ",       katakana:"コウゾ",       category:"木", level:4, origin:"和紙の主要原料になる落葉低木。丈夫で長持ちする和紙を生み出す。" },
  { kanji:"木通",   yomi:"あけび",       katakana:"アケビ",       category:"木", level:3, origin:"つる性の落葉植物。秋に実が割れて甘い白い果肉が現れる野の恵み。" },
  { kanji:"山毛欅", yomi:"ぶな",         katakana:"ブナ",         category:"木", level:3, origin:"温帯の森を代表する落葉樹。ブナ林は緑のダムと呼ばれ水を蓄える。" },
  { kanji:"夕焼け", yomi:"ゆうやけ",     katakana:"ユウヤケ",     category:"自然", level:1, origin:"太陽が沈む頃、西の空が赤く染まる現象。翌日の晴れを予感させる空の色。" },
  { kanji:"朝露",   yomi:"あさつゆ",     katakana:"アサツユ",     category:"自然", level:1, origin:"夜間に冷えた地表や葉に結露した水滴。朝の光に輝く儚い美しさを持つ。" },
  { kanji:"陽炎",   yomi:"かげろう",     katakana:"カゲロウ",     category:"自然", level:2, origin:"春の晴れた日に地面近くの空気が揺らいで見える光学現象。" },
  { kanji:"朧月",   yomi:"おぼろつき",   katakana:"オボロツキ",   category:"自然", level:2, origin:"春霞に霞んでほんのりと光る月。おぼろ月夜と詠まれる幻想的な景色。" },
  { kanji:"飛沫",   yomi:"しぶき",       katakana:"シブキ",       category:"自然", level:2, origin:"波や滝などが砕けて飛び散る細かい水の粒。激しい自然のエネルギーの表れ。" },
  { kanji:"泡沫",   yomi:"うたかた",     katakana:"ウタカタ",     category:"自然", level:2, origin:"水面に浮かぶ泡。はかないもの・短命なものの文学的な象徴。" },
  { kanji:"光暈",   yomi:"かさ",         katakana:"カサ",         category:"自然", level:2, origin:"月や太陽の周りに現れる光の輪。大気中の氷晶が光を散乱する現象。" },
  { kanji:"虎落笛", yomi:"もがりぶえ",   katakana:"モガリブエ",   category:"自然", level:3, origin:"冬の強風が竹垣や細い木の間を通るときに出る笛のような音。俳句の季語。" },
  { kanji:"春暁",   yomi:"しゅんぎょう", katakana:"シュンギョウ", category:"自然", level:3, origin:"春の夜明け。孟浩然の漢詩「春暁」で知られる、鳥の声が聞こえる夜明け。" },
  { kanji:"薄暮",   yomi:"はくぼ",       katakana:"ハクボ",       category:"自然", level:3, origin:"日没直後の空がまだほのかに明るい時刻。黄昏と夜の間の幻想的な時間。" },
  { kanji:"鯨",     yomi:"くじら",       katakana:"クジラ",       category:"動物", level:1, origin:"海の哺乳類で最大の生き物。かつて日本の捕鯨文化は各地に根ざした。" },
  { kanji:"熊",     yomi:"くま",         katakana:"クマ",         category:"動物", level:1, origin:"山に棲む大型哺乳類。冬眠する習性を持ち、力強さの象徴とされる。" },
  { kanji:"狐",     yomi:"きつね",       katakana:"キツネ",       category:"動物", level:1, origin:"賢い野生動物。稲荷神社のお使いとして崇められ、化ける伝説が多い。" },
  { kanji:"狸",     yomi:"たぬき",       katakana:"タヌキ",       category:"動物", level:1, origin:"化けると言われる野生動物。信楽焼のたぬき像は縁起物として有名。" },
  { kanji:"兎",     yomi:"うさぎ",       katakana:"ウサギ",       category:"動物", level:1, origin:"長い耳と短いしっぽが特徴。月に棲むとされ、お月見の象徴。" },
  { kanji:"鹿",     yomi:"しか",         katakana:"シカ",         category:"動物", level:1, origin:"雄に枝角が生えるシカ科の動物。奈良の鹿は神鹿として保護されている。" },
  { kanji:"猪",     yomi:"いのしし",     katakana:"イノシシ",     category:"動物", level:1, origin:"力強く突進する野生のブタの仲間。猪突猛進という言葉の語源。" },
  { kanji:"猿",     yomi:"さる",         katakana:"サル",         category:"動物", level:1, origin:"人間に最も近い霊長類。日本猿は世界で最も北に棲む野生のサル。" },
  { kanji:"鼬",     yomi:"いたち",       katakana:"イタチ",       category:"動物", level:2, origin:"細長い体でくねくね動く肉食哺乳類。いたちごっこ（きりがない）の語源。" },
  { kanji:"獺",     yomi:"かわうそ",     katakana:"カワウソ",     category:"動物", level:2, origin:"川や海辺に棲む愛らしい哺乳類。かつて日本全土にいたが今は絶滅。" },
  { kanji:"羚羊",   yomi:"かもしか",     katakana:"カモシカ",     category:"動物", level:2, origin:"急峻な山地を跳び回るウシ科の動物。日本カモシカは特別天然記念物。" },
  { kanji:"海驢",   yomi:"あしか",       katakana:"アシカ",       category:"動物", level:2, origin:"ヒレ状の肢を持つ海の哺乳類。水族館のショーでよく見かける愛嬌ある動物。" },
  { kanji:"飛魚",   yomi:"とびうお",     katakana:"トビウオ",     category:"動物", level:2, origin:"胸びれを広げ水面上を滑空する魚。屋久島周辺が主産地で刺身が名物。" },
  { kanji:"膃肭臍", yomi:"おっとせい",   katakana:"オットセイ",   category:"動物", level:4, origin:"北の海に棲む耳のある鰭脚類。オスが多数のメスを持つハーレムを形成。" },
  { kanji:"海象",   yomi:"せいうち",     katakana:"セイウチ",     category:"動物", level:3, origin:"長い牙が特徴の北極圏に棲む大型の鰭脚類。牙は氷を砕くのに使う。" },
  { kanji:"儒艮",   yomi:"じゅごん",     katakana:"ジュゴン",     category:"動物", level:4, origin:"温暖な海に棲む草食哺乳類。海草を食べる姿が人魚伝説のモデルになった。" },
  { kanji:"葵",     yomi:"あおい",       katakana:"アオイ",       category:"植物", level:2, origin:"葵祭で知られる徳川家の家紋。フタバアオイが正式な紋章植物。" },
  { kanji:"蓬",     yomi:"よもぎ",       katakana:"ヨモギ",       category:"植物", level:2, origin:"春の野に自生する野草。草餅の材料でお灸に使う「もぐさ」の原料でもある。" },
  { kanji:"蕨",     yomi:"わらび",       katakana:"ワラビ",       category:"植物", level:2, origin:"春に出る山菜。渦巻き状の新芽が特徴のシダ植物。わらび餅の原料にも。" },
  { kanji:"薇",     yomi:"ぜんまい",     katakana:"ゼンマイ",     category:"植物", level:2, origin:"春の山菜。渦巻き状の新芽がアクを抜くと美味。時計のゼンマイも語源説あり。" },
  { kanji:"土筆",   yomi:"つくし",       katakana:"ツクシ",       category:"植物", level:2, origin:"春の野に頭を出すスギナの胞子茎。袴を取って食べる春の山菜。" },
  { kanji:"蕗",     yomi:"ふき",         katakana:"フキ",         category:"植物", level:2, origin:"春に独特の香りを持つ山菜。ふき味噌・煮物として親しまれる。" },
  { kanji:"茗荷",   yomi:"みょうが",     katakana:"ミョウガ",     category:"植物", level:2, origin:"独特の辛みと香りを持つ薬味。食べると忘れっぽくなるという俗説がある。" },
  { kanji:"山椒",   yomi:"さんしょう",   katakana:"サンショウ",   category:"植物", level:2, origin:"実・葉・花すべてが薬味になる落葉低木。うなぎに欠かせない香辛料。" },
  { kanji:"苔",     yomi:"こけ",         katakana:"コケ",         category:"植物", level:1, origin:"湿った場所に育つ緑の小植物。京都の苔庭が有名で侘び寂びの象徴。" },
  { kanji:"水芭蕉", yomi:"みずばしょう", katakana:"ミズバショウ", category:"植物", level:2, origin:"湿地に咲く白い仏炎苞が特徴の植物。「夏の思い出」の歌で広く知られる。" },
  { kanji:"鳥兜",   yomi:"とりかぶと",   katakana:"トリカブト",   category:"植物", level:3, origin:"青紫の兜のような花を咲かせる植物。根に最強の植物毒を含む危険な花。" },
  { kanji:"捩花",   yomi:"ねじばな",     katakana:"ネジバナ",     category:"植物", level:4, origin:"芝生に咲く小さなラン科植物。花が螺旋状に並ぶ独特の姿が特徴。" },
  { kanji:"浜木綿", yomi:"はまゆう",     katakana:"ハマユウ",     category:"植物", level:4, origin:"海辺に咲く白い大輪の花。南方系の大型植物で芳香が強い。" },
  { kanji:"忍冬",   yomi:"すいかずら",   katakana:"スイカズラ",   category:"植物", level:3, origin:"冬を耐え忍ぶとの名を持つつる植物。白から黄に変わる花が愛らしい。" },
  { kanji:"月見草", yomi:"つきみそう",   katakana:"ツキミソウ",   category:"植物", level:2, origin:"夕方に白い花が開き夜に香りを放つ植物。待宵草と混同されることも多い。" },
  { kanji:"芹",     yomi:"せり",         katakana:"セリ",         category:"植物", level:2, origin:"春の七草の筆頭。水辺に自生し独特の香りが好まれる野草。七草粥に使う。" },
  { kanji:"御形",   yomi:"ごぎょう",     katakana:"ゴギョウ",     category:"植物", level:4, origin:"春の七草の一つ。ハハコグサの古名。母子草とも書く白い綿毛の野草。" },
  { kanji:"繁縷",   yomi:"はこべら",     katakana:"ハコベラ",     category:"植物", level:4, origin:"春の七草の一つ。道端に生えるナデシコ科の小草。小鳥も好む身近な野草。" },
  { kanji:"菘",     yomi:"すずな",       katakana:"スズナ",       category:"植物", level:4, origin:"春の七草の一つ。カブの古名。鈴のような実がなることからこの名がついた。" },
  { kanji:"蘿蔔",   yomi:"すずしろ",     katakana:"スズシロ",     category:"植物", level:4, origin:"春の七草の一つ。大根の古名。清白とも書き、清らかな白という意味。" },
  { kanji:"鮒",     yomi:"ふな",         katakana:"フナ",         category:"魚", level:1, origin:"日本最古の淡水魚の一つ。ふなずしは琵琶湖の発酵食品として有名。" },
  { kanji:"若鮎",   yomi:"わかあゆ",     katakana:"ワカアユ",     category:"魚", level:3, origin:"春に生まれたばかりの若い鮎。清流を遡上する若鮎は季節を告げる風物詩。" },
  { kanji:"鰐",     yomi:"わに",         katakana:"ワニ",         category:"動物", level:2, origin:"爬虫類の大型捕食者。古代エジプトでは神として崇められた。日本神話にも登場。" },
  { kanji:"鱔",     yomi:"うなぎ",       katakana:"ウナギ",       category:"魚", level:3, origin:"ウナギの中国表記。産卵場所が謎の回遊魚で、太平洋の深海で産卵する。" },
  { kanji:"鯛鯛",   yomi:"おおきんめ",   katakana:"オオキンメ",   category:"魚", level:3, origin:"深海に棲む金目の大型魚。金目鯛の仲間で赤い体が特徴。" },
  { kanji:"公魚",   yomi:"わかさぎ",     katakana:"ワカサギ",     category:"魚", level:2, origin:"冬の氷上釣りで知られる小型魚。天ぷら・唐揚げで食べる冬の味覚。" },
  { kanji:"目張",   yomi:"めばる",       katakana:"メバル",       category:"魚", level:2, origin:"大きな目が特徴の岩礁に棲む魚。春告げ魚とも呼ばれ春の旬魚として知られる。" },
  { kanji:"真魚箸", yomi:"まながつお",   katakana:"マナガツオ",   category:"魚", level:4, origin:"銀色の菱形の体を持つ高級魚。西日本で珍重され照り焼きにすると絶品。" },
  { kanji:"海老",   yomi:"えび",         katakana:"エビ",         category:"魚", level:1, origin:"曲がった腰を持つことから長寿の象徴。おせち料理・天ぷらに欠かせない。" },
  { kanji:"海鼠",   yomi:"なまこ",       katakana:"ナマコ",       category:"魚", level:3, origin:"棘皮動物。コリコリした食感が珍重される珍味。このわたはなまこの内臓。" },
  { kanji:"雲丹",   yomi:"うに",         katakana:"ウニ",         category:"魚", level:2, origin:"棘に覆われた棘皮動物。生殖巣が珍味として三大珍味の一つに数えられる。" },
  { kanji:"栄螺",   yomi:"さざえ",       katakana:"サザエ",       category:"魚", level:2, origin:"渦巻き状の殻を持つ巻き貝。壺焼きが磯の定番料理として有名。" },
  { kanji:"浅蜊",   yomi:"あさり",       katakana:"アサリ",       category:"魚", level:2, origin:"砂浜に棲む二枚貝。みそ汁・酒蒸しと和食に欠かせない身近な貝。" },
  { kanji:"蜆",     yomi:"しじみ",       katakana:"シジミ",       category:"魚", level:2, origin:"淡水や汽水域に棲む小型二枚貝。肝臓によいとされ二日酔いにも効くと言われる。" },
  { kanji:"牡蠣",   yomi:"かき",         katakana:"カキ",         category:"魚", level:2, origin:"岩に張り付く二枚貝。海のミルクと呼ばれ、牡蠣鍋・牡蠣フライが人気。" },
  { kanji:"帆立",   yomi:"ほたて",       katakana:"ホタテ",       category:"魚", level:1, origin:"大きな貝柱が有名な二枚貝。貝殻を帆のように立てて泳ぐ姿からこの名前。" },
  { kanji:"海胆",   yomi:"うに",         katakana:"ウニ",         category:"魚", level:3, origin:"ウニの別の漢字表記。岩礁の藻を食べる棘皮動物で旨みが凝縮した高級食材。" },
  { kanji:"白鳥",   yomi:"はくちょう",   katakana:"ハクチョウ",   category:"鳥", level:1, origin:"優美な白い大型水鳥。白鳥の湖でも知られ、純潔と美の象徴。" },
  { kanji:"孔雀",   yomi:"くじゃく",     katakana:"クジャク",     category:"鳥", level:1, origin:"雄が巨大な飾り羽を広げる大型鳥。美しさの極みとして「孔雀」が代名詞に。" },
  { kanji:"鳳凰",   yomi:"ほうおう",     katakana:"ホウオウ",     category:"鳥", level:2, origin:"中国神話の想像上の霊鳥。太平の世に現れるとされ吉祥の象徴。" },
  { kanji:"鷦",     yomi:"みそさざい",   katakana:"ミソサザイ",   category:"鳥", level:4, origin:"ミソサザイの別の漢字。日本最小級の鳥の一つで力強いさえずりを持つ。" },
  { kanji:"鴛鴦",   yomi:"おしどり",     katakana:"オシドリ",     category:"鳥", level:2, origin:"雄雌が常に寄り添う鴨の仲間。おしどり夫婦の語源となった仲睦まじい鳥。" },
  { kanji:"百舌",   yomi:"もず",         katakana:"モズ",         category:"鳥", level:2, origin:"他の鳥の声を真似る小鳥。獲物を木の枝に串刺しにする「はやにえ」で知られる。" },
  { kanji:"山鳥",   yomi:"やまどり",     katakana:"ヤマドリ",     category:"鳥", level:2, origin:"山地に棲む雉の仲間。雄の長い尾が美しく百人一首にも詠まれた。" },
  { kanji:"雉",     yomi:"きじ",         katakana:"キジ",         category:"鳥", level:1, origin:"日本の国鳥。雄は緑の羽と赤い顔が鮮やかで桃太郎のお供にも登場。" },
  { kanji:"鷓鴣",   yomi:"しゃこ",       katakana:"シャコ",       category:"鳥", level:4, origin:"ウズラに似た丸い体の小型鳥。転じて甲殻類のシャコ（蝦蛄）とは別物。" },
  { kanji:"鸊鷉",   yomi:"かいつぶり",   katakana:"カイツブリ",   category:"鳥", level:4, origin:"水面に浮かぶ小型の水鳥。潜水が得意で琵琶湖を泳ぐ鳰（にお）の現代名。" },
  { kanji:"蟬",     yomi:"せみ",         katakana:"セミ",         category:"虫", level:2, origin:"蝉の旧字体。土中で数年を過ごし、地上での命は短い夏の象徴。" },
  { kanji:"蛾",     yomi:"が",           katakana:"ガ",           category:"虫", level:1, origin:"蝶に似た昆虫で主に夜行性。光に集まる性質から灯火採集の対象にも。" },
  { kanji:"蚕",     yomi:"かいこ",       katakana:"カイコ",       category:"虫", level:2, origin:"絹糸をとるために家畜化された蛾の幼虫。日本の絹産業を支えてきた。" },
  { kanji:"蝗",     yomi:"いなご",       katakana:"イナゴ",       category:"虫", level:2, origin:"稲の葉を食べる昆虫。長野など内陸部では佃煮として食べる文化がある。" },
  { kanji:"蜉",     yomi:"かげろう",     katakana:"カゲロウ",     category:"虫", level:2, origin:"一日だけ生きる儚い昆虫。川辺に大量発生し夕暮れに集まる。" },
  { kanji:"蟻地獄", yomi:"ありじごく",   katakana:"ありジゴク",   category:"虫", level:3, origin:"ウスバカゲロウの幼虫。砂に擂り鉢状の罠を作りアリを捕食する。" },
  { kanji:"蜣",     yomi:"おけら",       katakana:"オケラ",       category:"虫", level:4, origin:"前肢が大きく土を掘るコオロギの仲間。「おけら」は無一文の意もある。" },
  { kanji:"孑孑",   yomi:"ぼうふら",     katakana:"ボウフラ",     category:"虫", level:4, origin:"蚊の幼虫。水中でくねくねと動く様子から「棒振り」が転じた名前。" },
  { kanji:"雀蜂",   yomi:"すずめばち",   katakana:"スズメバチ",   category:"虫", level:2, origin:"攻撃性が高い大型のハチ。刺されると激しい痛みがあり危険な昆虫。" },
  { kanji:"蜻",     yomi:"やんま",       katakana:"ヤンマ",       category:"虫", level:4, origin:"大型のトンボの仲間。ギンヤンマ・オニヤンマなど力強い飛翔で知られる。" },
  { kanji:"樟",     yomi:"くすのき",     katakana:"クスノキ",     category:"木", level:4, origin:"樟脳を産する常緑大木。邪気を払うと言われ神社の御神木として多く見られる。" },
  { kanji:"栗",     yomi:"くり",         katakana:"クリ",         category:"木", level:1, origin:"秋の代表的な実をつける落葉樹。縄文時代から食料として利用された。" },
  { kanji:"柿",     yomi:"かき",         katakana:"カキ",         category:"木", level:1, origin:"秋に赤オレンジ色の実をつける落葉樹。干し柿・柿渋など日本文化に根ざす。" },
  { kanji:"銀杏",   yomi:"いちょう",     katakana:"イチョウ",     category:"木", level:2, origin:"秋に黄色に輝く扇形の葉を持つ落葉樹。銀杏並木が美しい。実はぎんなん。" },
  { kanji:"榧",     yomi:"かや",         katakana:"カヤ",         category:"木", level:4, origin:"緻密で芳香のある高級材木。将棋・囲碁盤の最高級品はカヤ製。" },
  { kanji:"槻",     yomi:"つき",         katakana:"ツキ",         category:"木", level:4, origin:"欅（ケヤキ）の古名。万葉集にも登場する日本古来の落葉樹。" },
  { kanji:"杉",     yomi:"すぎ",         katakana:"スギ",         category:"木", level:1, origin:"日本固有の針葉樹。建材・割り箸・酒樽など幅広く使われる。花粉症の原因木。" },
  { kanji:"木犀",   yomi:"もくせい",     katakana:"モクセイ",     category:"木", level:2, origin:"秋に甘い香りを漂わせる常緑樹。金木犀・銀木犀と種類がある。" },
  { kanji:"樺",     yomi:"かば",         katakana:"カバ",         category:"木", level:2, origin:"白い樹皮が特徴の落葉樹。白樺の純白の幹は北の森の象徴。" },
  { kanji:"蝋梅",   yomi:"ろうばい",     katakana:"ロウバイ",     category:"木", level:3, origin:"冬に黄色いろう細工のような花を咲かせる落葉低木。早春の甘い香りが漂う。" },
  { kanji:"辛夷",   yomi:"こぶし",       katakana:"コブシ",       category:"木", level:3, origin:"春に白い花を咲かせる落葉樹。モクレンの仲間で野山の春告げ木とも呼ばれる。" },
  { kanji:"山桜",   yomi:"やまざくら",   katakana:"ヤマザクラ",   category:"木", level:2, origin:"野生のサクラの代表。葉と花が同時に開き、ソメイヨシノとは別の趣がある。" },
  { kanji:"姫沙羅", yomi:"ひめしゃら",   katakana:"ヒメシャラ",   category:"木", level:3, origin:"滑らかな赤褐色の幹が美しい落葉樹。和風庭園や高山の木として知られる。" },
  { kanji:"雷鳴",   yomi:"らいめい",     katakana:"ライメイ",     category:"自然", level:1, origin:"雷の音。稲妻の閃光とともに轟くごろごろという天の響き。" },
  { kanji:"虹色",   yomi:"にじいろ",     katakana:"ニジイロ",     category:"自然", level:1, origin:"虹に見られる七色のグラデーション。赤橙黄緑青藍紫が連なる美しい色彩。" },
  { kanji:"波浪",   yomi:"はろう",       katakana:"ハロウ",       category:"自然", level:2, origin:"風によって生じる波のうねり。波浪警報が出ると船の航行が危険になる。" },
  { kanji:"烈風",   yomi:"れっぷう",     katakana:"レップウ",     category:"自然", level:2, origin:"激しく強い風。ビューフォートスケールで8以上の風力を指す。" },
  { kanji:"霧氷",   yomi:"むひょう",     katakana:"ムヒョウ",     category:"自然", level:3, origin:"木の枝や草に霧が凍りついた氷の結晶。山頂付近に現れる白い樹氷の一種。" },
  { kanji:"天霧る", yomi:"あまぎる",     katakana:"アマギル",     category:"自然", level:4, origin:"空一面に霧が立ち込める様子。万葉集に登場する古語。" },
  { kanji:"朝霞",   yomi:"あさがすみ",   katakana:"アサガスミ",   category:"自然", level:2, origin:"朝に薄く立ち込める霞。春の朝霞は仄かな色合いで和歌に多く詠まれた。" },
  { kanji:"凍雨",   yomi:"とうう",       katakana:"トウウ",       category:"自然", level:4, origin:"気温が低いときに雨粒が凍って降る氷の粒。みぞれと霙の一種。" },
  { kanji:"青嵐",   yomi:"あおあらし",   katakana:"アオアラシ",   category:"自然", level:3, origin:"初夏に青葉を揺らして吹く強い南風。薫風とも呼ばれる季節の風。" },
  { kanji:"秋霖",   yomi:"しゅうりん",   katakana:"シュウリン",   category:"自然", level:4, origin:"秋の長雨。秋雨前線による長引く雨で秋の気配を深める。" },
  { kanji:"夕立",   yomi:"ゆうだち",     katakana:"ユウダチ",     category:"自然", level:1, origin:"夏の午後に突然降り出す激しい雨。積乱雲が発達して起こる夏の雷雨。" },
  { kanji:"驟雨",   yomi:"しゅうう",     katakana:"シュウウ",     category:"自然", level:3, origin:"急に降り出して急に止む激しい雨。にわか雨・スコールともいう。" },
  { kanji:"露霜",   yomi:"つゆじも",     katakana:"ツユジモ",     category:"自然", level:4, origin:"露が凍りついた白い霜。初秋の寒い朝に葉の上に現れる。" },
  { kanji:"朔風",   yomi:"さくふう",     katakana:"サクフウ",     category:"自然", level:4, origin:"北から吹く冷たい風。北風の雅語的な表現で冬の訪れを告げる。" },
  { kanji:"春雨",   yomi:"はるさめ",     katakana:"ハルサメ",     category:"自然", level:1, origin:"春に降るしとしとと細かい雨。柔らかく大地を潤す温かみのある雨。" },
  { kanji:"初雪",   yomi:"はつゆき",     katakana:"ハツユキ",     category:"自然", level:1, origin:"その年の冬初めて降る雪。待ちわびた雪の訪れを喜ぶ心が込められた言葉。" },
  { kanji:"馬",     yomi:"うま",         katakana:"ウマ",         category:"動物", level:1, origin:"人間が家畜化した大型哺乳類。農耕・戦場・輸送で長く人間と歩んだ。" },
  { kanji:"牛",     yomi:"うし",         katakana:"ウシ",         category:"動物", level:1, origin:"農耕・乳・肉など人間の生活を支えてきた家畜。丑の刻参りの伝説も有名。" },
  { kanji:"羊",     yomi:"ひつじ",       katakana:"ヒツジ",       category:"動物", level:1, origin:"柔らかい羊毛を持つ家畜。羊羹・千頭が曲などで日本文化にも関わる。" },
  { kanji:"豚",     yomi:"ぶた",         katakana:"ブタ",         category:"動物", level:1, origin:"人間が家畜化したイノシシの子孫。豚カツ・豚汁と料理の幅が広い。" },
  { kanji:"象",     yomi:"ぞう",         katakana:"ゾウ",         category:"動物", level:1, origin:"陸上最大の哺乳類。長い鼻と大きな耳が特徴。古くから知能の高い動物として知られる。" },
  { kanji:"虎",     yomi:"とら",         katakana:"トラ",         category:"動物", level:1, origin:"縞模様を持つ大型ネコ科動物。千里行って千里帰る強さの象徴。" },
  { kanji:"豹",     yomi:"ひょう",       katakana:"ヒョウ",       category:"動物", level:2, origin:"斑点模様を持つしなやかなネコ科動物。豹変・豹柄などの語源になった。" },
  { kanji:"獅子",   yomi:"しし",         katakana:"シシ",         category:"動物", level:2, origin:"ライオンの雅称。百獣の王として神社の狛犬・獅子舞に継承されてきた。" },
  { kanji:"麒麟",   yomi:"きりん",       katakana:"キリン",       category:"動物", level:2, origin:"長い首を持つアフリカ最長の陸上動物。中国伝説の吉祥の霊獣でもある。" },
  { kanji:"駱駝",   yomi:"らくだ",       katakana:"ラクダ",       category:"動物", level:2, origin:"砂漠地帯に棲む背中に瘤を持つ哺乳類。乾燥と暑さに強い砂漠の舟。" },
  { kanji:"山猫",   yomi:"やまねこ",     katakana:"ヤマネコ",     category:"動物", level:2, origin:"山地に棲む野生のネコ科動物。対馬に棲むツシマヤマネコは絶滅危惧種。" },
  { kanji:"貉",     yomi:"むじな",       katakana:"ムジナ",       category:"動物", level:4, origin:"タヌキやアナグマの別名。同じ穴のむじな（一味同然）の諺で有名。" },
  { kanji:"鼬鼠",   yomi:"いたち",       katakana:"イタチ",       category:"動物", level:3, origin:"細長い体でくねくね動くイタチ科の哺乳類。いたちごっこの語源。" },
  { kanji:"猯",     yomi:"あなぐま",     katakana:"アナグマ",     category:"動物", level:4, origin:"地中に穴を掘って暮らすイタチ科の動物。タヌキと混同されがちな益獣。" },
  { kanji:"山嵐",   yomi:"やまあらし",   katakana:"ヤマアラシ",   category:"動物", level:3, origin:"全身に鋭い棘を持つ哺乳類。棘は外敵から身を守る天然の武器。" },
  { kanji:"蝙蝠",   yomi:"こうもり",     katakana:"コウモリ",     category:"動物", level:3, origin:"夜間に超音波で飛ぶ唯一飛翔できる哺乳類。幸運の象徴として中国文化にも。" },
  { kanji:"菊",     yomi:"きく",         katakana:"キク",         category:"植物", level:1, origin:"秋の代表的な花。天皇家の紋章にも使われ、日本の国花の一つ。" },
  { kanji:"萱草",   yomi:"わすれぐさ",   katakana:"ワスレグサ",   category:"植物", level:3, origin:"ユリに似たオレンジの花を咲かせる多年草。悲しみを忘れさせるという言い伝え。" },
  { kanji:"花菖蒲", yomi:"はなしょうぶ", katakana:"ハナショウブ", category:"植物", level:2, origin:"初夏に紫・白・淡紅の花を咲かせるアヤメ科植物。菖蒲園が各地にある。" },
  { kanji:"鳶尾",   yomi:"あやめ",       katakana:"アヤメ",       category:"植物", level:4, origin:"初夏に紫の花を咲かせるアヤメ科植物。菖蒲・カキツバタと見分けにくい。" },
  { kanji:"石蒜",   yomi:"ひがんばな",   katakana:"ヒガンバナ",   category:"植物", level:4, origin:"秋のお彼岸に赤い花を咲かせる球根植物。曼珠沙華とも呼ばれる不思議な花。" },
  { kanji:"曼珠沙華",yomi:"まんじゅしゃげ",katakana:"マンジュシャゲ",category:"植物", level:4, origin:"ヒガンバナのサンスクリット語の別名。天界に咲く赤い花という意味を持つ。" },
  { kanji:"都草",   yomi:"みやこぐさ",   katakana:"ミヤコグサ",   category:"植物", level:3, origin:"道端や草地に生えるマメ科の多年草。黄色い蝶のような花を咲かせる。" },
  { kanji:"零余子", yomi:"むかご",       katakana:"ムカゴ",       category:"植物", level:4, origin:"ヤマノイモのつるにつく小さな球芽。炊き込みご飯にして食べる秋の恵み。" },
  { kanji:"鱵",     yomi:"さより",       katakana:"サヨリ",       category:"魚", level:4, origin:"細長い体で下顎が突き出た美しい海魚。春に旬を迎え刺身が絶品。" },
  { kanji:"鰡",     yomi:"ぼら",         katakana:"ボラ",         category:"魚", level:3, origin:"内湾や汽水に棲む出世魚。ボラの卵巣を塩漬け乾燥したからすみは高級珍味。" },
  { kanji:"鮗",     yomi:"このしろ",     katakana:"コノシロ",     category:"魚", level:3, origin:"ニシンの仲間で江戸前寿司の具として有名。「子の城」の語呂から縁起魚とも。" },
  { kanji:"鱛",     yomi:"えそ",         katakana:"エソ",         category:"魚", level:4, origin:"かまぼこ・竹輪の原料として重要な白身魚。骨が多く刺身では食べにくい。" },
  { kanji:"鱊",     yomi:"たなご",       katakana:"タナゴ",       category:"魚", level:4, origin:"二枚貝の中に産卵する川魚。釣りの対象魚として人気があり美しい婚姻色を持つ。" },
  { kanji:"石班魚", yomi:"はた",         katakana:"ハタ",         category:"魚", level:4, origin:"南の海の岩礁に棲む大型魚。クエとも呼ばれ鍋が絶品の高級魚。" },
  { kanji:"石鯛",   yomi:"いしだい",     katakana:"イシダイ",     category:"魚", level:2, origin:"縞模様が美しい岩礁の魚。口が硬く岩の貝を砕いて食べることができる。" },
  { kanji:"金魚",   yomi:"きんぎょ",     katakana:"キンギョ",     category:"魚", level:1, origin:"フナを品種改良した観賞用の魚。金魚すくいは夏祭りの定番の遊び。" },
  { kanji:"鯏",     yomi:"うぐい",       katakana:"ウグイ",       category:"魚", level:3, origin:"川の中流から下流に棲むコイ科の魚。春の産卵期には美しい婚姻色に染まる。" },
  { kanji:"燕雀",   yomi:"えんじゃく",   katakana:"エンジャク",   category:"鳥", level:3, origin:"ツバメとスズメ。燕雀いずくんぞ鴻鵠の志を知らんやの諺で小人物の例え。" },
  { kanji:"鵜鷺",   yomi:"うさぎ",       katakana:"ウサギ",       category:"鳥", level:4, origin:"ウとサギを合わせた架空の鳥として詩歌に使われることがある表現。" },
  { kanji:"紅雀",   yomi:"べにすずめ",   katakana:"ベニスズメ",   category:"鳥", level:4, origin:"赤い羽を持つ美しい小鳥。かつて籠の鳥として愛好されたが今は保護対象。" },
  { kanji:"青鷺",   yomi:"あおさぎ",     katakana:"アオサギ",     category:"鳥", level:2, origin:"灰青色の大型サギ。水辺に静かに立ち魚を待ち伏せる。日本最大のサギ類。" },
  { kanji:"黒鳶",   yomi:"くろとび",     katakana:"クロトビ",     category:"鳥", level:4, origin:"黒いトビの仲間。熱帯アジアに分布し南西諸島にも訪れる珍しい猛禽類。" },
  { kanji:"鶫",     yomi:"つぐみ",       katakana:"ツグミ",       category:"鳥", level:3, origin:"秋冬に飛来する渡り鳥。かつては食用にされたが今は保護されている。" },
  { kanji:"頬白",   yomi:"ほおじろ",     katakana:"ホオジロ",     category:"鳥", level:4, origin:"頬が白い小鳥。チーチーと甲高く囀り日当たりの良い藪に棲む留鳥。" },
  { kanji:"花鶏",   yomi:"あとり",       katakana:"アトリ",       category:"鳥", level:4, origin:"秋冬に渡来する小鳥。橙色と黒白のコントラストが美しい集団で動く鳥。" },
  { kanji:"鷭",     yomi:"ばん",         katakana:"バン",         category:"鳥", level:3, origin:"水辺に棲む黒い鳥。額に赤い額板を持つ。ヒクイナの仲間。" },
  { kanji:"蒼鷹",   yomi:"おおたか",     katakana:"オオタカ",     category:"鳥", level:4, origin:"森林に棲む大型の猛禽類。鷹狩りに使われた猛禽の代表で絶滅危惧種から回復中。" },
  { kanji:"天道虫", yomi:"てんとうむし", katakana:"テントウムシ", category:"虫", level:2, origin:"赤に黒の斑点が美しい小さな甲虫。農業害虫のアブラムシを食べる益虫。" },
  { kanji:"蛆",     yomi:"うじ",         katakana:"ウジ",         category:"虫", level:2, origin:"ハエの幼虫。腐食物に発生し分解者として生態系の循環を担う。" },
  { kanji:"海松貝", yomi:"みるがい",     katakana:"ミルガイ",     category:"魚", level:3, origin:"深い場所に棲む二枚貝。海松（ミル）という海藻が好きな貝で高級食材。" },
  { kanji:"水黽",   yomi:"あめんぼ",     katakana:"アメンボ",     category:"虫", level:2, origin:"水面を滑るように歩く昆虫。体から飴のような甘い香りを発することが名前の由来。" },
  { kanji:"蟷",     yomi:"かまきり",     katakana:"カマキリ",     category:"虫", level:2, origin:"鎌状の前肢で昆虫を捕食する肉食性昆虫。交尾後に雌が雄を食べることも。" },
  { kanji:"蜥蜴",   yomi:"とかげ",       katakana:"トカゲ",       category:"動物", level:2, origin:"鱗に覆われた爬虫類。尾が切れても再生する特技を持つ。日当たりの良い場所を好む。" },
  { kanji:"蚰蜒",   yomi:"げじげじ",     katakana:"ゲジゲジ",     category:"虫", level:4, origin:"長い脚を持つ多足類。害虫を食べる益虫だが見た目の不気味さで嫌われる。" },
  { kanji:"鈴虫",   yomi:"すずむし",     katakana:"スズムシ",     category:"虫", level:2, origin:"秋の夜にリーンリーンと美しく鳴く昆虫。松虫と並ぶ秋鳴く虫の代表。" },
  { kanji:"松虫",   yomi:"まつむし",     katakana:"マツムシ",     category:"虫", level:3, origin:"秋にチンチロリンと鳴く昆虫。松虫よ鳴けよの童謡でも有名な秋の虫。" },
  { kanji:"楢",     yomi:"なら",         katakana:"ナラ",         category:"木", level:2, origin:"コナラ・ミズナラの総称。どんぐりをつける落葉樹でドングリの木と呼ばれる。" },
  { kanji:"楡",     yomi:"にれ",         katakana:"ニレ",         category:"木", level:3, origin:"北海道や北国に多い落葉樹。ニレの木の下でという詩的な表現でも知られる。" },
  { kanji:"紅葉",   yomi:"もみじ",       katakana:"モミジ",       category:"木", level:2, origin:"カエデの秋の色づいた葉の美称。秋の紅葉狩りの主役。" },
  { kanji:"薄荷",   yomi:"はっか",       katakana:"ハッカ",       category:"木", level:3, origin:"清涼感を持つ芳香植物。メントールを含み歯磨き・飴・化粧品に使われる。" },
  { kanji:"羊歯",   yomi:"しだ",         katakana:"シダ",         category:"木", level:2, origin:"羊の歯に似た葉を持つシダ類の総称。花を咲かせず胞子で繁殖する。" },
  { kanji:"芭蕉",   yomi:"ばしょう",     katakana:"バショウ",     category:"木", level:2, origin:"大きな葉を持つ熱帯原産の植物。松尾芭蕉の俳号の由来になった植物。" },
  { kanji:"月桂樹", yomi:"げっけいじゅ", katakana:"ゲッケイジュ", category:"木", level:2, origin:"古代ギリシャで勝者に冠として授けたローリエ。料理の香味にも使われる。" },
  { kanji:"無患子", yomi:"むくろじ",     katakana:"ムクロジ",     category:"木", level:4, origin:"実の皮がサポニンを含み昔は石鹸代わりに使われた落葉高木。羽根突きの羽の玉。" },
  { kanji:"合歓木", yomi:"ねむのき",     katakana:"ネムノキ",     category:"木", level:4, origin:"夜になると葉を閉じて眠る木。ピンクの絹糸状の花が夏に美しく咲く。" },
  { kanji:"自玉",   yomi:"こでまり",     katakana:"コデマリ",     category:"木", level:3, origin:"小さな白い花が手まりのように集まって咲く低木。別名ユキヤナギの仲間。" },
  { kanji:"南天",   yomi:"なんてん",     katakana:"ナンテン",     category:"木", level:2, origin:"難転（難を転じる）の語呂から縁起植物。冬に赤い実が美しい常緑低木。" },
  { kanji:"石榴",   yomi:"ざくろ",       katakana:"ザクロ",       category:"木", level:3, origin:"夏に赤い花が咲き、秋に赤い実をつける落葉樹。子宝の象徴とされる果樹。" },
  { kanji:"嵐",     yomi:"あらし",       katakana:"アラシ",       category:"自然", level:1, origin:"激しい風雨。山嵐・台風など強い風と雨が組み合わさった自然の荒れ模様。" },
  { kanji:"波",     yomi:"なみ",         katakana:"ナミ",         category:"自然", level:1, origin:"水面を伝わるうねり。波乗り・波音など海の象徴として詩歌に多く登場。" },
  { kanji:"霧",     yomi:"きり",         katakana:"キリ",         category:"自然", level:1, origin:"水分が漂い視界を遮る気象現象。霧島・霧ヶ峰など地名にも多い。" },
  { kanji:"嵐山",   yomi:"あらしやま",   katakana:"アラシヤマ",   category:"自然", level:2, origin:"京都の嵐山は嵐のような強い風が吹くことが地名の由来と言われる景勝地。" },
  { kanji:"泉",     yomi:"いずみ",       katakana:"イズミ",       category:"自然", level:1, origin:"地中から水が湧き出る場所。清らかな水の象徴。和泉・泉州など地名にも。" },
  { kanji:"滝",     yomi:"たき",         katakana:"タキ",         category:"自然", level:1, origin:"高所から水が流れ落ちる場所。那智の滝・華厳の滝など名瀑が全国にある。" },
  { kanji:"断崖",   yomi:"だんがい",     katakana:"ダンガイ",     category:"自然", level:2, origin:"垂直に切り立った崖。断崖絶壁の景観は自然の彫刻とも呼ばれる。" },
  { kanji:"深淵",   yomi:"しんえん",     katakana:"シンエン",     category:"自然", level:3, origin:"深くて底知れない水の淵。謎や深遠な意味の比喩としても使われる。" },
  { kanji:"天辺",   yomi:"てっぺん",     katakana:"テッペン",     category:"自然", level:2, origin:"山や物の一番高い頂上。天の辺（ふち）という意味から最上部を指す言葉。" },
  { kanji:"山脈",   yomi:"さんみゃく",   katakana:"サンミャク",   category:"自然", level:2, origin:"山が連なる地形。日本アルプス・奥羽山脈など国土を縦横に走る山の連なり。" },
  { kanji:"潟",     yomi:"かた",         katakana:"カタ",         category:"自然", level:2, origin:"海と陸の間に生まれた干潟・ラグーン。八郎潟・新潟など地名に多い。" },
  { kanji:"洞窟",   yomi:"どうくつ",     katakana:"ドウクツ",     category:"自然", level:2, origin:"岩盤が浸食されてできた空洞。石灰岩の鍾乳洞は独特の造形美を持つ。" },
  { kanji:"岬",     yomi:"みさき",       katakana:"ミサキ",       category:"自然", level:1, origin:"海に突き出た陸地の先端。室戸岬・潮岬など全国に名高い岬がある。" },
  { kanji:"磯",     yomi:"いそ",         katakana:"イソ",         category:"自然", level:1, origin:"海辺の岩場。磯遊び・磯釣りと海の恵みを楽しむ場所として親しまれる。" },
  { kanji:"鼹",     yomi:"もぐら",       katakana:"モグラ",       category:"動物", level:4, origin:"地中に暮らす哺乳類。前肢のシャベル状の手で素早くトンネルを掘り進む。" },
  { kanji:"麝香猫", yomi:"じゃこうねこ", katakana:"ジャコウネコ", category:"動物", level:4, origin:"肛門腺から麝香の香料を出すジャコウネコ科の動物。コーヒー豆を食べるのでコピ・ルアクの産地としても知られる。" },
  { kanji:"狢",     yomi:"むじな",       katakana:"ムジナ",       category:"動物", level:4, origin:"タヌキやアナグマの別名。同じ穴のむじなは悪人仲間のことを指す諺。" },
  { kanji:"猩猩",   yomi:"しょうじょう", katakana:"ショウジョウ", category:"動物", level:4, origin:"オランウータンなど大型類人猿の古名。酒を好む架空の生き物としても伝わる。" },
  { kanji:"山椒魚", yomi:"さんしょううお",katakana:"サンショウウオ",category:"動物", level:4, origin:"清流に棲む大型の両生類。大山椒魚は世界最大の両生類で特別天然記念物。" },
  { kanji:"鼈",     yomi:"すっぽん",     katakana:"スッポン",     category:"動物", level:4, origin:"甲羅が柔らかい淡水亀。噛み付いたら離さない粘り強さで知られる。精力食材にも。" },
  { kanji:"玳瑁",   yomi:"たいまい",     katakana:"タイマイ",     category:"動物", level:4, origin:"美しい甲羅を持つ海亀。べっ甲細工の素材として珍重されてきた絶滅危惧種。" },
  { kanji:"鸕鷀",   yomi:"う",           katakana:"ウ",           category:"動物", level:4, origin:"鵜の旧字体。鵜飼いで使われる水鳥。喉が広く大型の魚も飲み込める。" },
  { kanji:"田鼠",   yomi:"もぐら",       katakana:"モグラ",       category:"動物", level:3, origin:"田んぼや畑の土中を掘り進む哺乳類。漢字では田の中の鼠と書く。" },
  { kanji:"羆",     yomi:"ひぐま",       katakana:"ヒグマ",       category:"動物", level:3, origin:"北海道に棲む日本最大の陸上哺乳類。道内で人的被害も出る力強い野生動物。" },
  { kanji:"蒲",     yomi:"がま",         katakana:"ガマ",         category:"植物", level:2, origin:"水辺に棲む大型植物。ガマの穂というソーセージ状の穂が特徴的。" },
  { kanji:"葦",     yomi:"あし",         katakana:"アシ",         category:"植物", level:2, origin:"水辺に群生するイネ科の大型植物。葦原の国は日本の古称。" },
  { kanji:"薄",     yomi:"すすき",       katakana:"ススキ",       category:"植物", level:2, origin:"秋の七草の一つ。秋風に揺れる銀色の穂が美しい。月見の飾りにも。" },
  { kanji:"女郎花", yomi:"おみなえし",   katakana:"オミナエシ",   category:"植物", level:3, origin:"秋の七草の一つ。黄色い小花が集まって咲く多年草。万葉の花として知られる。" },
  { kanji:"千日紅", yomi:"せんにちこう", katakana:"センニチコウ", category:"植物", level:3, origin:"赤・ピンク・白の球状の花が千日間色あせないとされる観賞植物。" },
  { kanji:"凌霄花", yomi:"のうぜんかずら",katakana:"ノウゼンカズラ",category:"植物", level:4, origin:"夏に橙赤色の大きな花を咲かせるつる植物。中国原産で古来から庭に植えられた。" },
  { kanji:"芳草",   yomi:"かおりぐさ",   katakana:"カオリグサ",   category:"植物", level:3, origin:"良い香りを持つ草の総称。ラベンダー・ミント・バジルなど多様な芳草がある。" },
  { kanji:"穴子",   yomi:"あなご",       katakana:"アナゴ",       category:"魚", level:2, origin:"砂泥の穴に棲む細長い魚。ウナギに似るが海水魚で江戸前寿司の定番ネタ。" },
  { kanji:"鮃鰈",   yomi:"ひらめかれい", katakana:"ヒラメカレイ", category:"魚", level:4, origin:"左ヒラメに右カレイ。目の位置で見分ける扁平な海底魚の区別の覚え方。" },
  { kanji:"真鰯",   yomi:"まいわし",     katakana:"マイワシ",     category:"魚", level:2, origin:"最も一般的なイワシの種類。七つの黒い斑点が特徴の日本近海の回遊魚。" },
  { kanji:"太刀魚", yomi:"たちうお",     katakana:"タチウオ",     category:"魚", level:2, origin:"太刀のように細長く銀色に輝く魚。腹びれがなく直立して泳ぐ姿が特徴。" },
  { kanji:"鬼灯",   yomi:"ほおずき",     katakana:"ホオズキ",     category:"植物", level:2, origin:"赤いランタン状の袋に包まれた実が特徴の植物。盂蘭盆の飾り物として有名。" },
  { kanji:"菜花",   yomi:"なのはな",     katakana:"ナノハナ",     category:"植物", level:1, origin:"春に黄色い花が一面に咲く菜の花。菜種油の原料でもあり春の代名詞。" },
  { kanji:"紫陽花", yomi:"あじさい",     katakana:"アジサイ",     category:"植物", level:2, origin:"梅雨の花。青・紫・ピンクと土の酸度により花の色が変わる不思議な植物。" },
  { kanji:"彼岸花", yomi:"ひがんばな",   katakana:"ヒガンバナ",   category:"植物", level:2, origin:"秋のお彼岸に真っ赤な花を咲かせる球根植物。墓地に多く不思議な趣がある。" },
  { kanji:"花梨",   yomi:"かりん",       katakana:"カリン",       category:"木", level:2, origin:"秋に黄い大きな実をつける落葉樹。実は固くて生食できないが蜂蜜漬けが有名。" },
  { kanji:"林檎",   yomi:"りんご",       katakana:"リンゴ",       category:"木", level:2, origin:"世界中で親しまれる果樹。ニュートンの万有引力の発見に関わる逸話で有名。" },
  { kanji:"葡萄",   yomi:"ぶどう",       katakana:"ブドウ",       category:"木", level:2, origin:"房状に実をつけるつる植物。ワインの原料として世界的に栽培される果樹。" },
  { kanji:"西瓜",   yomi:"すいか",       katakana:"スイカ",       category:"植物", level:2, origin:"夏の果物の王様。緑と黒の縞模様と赤い果肉が特徴。水分たっぷりで涼しげ。" },
  { kanji:"南瓜",   yomi:"かぼちゃ",     katakana:"カボチャ",     category:"植物", level:2, origin:"カンボジア経由で伝来した野菜。ハロウィンのランタンの材料としても有名。" },
  { kanji:"茄子",   yomi:"なす",         katakana:"ナス",         category:"植物", level:1, origin:"夏野菜の代表。一富士二鷹三茄子と初夢の縁起物。ぬか漬けにすると絶品。" },
  { kanji:"黄瓜",   yomi:"きゅうり",     katakana:"キュウリ",     category:"植物", level:2, origin:"夏野菜の一種。河童が好む野菜として知られ、寿司の海苔巻きにも使われる。" },
  { kanji:"牛蒡",   yomi:"ごぼう",       katakana:"ゴボウ",       category:"植物", level:2, origin:"根を食べる日本独自の野菜文化。食物繊維が豊富で整腸作用がある。" },
  { kanji:"蓮根",   yomi:"れんこん",     katakana:"レンコン",     category:"植物", level:2, origin:"ハスの根茎。穴が多く先が見通せることから縁起物として正月料理に使われる。" },
  { kanji:"慈姑",   yomi:"くわい",       katakana:"クワイ",       category:"植物", level:4, origin:"芽が太く力強く伸びることから縁起物とされる水生植物。正月のおせちに。" },

  // ── 追加: 自然 (lv1) ──────────────────────────────────────
  { kanji:"雷",       yomi:"かみなり",     katakana:"カミナリ",     category:"自然", level:1, origin:"大気中の放電現象。轟音と稲光が同時に走る。「神鳴り」が語源とされ、稲の実りをもたらす神の声。" },
  { kanji:"峠",       yomi:"とうげ",       katakana:"トウゲ",       category:"自然", level:1, origin:"山の上り坂と下り坂の境。「山+上+下」を組み合わせた日本生まれの国字（和製漢字）。" },
  { kanji:"天の川",   yomi:"あまのがわ",   katakana:"アマノガワ",   category:"自然", level:1, origin:"夜空に帯状に広がる銀河。織姫と彦星が年に一度だけ渡る天上の川として七夕伝説に伝わる。" },
  { kanji:"流れ星",   yomi:"ながれぼし",   katakana:"ナガレボシ",   category:"自然", level:1, origin:"宇宙のチリが大気に突入して燃える流星。一瞬の光に願いを三回唱えると叶うと言われる。" },
  { kanji:"海原",     yomi:"うなばら",     katakana:"ウナバラ",     category:"自然", level:1, origin:"広大な海の広がり。「うな」は海を表す古語。はるか遠くまで続く水面を雄大に表した言葉。" },
  { kanji:"干潟",     yomi:"ひがた",       katakana:"ヒガタ",       category:"自然", level:1, origin:"干潮時に現れる平坦な泥・砂の浅瀬。カニや貝など多くの生き物が暮らす生態系の宝庫。" },
  { kanji:"三日月",   yomi:"みかづき",     katakana:"ミカヅキ",     category:"自然", level:1, origin:"新月から三日目の細い弓形の月。古来より美の象徴とされ和歌や家紋に多く用いられた。" },
  { kanji:"初霜",     yomi:"はつしも",     katakana:"ハツシモ",     category:"自然", level:1, origin:"その年の初めて降りる霜。秋から冬への移ろいを告げる自然の合図。俳句の秋の季語。" },
  { kanji:"夜霧",     yomi:"よぎり",       katakana:"ヨギリ",       category:"自然", level:1, origin:"夜間に立ち込める霧。闇に溶け込む幻想的な霧は古来より詩歌や物語の情景として愛された。" },
  { kanji:"朝霜",     yomi:"あさしも",     katakana:"アサシモ",     category:"自然", level:1, origin:"夜明けに草地や地面に白く降りた霜。冷え込んだ朝にだけ現れる繊細な氷の結晶。" },

  // ── 追加: 自然 (lv2) ──────────────────────────────────────
  { kanji:"木漏れ日", yomi:"こもれび",     katakana:"コモレビ",     category:"自然", level:2, origin:"木の葉の間から差し込む点々とした日光。外国語に訳しにくい日本語独自の美的概念。" },
  { kanji:"鰯雲",     yomi:"いわしぐも",   katakana:"イワシグモ",   category:"自然", level:2, origin:"秋空に出る小さな白い雲の群れ。イワシの群れに似た形から名づけられた高積雲。秋の訪れを告げる。" },
  { kanji:"羊雲",     yomi:"ひつじぐも",   katakana:"ヒツジグモ",   category:"自然", level:2, origin:"ぽこぽことした白い塊が羊の群れに見える高積雲。夏から秋にかけての空に広がる。" },
  { kanji:"鱗雲",     yomi:"うろこぐも",   katakana:"ウロコグモ",   category:"自然", level:2, origin:"魚の鱗のような小さな雲が並ぶ巻積雲。高度が高く秋の青空に繊細に広がる。雨の前兆とも。" },
  { kanji:"土砂降り", yomi:"どしゃぶり",   katakana:"ドシャブリ",   category:"自然", level:2, origin:"土砂が降るほどの激しい大雨。視界が白くなるほどの豪雨を力強く表現した言葉。" },
  { kanji:"夕映え",   yomi:"ゆうばえ",     katakana:"ユウバエ",     category:"自然", level:2, origin:"夕暮れ時に空が赤やオレンジに染まる現象。太陽光が大気を長く通る夕方に生まれる絶景。" },
  { kanji:"春霖",     yomi:"しゅんりん",   katakana:"シュンリン",   category:"自然", level:2, origin:"春に長く降り続く雨。植物の成長を促す恵みの長雨でもあり、梅雨とは異なる春の雨情。" },
  { kanji:"春雷",     yomi:"しゅんらい",   katakana:"シュンライ",   category:"自然", level:2, origin:"春に鳴る雷。虫たちが冬眠から目を覚ます合図とされ「虫出しの雷」とも呼ばれる。" },
  { kanji:"残雪",     yomi:"ざんせつ",     katakana:"ザンセツ",     category:"自然", level:2, origin:"春になっても解け残った雪。山の高所や谷間に名残の白さをとどめる季節の境界線。" },
  { kanji:"山霞",     yomi:"やまがすみ",   katakana:"ヤマガスミ",   category:"自然", level:2, origin:"春の山に霞がかかった景色。遠くの山稜がぼんやりと霞んで見える幻想的な日本の春の原風景。" },
  { kanji:"星月夜",   yomi:"ほしづきよ",   katakana:"ホシヅキヨ",   category:"自然", level:2, origin:"星がまるで月のように明るく輝く夜。光害のない澄んだ夜空に満天の星が広がる美しい情景。" },
  { kanji:"走り梅雨", yomi:"はしりづゆ",   katakana:"ハシリヅユ",   category:"自然", level:2, origin:"梅雨の本格的な時期より前に降り続く雨。梅雨が先走ってやってきたように見える初夏の現象。" },
  { kanji:"紅葉狩り", yomi:"もみじがり",   katakana:"モミジガリ",   category:"自然", level:2, origin:"秋の紅葉を求めて山野へ出かけること。「狩り」とは山野の自然を愛でることを指した古い言葉。" },

  // ── 追加: 動物 (lv1) ──────────────────────────────────────
  { kanji:"狼",       yomi:"おおかみ",     katakana:"オオカミ",     category:"動物", level:1, origin:"イヌ科最大の野生動物。日本では絶滅したニホンオオカミは農地を守る神の使いとして各地で信仰された。" },
  { kanji:"蛇",       yomi:"へび",         katakana:"ヘビ",         category:"動物", level:1, origin:"細長い体を持つ爬虫類。脱皮を繰り返す姿が再生の象徴とされ、日本神話や弁財天の使いとして登場。" },

  // ── 追加: 動物 (lv2) ──────────────────────────────────────
  { kanji:"雨蛙",     yomi:"あまがえる",   katakana:"アマガエル",   category:"動物", level:2, origin:"雨の前後によく鳴く小型のカエル。体色を変えて葉に擬態し、指先の吸盤で垂直面も登る。" },
  { kanji:"穴熊",     yomi:"あなぐま",     katakana:"アナグマ",     category:"動物", level:2, origin:"地面に穴を掘って巣にするイタチ科の哺乳類。冬眠する。タヌキと混同されやすい森の住人。" },
  { kanji:"海星",     yomi:"ひとで",       katakana:"ヒトデ",       category:"動物", level:2, origin:"五本の腕を放射状に持つ棘皮動物。人の手に似た形から「人手」と書く。再生能力が高い。" },
  { kanji:"沢蟹",     yomi:"さわがに",     katakana:"サワガニ",     category:"動物", level:2, origin:"山間の清流に棲む小型の淡水ガニ。石の下に潜む夜行性で、唐揚げにして食べることも。" },

  // ── 追加: 動物 (lv3) ──────────────────────────────────────
  { kanji:"青大将",   yomi:"あおだいしょう", katakana:"アオダイショウ", category:"動物", level:3, origin:"日本最大の無毒ヘビ。青みがかった体でネズミを食べる益獣。家の守り神として大切にされてきた。" },
  { kanji:"磯巾着",   yomi:"いそぎんちゃく", katakana:"イソギンチャク", category:"動物", level:3, origin:"岩礁に固着する刺胞動物。触手を広げ小魚を捕る。開いた姿が巾着（きんちゃく）袋に似る。" },
  { kanji:"狒狒",     yomi:"ひひ",         katakana:"ヒヒ",         category:"動物", level:3, origin:"アフリカに棲む大型のサル。日本では古来、化け物の一種としても語られ怪異譚に登場する。" },
  { kanji:"針鼠",     yomi:"はりねずみ",   katakana:"ハリネズミ",   category:"動物", level:3, origin:"背中を硬い針で覆われた小型哺乳類。丸まって身を守る。近年ペットとして人気が急上昇。" },

  // ── 追加: 鳥 ──────────────────────────────────────────────
  { kanji:"白鷺",     yomi:"しらさぎ",     katakana:"シラサギ",     category:"鳥",   level:1, origin:"真っ白な羽を持つサギ類の総称。コサギ・チュウサギ・ダイサギなどが含まれる。水辺の白い妖精。" },
  { kanji:"水鶏",     yomi:"くいな",       katakana:"クイナ",       category:"鳥",   level:2, origin:"葦原に潜む夜鳴き鳥。「くいくい」と戸を叩くような声で鳴き、和歌に詠まれた愛らしい鳥。" },

  // ── 追加: 虫 ──────────────────────────────────────────────
  { kanji:"蜜蜂",     yomi:"みつばち",     katakana:"ミツバチ",     category:"虫",   level:1, origin:"花の蜜を集めてハチミツを作る社会性昆虫。女王蜂・働き蜂・雄蜂の階層で一族を形成する。" },
  { kanji:"熊蜂",     yomi:"くまばち",     katakana:"クマバチ",     category:"虫",   level:2, origin:"体が黒くずんぐりとした大型のハナバチ。ブーンと重い音を立てて飛ぶが、性格は温厚。" },
  { kanji:"鬼蜻蛉",   yomi:"おにやんま",   katakana:"オニヤンマ",   category:"虫",   level:2, origin:"日本最大のトンボ。黒と黄の縞模様が鬼を思わせる。空中でほかの昆虫を捕らえる俊敏な捕食者。" },

  // ── 追加: 魚 ──────────────────────────────────────────────
  { kanji:"鱸",       yomi:"すずき",       katakana:"スズキ",       category:"魚",   level:2, origin:"成長とともに名が変わる出世魚。セイゴ→フッコ→スズキと変化し夏に旬を迎える。江戸前の代表魚。" },
  { kanji:"鯻",       yomi:"たかべ",       katakana:"タカベ",       category:"魚",   level:2, origin:"黄色い縞模様が美しい小型の海魚。潮目に群れる。脂乗りが良く塩焼きが絶品の夏の魚。" },
  { kanji:"鮋",       yomi:"かさご",       katakana:"カサゴ",       category:"魚",   level:3, origin:"岩礁に潜む赤みがかった底魚。煮付けや鍋に絶品。一部の仲間は背びれに毒を持つ。" },
  { kanji:"鮟鱇",     yomi:"あんこう",     katakana:"アンコウ",     category:"魚",   level:3, origin:"深海に棲む大口の魚。頭上の発光器で獲物を誘う。冬の鍋料理として有名で「骨以外全部食べる」と言われる。" },
  { kanji:"鰰",       yomi:"はたはた",     katakana:"ハタハタ",     category:"魚",   level:3, origin:"雷が鳴る頃に大量に岸へ押し寄せる冬の魚。「鰰」は雷魚の意。秋田名物しょっつる鍋に使う。" },
  { kanji:"鯒",       yomi:"こち",         katakana:"コチ",         category:"魚",   level:3, origin:"海底に棲む平たい体の魚。目が頭上に突き出ている。夏が旬で、淡白な白身の刺身が絶品。" },
  { kanji:"鯕",       yomi:"しいら",       katakana:"シイラ",       category:"魚",   level:3, origin:"青や金に輝く大型の外洋魚。ハワイではマヒマヒと呼ばれ人気。漁師には縁起の良い魚とされる。" },
  { kanji:"海馬",     yomi:"たつのおとしご", katakana:"タツノオトシゴ", category:"魚", level:3, origin:"竜が馬を落としたような奇妙な形の小魚。オスが育児嚢で卵を育てる世界唯一の父親が産む魚。" },
  { kanji:"螢烏賊",   yomi:"ほたるいか",   katakana:"ホタルイカ",   category:"魚",   level:3, origin:"富山湾が有名な小型のイカ。全身の発光器でホタルのように青白く輝く。春3〜5月が旬。" },

  // ── 追加: 植物 (lv1) ─────────────────────────────────────
  { kanji:"筍",       yomi:"たけのこ",     katakana:"タケノコ",     category:"植物", level:1, origin:"竹の若芽。春の山菜の王者。旬は非常に短く「筍のように伸びる」は急成長の比喩として使われる。" },
  { kanji:"茸",       yomi:"きのこ",       katakana:"キノコ",       category:"植物", level:1, origin:"「木の子」と書くように、朽木や土に生える菌類の総称。秋の山の幸の代表。" },
  { kanji:"松茸",     yomi:"まつたけ",     katakana:"マツタケ",     category:"植物", level:1, origin:"秋の香りの王様。松林に生える希少なキノコで、独特の芳香と歯ごたえが世界的に珍重される。" },
  { kanji:"大根",     yomi:"だいこん",     katakana:"ダイコン",     category:"植物", level:1, origin:"日本で最も馴染み深い根菜。「大根役者」など諺にも登場し、煮物・おろし・漬物と万能の野菜。" },
  { kanji:"人参",     yomi:"にんじん",     katakana:"ニンジン",     category:"植物", level:1, origin:"橙色の根菜。「にんじん」という読みは朝鮮人参(高麗人参)に由来。β-カロテンが豊富な緑黄色野菜。" },
  { kanji:"韮",       yomi:"にら",         katakana:"ニラ",         category:"植物", level:1, origin:"独特の香りを持つユリ科の植物。古事記や万葉集にも登場する日本最古の野菜の一つ。" },
  { kanji:"葱",       yomi:"ねぎ",         katakana:"ネギ",         category:"植物", level:1, origin:"辛みと甘みを持つ身近な野菜。「鴨がねぎを背負ってくる」という都合の良い出来事の比喩で有名。" },
  { kanji:"山芋",     yomi:"やまいも",     katakana:"ヤマイモ",     category:"植物", level:1, origin:"山野に自生するヤマノイモ科の植物。すりおろすと粘りが出る「とろろ」は「山のうなぎ」とも呼ばれる。" },
  { kanji:"蕗の薹",   yomi:"ふきのとう",   katakana:"フキノトウ",   category:"植物", level:1, origin:"フキの花芽。春一番に雪の下から顔を出す山菜。独特の苦みが春の到来を知らせる嬉しい使者。" },
  { kanji:"三つ葉",   yomi:"みつば",       katakana:"ミツバ",       category:"植物", level:1, origin:"三枚の葉が特徴のセリ科の植物。日本料理の吸い物や茶碗蒸しに欠かせない清涼な香草。" },

  // ── 追加: 植物 (lv2) ─────────────────────────────────────
  { kanji:"椎茸",     yomi:"しいたけ",     katakana:"シイタケ",     category:"植物", level:2, origin:"シイやナラの倒木に生えるキノコ。干し椎茸は独特の旨みが強く日本料理の出汁に欠かせない。" },
  { kanji:"舞茸",     yomi:"まいたけ",     katakana:"マイタケ",     category:"植物", level:2, origin:"見つけた人が喜んで舞い踊ったという伝説のキノコ。香り高く、免疫活性成分も注目されている。" },
  { kanji:"独活",     yomi:"うど",         katakana:"ウド",         category:"植物", level:2, origin:"春の山菜。「うどの大木」は役に立たない大きなものの比喩。白くアクが強いが天ぷらが絶品。" },
  { kanji:"蒟蒻",     yomi:"こんにゃく",   katakana:"コンニャク",   category:"植物", level:2, origin:"コンニャク芋から作る独特の食品。カロリーがほぼゼロで江戸時代から庶民に親しまれた。" },
  { kanji:"瓢箪",     yomi:"ひょうたん",   katakana:"ヒョウタン",   category:"植物", level:2, origin:"くびれのある独特の形の実のウリ科植物。乾燥させた実は容器や楽器として利用されてきた。" },
  { kanji:"甘藷",     yomi:"さつまいも",   katakana:"サツマイモ",   category:"植物", level:2, origin:"薩摩（鹿児島）から普及したイモ。江戸の飢饉を救った救荒作物。秋冬の焼き芋は日本の風物詩。" },
  { kanji:"菱",       yomi:"ひし",         katakana:"ヒシ",         category:"植物", level:2, origin:"池沼に浮かぶ水草で実が食べられる。菱形の語源。四角を斜めにした形は武家の家紋に多い。" },
  { kanji:"蒜",       yomi:"にんにく",     katakana:"ニンニク",     category:"植物", level:2, origin:"強烈な香りと辛みを持つ球根野菜。「忍辱」が語源とも言われ、古来から滋養強壮の薬草として珍重。" },
  { kanji:"鶏頭",     yomi:"けいとう",     katakana:"ケイトウ",     category:"植物", level:2, origin:"ニワトリの鶏冠に似た赤や黄の花。秋に咲き、燃えるような色彩で庭を彩る観賞植物。" },
  { kanji:"七草",     yomi:"ななくさ",     katakana:"ナナクサ",     category:"植物", level:2, origin:"春の七草（セリ・ナズナ・ゴギョウ・ハコベラ・ホトケノザ・スズナ・スズシロ）。1月7日に七草粥を食べ無病息災を願う。" },
  { kanji:"苦瓜",     yomi:"にがうり",     katakana:"ニガウリ",     category:"植物", level:2, origin:"表面がこぶこぶした緑の苦い野菜。沖縄ではゴーヤと呼ばれ、夏バテに効くビタミンCを豊富に含む。" },
  { kanji:"花韮",     yomi:"はなにら",     katakana:"ハナニラ",     category:"植物", level:2, origin:"春に白や薄紫の星形の花を咲かせる球根植物。ニラに似た葉を持ち、花壇に広く植えられる。" },
  { kanji:"若竹",     yomi:"わかたけ",     katakana:"ワカタケ",     category:"植物", level:2, origin:"その年に生えた若い竹。青々とした清々しさの象徴で「若竹のように育つ」と子供の成長を喩える。" },
  { kanji:"野菊",     yomi:"のぎく",       katakana:"ノギク",       category:"植物", level:2, origin:"野原に自生する野生の菊の総称。秋風の中に清楚に咲く白や薄紫の小花が素朴で美しい。" },
  { kanji:"野苺",     yomi:"のいちご",     katakana:"ノイチゴ",     category:"植物", level:2, origin:"野山に自生する小さな野生のイチゴの総称。ヘビイチゴやモミジイチゴなど種類は多く実も食べられる。" },

  // ── 追加: 植物 (lv3) ─────────────────────────────────────
  { kanji:"木賊",     yomi:"とくさ",       katakana:"トクサ",       category:"植物", level:3, origin:"節のある直立した茎のシダ植物。茎にケイ素を含み「砥草」とも書かれ木工品の研磨に使われた。" },
  { kanji:"車前草",   yomi:"おおばこ",     katakana:"オオバコ",     category:"植物", level:3, origin:"踏まれても生きる道端の雑草。車（牛車）の前に生えても踏みつけに耐える。漢方で薬草としても使用。" },
  { kanji:"狗尾草",   yomi:"えのころぐさ", katakana:"エノコログサ", category:"植物", level:3, origin:"犬の子（えのころ）の尾に似た穂を持つ雑草。猫じゃらしとも呼ばれ、子供が猫と遊ぶ道具にもなる。" },

  // ── 追加: 植物 (lv4) ─────────────────────────────────────
  { kanji:"薯蕷",     yomi:"ながいも",     katakana:"ナガイモ",     category:"植物", level:4, origin:"粘りが強い長細い芋。すりおろした「とろろ」は麦飯にかけて食べる。薯蕷饅頭の皮にも使われる。" },

  // ── 追加: 木 (lv1) ──────────────────────────────────────
  { kanji:"蔦",       yomi:"つた",         katakana:"ツタ",         category:"木",   level:1, origin:"壁や岩を這い登るつる植物。秋に紅葉する「蔦紅葉」は秋の名景。吸盤で表面に張り付くアイビーの仲間。" },

  // ── 追加: 木 (lv2) ──────────────────────────────────────
  { kanji:"落葉松",   yomi:"からまつ",     katakana:"カラマツ",     category:"木",   level:2, origin:"日本唯一の落葉針葉樹。秋に黄金色に輝く葉が美しい。長野・北海道の高原に多く、建材にも使われる。" },
  { kanji:"茱萸",     yomi:"ぐみ",         katakana:"グミ",         category:"木",   level:2, origin:"秋に赤い実をつける低木。甘酸っぱい実は生食できる。グミキャンディの名はこの実の形に由来する。" },
  { kanji:"山桃",     yomi:"やまもも",     katakana:"ヤマモモ",     category:"木",   level:2, origin:"甘酸っぱい赤紫色の小さな実をつける常緑樹。ジャムや果実酒に使われ、梅雨前後が収穫期。" },
  { kanji:"浜梨",     yomi:"はまなす",     katakana:"ハマナス",     category:"木",   level:2, origin:"海辺の砂地に咲くバラ科の低木。ピンクの大きな花と赤い実が美しい。北海道の花として有名。" },

  // ── 追加: 木 (lv3) ──────────────────────────────────────
  { kanji:"赤楊",     yomi:"はんのき",     katakana:"ハンノキ",     category:"木",   level:3, origin:"湿地に生えるカバノキ科の落葉樹。根に窒素を固定する特殊な性質を持ち、水辺の生態系を支える。" },
  { kanji:"一位",     yomi:"いちい",       katakana:"イチイ",       category:"木",   level:3, origin:"常緑の針葉樹で赤い実が美しいが有毒。「一位の木」で作る笏は最高位の人が持つとされた縁起の木。" }
];

// ────────────────────────────────────────────────────────────
// 2. 定数・設定
// ────────────────────────────────────────────────────────────
const POINTS_BY_HINT = [100, 80, 60, 40, 20, 10]; // ヒント0回〜5回+
const LEVEL_MULT     = [0, 1.0, 1.5, 2.0, 2.5];   // 難度ボーナス倍率（index=level）
const DAILY_LIMIT    = 10;  // 1日最大問数
const STORAGE_KEY    = "shizenkanjiquiz_v1";

// ────────────────────────────────────────────────────────────
// 2b. 季節定義
// ────────────────────────────────────────────────────────────
const SEASONS = {
  spring: {
    months  : [3,4,5],
    name    : '春', emoji : '🌸',
    keywords: ['春','梅','桜','霞','菜','つくし','わらび','うぐいす','蝶','蛙','椿','木蓮','辛夷',
                '土筆','蕨','薇','蓬','蕗','たんぽぽ','朧','霙','春一番','陽炎'],
  },
  summer: {
    months  : [6,7,8],
    name    : '夏', emoji : '🌊',
    keywords: ['夏','蛍','蝉','蚊','蜩','夕立','向日葵','朝顔','海','凪','雷','稲妻',
                '鱧','鮎','西瓜','茄子','蜂','虻','水黽','ひぐらし'],
  },
  autumn: {
    months  : [9,10,11],
    name    : '秋', emoji : '🍂',
    keywords: ['秋','紅葉','もみじ','時雨','木枯','栗','柿','銀杏','松虫','鈴虫','萩',
                '竜胆','紫苑','露草','おみなえし','女郎花','彼岸花','ひがんばな','石蒜'],
  },
  winter: {
    months  : [12,1,2],
    name    : '冬', emoji : '❄️',
    keywords: ['冬','雪','霜','氷','雹','吹雪','霙','冬眠','ふぐ','鱈','氷柱','霜柱',
                '雪崩','初雪','水仙','柊','蝋梅','沈丁花','鷹','鴨','鶴','寒','北風'],
  },
};

function getSeason() {
  if (state.manualSeason) return state.manualSeason;
  const m = new Date().getMonth() + 1;
  for (const [key, s] of Object.entries(SEASONS)) {
    if (s.months.includes(m)) return key;
  }
  return 'spring';
}

function getSeasonScore(q, season) {
  const text = q.kanji + q.yomi + q.origin;
  return (SEASONS[season]?.keywords || []).some(kw => text.includes(kw)) ? 1 : 0;
}

function applySeasonTheme() {
  const s = getSeason();
  document.body.className = document.body.className.replace(/season-\w+/g,'').trim();
  document.body.classList.add('season-' + s);
  const emoji = document.getElementById('season-emoji');
  const label = document.getElementById('season-label');
  if (emoji) emoji.textContent = SEASONS[s].emoji;
  if (label) label.textContent = 'テーマは【' + SEASONS[s].name + '】';
}

// ────────────────────────────────────────────────────────────
// 3. 状態管理
// ────────────────────────────────────────────────────────────
let state = {
  selectedLevel : 1,      // 1=初級 / 2=中級 / 3=上級 / 4=最上級
  collection    : {},     // { "霰": true, ... }
  scores        : {},     // { "霰": 80, ... }
  todayCount    : 0,
  todayDate     : "",
  totalPoints   : 0,
  bestScore     : 0,    // セッション最高得点
  currentQ      : null,
  hintStep      : 0,
  wrongCount    : 0,
  sessionQueue  : [],     // 今セッションの出題キュー
  sessionIdx    : 0,
  sessionCorrect: 0,
  manualSeason  : null,   // null=自動, 'spring'/'summer'/'autumn'/'winter'
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) Object.assign(state, JSON.parse(raw));
  } catch(e) {}
  // 日付リセット
  const today = new Date().toISOString().slice(0,10);
  if (state.todayDate !== today) {
    state.todayDate  = today;
    state.todayCount = 0;
  }
}

function saveState() {
  const save = {
    collection  : state.collection,
    scores      : state.scores,
    todayCount  : state.todayCount,
    todayDate   : state.todayDate,
    totalPoints : state.totalPoints,
    bestScore   : state.bestScore,
  };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(save)); } catch(e) {}
}

// ────────────────────────────────────────────────────────────
// 4. クイズロジック
// ────────────────────────────────────────────────────────────

/** 難度フィルタ + 季節優先 + カテゴリ均一化でキューを作成 */
function buildQueue(level) {
  const season = getSeason();
  let pool = QUIZ_DATA.filter(q => q.level === level);

  // 4グループ: 季節×既習
  const us = pool.filter(q => !state.collection[q.kanji] &&  getSeasonScore(q,season));
  const uo = pool.filter(q => !state.collection[q.kanji] && !getSeasonScore(q,season));
  const ss = pool.filter(q =>  state.collection[q.kanji] &&  getSeasonScore(q,season));
  const so = pool.filter(q =>  state.collection[q.kanji] && !getSeasonScore(q,season));
  [us, uo, ss, so].forEach(shuffle);
  const ordered = [...us, ...uo, ...ss, ...so];

  // カテゴリ均一化: カテゴリごとに最大 maxPerCat 問まで
  const cats = [...new Set(pool.map(q => q.category))];
  const maxPerCat = Math.max(2, Math.ceil(DAILY_LIMIT / cats.length));
  const catCount = {};
  const result   = [];

  // Pass 1: カテゴリ制限内で優先度順に採用
  for (const q of ordered) {
    if (result.length >= DAILY_LIMIT) break;
    const c = q.category;
    catCount[c] = catCount[c] || 0;
    if (catCount[c] < maxPerCat) { result.push(q); catCount[c]++; }
  }
  // Pass 2: 足りなければカテゴリ制限を外して補充
  for (const q of ordered) {
    if (result.length >= DAILY_LIMIT) break;
    if (!result.includes(q)) result.push(q);
  }
  return result;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/** ひらがな → カタカナ変換 */
function toKatakana(str) {
  return str.replace(/[\u3041-\u3096]/g, c =>
    String.fromCharCode(c.charCodeAt(0) + 0x60));
}

/** カタカナ → ひらがな変換 */
function toHiragana(str) {
  return str.replace(/[\u30A1-\u30F6]/g, c =>
    String.fromCharCode(c.charCodeAt(0) - 0x60));
}

/** 答え合わせ: ひらがな・カタカナどちらでも可 */
function checkAnswer(input, q) {
  const normalized = toHiragana(input.trim());
  return normalized === q.yomi;
}

// ────────────────────────────────────────────────────────────
// 5. ヒント生成（文字数に応じて分岐、ランダム開示）
// ────────────────────────────────────────────────────────────

/**
 * 語源テキストから漢字・読みを伏せる
 * 例: "朝凪・夕凪など" → "朝●・夕●など"
 */
/** ヒント回数 × 難度倍率でポイントを計算 */
function calcPts(hintStep, level) {
  const base = POINTS_BY_HINT[Math.min(hintStep, POINTS_BY_HINT.length - 1)];
  const mult = LEVEL_MULT[level] ?? 1.0;
  return Math.round(base * mult);
}

function sanitizeOrigin(q) {
  let text = q.origin;
  // 漢字の各文字を● に置換（複数文字の熟語は1文字ずつ）
  for (const ch of q.kanji) {
    if (ch.trim()) text = text.split(ch).join("●");
  }
  // 読み（ひらがな）を伏せる
  text = text.split(q.yomi).join("●".repeat(q.yomi.length));
  // カタカナも伏せる
  text = text.split(q.katakana).join("●".repeat(q.katakana.length));
  return text;
}

/**
 * マスク文字列を作る: revealed に含まれるインデックスは kata の文字、他は ＿
 * 例: buildMask("アラレ", [0])   → "ア＿＿"
 *     buildMask("アラレ", [0,2]) → "ア＿レ"
 */
function buildMask(kata, revealed) {
  return kata.split("").map((ch, i) => revealed.includes(i) ? ch : "＿").join("");
}

function getHintText(q, step) {
  const len  = q.yomi.length;
  const kata = q.katakana;

  // ── step 0: 文字数のみ（カテゴリはカード上に表示済みなので重複しない） ─
  if (step === 0) {
    const stars = "〇".repeat(len);
    return `【文字数】${stars}　${len}文字の言葉`;
  }

  // ── step 1: 語源（答えの漢字・読みは●で伏せる） ────────
  if (step === 1) {
    return `【語源】${sanitizeOrigin(q)}`;
  }

  // ── step 5以降 → 全答え ──────────────────────────────
  if (step >= 5) return `【答え】${kata}（${q.yomi}）\n${q.origin}`;

  // ── step 2〜4: 読み仮名の段階的開示 ───────────────────
  //  1文字語 : 2→文字数のみ, 3→答えそのまま
  //  2文字語 : 2→先頭「ア＿」, 3→末尾「＿イ」(別の文字), 4→先頭＋残り1文字
  //  3文字以上: 2→先頭「ア＿＿」, 3→ランダム1文字追加, 4→最後だけ隠す

  if (len === 1) {
    if (step === 2) return `【文字数】たった1文字！`;
    return `【ほぼ答え】「${kata}」`;
  }

  if (len === 2) {
    if (step === 2) return `【読み】「${buildMask(kata, [0])}」（${len}文字）`;
    if (step === 3) return `【読み】「${buildMask(kata, [1])}」`;   // 末尾を開示（先頭と重複しない）
    if (step === 4) return `【もう少し！】「${buildMask(kata, [0])}」残り1文字`; // buildMask が ＿ を含むので追加しない
  }

  // 3文字以上
  if (step === 2) {
    return `【読み】「${buildMask(kata, [0])}」（${len}文字）`;
  }

  if (step === 3) {
    // 先頭以外のランダムな位置を1つ追加開示（毎回変わる）
    const candidates = Array.from({length: len - 2}, (_, i) => i + 1); // 1 〜 len-2
    const randIdx = candidates[Math.floor(Math.random() * candidates.length)];
    return `【読み】「${buildMask(kata, [0, randIdx])}」`;
  }

  if (step === 4) {
    // 最後の1文字だけ隠す（buildMask が ＿ を返すので手動追加しない）
    const all = Array.from({length: len - 1}, (_, i) => i);
    return `【もう少し！】「${buildMask(kata, all)}」残り1文字`;
  }

  return `【答え】${kata}（${q.yomi}）`;
}

// ────────────────────────────────────────────────────────────
// 6. Web Audio API（シンプルな効果音）
// ────────────────────────────────────────────────────────────
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

/** 正解音: 鳥の声風チャープ3連 */
function playCorrect() {
  try {
    const ctx = getAudioCtx();
    [0, 0.12, 0.24].forEach((delay, i) => {
      const osc   = ctx.createOscillator();
      const gain  = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880 + i*120, ctx.currentTime + delay);
      osc.frequency.linearRampToValueAtTime(1320 + i*80, ctx.currentTime + delay + 0.08);
      gain.gain.setValueAtTime(0.18, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.18);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime  + delay + 0.2);
    });
  } catch(e) {}
}

/** 不正解音: 低い二音 */
function playWrong() {
  try {
    const ctx  = getAudioCtx();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = "triangle";
    osc.frequency.setValueAtTime(280, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch(e) {}
}

/** ヒント音: 葉擦れ風ホワイトノイズ短音 */
function playHint() {
  try {
    const ctx    = getAudioCtx();
    const buf    = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
    const data   = buf.getChannelData(0);
    for(let i=0;i<data.length;i++) data[i] = (Math.random()*2-1) * 0.06;
    const src  = ctx.createBufferSource();
    const gain = ctx.createGain();
    src.buffer = buf;
    src.connect(gain); gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.8, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    src.start();
  } catch(e) {}
}

// ────────────────────────────────────────────────────────────
// 7. UI — 画面切替（スライドアニメーション付き）
// ────────────────────────────────────────────────────────────
const SCREEN_ORDER = ["screen-home","screen-quiz","screen-collection","screen-howto","screen-finish"];

function showScreen(id) {
  const screens = document.querySelectorAll(".screen");
  const currentEl = document.querySelector(".screen.active");
  const currentId = currentEl ? currentEl.id : null;
  const fromIdx = SCREEN_ORDER.indexOf(currentId);
  const toIdx   = SCREEN_ORDER.indexOf(id);

  // 方向判定（ホームは常に右から来る扱い）
  const dir = (toIdx >= fromIdx) ? "right" : "left";

  screens.forEach(s => {
    s.classList.remove("active","slide-in-right","slide-in-left");
  });

  const next = document.getElementById(id);
  next.classList.add("active");
  if (currentId && currentId !== id) {
    // アニメーションクラス付与
    next.classList.add(dir === "right" ? "slide-in-right" : "slide-in-left");
    setTimeout(() => next.classList.remove("slide-in-right","slide-in-left"), 350);
  }

  // ナビ更新
  document.querySelectorAll("#bnav .nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.screen === id);
  });
  // ナビ表示制御: 常時表示
  document.getElementById("bnav").style.display = "flex";

  // ホーム画面ではアンビエントエフェクト開始、他は停止
  if (id === "screen-home") {
    setTimeout(startSeasonAmbient, 300);
  } else {
    stopSeasonAmbient();
  }
}

// ────────────────────────────────────────────────────────────
// 7b. 季節エフェクト（Canvas）
// ────────────────────────────────────────────────────────────
let burstAnim   = null;
let ambientAnim = null;

/** 季節ごとのパーティクル生成 */
function spawnParticle(season, canvas, ambient) {
  const w = canvas.width, h = canvas.height;
  const base = {
    x     : Math.random() * w,
    y     : ambient ? Math.random() * h : Math.random() * -120,
    rot   : Math.random() * Math.PI * 2,
    dRot  : (Math.random() - 0.5) * 0.07,
    speed : ambient ? (0.4 + Math.random() * 0.8) : (1.2 + Math.random() * 2.2),
    drift : (Math.random() - 0.5) * 0.7,
    opacity: ambient ? (0.12 + Math.random() * 0.18) : (0.55 + Math.random() * 0.45),
  };
  if (season === 'spring') {
    return { ...base, type:'petal', r: 4 + Math.random()*5,
      color: Math.random()>0.5?"#F7C5D2":"#E8A0B0" };
  } else if (season === 'summer') {
    // 蛍: 上向き浮遊する光の点
    return { ...base, type:'firefly',
      x: Math.random()*w,
      y: ambient ? Math.random()*h : h + Math.random()*100,
      r: 2 + Math.random()*3,
      speed: -(0.5 + Math.random()*1.0),  // 上に昇る
      drift: (Math.random()-0.5)*0.5,
      glow : Math.random()*Math.PI*2,     // 発光位相
      color: Math.random()>0.4?"#B0FF80":"#E8FF60" };
  } else if (season === 'autumn') {
    // もみじ葉: 落下+強回転
    const hue = 10 + Math.random()*30;
    return { ...base, type:'leaf', r: 6 + Math.random()*7,
      dRot : (Math.random()-0.5)*0.14,
      speed: ambient ? (0.3+Math.random()*0.7) : (1.0+Math.random()*2.5),
      color: `hsl(${hue},90%,${50+Math.random()*15}%)` };
  } else {
    // 雪: 落下+ゆらゆら
    return { ...base, type:'snow', r: 2 + Math.random()*5,
      speed: ambient ? (0.3+Math.random()*0.6) : (0.8+Math.random()*1.8),
      drift: (Math.random()-0.5)*0.4,
      twinkle: Math.random()*Math.PI*2,
      color:'#DDEEFF' };
  }
}

/** パーティクル1個を描画 */
function drawParticle(ctx, p, frame) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.globalAlpha = p.opacity;

  if (p.type === 'petal') {
    ctx.beginPath();
    ctx.ellipse(0, 0, p.r, p.r*0.6, 0, 0, Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,200,210,0.35)";
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(-p.r*0.6,0); ctx.lineTo(p.r*0.6,0);
    ctx.stroke();

  } else if (p.type === 'firefly') {
    const glow = 0.4 + 0.6 * Math.sin(p.glow + frame*0.04);
    ctx.globalAlpha = p.opacity * glow;
    const grad = ctx.createRadialGradient(0,0,0, 0,0,p.r*3);
    grad.addColorStop(0, p.color);
    grad.addColorStop(0.4, p.color + "AA");
    grad.addColorStop(1, "transparent");
    ctx.beginPath(); ctx.arc(0,0,p.r*3,0,Math.PI*2);
    ctx.fillStyle = grad; ctx.fill();
    ctx.beginPath(); ctx.arc(0,0,p.r,0,Math.PI*2);
    ctx.fillStyle = "white"; ctx.fill();

  } else if (p.type === 'leaf') {
    // もみじ形（簡易5点星形 + 葉先）
    ctx.beginPath();
    for (let i=0;i<5;i++) {
      const a1 = (i/5)*Math.PI*2 - Math.PI/2;
      const a2 = a1 + Math.PI/5;
      ctx.lineTo(Math.cos(a1)*p.r, Math.sin(a1)*p.r);
      ctx.lineTo(Math.cos(a2)*p.r*0.45, Math.sin(a2)*p.r*0.45);
    }
    ctx.closePath();
    ctx.fillStyle = p.color; ctx.fill();

  } else {
    // 雪: 丸＋輝き
    const tw = 0.6 + 0.4*Math.sin(p.twinkle + frame*0.03);
    ctx.globalAlpha = p.opacity * tw;
    ctx.beginPath(); ctx.arc(0,0,p.r,0,Math.PI*2);
    ctx.fillStyle = p.color; ctx.fill();
    // 6本の輝き線
    ctx.strokeStyle = "rgba(220,240,255,0.6)";
    ctx.lineWidth = 0.6;
    for (let i=0;i<6;i++) {
      const a = (i/6)*Math.PI*2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a)*p.r, Math.sin(a)*p.r);
      ctx.lineTo(Math.cos(a)*(p.r+2.5), Math.sin(a)*(p.r+2.5));
      ctx.stroke();
    }
  }
  ctx.restore();
}

/** 正解時バーストエフェクト（季節対応） */
function startSakura() {       // 旧名維持（他から呼ばれる）
  const season = getSeason();
  const canvas = document.getElementById("sakura-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add("active");

  const N = 42;
  const particles = Array.from({length:N}, () => spawnParticle(season, canvas, false));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      if (p.type === 'firefly') {
        p.y   += p.speed;
        p.x   += p.drift + Math.sin(frame*0.03 + p.x)*0.3;
        if (p.y < -30) { p.y = canvas.height + 10; p.x = Math.random()*canvas.width; }
      } else {
        p.y   += p.speed;
        p.x   += p.drift + Math.sin(frame*0.02 + p.x)*0.4;
        p.rot += p.dRot;
        if (p.y > canvas.height+20) { p.y=-20; p.x=Math.random()*canvas.width; }
      }
      drawParticle(ctx, p, frame);
    });
    frame++;
    burstAnim = requestAnimationFrame(draw);
  }
  draw();

  setTimeout(() => {
    canvas.style.transition = "opacity 0.8s";
    canvas.style.opacity = "0";
    setTimeout(() => {
      canvas.classList.remove("active");
      canvas.style.opacity = "";
      canvas.style.transition = "";
      cancelAnimationFrame(burstAnim);
      ctx.clearRect(0,0,canvas.width,canvas.height);
    }, 850);
  }, 2500);
}

/** ホーム画面の常時アンビエントエフェクト */
function startSeasonAmbient() {
  stopSeasonAmbient();
  const season = getSeason();
  const canvas = document.getElementById("sakura-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.opacity = "1";
  canvas.classList.add("active");

  const N = season === 'summer' ? 18 : 22;
  const particles = Array.from({length:N}, () => spawnParticle(season, canvas, true));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      if (p.type === 'firefly') {
        p.y   += p.speed;
        p.x   += p.drift + Math.sin(frame*0.025 + p.x*0.01)*0.5;
        if (p.y < -20) { p.y = canvas.height + 10; p.x = Math.random()*canvas.width; }
      } else {
        p.y   += p.speed;
        p.x   += p.drift + Math.sin(frame*0.015 + p.x*0.01)*0.3;
        p.rot += p.dRot * 0.5;
        if (p.y > canvas.height+20) { p.y=-20; p.x=Math.random()*canvas.width; }
      }
      drawParticle(ctx, p, frame);
    });
    frame++;
    ambientAnim = requestAnimationFrame(draw);
  }
  draw();
}

function stopSeasonAmbient() {
  if (ambientAnim) { cancelAnimationFrame(ambientAnim); ambientAnim = null; }
  const canvas = document.getElementById("sakura-canvas");
  if (canvas && !canvas.style.transition) {
    canvas.classList.remove("active");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }
}

// ────────────────────────────────────────────────────────────
// 8. UI — ホーム画面
// ────────────────────────────────────────────────────────────
function renderHome() {
  const total   = Object.keys(state.collection).length;
  const pct     = Math.round(total / QUIZ_DATA.length * 100);
  document.getElementById("home-stat").textContent =
    `コレクション ${total}/${QUIZ_DATA.length}（${pct}%）`;
  document.getElementById("home-points").textContent =
    `${state.totalPoints.toLocaleString()} pt`;
  document.getElementById("home-best").textContent =
    state.bestScore > 0 ? `${state.bestScore.toLocaleString()} pt` : "—";
}

// ────────────────────────────────────────────────────────────
// 9. UI — クイズ画面
// ────────────────────────────────────────────────────────────
function startQuiz(level) {
  state.selectedLevel  = level;
  state.sessionQueue   = buildQueue(level);
  state.sessionIdx     = 0;
  state.sessionCorrect = 0;
  state.sessionPts     = 0;
  if (state.sessionQueue.length === 0) {
    showToast("出題できる問題がありません");
    return;
  }
  showScreen("screen-quiz");
  loadQuestion();
}

function loadQuestion() {
  if (state.sessionIdx >= state.sessionQueue.length) {
    finishSession();
    return;
  }
  state.currentQ   = state.sessionQueue[state.sessionIdx];
  state.hintStep   = 0;
  state.wrongCount = 0;

  const q = state.currentQ;
  document.getElementById("quiz-kanji").textContent = q.kanji;
  document.getElementById("quiz-level-badge").textContent =
    ["", "初", "中", "上"][q.level];
  document.getElementById("quiz-level-badge").className =
    `level-badge lv${q.level}`;
  document.getElementById("quiz-category").textContent = q.category;
  document.getElementById("quiz-answer").value = "";
  document.getElementById("quiz-hint-box").innerHTML = "";
  document.getElementById("quiz-progress").textContent =
    `${state.sessionIdx + 1} / ${state.sessionQueue.length}`;
  const isLast = state.sessionIdx === state.sessionQueue.length - 1;
  document.getElementById("btn-next").textContent =
    isLast ? "結果発表！" : "納得！　次の問題へ →";
  document.getElementById("quiz-answer").focus();
  updatePtsDisplay(false); // ポイントをリセット（アニメなし）

  // 正誤フラッシュリセット
  const card = document.getElementById("quiz-card");
  card.classList.remove("flash-correct","flash-wrong");
}

function submitAnswer() {
  const input = document.getElementById("quiz-answer").value;
  if (!input.trim()) return;
  const q = state.currentQ;

  if (checkAnswer(input, q)) {
    onCorrect(q);
  } else {
    onWrong(q, input);
  }
}

function onCorrect(q) {
  playCorrect();
  startSakura(); // 🌸 桜アニメ
  const pts = calcPts(state.hintStep, q.level);

  // セッション集計（毎回カウント）
  state.sessionCorrect++;
  state.sessionPts = (state.sessionPts || 0) + pts;

  // コレクション登録（初正解時のみ）
  if (!state.collection[q.kanji]) {
    state.collection[q.kanji] = true;
    state.scores[q.kanji]     = pts;
    state.totalPoints        += pts;
    state.todayCount++;
  }
  saveState();

  // 問題カード・入力欄・ヒントを非表示
  const card = document.getElementById("quiz-card");
  card.style.display = "none";
  document.getElementById("quiz-hint-box").style.display = "none";
  const inputRow = document.querySelector(".input-row");
  if (inputRow) inputRow.style.display = "none";

  // 正解パネル表示
  document.getElementById("result-kanji").textContent  = q.kanji;
  document.getElementById("result-yomi").textContent   = q.yomi;
  document.getElementById("result-origin").textContent = q.origin;
  document.getElementById("result-pts").textContent    = `+${pts} pt`;
  document.getElementById("result-panel").classList.add("visible");
  document.getElementById("quiz-actions").classList.add("hidden");
}

function onWrong(q, input) {
  playWrong();
  state.wrongCount++;
  const card = document.getElementById("quiz-card");
  card.classList.add("flash-wrong");
  setTimeout(() => card.classList.remove("flash-wrong"), 600);
  const answerInput = document.getElementById("quiz-answer");
  answerInput.value = "";
  answerInput.placeholder = "もう一度…";
  // シェイク後にフォーカスを戻す
  setTimeout(() => answerInput.focus(), 620);

  // 部分一致チェック→ヒント加速
  const kata = toKatakana(input.trim());
  if (kata.length > 0 && q.katakana.startsWith(kata)) {
    showToast("惜しい！ヒントを見てみて");
  }
}

function nextQuestion() {
  document.getElementById("result-panel").classList.remove("visible");
  document.getElementById("quiz-actions").classList.remove("hidden");

  // 問題カード・入力欄・ヒントを再表示
  const card = document.getElementById("quiz-card");
  card.style.display = "";
  card.classList.remove("flash-correct");
  document.getElementById("quiz-hint-box").style.display = "";
  const inputRow = document.querySelector(".input-row");
  if (inputRow) inputRow.style.display = "";

  state.sessionIdx++;
  loadQuestion();
}

function showHint() {
  playHint();
  const q    = state.currentQ;
  const text = getHintText(q, state.hintStep);
  const box  = document.getElementById("quiz-hint-box");

  const item = document.createElement("div");
  item.className = `hint-item hint-step-${state.hintStep}`;
  item.textContent = text;
  box.prepend(item);

  state.hintStep = Math.min(state.hintStep + 1, 5);
  updateHintBtn();
  updatePtsDisplay(true); // ヒント後に減少アニメ付きで更新
}

/** カード上の獲得予定ポイントを更新（難度ボーナス倍率バッジも連動） */
function updatePtsDisplay(animate) {
  const el   = document.getElementById("quiz-pts");
  const mult = document.getElementById("quiz-pts-mult");
  if (!el) return;

  const q   = state.currentQ;
  const lv  = q ? q.level : 1;
  const pts = q ? calcPts(state.hintStep, lv) : 100;

  el.textContent = pts;

  // 色クラス
  el.classList.remove("pts-low", "pts-min");
  if (pts <= 20) el.classList.add("pts-min");
  else if (pts <= 40) el.classList.add("pts-low");

  // 難度倍率バッジ
  if (mult) {
    mult.className = "quiz-pts-mult mult-lv" + lv;
    const multVal  = LEVEL_MULT[lv] ?? 1.0;
    mult.textContent = multVal === 1.0 ? "" : `×${multVal}`;
  }

  // 減少アニメ
  if (animate) {
    el.classList.remove("pts-drop");
    void el.offsetWidth;
    el.classList.add("pts-drop");
  }
}

function updateHintBtn() {
  const btn = document.getElementById("btn-hint");
  if (state.hintStep >= 5) {
    btn.textContent = "答えを見る";
    btn.classList.add("hint-final");
  } else {
    btn.textContent = `ヒント（${state.hintStep+1}）`;
    btn.classList.remove("hint-final");
  }
}

function skipQuestion() {
  document.getElementById("result-panel").classList.remove("visible");
  document.getElementById("quiz-actions").classList.remove("hidden");
  const card = document.getElementById("quiz-card");
  card.classList.remove("flash-correct","flash-wrong");

  // 現在の問題を取り出す
  const q = state.sessionQueue.splice(state.sessionIdx, 1)[0];
  const remaining = state.sessionQueue.length;

  if (remaining === 0) {
    // 1問しかないケース：仕方なく同じ問題を戻す
    state.sessionQueue.push(q);
    state.sessionIdx = 0;
  } else if (remaining === 1) {
    // 2問のケース：もう1問を先に表示してから戻す
    state.sessionQueue.push(q);
    state.sessionIdx = 0;
  } else {
    // 3問以上：現在位置から最低2つ先に差し込む（直後を避ける）
    const insertPos = Math.min(state.sessionIdx + 2, remaining);
    state.sessionQueue.splice(insertPos, 0, q);

    // 末尾だった場合（splice後のインデックスが範囲外）は先頭に戻す
    if (state.sessionIdx >= remaining) {
      state.sessionIdx = 0;
    }
    // それ以外は sessionIdx そのまま → 次の問題を自然に読む
  }

  loadQuestion();
}

function finishSession() {
  const isNewRecord = state.sessionPts > 0 && state.sessionPts > state.bestScore;
  if (isNewRecord) {
    state.bestScore = state.sessionPts;
    saveState();
  }

  document.getElementById("finish-correct").textContent  = state.sessionCorrect;
  document.getElementById("finish-total").textContent    = state.sessionQueue.length;
  document.getElementById("finish-pts").textContent      = state.sessionPts.toLocaleString();

  // 記録更新バッジの表示制御
  const badge = document.getElementById("finish-new-record");
  if (badge) badge.style.display = isNewRecord ? "inline-block" : "none";

  showScreen("screen-finish");
}

// ────────────────────────────────────────────────────────────
// 10. コレクション画面
// ────────────────────────────────────────────────────────────
let collectionFilter = "全て";

function renderCollection(filter) {
  collectionFilter = filter || collectionFilter;

  // フィルタボタン更新
  document.querySelectorAll("#collection-filters .filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === collectionFilter);
  });

  const grid  = document.getElementById("collection-grid");
  const items = QUIZ_DATA.filter(q => {
    if (collectionFilter !== "全て" && q.category !== collectionFilter) return false;
    return true;
  });

  grid.innerHTML = "";
  items.forEach(q => {
    const cell = document.createElement("div");
    const owned = state.collection[q.kanji];
    cell.className = `coll-cell lv${q.level} ${owned ? "owned" : "locked"}`;
    cell.innerHTML = owned
      ? `<span class="coll-kanji">${q.kanji}</span><span class="coll-yomi">${q.yomi}</span>`
      : `<span class="coll-kanji locked-kanji">？</span>`;
    if (owned) {
      cell.addEventListener("click", () => showCollDetail(q));
    }
    grid.appendChild(cell);
  });

  const owned = items.filter(q => state.collection[q.kanji]).length;
  document.getElementById("coll-count").textContent = `${owned}/${items.length}`;
}

function showCollDetail(q) {
  document.getElementById("detail-kanji").textContent  = q.kanji;
  document.getElementById("detail-yomi").textContent   = q.yomi;
  document.getElementById("detail-cat").textContent    = q.category;
  document.getElementById("detail-level").textContent  = ["","初級","中級","上級"][q.level];
  document.getElementById("detail-origin").textContent = q.origin;
  document.getElementById("detail-pts").textContent    = `${state.scores[q.kanji] || 0} pt`;
  document.getElementById("coll-detail-modal").classList.add("visible");
}

// ────────────────────────────────────────────────────────────
// 11. Toast通知
// ────────────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("visible"), 2400);
}

// ────────────────────────────────────────────────────────────
// 12. 初期化
// ────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadState();

  // ── ホーム画面 ─────────────────────────────────────────
  document.querySelectorAll(".level-select-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".level-select-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  document.getElementById("btn-start").addEventListener("click", () => {
    const active = document.querySelector(".level-select-btn.active");
    const level  = active ? parseInt(active.dataset.level) : 1;
    startQuiz(level);
  });

  // 季節バッジ: タップで季節を切り替え
  document.getElementById("season-badge").addEventListener("click", () => {
    const order = ['spring', 'summer', 'autumn', 'winter'];
    const current = getSeason();
    const idx = order.indexOf(current);
    state.manualSeason = order[(idx + 1) % order.length];
    applySeasonTheme();
    startSeasonAmbient(); // パーティクルを新しい季節で再起動
    // バッジにアニメーション
    const badge = document.getElementById("season-badge");
    badge.classList.remove("season-tap");
    void badge.offsetWidth;
    badge.classList.add("season-tap");
  });

  // 使い方ページはナビから data-screen で遷移するため特別処理不要

  // ── クイズ画面 ─────────────────────────────────────────
  document.getElementById("quiz-answer").addEventListener("keydown", e => {
    if (e.key === "Enter") submitAnswer();
  });

  // スマホでキーボード表示時に問題文（漢字）が隠れないようスクロール調整
  document.getElementById("quiz-answer").addEventListener("focus", () => {
    setTimeout(() => {
      const card = document.getElementById("quiz-card");
      const screen = document.querySelector(".quiz-screen");
      if (card && screen) {
        screen.scrollTo({ top: card.offsetTop, behavior: "smooth" });
      }
    }, 350);
  });
  document.getElementById("btn-submit").addEventListener("click", submitAnswer);
  document.getElementById("btn-hint").addEventListener("click", showHint);
  document.getElementById("btn-skip").addEventListener("click", skipQuestion);
  document.getElementById("btn-next").addEventListener("click", nextQuestion);

  // ── コレクション画面 ─────────────────────────────────
  document.querySelectorAll("#collection-filters .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => renderCollection(btn.dataset.cat));
  });
  document.getElementById("coll-detail-close").addEventListener("click", () => {
    document.getElementById("coll-detail-modal").classList.remove("visible");
  });
  document.getElementById("coll-detail-modal").addEventListener("click", e => {
    if (e.target === document.getElementById("coll-detail-modal"))
      document.getElementById("coll-detail-modal").classList.remove("visible");
  });

  // ── ナビ ──────────────────────────────────────────────
  document.querySelectorAll("#bnav .nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const sc = btn.dataset.screen;
      if (sc === "screen-collection") renderCollection();
      showScreen(sc);
    });
  });

  // ── 終了画面 ─────────────────────────────────────────
  document.getElementById("btn-finish-home").addEventListener("click", () => {
    renderHome();
    showScreen("screen-home");
  });
  document.getElementById("btn-finish-retry").addEventListener("click", () => {
    startQuiz(state.selectedLevel);
  });

  // 初期描画（季節テーマ適用）
  applySeasonTheme();
  renderHome();
  showScreen("screen-home");
});

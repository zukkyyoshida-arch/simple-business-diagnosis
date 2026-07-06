export const attributes = [
  {
    id: "industry",
    question: "業種",
    options: [
      "建設・工事", "製造", "卸売・小売", "飲食・宿泊", "医療・介護・福祉",
      "運輸・物流", "不動産", "IT・情報通信", "士業・専門サービス", "その他サービス", "その他"
    ]
  },
  {
    id: "employees",
    question: "従業員数",
    options: ["5〜20名", "21〜50名", "51〜100名", "その他"]
  },
  {
    id: "role",
    question: "回答者の立場",
    options: ["経営者", "役員・幹部", "管理部門の責任者", "その他"]
  }
];

export const sections = [
  {
    id: "A",
    title: "① 日々の仕事の進め方",
    description: "手順書やマニュアルがそろっている中小企業は、実はごく少数です。現状にいちばん近いものをお選びください。",
    questions: [
      {
        id: "A1",
        question: "主な業務の手順書やマニュアルはありますか？",
        options: [
          { code: "1", text: "主要業務にはあり、更新もしている", score: 3 },
          { code: "2", text: "あるが古い、または一部のみ", score: 2 },
          { code: "3", text: "文書はなく、先輩について覚える形", score: 1 },
          { code: "4", text: "手順は担当者の頭の中にしかない", score: 0, flag: "RF" },
          { code: "5", text: "分からない", score: 0, flag: "U" }
        ]
      },
      {
        id: "A2",
        question: "この1ヶ月で、同じ内容を別の場所へ入力し直す作業（転記）はどのくらいありましたか？",
        options: [
          { code: "1", text: "ほとんどなかった", score: 3 },
          { code: "2", text: "月に数回", score: 2 },
          { code: "3", text: "週に数回", score: 1 },
          { code: "4", text: "ほぼ毎日", score: 0, flag: "RF" },
          { code: "5", text: "分からない", score: 0, flag: "U" }
        ]
      },
      {
        id: "A3",
        question: "見積書・請求書などの書類はどう作っていますか？",
        options: [
          { code: "1", text: "システムから自動発行", score: 3 },
          { code: "2", text: "Excel/Wordの共通ひな形に入力", score: 2 },
          { code: "3", text: "紙・手書き・ハンコが中心", score: 1 },
          { code: "4", text: "決まった作り方がなく、人によってバラバラ", score: 0 },
          { code: "5", text: "当てはまらない（こうした書類を作らない）", score: null, flag: "N" }
        ]
      },
      {
        id: "A4",
        question: "仕事が「確認・承認待ち」で止まることはありますか？",
        options: [
          { code: "1", text: "ほぼない。即日回る", score: 3 },
          { code: "2", text: "たまにあるが1〜2日で解消", score: 2 },
          { code: "3", text: "数日止まることがよくある", score: 1 },
          { code: "4", text: "1週間以上止まる案件が常にある", score: 0, flag: "RF" },
          { code: "5", text: "分からない", score: 0, flag: "U" }
        ]
      },
      {
        id: "A5",
        question: "「昔からやっているが、何のためか分からない作業」はありますか？",
        options: [
          { code: "1", text: "定期的に見直し、廃止している", score: 3 },
          { code: "2", text: "少し心当たりがある", score: 2 },
          { code: "3", text: "いくつもあるが、やめる判断ができない", score: 1 },
          { code: "4", text: "多すぎて手がつけられない", score: 0, flag: "RF" },
          { code: "5", text: "考えたことがない", score: 0, flag: "U" }
        ]
      }
    ]
  },
  {
    id: "B",
    title: "② データと道具",
    description: "紙やFAXが現役の会社は、中小企業では多数派です。見栄を張らず、実態でお答えください。",
    questions: [
      {
        id: "B1",
        question: "顧客・売上・仕入などの業務データは、主にどこにありますか？",
        options: [
          { code: "1", text: "業務システムやクラウドで一元管理", score: 3 },
          { code: "2", text: "共有のExcel／スプレッドシート", score: 2 },
          { code: "3", text: "個人のExcelや紙の台帳に分散", score: 1 },
          { code: "4", text: "決まった置き場がなく、人それぞれ", score: 0, flag: "RF" },
          { code: "5", text: "私は把握していない", score: 0, flag: "U" }
        ]
      },
      {
        id: "B2",
        question: "導入したのに使いこなせていないシステムやソフトはありますか？",
        options: [
          { code: "1", text: "ない。導入したものは活用できている", score: 3 },
          { code: "2", text: "一部機能を持て余している", score: 2 },
          { code: "3", text: "ほぼ使っていないものが1つある", score: 1 },
          { code: "4", text: "ほぼ使っていないものが複数ある", score: 0, flag: "RF" },
          { code: "5", text: "何を契約しているか把握していない", score: 0, flag: "U" }
        ]
      },
      {
        id: "B3",
        question: "社外からの注文・依頼を、いちばん多く受けている方法はどれですか？",
        options: [
          { code: "a", text: "電話", score: 1 },
          { code: "b", text: "FAX・郵送・紙", score: 0, flag: "RF" },
          { code: "c", text: "メールやチャットの本文（社内で入力し直す）", score: 1 },
          { code: "d", text: "メール添付のデータ（そのまま使える）", score: 2 },
          { code: "e", text: "Webフォーム・受発注システム", score: 3 },
          { code: "f", text: "当てはまらない（注文を受ける業務がない）", score: null, flag: "N" }
        ]
      },
      {
        id: "B4",
        question: "「作った本人しか直せないExcel（関数・マクロ）」はありますか？",
        options: [
          { code: "1", text: "ない、または複数人で直せる", score: 3 },
          { code: "2", text: "あるが業務への影響は小さい", score: 2 },
          { code: "3", text: "重要な業務がそのExcelに依存している", score: 1 },
          { code: "4", text: "作った人が不在で、壊れたら直せない", score: 0, flag: "RF" },
          { code: "5", text: "分からない", score: 0, flag: "U" }
        ]
      },
      {
        id: "B5",
        question: "新しいITツール（AIを含む）への取り組みはどうですか？",
        options: [
          { code: "1", text: "情報収集し、小さく試す文化がある", score: 3 },
          { code: "2", text: "一部の人が個人的に試している", score: 2 },
          { code: "3", text: "興味はあるが手つかず", score: 1 },
          { code: "4", text: "新しいものを入れられる状況にない", score: 0 },
          { code: "5", text: "分からない", score: 0, flag: "U" }
        ]
      }
    ]
  },
  {
    id: "C",
    title: "③ 人と仕事の分担",
    description: "半分近くまで来ました（あと約3分）。『この人がいないと回らない仕事』は、どの会社にも必ずあります。",
    questions: [
      {
        id: "C1",
        question: "特定の人が休むと止まってしまう業務はありますか？",
        options: [
          { code: "1", text: "ない。主要業務は複数人で対応できる", score: 3 },
          { code: "2", text: "1〜2個あるが、数日ならしのげる", score: 2 },
          { code: "3", text: "いくつもあり、休暇中は業務が滞る", score: 1 },
          { code: "4", text: "その人が辞めたら回らない業務がある", score: 0, flag: "RF" },
          { code: "5", text: "分からない", score: 0, flag: "U" }
        ]
      },
      {
        id: "C2",
        question: "残業や休日出勤が続いている部署・人はいますか？",
        options: [
          { code: "1", text: "いない。繁忙期以外は定時で回る", score: 3 },
          { code: "2", text: "繁忙期だけ一部で発生", score: 2 },
          { code: "3", text: "特定の部署・人にいつも偏っている", score: 1 },
          { code: "4", text: "全社的に慢性化している", score: 0, flag: "RF" },
          { code: "5", text: "把握していない", score: 0, flag: "U" }
        ]
      },
      {
        id: "C3",
        question: "新しく入った人への仕事の教え方は？",
        options: [
          { code: "1", text: "マニュアルと計画に沿って育成", score: 3 },
          { code: "2", text: "内容は決まっているが口頭中心", score: 2 },
          { code: "3", text: "先輩の隣で見て覚える。人によって違う", score: 1 },
          { code: "4", text: "教える余裕がなく、定着しにくい", score: 0, flag: "RF" },
          { code: "5", text: "当てはまらない（近年、採用がない）", score: null, flag: "N" }
        ]
      },
      {
        id: "C4",
        question: "現場から「この作業はムダでは？」という声は出ますか？",
        options: [
          { code: "1", text: "出る。改善につながる仕組みもある", score: 3 },
          { code: "2", text: "出るが、対応はその場しのぎ", score: 2 },
          { code: "3", text: "不満はあるが、拾う場がない", score: 1 },
          { code: "4", text: "「言っても変わらない」という空気がある", score: 0, flag: "RF" },
          { code: "5", text: "分からない", score: 0, flag: "U" }
        ]
      },
      {
        id: "C5",
        question: "締め・請求・給与などの毎月の定例事務に、社内合計で何日くらいかかっていますか？",
        options: [
          { code: "1", text: "1日以内", score: 3 },
          { code: "2", text: "2〜3日", score: 2 },
          { code: "3", text: "4〜5日", score: 1 },
          { code: "4", text: "1週間以上", score: 0, flag: "RF" },
          { code: "5", text: "把握していない", score: 0, flag: "U" }
        ]
      }
    ]
  },
  {
    id: "D",
    title: "④ 情報のやりとり",
    description: "残り10問です。連絡手段が人によって違うのは、規模を問わずよくあることです。",
    questions: [
      {
        id: "D1",
        question: "社内の業務連絡でいちばんよく使うのはどれですか？",
        options: [
          { code: "a", text: "口頭・電話", score: 1 },
          { code: "b", text: "紙の回覧・ホワイトボード", score: 1 },
          { code: "c", text: "メール", score: 2 },
          { code: "d", text: "個人のLINE", score: 1 },
          { code: "e", text: "ビジネスチャット（Chatwork・Slack・Teams等）", score: 3 },
          { code: "f", text: "人によってバラバラ", score: 0, flag: "RF" }
        ]
      },
      {
        id: "D2",
        question: "この1ヶ月で、「言った・言わない」による行き違いや手戻りはありましたか？",
        options: [
          { code: "1", text: "なかった", score: 3 },
          { code: "2", text: "1〜2回あった", score: 2 },
          { code: "3", text: "週1回以上あった", score: 1 },
          { code: "4", text: "クレームや損失につながった", score: 0, flag: "RF" },
          { code: "5", text: "分からない", score: 0, flag: "U" }
        ]
      },
      {
        id: "D3",
        question: "資料や過去のやり取りを「探す」時間は、1人1日あたりどのくらいですか？（感覚で結構です）",
        options: [
          { code: "1", text: "ほぼゼロ（5分未満）", score: 3 },
          { code: "2", text: "15分くらい", score: 2 },
          { code: "3", text: "30分くらい", score: 1 },
          { code: "4", text: "1時間以上", score: 0, flag: "RF" },
          { code: "5", text: "見当がつかない", score: 0, flag: "U" }
        ]
      },
      {
        id: "D4",
        question: "部署間・担当者間の引き継ぎ（営業→現場、受注→経理など）はスムーズですか？",
        options: [
          { code: "1", text: "渡す情報と形式が決まっていて、漏れがない", score: 3 },
          { code: "2", text: "概ねスムーズ。たまに確認の往復がある", score: 2 },
          { code: "3", text: "抜け漏れが多く、問い合わせが常態化", score: 1 },
          { code: "4", text: "情報がそもそも渡らないことがある", score: 0, flag: "RF" },
          { code: "5", text: "当てはまらない（部署が分かれていない）", score: null, flag: "N" }
        ]
      },
      {
        id: "D5",
        question: "売上・利益・現金の状況は、見たいときにすぐ見られますか？",
        options: [
          { code: "1", text: "画面ですぐ見られる仕組みがある", score: 3 },
          { code: "2", text: "月次の資料で確認できる", score: 2 },
          { code: "3", text: "頼んでから数日かかる", score: 1 },
          { code: "4", text: "決算のときにしか正確には分からない", score: 0, flag: "RF" },
          { code: "5", text: "分からない", score: 0, flag: "U" }
        ]
      }
    ]
  },
  {
    id: "E",
    title: "⑤ 会社全体のこと",
    description: "最後のセクションです（あと5問）。会社全体を思い浮かべてお答えください。",
    questions: [
      {
        id: "E1",
        question: "会社全体の業務の流れを1枚で説明できる資料はありますか？",
        options: [
          { code: "1", text: "ある。更新もしている", score: 3 },
          { code: "2", text: "昔作ったが、現状と合っていない", score: 2 },
          { code: "3", text: "部分的な資料しかない", score: 1 },
          { code: "4", text: "ない", score: 0 },
          { code: "5", text: "あるかどうか分からない", score: 0, flag: "U" }
        ]
      },
      {
        id: "E2",
        question: "業務改善の取り組みはどんな状況ですか？",
        options: [
          { code: "1", text: "担当や会議があり、続いている", score: 3 },
          { code: "2", text: "過去にやったが続かなかった", score: 2 },
          { code: "3", text: "必要と思いつつ手つかず", score: 1 },
          { code: "4", text: "何から始めればいいか分からない", score: 0 },
          { code: "5", text: "考えたことがない", score: 0, flag: "U" }
        ]
      },
      {
        id: "E3",
        question: "改善やIT導入を判断するときの「材料」はありますか？",
        options: [
          { code: "1", text: "業務量やコストのデータで判断できる", score: 3 },
          { code: "2", text: "一部あるが、経験と勘が中心", score: 2 },
          { code: "3", text: "データがなく、提案の良し悪しを評価できない", score: 1 },
          { code: "4", text: "材料がなく、その場の感覚で決めている", score: 0 },
          { code: "5", text: "分からない", score: 0, flag: "U" }
        ]
      },
      {
        id: "E4",
        question: "この1年で、ベテランの退職や採用難によって業務に支障が出たことはありますか？",
        options: [
          { code: "1", text: "ない", score: 3 },
          { code: "2", text: "ヒヤリとしたことはある", score: 2 },
          { code: "3", text: "実際に支障が出たことがある", score: 1 },
          { code: "4", text: "今まさに支障が出ている", score: 0, flag: "RF" },
          { code: "5", text: "分からない", score: 0, flag: "U" }
        ]
      },
      {
        id: "E5",
        question: "いま、いちばん手間や時間を取られている仕事はどれですか？（1つ）",
        options: [
          { code: "a", text: "受注・見積・営業事務", score: null },
          { code: "b", text: "請求・支払・経理", score: null },
          { code: "c", text: "在庫・発注・生産管理", score: null },
          { code: "d", text: "シフト・勤怠・労務", score: null },
          { code: "e", text: "顧客対応・アフターサービス", score: null },
          { code: "f", text: "書類作成・社内事務全般", score: null },
          { code: "g", text: "その他（次の自由記述にご記入ください）", score: null }
        ]
      }
    ]
  }
];

export const CROSS_PATTERNS = [
  { id: "P0", condition: (answers) => answers.uFlags >= 3, title: "把握不足", description: "「『分からない』が◯項目。まず現状を数える・書き出すことが第一歩。それ自体が見える化」" },
  { id: "P1", condition: (answers) => answers.scores["A1"] <= 1 && answers.scores["C1"] <= 1, title: "属人化", description: "手順が文書になっておらず、特定の方に業務が集中。その方が1週間不在の場合に止まる業務の特定が最初の一歩" },
  { id: "P2", condition: (answers) => answers.scores["B4"] <= 1 && answers.scores["E4"] <= 1, title: "ブラックボックス継承", description: "特定の方のExcelに重要業務が依存し、退職・採用難の支障も既に発生。中身の棚卸しを先に" },
  { id: "P3", condition: (answers) => answers.scores["A2"] <= 1 && answers.scores["B3"] <= 1, title: "アナログ入口", description: "仕事の入口が紙・FAX・電話起点で、転記が下流全体に波及。入口1本の整理から" },
  { id: "P4", condition: (answers) => answers.scores["D2"] <= 1 && answers.scores["D4"] <= 1, title: "部門間断絶", description: "引き継ぎで情報が欠け、手戻りが発生。渡す情報の『定型フォーマット1枚』が最初の一歩" },
  { id: "P5", condition: (answers) => answers.scores["C5"] <= 1 && answers.scores["A2"] <= 1, title: "締め事務過重", description: "転記の多さが締めを長引かせている可能性。締め作業の工程書き出しから" },
  { id: "P6", condition: (answers) => answers.scores["D3"] <= 1 && answers.scores["B1"] <= 1, title: "探しものコスト", description: "データの置き場が分散し、探す時間が1人1日◯分。保存ルール1枚の合意から" },
  { id: "P7", condition: (answers) => answers.scores["C3"] <= 1 && answers.scores["C2"] <= 1, title: "教育・定着リスク", description: "教える余裕のなさと負荷の偏りが連動。教える内容の一覧化が採用より先" },
  { id: "P8", condition: (answers) => answers.scores["A4"] <= 1 && answers.scores["D5"] <= 1, title: "承認・数字の停滞", description: "承認と経営数字の両方が待ち時間になっている。決裁ルートの棚卸しから" },
  { id: "P9", condition: (answers) => answers.scores["B2"] <= 1 && answers.scores["E3"] <= 1, title: "ツール空回り", description: "業務の現状把握の前にツール導入が先行。次の投資判断の前に業務の見える化を" },
  { id: "P10", condition: (answers) => answers.scores["C4"] >= 2 && answers.scores["E2"] <= 1, title: "伸びしろ（好転型）", description: "現場から声が出ているのに受け皿がない。仕組みを1つ作れば動き出す状態" },
  { id: "P11", condition: (answers) => answers.scores["E1"] <= 2, title: "mini直結", description: "業務全体を1枚で見渡せる資料がない" }
];

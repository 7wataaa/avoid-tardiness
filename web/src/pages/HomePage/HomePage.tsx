import { useState } from 'react'

import dayjs from 'dayjs'

import { FieldError, Form, Label, Submit, TimeField } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

type TimeData = {
  region: string
  city: string
  timeDiffFromUTC: number
  timezone: string
}

const nearCityData = (nowDate: Date, targetDate: Date) => {
  const timeData: TimeData[] = [
    {
      region: 'イギリス',
      city: 'ロンドン',
      timeDiffFromUTC: 0,
      timezone: 'LON',
    },
    {
      region: 'スペイン',
      city: 'マドリード',
      timeDiffFromUTC: 1,
      timezone: 'MAD',
    },
    { region: 'フランス', city: 'パリ', timeDiffFromUTC: 1, timezone: 'PAR' },
    { region: 'イタリア', city: 'ローマ', timeDiffFromUTC: 1, timezone: 'ROM' },
    { region: 'ドイツ', city: 'ベルリン', timeDiffFromUTC: 1, timezone: 'BER' },
    { region: 'エジプト', city: 'カイロ', timeDiffFromUTC: 2, timezone: 'CAI' },
    { region: 'ギリシャ', city: 'アテネ', timeDiffFromUTC: 2, timezone: 'AHI' },
    {
      region: '南アフリカ共和国',
      city: 'ヨハネスブルグ',
      timeDiffFromUTC: 2,
      timezone: 'JNB',
    },
    {
      region: 'サウジアラビア',
      city: 'リヤド',
      timeDiffFromUTC: 3,
      timezone: 'RUH',
    },
    {
      region: 'イラン',
      city: 'テヘラン',
      timeDiffFromUTC: 3.5,
      timezone: 'THR',
    },
    {
      region: 'アラブ首長国連邦',
      city: 'ドバイ',
      timeDiffFromUTC: 4,
      timezone: 'DXB',
    },
    {
      region: 'アフガニスタン',
      city: 'カブール',
      timeDiffFromUTC: 4.5,
      timezone: 'KBL',
    },
    {
      region: 'パキスタン',
      city: 'カラチ',
      timeDiffFromUTC: 5,
      timezone: 'KHI',
    },
    { region: 'インド', city: 'デリー', timeDiffFromUTC: 5.5, timezone: 'DEL' },
    {
      region: 'バングラデシュ',
      city: 'ダッカ',
      timeDiffFromUTC: 6,
      timezone: 'DAC',
    },
    {
      region: 'ミャンマー',
      city: 'ヤンゴン',
      timeDiffFromUTC: 6.5,
      timezone: 'RGN',
    },
    { region: 'タイ', city: 'バンコク', timeDiffFromUTC: 7, timezone: 'BKK' },
    {
      region: 'シンガポール',
      city: 'シンガポール',
      timeDiffFromUTC: 8,
      timezone: 'SIN',
    },
    {
      region: '香港特別行政区',
      city: '香港',
      timeDiffFromUTC: 8,
      timezone: 'HKG',
    },
    {
      region: '中華人民共和国',
      city: '北京',
      timeDiffFromUTC: 8,
      timezone: 'BJS',
    },
    { region: '台湾地区', city: '台北', timeDiffFromUTC: 8, timezone: 'TPE' },
    { region: '日本', city: '東京', timeDiffFromUTC: 9, timezone: 'TYO' },
    { region: '韓国', city: 'ソウル', timeDiffFromUTC: 9, timezone: 'SEL' },
    {
      region: 'オーストラリア',
      city: 'アデレード',
      timeDiffFromUTC: 9.5,
      timezone: 'ADL',
    },
    {
      region: 'オーストラリア',
      city: 'シドニー',
      timeDiffFromUTC: 10,
      timezone: 'SYD',
    },
    {
      region: 'ニューカレドニア',
      city: 'ヌーメア',
      timeDiffFromUTC: 11,
      timezone: 'NOU',
    },
    {
      region: 'ニュージーランド',
      city: 'オークランド',
      timeDiffFromUTC: 12,
      timezone: 'AKL',
    },
    {
      region: 'フィジー諸島共和国',
      city: 'スバ',
      timeDiffFromUTC: 12,
      timezone: 'SUV',
    },
    {
      region: 'アメリカ合衆国',
      city: 'ミッドウェー諸島',
      timeDiffFromUTC: -11,
      timezone: 'MDY',
    },
    {
      region: 'アメリカ合衆国',
      city: 'ホノルル',
      timeDiffFromUTC: -10,
      timezone: 'HNL',
    },
    {
      region: 'アメリカ合衆国',
      city: 'アンカレジ',
      timeDiffFromUTC: -9,
      timezone: 'ANC',
    },
    {
      region: 'カナダ',
      city: 'バンクーバー',
      timeDiffFromUTC: -8,
      timezone: 'YVR',
    },
    {
      region: 'アメリカ合衆国',
      city: 'ロサンゼルス',
      timeDiffFromUTC: -8,
      timezone: 'LAX',
    },
    {
      region: 'アメリカ合衆国',
      city: 'デンバー',
      timeDiffFromUTC: -7,
      timezone: 'DEN',
    },
    {
      region: 'メキシコ',
      city: 'メキシコシティー',
      timeDiffFromUTC: -6,
      timezone: 'MEX',
    },
    {
      region: 'アメリカ合衆国',
      city: 'シカゴ',
      timeDiffFromUTC: -6,
      timezone: 'CHI',
    },
    {
      region: 'アメリカ合衆国',
      city: 'ニューヨーク',
      timeDiffFromUTC: -5,
      timezone: 'NYC',
    },
    {
      region: 'カナダ',
      city: 'モントリオール',
      timeDiffFromUTC: -5,
      timezone: 'YMQ',
    },
    {
      region: 'ブラジル',
      city: 'マナウス',
      timeDiffFromUTC: -4,
      timezone: 'MAO',
    },
    {
      region: 'アルゼンチン',
      city: 'ブエノスアイレス',
      timeDiffFromUTC: -3,
      timezone: 'BUE',
    },
    {
      region: 'ブラジル',
      city: 'リオデジャネイロ',
      timeDiffFromUTC: -3,
      timezone: 'RIO',
    },
    {
      region: 'ブラジル',
      city: 'フェルナンド・デ・ノローニャ諸島',
      timeDiffFromUTC: -2,
      timezone: 'FEN',
    },
    {
      region: 'ポルトガル領',
      city: 'アゾレス諸島',
      timeDiffFromUTC: -1,
      timezone: 'PDL',
    },
  ]

  return { ...timeData[17], timeDiffFromUTC: timeData[17].timeDiffFromUTC - 9 }
}

const useNow = (interval = 1000): [Date] => {
  const [time, setTime] = React.useState(new Date())
  const updateTime = (): void => setTime(new Date())

  React.useEffect(() => {
    const _timer = setInterval(updateTime, interval)
    return (): void => clearInterval(_timer)
  }, [interval])

  return [time]
}

const HomePage = () => {
  const [now] = useNow()

  const [result, setResult] = useState<TimeData | null>(null)

  const onSubmit = (data) => {
    const [h, m] = data['main'].split(':').map((s) => parseInt(s, 10))

    const _targetDate = dayjs().locale('ja').hour(h).minute(m)

    setResult(
      nearCityData(
        dayjs().toDate(),
        dayjs().locale('ja').hour(h).minute(m).toDate()
      )
    )
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div>現在時刻: {`${now.toLocaleTimeString()}`}</div>

      <Form onSubmit={onSubmit}>
        <Label
          name="目標(だった)時間: "
          className="label"
          errorClassName="label error"
        />
        <TimeField
          name="main"
          errorClassName="input error"
          validation={{ required: true }}
          defaultValue={dayjs().format('hh:00')}
        />
        <FieldError name="name" className="error-message" />

        <Submit>実行</Submit>
      </Form>

      {result && (
        <div>
          {result.region}時間なら今は
          {dayjs()
            .locale('ja')
            .add(result.timeDiffFromUTC, 'hour')
            .format('YYYY/MM/DD hh:mm')}
        </div>
      )}

      <div>
        <div>2023/01/01 00:00 10代 学生 男性</div>
        <div>待ち合わせに遅れた際に使用。これでなんとか助かりました！</div>
      </div>
    </>
  )
}

export default HomePage

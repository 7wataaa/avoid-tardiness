import { useRef, useState } from 'react'

import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { Form, Submit, TextField } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.locale(ja)

const TARGET_TIME = 'target-time'

type TimeData = {
  region: string
  city: string
  timeDiffFromUTC: number
  timezone: string
}

const nearTimeCityData = (nowDate: Date, targetDate: Date, tzOffset = 9) => {
  const timeData: TimeData[] = [
    {
      region: 'フィジー諸島共和国',
      city: 'スバ',
      timeDiffFromUTC: 12,
      timezone: 'SUV',
    },
    {
      region: 'ニュージーランド',
      city: 'オークランド',
      timeDiffFromUTC: 12,
      timezone: 'AKL',
    },
    {
      region: 'ニューカレドニア',
      city: 'ヌーメア',
      timeDiffFromUTC: 11,
      timezone: 'NOU',
    },
    {
      region: 'オーストラリア',
      city: 'シドニー',
      timeDiffFromUTC: 10,
      timezone: 'SYD',
    },
    {
      region: 'オーストラリア',
      city: 'アデレード',
      timeDiffFromUTC: 9.5,
      timezone: 'ADL',
    },
    { region: '韓国', city: 'ソウル', timeDiffFromUTC: 9, timezone: 'SEL' },
    { region: '日本', city: '東京', timeDiffFromUTC: 9, timezone: 'TYO' },
    { region: '台湾地区', city: '台北', timeDiffFromUTC: 8, timezone: 'TPE' },
    {
      region: '中華人民共和国',
      city: '北京',
      timeDiffFromUTC: 8,
      timezone: 'BJS',
    },
    {
      region: '香港特別行政区',
      city: '香港',
      timeDiffFromUTC: 8,
      timezone: 'HKG',
    },
    {
      region: 'シンガポール',
      city: 'シンガポール',
      timeDiffFromUTC: 8,
      timezone: 'SIN',
    },
    { region: 'タイ', city: 'バンコク', timeDiffFromUTC: 7, timezone: 'BKK' },
    {
      region: 'ミャンマー',
      city: 'ヤンゴン',
      timeDiffFromUTC: 6.5,
      timezone: 'RGN',
    },
    {
      region: 'バングラデシュ',
      city: 'ダッカ',
      timeDiffFromUTC: 6,
      timezone: 'DAC',
    },
    { region: 'インド', city: 'デリー', timeDiffFromUTC: 5.5, timezone: 'DEL' },
    {
      region: 'パキスタン',
      city: 'カラチ',
      timeDiffFromUTC: 5,
      timezone: 'KHI',
    },
    {
      region: 'アフガニスタン',
      city: 'カブール',
      timeDiffFromUTC: 4.5,
      timezone: 'KBL',
    },
    {
      region: 'アラブ首長国連邦',
      city: 'ドバイ',
      timeDiffFromUTC: 4,
      timezone: 'DXB',
    },
    {
      region: 'イラン',
      city: 'テヘラン',
      timeDiffFromUTC: 3.5,
      timezone: 'THR',
    },
    {
      region: 'サウジアラビア',
      city: 'リヤド',
      timeDiffFromUTC: 3,
      timezone: 'RUH',
    },
    {
      region: '南アフリカ共和国',
      city: 'ヨハネスブルグ',
      timeDiffFromUTC: 2,
      timezone: 'JNB',
    },
    { region: 'ギリシャ', city: 'アテネ', timeDiffFromUTC: 2, timezone: 'AHI' },
    { region: 'エジプト', city: 'カイロ', timeDiffFromUTC: 2, timezone: 'CAI' },
    { region: 'ドイツ', city: 'ベルリン', timeDiffFromUTC: 1, timezone: 'BER' },
    { region: 'イタリア', city: 'ローマ', timeDiffFromUTC: 1, timezone: 'ROM' },
    { region: 'フランス', city: 'パリ', timeDiffFromUTC: 1, timezone: 'PAR' },
    {
      region: 'スペイン',
      city: 'マドリード',
      timeDiffFromUTC: 1,
      timezone: 'MAD',
    },
    {
      region: 'イギリス',
      city: 'ロンドン',
      timeDiffFromUTC: 0,
      timezone: 'LON',
    },
    {
      region: 'ポルトガル領',
      city: 'アゾレス諸島',
      timeDiffFromUTC: -1,
      timezone: 'PDL',
    },
    {
      region: 'ブラジル',
      city: 'フェルナンド・デ・ノローニャ諸島',
      timeDiffFromUTC: -2,
      timezone: 'FEN',
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
      city: 'マナウス',
      timeDiffFromUTC: -4,
      timezone: 'MAO',
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
      city: 'デンバー',
      timeDiffFromUTC: -7,
      timezone: 'DEN',
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
      city: 'アンカレジ',
      timeDiffFromUTC: -9,
      timezone: 'ANC',
    },
    {
      region: 'アメリカ合衆国',
      city: 'ホノルル',
      timeDiffFromUTC: -10,
      timezone: 'HNL',
    },
    {
      region: 'アメリカ合衆国',
      city: 'ミッドウェー諸島',
      timeDiffFromUTC: -11,
      timezone: 'MDY',
    },
  ]

  console.log('now: ', dayjs(nowDate).format('YYYY/MM/DD HH:mm Z[Z]'))

  for (const e of timeData) {
    const offsettedDate = dayjs().add(e.timeDiffFromUTC - tzOffset, 'hour')
    console.log(e.timeDiffFromUTC - tzOffset)

    console.log('off: ', offsettedDate.format('YYYY/MM/DD HH:mm Z[Z]'), e.city)

    if (dayjs(offsettedDate).isSameOrBefore(targetDate)) {
      console.log('↑hit!', e)

      return { ...e, date: offsettedDate.toDate() }
    } else {
      console.log('not ', e)
    }
  }
}

const HomePage = () => {
  const [result, setResult] = useState<(TimeData & { date: Date }) | null>(null)

  const inputRef = useRef<HTMLInputElement>()

  const onSubmit = (data: { [TARGET_TIME]: `${number}:${number}` }) => {
    const [h, m] = data[TARGET_TIME].split(':').map((s) => parseInt(s, 10))

    const nowDate = dayjs().toDate()
    const targetDate = dayjs().hour(h).minute(m).toDate()

    setResult(nearTimeCityData(nowDate, targetDate))
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <Box w={'fit-content'} m="auto">
        <Form onSubmit={onSubmit}>
          <FormLabel m="0" display="block" htmlFor={TARGET_TIME}>
            <Heading as="h3" size="md" my={3} textAlign="center">
              目標時間
            </Heading>
          </FormLabel>
          <Input
            textAlign="center"
            as={TextField}
            name={TARGET_TIME}
            size="lg"
            display="inline"
            type="time"
            defaultValue={dayjs().format('HH:00')}
            step={60 * 30}
            ref={inputRef}
          />
          <Box my={2} display="flex" justifyContent="center" gap="5">
            <IconButton
              aria-label="Decrease time"
              icon={<MinusIcon />}
              size="lg"
              onClick={() => {
                inputRef.current.stepDown()
              }}
            />
            <Button as={Submit} type="submit" colorScheme="teal" size="lg">
              実行
            </Button>
            <IconButton
              aria-label="Increase time"
              icon={<AddIcon />}
              size="lg"
              onClick={() => {
                inputRef.current.stepUp()
              }}
            />
          </Box>
        </Form>
      </Box>

      {result && (
        <Box textAlign="center" width="100%">
          <Heading
            as="h2"
            size="md"
          >{`${result.region}時間 (${result.timezone})`}</Heading>
          <Text my="1rem">なら今は</Text>
          <Heading as="h2" size="md">{`${dayjs(result.date).format(
            'MM/DD HH:mm'
          )}`}</Heading>
        </Box>
      )}
    </>
  )
}

export default HomePage

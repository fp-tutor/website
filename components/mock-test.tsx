import { BaseSyntheticEvent } from 'react'
import range from '../utils/utils'
import Layout from '../components/layout'
import Head from 'next/head'

type Section = 'R' | 'W' | 'M(NC)' | 'M(CA)'

interface MultipleChoiceQuestionProps {
  section: Section
  num: number
}

interface PassageProps {
  section: 'R' | 'W'
  num: number
  first: number
  last: number
}

interface ReadingSectionProps {
  starts: number[]
}

interface MockTestProps {
  id: number
  reading: number[]
  has_writing: boolean
}

const MultipleChoiceQuestion = ({
  section,
  num,
}: MultipleChoiceQuestionProps) => {
  const keys = ['A', 'B', 'C', 'D']
  const ans_list = keys.map((k) => {
    const id = `${section}.${num}.${k}`
    return (
      <div className="flex flex-col content-center" key={`${section}.Q${k}`}>
        <label htmlFor={id} className="text-center">
          {k}
        </label>
        <input
          type="radio"
          name={`${section}.${num}`}
          value={k}
          id={id}
          className="appearance-none w-4 h-4 rounded-full border-2 border-amber-300 checked:bg-amber-300"
        />
      </div>
    )
  })
  return (
    <div className="question w-32 flex flex-row justify-around my-2">
      <div className="flex flex-col justify-center">
        <p>{num}</p>
      </div>
      {ans_list}
    </div>
  )
}

const Passage = ({ section, num, first, last }: PassageProps) => {
  const questions = range(first, last + 1, 1).map((i) => (
    <MultipleChoiceQuestion section={section} num={i} key={`${num}.${i}`} />
  ))
  return (
    <fieldset key={`${section}.Passage ${num}`} className="mx-2 border-2 px-2">
      <legend>Passage {num}</legend>
      {questions}
    </fieldset>
  )
}

const ReadingSection = ({ starts }: ReadingSectionProps) => {
  const r_starts = [...starts, 53]
  const passages = [1, 2, 3, 4, 5].map((p) => (
    <Passage
      key={`R.${p}`}
      section="R"
      num={p}
      first={r_starts[p - 1]}
      last={r_starts[p] - 1}
    />
  ))
  return (
    <div>
      <h2>Reading</h2>
      <div className="flex flex-row flex-wrap justify-around">{passages}</div>
    </div>
  )
}

const WritingSection = () => {
  const passages = [1, 2, 3, 4].map((p) => (
    <Passage
      key={`R.${p}`}
      section="R"
      num={p}
      first={p * 11 - 10}
      last={p * 11}
    />
  ))
  return (
    <div>
      <h2>Writing</h2>
      <div className="flex flex-row flex-wrap justify-around">{passages}</div>
    </div>
  )
}

export default function MockTest({ id, reading, has_writing }: MockTestProps) {
  const questions = range(1, 53, 1)
    .map((q) => `R.${q}`)
    .concat(range(1, 45, 1).map((q) => `W.${q}`))
  const submitForm = async (event: BaseSyntheticEvent) => {
    event.preventDefault()

    const answers = Object.fromEntries(
      questions
        .filter((q) => event.target[q] !== undefined)
        .map((q) => [q, event.target[q].value])
    )

    const body = {
      id: id,
      form: {
        'Họ và tên': event.target.fullname.value,
        Email: event.target.email.value,
        ...answers,
      },
    }
    console.log(body)

    const res = await fetch('/api/submit', {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const result = await res.json()
    console.log(result)
  }

  return (
    <Layout>
      <Head>
        <title>SAT Mock Test</title>
      </Head>
      <form onSubmit={submitForm}>
        <h2>Thông tin</h2>
        <div>
          <label htmlFor="fullname">Họ và tên</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            size={20}
            required
            className="border-2"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            size={20}
            className="border-2"
          />
        </div>
        {reading.length > 0 ? <ReadingSection starts={reading} /> : null}
        {has_writing ? <WritingSection /> : null}
        <button type="submit">Nộp bài</button>
      </form>
    </Layout>
  )
}

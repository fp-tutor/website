import { BaseSyntheticEvent } from 'react'
import range from '../lib/utils'
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

export interface MockTestProps {
  index: number
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
          className="appearance-none w-4 h-4 rounded-full border dark:border-zinc-500 dark:bg-zinc-700 dark:checked:border-4 dark:checked:border-amber-400"
        />
      </div>
    )
  })
  return (
    <div className="question w-32 flex flex-row justify-around my-2">
      <div className="flex flex-col justify-center w-4 text-right">
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
    <fieldset key={`${section}.Passage ${num}`} className="m-2 border-2 dark:border-zinc-500 p-2 rounded-md">
      <legend className="font-bold">Passage {num}</legend>
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
    <section>
      <h2>Reading</h2>
      <div className="flex flex-row flex-wrap justify-around">{passages}</div>
    </section>
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
    <section>
      <h2>Writing</h2>
      <div className="flex flex-row flex-wrap justify-around">{passages}</div>
    </section>
  )
}

export function MockTest({ index, reading, has_writing }: MockTestProps) {
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
      id: index,
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
    <section>
      <Head>
        <title>SAT Mock Test</title>
      </Head>
      <form onSubmit={submitForm} className="flex flex-col items-stretch">
        <section>
          <h2>Thông tin</h2>
          <div className="mb-4">
            <label htmlFor="fullname" className="block mb-2">Họ và tên</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              size={20}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:ring-amber-400 focus:border-amber-500 block w-full p-2 dark:bg-zinc-700 dark:border-zinc-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-400 dark:focus:border-amber-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              size={20}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:ring-amber-400 focus:border-amber-500 block w-full p-2 dark:bg-zinc-700 dark:border-zinc-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-400 dark:focus:border-amber-400"
            />
          </div>
        </section>
        {reading.length > 0 ? <ReadingSection starts={reading} /> : null}
        {has_writing ? <WritingSection /> : null}
        <div>
          <button type="submit" className="container my-4 bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-bold rounded px-5 py-2 text-center dark:focus:ring-amber-900">Nộp bài</button>
        </div>
      </form>
    </section>
  )
}

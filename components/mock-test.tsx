import { BaseSyntheticEvent } from 'react'
import range from '../lib/utils'
import Head from 'next/head'
import { Post } from '../lib/types/post'

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
          form="test-form"
          className="appearance-none w-4 h-4 rounded-full bg-zinc-50 border border-zinc-400 checked:bg-amber-400 checked:border-amber-400"
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
    <fieldset
      key={`${section}.Passage ${num}`}
      className="my-2 border-2 border-zinc-200 p-2 rounded-md"
    >
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
      <div className="flex flex-row flex-wrap justify-evenly">{passages}</div>
    </section>
  )
}

const WritingSection = () => {
  const passages = [1, 2, 3, 4].map((p) => (
    <Passage
      key={`W.${p}`}
      section="W"
      num={p}
      first={p * 11 - 10}
      last={p * 11}
    />
  ))
  return (
    <section className="space-y-2">
      <h2>Writing</h2>
      <div className="flex flex-row flex-wrap justify-evenly">{passages}</div>
    </section>
  )
}

export function TestPost({ title, date, data }: Post) {
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
      id: data.index,
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
    <article className="space-y-4">
      <Head>
        <title>{`${title} | Future Perfect`}</title>
      </Head>
      <h1 className="text-3xl font-bold mt-8">{title}</h1>
      <time dateTime={date}>{date}</time>
      <section className="flex flex-col items-stretch space-y-4">
        <section className="space-y-2">
          <h2>Thông tin</h2>
          <div className="space-y-1">
            <label htmlFor="fullname" className="block">
              Họ và tên
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              size={20}
              form="test-form"
              required
              className="bg-zinc-50 border border-zinc-400 rounded block w-full p-2 focus:outline-none focus:border-amber-400 focus:ring focus:ring-amber-400"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              size={20}
              form="test-form"
              className="bg-zinc-50 border border-zinc-400 rounded block w-full p-2 focus:outline-none focus:border-amber-400 focus:ring focus:ring-amber-400"
            />
          </div>
        </section>
        <section className="space-y-2">
          <h2>Đề bài</h2>
          <p>
            Link đề bài:{' '}
            <a
              href={data.source}
              target="_blank"
              className="text-sky-500 hover:underline hover:decoration-dashed hover:underline-offset-4"
            >
              {title}
            </a>
          </p>
        </section>
        {data.reading.length > 0 ? (
          <ReadingSection starts={data.reading} />
        ) : null}
        {data.has_writing ? <WritingSection /> : null}
        <div className="flex flex-row justify-center">
          <form onSubmit={submitForm} id="test-form">
            <button
              type="submit"
              className="bg-yellow-400 border-2 border-yellow-400 hover:bg-zinc-50 font-bold rounded px-4 py-2 text-center"
            >
              NỘP BÀI
            </button>
          </form>
        </div>
      </section>
    </article>
  )
}

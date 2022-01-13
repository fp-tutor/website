import { BaseSyntheticEvent } from 'react'
import range from '../lib/utils'
import Head from 'next/head'
import { Post } from '../lib/types/post'
import React from 'react'

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
          className="appearance-none w-4 h-4 rounded-full bg-zinc-50 border-2 border-zinc-300 hover:outline hover:outline-4 hover:outline-slate-200 checked:bg-amber-400 checked:border-amber-400 checked:ring-2 checked:ring-inset checked:ring-zinc-50"
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
      className="my-2 border-2 border-zinc-300 p-2 rounded-md"
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
      <div className="flex flex-row flex-wrap justify-evenly space-x-2">
        {passages}
      </div>
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

const Dialog = ({ isOpen, children }) => {
  const display = isOpen ? '' : 'hidden'
  return (
    <div
      className={`fixed ${display} inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center`}
      id="my-modal"
    >
      {children}
    </div>
  )
}

export function TestPost({ title, date, data }: Post) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const questions = range(1, 53, 1)
    .map((q) => `R.${q}`)
    .concat(range(1, 45, 1).map((q) => `W.${q}`))

  const submitForm = async (event: BaseSyntheticEvent) => {
    event.preventDefault()

    setLoading(true)

    const answers = Object.fromEntries(
      questions
        .filter((q) => event.target[q] !== undefined)
        .map((q) => [q, event.target[q].value])
    )

    const body = {
      id: data.index,
      form: {
        'Họ và tên': event.target.fullname.value,
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
    if (res.status === 200) {
      setLoading(false)
      openModal()
    }
  }

  return (
    <article>
      <Head>
        <title>{`${title} | Future Perfect`}</title>
      </Head>
      <h1 className="text-3xl font-bold mt-8">{title}</h1>
      <time dateTime={date}>{date}</time>
      <section className="flex flex-col items-stretch mt-4 space-y-4">
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
              className="bg-zinc-50 border-2 border-zinc-300 rounded-md block w-full p-2 focus:outline-none focus:border-amber-400 focus:ring focus:ring-1 focus:ring-amber-400"
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
              rel="noreferrer"
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
              className="w-32 py-2 inline-flex justify-center	items-center bg-yellow-400 rounded-md text-zinc-50 font-bold hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Xử lý...
                </>
              ) : (
                'Nộp bài'
              )}
            </button>
          </form>
        </div>
      </section>
      <Dialog isOpen={modalOpen}>
        <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center space-y-2">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-200">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Hoàn tất
            </h3>
            <p className="text-sm text-gray-500">
              Bài làm của bạn đã được ghi nhận.
            </p>
            <div className="items-center px-4 py-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Đóng cửa sổ này
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </article>
  )
}

import { BaseSyntheticEvent } from 'react'
import Head from 'next/head'
import React from 'react'

import { Post } from '../lib/types/post'
import range from '../lib/utils'

interface MultipleChoiceQuestionProps {
  section: 'R' | 'W' | 'M(NC)' | 'M(CA)'
  num: number
}

interface GridInQuestionProps {
  section: 'M(NC)' | 'M(CA)'
  num: number
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
    <div className="question h-12 w-32 flex justify-between items-center">
      <div className="w-6 text-right">
        <p>{num}</p>
      </div>
      {ans_list}
    </div>
  )
}

const GridInQuestion = ({ section, num }: GridInQuestionProps) => {
  const key = `${section}.${num}`
  return (
    <div className="question h-12 w-32 flex justify-between items-center">
      <div className="w-6 text-right">
        <label htmlFor={key}>{num}</label>
      </div>
      <input
        type="text"
        id={key}
        form="test-form"
        name={key}
        maxLength={4}
        className="w-24 h-6 bg-zinc-50 border-2 border-zinc-300 rounded-md block p-2 focus:outline-none focus:border-amber-400 focus:ring focus:ring-1 focus:ring-amber-400"
      />
    </div>
  )
}

const Fieldset = ({ legend, children }) => {
  return (
    <fieldset className="flex flex-col items-center p-2 border-2 border-zinc-300 rounded-md">
      <legend className="font-bold">{legend}</legend>
      {children}
    </fieldset>
  )
}

const SectionView = ({ name, children }) => {
  return (
    <section>
      <h2>{name}</h2>
      <div className="flex flex-wrap justify-center items-start gap-4">
        {children}
      </div>
    </section>
  )
}

const ReadingSection = ({ starts }: ReadingSectionProps) => {
  const r_starts = [...starts, 53]
  const passages = [1, 2, 3, 4, 5].map((p) => (
    <Fieldset key={`R.${p}`} legend={`Passage ${p}`}>
      {range(r_starts[p - 1], r_starts[p], 1).map((i) => (
        <MultipleChoiceQuestion section="R" num={i} key={`${p}.${i}`} />
      ))}
    </Fieldset>
  ))
  return <SectionView name="Reading">{passages}</SectionView>
}

const WritingSection = () => {
  const passages = [1, 2, 3, 4].map((p) => (
    <Fieldset key={`W.${p}`} legend={`Passage ${p}`}>
      {range(p * 11 - 10, p * 11 + 1, 1).map((i) => (
        <MultipleChoiceQuestion section="W" num={i} key={`${p}.${i}`} />
      ))}
    </Fieldset>
  ))
  return <SectionView name="Writing">{passages}</SectionView>
}

const MathSection = () => {
  const ncQuestions = range(1, 16, 1)
    .map((q) => (
      <MultipleChoiceQuestion section="M(NC)" num={q} key={`M(NC).${q}`} />
    ))
    .concat(
      range(16, 21, 1).map((q) => (
        <GridInQuestion section="M(NC)" num={q} key={`M(NC).${q}`} />
      ))
    )
  const caQuestions = range(1, 31, 1)
    .map((q) => (
      <MultipleChoiceQuestion section="M(CA)" num={q} key={`M(NC).${q}`} />
    ))
    .concat(
      range(31, 39, 1).map((q) => (
        <GridInQuestion section="M(CA)" num={q} key={`M(NC).${q}`} />
      ))
    )
  return (
    <SectionView name="Math">
      <Fieldset legend="No calculator">{ncQuestions}</Fieldset>
      <Fieldset legend="Calculator OK">{caQuestions}</Fieldset>
    </SectionView>
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

  const questions = range(1, 53, 1).map((q) => `R.${q}`)
    .concat(range(1, 45, 1).map((q) => `W.${q}`))
    .concat(range(1, 20, 1).map((q) => `M(NC).${q}`))
    .concat(range(1, 38, 1).map((q) => `M(CA).${q}`))

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
        {data.writing ? <WritingSection /> : null}
        {data.math ? <MathSection /> : null}
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

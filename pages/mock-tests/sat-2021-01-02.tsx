import { BaseSyntheticEvent } from 'react'
import range from '../../utils/utils'

interface MultipleChoiceQuestionProps {
  section: 'R' | 'W' | 'M',
  num: number
}

interface PassageProps {
  section: 'R' | 'W' | 'M',
  num: number,
  first: number,
  last: number
}

const MultipleChoiceQuestion = ({ section, num }: MultipleChoiceQuestionProps) => {
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

export default function MockTest() {
  const submitForm = async (event: BaseSyntheticEvent) => {
    event.preventDefault()

    const questions: string[] = range(1, 53, 1)
      .map((i) => `R.${i}`)
      .concat(range(1, 44, 1).map((i) => `W.${i}`))
    const answers = Object.fromEntries(
      questions.map((q) => [q, event.target[q].value])
    )
    const form = {
      'Họ và tên': event.target.fullname.value,
      Email: event.target.email.value,
      ...answers,
    }

    const body = {
      id: 1,
      form: form,
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
  const start_nums = [1, 11, 21, 32, 42]
  const starts = [...start_nums, 53]
  const r_passages = [1, 2, 3, 4, 5].map((p) => (
    <Passage
      key={`R.${p}`}
      section="R"
      num={p}
      first={starts[p - 1]}
      last={starts[p] - 1}
    />
  ))
  const w_passages = [1, 2, 3, 4].map((p) => (
    <Passage
      key={`W.${p}`}
      section="W"
      num={p}
      first={p * 11 - 10}
      last={p * 11}
    />
  ))
  return (
    <>
      <h1 className="text-3xl font-bold underline">Mock Test SAT 1</h1>
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
        <h2>Reading</h2>
        <div className="flex flex-row flex-wrap justify-around">
          {r_passages}
        </div>
        <h2>Writing</h2>
        <div className="flex flex-row flex-wrap justify-around">
          {w_passages}
        </div>
        <button type="submit">Nộp bài</button>
      </form>
    </>
  )
}

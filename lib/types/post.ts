interface TestData {
  type: 'test'
  data: {
    index: number
    source: string
    reading: number[]
    writing: boolean
    math: boolean
  }
}

interface PostCommon {
  title: string
  date: string
  data: string
}

export type Post = PostCommon & TestData

interface TestData {
  type: 'test'
  data: {
    index: number
    source: string
    reading: number[]
    has_writing: boolean
  }
}

interface PostCommon {
  title: string
  date: string
  data: string
}

export type Post = PostCommon & TestData

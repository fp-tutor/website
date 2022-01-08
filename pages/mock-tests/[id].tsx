import Head from 'next/head'
import Layout from '../../components/layout'
import { MockTest, MockTestProps } from '../../components/mock-test'
import { getAllPostIds, getPostData } from '../../lib/posts'

interface PostData {
  title: string
  date: string
  test_data: MockTestProps
}

export default function Post({ postData }: { postData: PostData }) {
  const title = postData.title
  const date = postData.date
  const test_data = postData.test_data
  return (
    <Layout>
      <Head>
        <title>{`${title} | Future Perfect`}</title>
      </Head>
      <article>
        <h1 className="text-3xl font-bold mt-8">{title}</h1>
        <time dateTime={date}>{date}</time>
        <MockTest {...test_data} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

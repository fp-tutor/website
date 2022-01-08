import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import Link from 'next/link'
import { getSortedPostsData } from '../../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

const MockTestPage: NextPage = ({ allPostsData }) => {
  return (
    <Layout>
      <Head>
        <title>Mock Tests | Future Perfect</title>
      </Head>
      <section>
        <h1 className="text-4xl font-bold pt-12 pb-4">Mock Tests</h1>
        <ul>
          {allPostsData.map(({ id, title, date }) => (
            <li key={id} className="py-4">
              <Link href={`/mock-tests/${id}`}>
                <a
                  href={`/mock-tests/${id}`}
                  className="text-xl text-sky-500 font-bold hover:underline hover:decoration-dashed hover:underline-offset-4"
                >
                  {title}
                </a>
              </Link>
              <br />
              <span>{date}</span>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default MockTestPage

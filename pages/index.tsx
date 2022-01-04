import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Future Perfect</title>
      </Head>
      <h1 className="text-6xl font-bold text-center my-auto">Future Perfect</h1>
    </Layout>
  )
}

export default Home

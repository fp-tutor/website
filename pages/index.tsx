import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Future Perfect</title>
      </Head>
      <p>Hello there</p>
    </Layout>
  )
}

export default Home

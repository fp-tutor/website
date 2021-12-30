import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export const siteTitle = 'Future Perfect Website'

export default function Layout({ children }) {
  return (
    <div className="max-w-2xl	px-2 my-4">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header>
        <Link href="/">
          <a>FUTURE PERFECT</a>
        </Link>
        <Link href="/mock-tests">
          <a>Mock Tests</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </header>
      <main>{children}</main>
      <footer>Future Perfect Tutoring</footer>
    </div>
  )
}

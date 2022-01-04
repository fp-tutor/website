import Head from 'next/head'
import Link from 'next/link'

export const siteTitle = 'Future Perfect Website'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-zinc-800 text-white">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header>
        <nav className="bg-zinc-900">
          <div className="h-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between">
            <Link href="/">
              <a href="/" className="flex">
                <span className="self-center hidden sm:block text-lg font-semibold whitespace-nowrap text-amber-300">FUTURE PERFECT</span>
                <span className="self-center sm:hidden text-lg font-semibold whitespace-nowrap text-amber-300">FP</span>
              </a>
            </Link>
            <div className="block w-auto">
              <ul className="flex flex-row space-x-8 mt-0 text-sm font-medium text-white">
                <li>
                  <Link href="/mock-tests">
                    <a href="/mock-tests" className="text-gray-400 hover:text-white">Mock Tests</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <a href="/about" className="text-gray-400 hover:text-white">About</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="grow flex flex-col items-center">
        {children}
      </main>
      <footer className="text-center p-4 whitespace-nowrap">
        <span>© Future Perfect Tutoring</span>
      </footer>
    </div>
  )
}

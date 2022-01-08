import Head from 'next/head'
import Link from 'next/link'

export const siteTitle = 'Future Perfect Website'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between items-stretch min-h-screen bg-zinc-50 text-zinc-900">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header>
        <nav className="">
          <div className="h-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between">
            <Link href="/">
              <a href="/" className="flex">
                <span className="self-center hidden sm:block text-lg font-bold whitespace-nowrap">
                  FUTURE PERFECT
                </span>
                <span className="self-center sm:hidden text-lg font-bold whitespace-nowrap">
                  FP
                </span>
              </a>
            </Link>
            <div className="block w-auto">
              <ul className="flex flex-row space-x-8 mt-0">
                <li>
                  <Link href="/mock-tests">
                    <a
                      href="/mock-tests"
                      className="text-zinc-400 hover:text-zinc-900 font-medium"
                    >
                      Mock Tests
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <a
                      href="/about"
                      className="text-zinc-400 hover:text-zinc-900 font-medium"
                    >
                      About
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="grow flex flex-col items-stretch w-3/5 m-auto">
        {children}
      </main>
      <footer className="text-center mt-8 p-4 whitespace-nowrap">
        <span>© Future Perfect Tutoring</span>
      </footer>
    </div>
  )
}

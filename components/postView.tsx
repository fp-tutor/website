import Head from 'next/head'
import { Post } from '../lib/types/post'

interface PostViewProps {
  post: Post
  children: React.ReactNode
}

export default function PostView({ post, children }: PostViewProps) {
  return (
  <article>
    <Head>
      <title>{`${post.title} | Future Perfect`}</title>
      <meta name="description" content={post.description || post.title} />
    </Head>
    <h1 className="text-3xl font-bold mt-8">{post.title}</h1>
    <time dateTime={post.date}>{post.date}</time>
    {children}
  </article>
  )
}
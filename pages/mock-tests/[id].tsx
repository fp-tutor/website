import Layout from '../../components/layout'
import { TestPost } from '../../components/mockTest'
import { Post } from '../../lib/types/post'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function PostView({ postData }: { postData: Post }) {
  return (
    <Layout>
      <TestPost {...postData} />
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

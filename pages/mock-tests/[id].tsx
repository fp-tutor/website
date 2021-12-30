import Layout from '../../components/layout'
import MockTest from '../../components/mock-test'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  return <MockTest {...postData} />
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

import { SearchParams, } from '@/lib/types'
import styles from './blog.module.css'
import PostCard from '@/components/postCard/postCard'
import { Post } from '@/lib/types'
import { getPosts } from '@/lib/data'

// FETCH DATA WITH AN APAI CALL
const getData = async () => {
  const res = await fetch('http://localhost:3000/api/blog', { next: { revalidate: 3600 } })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const BlogPage = async () => {
  // const resolvedSearchParams = await searchParams
  // console.log(resolvedSearchParams)

  // FETCH DATA WITH AN APAI CALL
  const posts = await getData()

  // FETCH DATA WITHOUT AN APAI
  // const posts = await getPosts()
  // console.log(posts)

  return (
    <div className={styles.container}>
      {posts.map((post: Post) => (
        <div className={styles.post} key={post._id}>
          <PostCard post={post} />
        </div>)
      )}
    </div>

  )
}

export default BlogPage

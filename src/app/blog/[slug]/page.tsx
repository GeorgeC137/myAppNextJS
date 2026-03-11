import { Params } from '@/lib/types'
import styles from './singlePost.module.css'
import React, { Suspense } from 'react'
import Image from 'next/image'
import PostUser from '@/components/postUser/postUser'
import { Spinner } from "flowbite-react";
import { getPost } from '@/lib/data'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'

// FETCH DATA WITH AN API CALL
const getData = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export const generateMetadata = async ({ params }: { params: Promise<Params> }) => {
  const { slug } = await params;
  const post = await getPost(String(slug))

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.desc.slice(0, 160),
  }
}

const SinglePostPage = async ({ params }: { params: Promise<Params> }) => {
  const { slug } = await params

  // FETCH DATA WITH AN API
  const post = await getData(slug);

  // FETCH DATA WITHOUT AN API
  // const post = await getPost(String(slug))

  // If post doesn't exist, show 404 page
  if (!post) {
    notFound()
  }

  // FETCH DATA WITH AN APA
  // console.log(slug)

  return (
    <div className={styles.container}>
      {post.img && <div className={styles.imgContainer}>
        <Image src={post.img} alt="" fill className={styles.img} />
      </div>}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Suspense fallback={<Spinner color="info" aria-label="Loading user..." size="md" />}>
            <PostUser userId={post.userId} />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>{post.createdAt && format(post.createdAt, 'MMM dd yyyy')}</span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  )
}

export default SinglePostPage

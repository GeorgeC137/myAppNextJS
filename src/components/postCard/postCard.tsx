import styles from './postCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/lib/types'
import { format } from 'date-fns'

const PostCard = ({ post }: { post: Post }) => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                {post.img && <div className={styles.imgContainer}>
                    <Image src={post.img} alt="" fill className={styles.img} />
                </div>}
                <span className={styles.date}>{post.createdAt && format(post.createdAt, 'MMM dd yyyy')}</span>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.desc}>{post.desc}</p>
                <Link className={styles.link} href={`/blog/${post.slug}`}>READ MORE</Link>
            </div>
        </div>
    )
}

export default PostCard

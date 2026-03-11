import React from 'react'
import styles from './postUser.module.css'
import { getUser } from '@/lib/data'
import Image from 'next/image'

// FETCH DATA WITH AN API CALL
// const getData = async (userId) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { cache: 'no-store' })

//     if (!res.ok) {
//         throw new Error('Failed to fetch data')
//     }

//     return res.json()
// }

const PostUser = async ({ userId }) => {
    // FETCH DATA WITH AN API CALL
    // const user = await getData(userId)

    // FETCH DATA WITHOUT AN API CALL
    const user = await getUser(userId)

    return (
        <div className={styles.container}>
            <Image src={user.img || '/noavatar.png'} alt="" width={40} height={40} className={styles.avatar} />
            <div className={styles.texts}>
                <span className={styles.title}>Author</span>
                <span className={styles.username}>{user.username}</span>
            </div>
        </div>
    )
}

export default PostUser

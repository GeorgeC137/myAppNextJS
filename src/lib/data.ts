import { Post, User } from "./models";
import { connectToDB } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

// TEMPORARY DATA FILE, TO BE REPLACED WITH API CALLS
// const users = [
//     { id: 1, name: 'John Doe', username: 'johndoe' },
//     { id: 2, name: 'Jane Smith', username: 'janesmith' },
//     { id: 3, name: 'Bob Johnson', username: 'bobjohnson' },
// ]


// const posts = [
//     { id: 1, title: 'First Post', body: 'This is the first post.', slug: 'first-post', userId: 1 },
//     { id: 2, title: 'Second Post', body: 'This is the second post.', slug: 'second-post', userId: 2 },
//     { id: 3, title: 'Third Post', body: 'This is the third post.', slug: 'third-post', userId: 3 },
//     { id: 4, title: 'Fourth Post', body: 'This is the fourth post.', slug: 'fourth-post', userId: 1 },
// ]


export const getPosts = async () => {
    try {
        connectToDB();
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }
}

export const getPost = async (slug: string) => {
    try {
        connectToDB();
        const post = await Post.findOne({ slug });
        return post;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }
}

export const getUser = async (userId: number) => {
    noStore();
    try {
        connectToDB();
        const user = await User.findById(String(userId));
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
    }
}

export const getUsers = async () => {
    try {
        connectToDB();
        const users = await User.find().sort({ createdAt: -1 });
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
}
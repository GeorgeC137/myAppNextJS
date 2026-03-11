import { Post } from "@/lib/models"
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        connectToDB();

        const posts = await Post.find().sort({ createdAt: -1 });
        return NextResponse.json(posts, { status: 200 })

    } catch (error) {
        console.error(error)
        return new Response('Failed to fetch posts', { status: 500 })
    }
}
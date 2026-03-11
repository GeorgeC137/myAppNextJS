import { Post } from "@/lib/models"
import { Params } from "@/lib/types";
import { connectToDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: Promise<Params> }) => {
    const { slug } = await params;

    try {
        connectToDB();

        const post = await Post.findOne({ slug });
        return NextResponse.json(post, { status: 200 })

    } catch (error) {
        console.error(error)
        return new Response('Failed to fetch post', { status: 500 })
    }
}

export const DELETE = async (request: NextRequest, { params }: { params: Promise<Params> }) => {
    const { slug } = await params;

    try {
        connectToDB();

        await Post.findOneAndDelete({ slug });
        return NextResponse.json('Post deleted successfully', { status: 200 })

    } catch (error) {
        console.error(error)
        return new Response('Failed to delete post', { status: 500 })
    }
}
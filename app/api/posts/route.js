// app/api/posts/route.js (або pages/api/posts.js у старіших версіях)
import { fetchPosts } from "@/lib/posts-loader";
import { deletePost } from "../../../lib/posts-action";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || 1;
    const perPage = searchParams.get("perPage") || 10;
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const idsArray = searchParams.get("idsArray") ? JSON.parse(searchParams.get("idsArray")) : [];

    const posts = await fetchPosts({
        page,
        perPage,
        sortOrder,
        filtersArray: null,
        idsArray
    });

    return Response.json(posts);
}

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
        return new Response(JSON.stringify({ error: 'Missing postId' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const result = await deletePost(postId);
        console.log("API DELETE POST", result);

        return new Response(JSON.stringify({ success: true }), {
            status: result.status,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('DELETE API ERROR', error);
        return new Response(JSON.stringify({ error: 'Failed to delete post' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


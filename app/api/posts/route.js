// app/api/posts/route.js (або pages/api/posts.js у старіших версіях)
import { fetchPosts } from "@/lib/posts-loader";

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
    console.log("API posts", posts)
    return Response.json(posts);
}

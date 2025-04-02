// app/api/post-image/route.js (або pages/api/posts.js у старіших версіях)
import {fetchPostImageByUrl} from "../../../lib/posts-loader";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get('imageUrl');

    const postImage = await fetchPostImageByUrl(imageUrl);
    return Response.json(postImage);
}
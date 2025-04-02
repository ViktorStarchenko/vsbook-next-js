// app/api/post-taxonomies/route.js (або pages/api/posts.js у старіших версіях)
import {fetchPostTaxonomies} from "../../../lib/posts-loader";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    const terms = JSON.parse(searchParams.get('terms'));

    const taxonomies = await fetchPostTaxonomies({postId: postId, terms});
    return Response.json(taxonomies);
}
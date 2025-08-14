import PostInfoTaxonomiesItem from "./PostInfoTaxonomiesItem";
import {fetchPostTaxonomies} from "../../lib/posts-loader";

export default async function PostInfoTaxonomies({post, wordWrap = false}) {
    // console.log("PostInfoTaxonomies post ", post)
    const terms = post._links['wp:term'];
    const taxonomies = await fetchPostTaxonomies({postId: post.id, terms});
    return (
        <ul className="info-list">
            {taxonomies && taxonomies.genre && <PostInfoTaxonomiesItem termName="Genre" term={taxonomies.genre} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.language && <PostInfoTaxonomiesItem termName="Language" term={taxonomies.language} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.wrirer && <PostInfoTaxonomiesItem termName="Writer" term={taxonomies.wrirer} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.release && <PostInfoTaxonomiesItem termName="Release" term={taxonomies.release} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.country && <PostInfoTaxonomiesItem termName="Country" term={taxonomies.country} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.reading_status && <PostInfoTaxonomiesItem termName="Reading Status" term={taxonomies.reading_status} wordWrap={wordWrap}/>}
        </ul>
    )
}
import {fetchPostTaxonomies} from "../../lib/posts-loader";
import PostInfoTaxonomies from "../PostEntryInfo/PostInfoTaxonomies";
import PostEntryActions from "../PostEntryActions/PostEntryActions";
import PostEntryTitle from "../PostEntryTitle/PostEntryTitle";
import {getExcerpt} from "../../lib/utils";
import PostEntryPoster from "../PostEntryPoster/PostEntryPoster";
import PostEntryDescription from "../PostEntryDescription/PostEntryDescription";

export default async function PostsListItem({post}) {
    const terms = post._links['wp:term'];
    const taxonomies = await fetchPostTaxonomies({postId: post.id, terms});
    const excerpt = getExcerpt(post.content.rendered, 100);

    return (
        <div className="posts-list-item col-md-6  col-sm-6 col-xs-12">
            <div className="posts-list-item-front">
                <PostEntryPoster post={post}/>
            </div>
            <div className="posts-list-item-back" id="posts-list-item-11457">
                <div className="posts-list-item-back-inner">
                    <div className="posts-list-item-content">
                        <PostEntryTitle url={`books/${post.slug}`} title={post.title.rendered}/>
                        <PostEntryDescription description={excerpt}/>
                        <PostInfoTaxonomies taxonomies={taxonomies} wordWrap={true}/>
                    </div>
                    <PostEntryActions post={post} enableGoto={true} gotoText="Go to"/>
                </div>
            </div>
        </div>
    )
}
import PostInfoTaxonomies from "../PostInfoTaxonomies/PostInfoTaxonomies";
import PostEntryActions from "../PostEntryActions/PostEntryActions";
import PostEntryTitle from "../PostEntryTitle/PostEntryTitle";
import {getExcerpt} from "../../lib/utils";
import PostEntryPoster from "../PostEntryPoster/PostEntryPoster";
import PostEntryDescription from "../PostEntryDescription/PostEntryDescription";

export default async function PostsListItem({post}) {
    const excerpt = getExcerpt(post.content.rendered, 100);

    return (
        <div className={`posts-list-item`}>
            <div className="posts-list-item-front">
                <PostEntryPoster post={post}/>
            </div>
            <div className={`posts-list-item-back posts-list-item-${post.id}`} id={`posts-list-item-${post.id}`}>
                <div className="posts-list-item-back-inner">
                    <div className="posts-list-item-content">
                        <PostEntryTitle url={`/books/${post.slug}`} title={post.title.rendered}/>
                        <PostEntryDescription description={excerpt}/>
                        <PostInfoTaxonomies post={post} wordWrap={true}/>
                    </div>
                    <PostEntryActions post={post} enableGoto={true} gotoText="Details"/>
                </div>
            </div>
        </div>
    )
}
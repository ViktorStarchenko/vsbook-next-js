import PostsGridItemImage from "./PostsGridItemImage";
import {fetchPostTaxonomies} from "../../lib/posts-loader";
import PostsGridItemLink from "./PostsGridItemLink";
import ViewsCount from "../ViewsCount/ViewsCount";
import FavoutiresButton from "../FavoutiresIcon/FavoutiresButton";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import PostLinkWrapper from "./PostLinkWrapper";

export default async function PostsGridItemFront({post}) {
    const terms = post._links['wp:term'];
    const taxonomies = await fetchPostTaxonomies({postId: post.id, terms})

    return (
        <div className="posts-grid-item--front">
            <PostLinkWrapper post={post} taxonomies={taxonomies}>
                <div className="posts-grid-item--image">
                    {/*<PostsGridItemLink post={post} taxonomies={taxonomies}/>*/}
                    <PostsGridItemImage post={post}/>
                </div>
                <div className="posts-grid-item-icons">
                    <AddToCartButton post={post}/>
                    <FavoutiresButton post={post}/>
                    <ViewsCount post={post} className="posts-grid-item-viewscount"/>
                </div>
            </PostLinkWrapper>
        </div>
    )
}
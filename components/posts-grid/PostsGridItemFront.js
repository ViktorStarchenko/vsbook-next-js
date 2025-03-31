import PostsGridItemImage from "./PostsGridItemImage";
import {fetchPostImage, fetchPostTaxonomies} from "../../lib/posts-loader";
import itemImage from "../../public/1700488940348.jpg";
import PostsGridItemLink from "./PostsGridItemLink";
import ViewsCount from "../ViewsCount/ViewsCount";
import FavoutiresButton from "../FavoutiresIcon/FavoutiresButton";
import CartIcon from "../CartIcon/CartIcon";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

export default async function PostsGridItemFront({post}) {
    const imageSrc = await fetchPostImage({post});
    const renderedSrc = imageSrc || itemImage;

    const terms = post._links['wp:term'];

    const taxonomies = await fetchPostTaxonomies({postId: post.id, terms})

    return (
        <div className="posts-grid-item--front">
            <div className="posts-grid-item--image">
                <PostsGridItemLink post={post} taxonomies={taxonomies}/>
                <PostsGridItemImage renderedSrc={renderedSrc} title={post.title.rendered}/>
            </div>
            <div className="posts-grid-item-icons">
                <AddToCartButton post={post}/>
                <FavoutiresButton post={post}/>
                <ViewsCount post={post} className="posts-grid-item-viewscount"/>
            </div>
        </div>
    )
}
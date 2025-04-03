'use client'

import ViewsCount from "../ViewsCount/ViewsCount";
import FavoutiresButton from "../FavoutiresIcon/FavoutiresButton";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import {usePostTaxonomies} from "../../hooks/usePostTaxonomies";
import PostsGridItemImageClient from "./PostsGridItemImageClient";
import PostsGridItemLinkClient from "./PostsGridItemLinkClient";

export default function PostsGridItemFrontClient({post}) {

    const {data: taxonomies, isLoading, isError, error} = usePostTaxonomies(post);

    return (
        <div className="posts-grid-item--front">
            <div className="posts-grid-item--image">
                <PostsGridItemLinkClient post={post} taxonomies={taxonomies}/>
                <PostsGridItemImageClient post={post}/>
            </div>
            <div className="posts-grid-item-icons">
                <AddToCartButton post={post}/>
                <FavoutiresButton post={post}/>
                <ViewsCount post={post} className="posts-grid-item-viewscount"/>
            </div>
        </div>
    )
}
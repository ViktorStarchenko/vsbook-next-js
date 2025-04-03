// import PostsGridItem from "./PostsGridItem";
import PostsGridItemClient from "./PostsGridItemClient";

export default function PostsGridClient({posts}) {

    return (
        <div className="posts-grid">
            {posts && posts.map((item, index) => (
                <PostsGridItemClient key={item.id} post={item} itemPosition={index}/>
            ))}
        </div>
    )
}
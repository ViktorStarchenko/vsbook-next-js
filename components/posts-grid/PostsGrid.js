import PostsGridItem from "./PostsGridItem";

export default function PostsGrid({posts}) {

    return (
        <div className="posts-grid">
            {posts && posts.map((item, index) => (
                <PostsGridItem key={item.id} post={item} itemPosition={index}/>
            ))}
        </div>
    )
}
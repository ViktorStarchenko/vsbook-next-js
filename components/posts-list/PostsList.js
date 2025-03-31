import PostsListItem from "./PostsListitem";

export default function PostsList({posts}) {

    return (
        <div className="posts-list">
            {posts && posts.map((item, index) => (
                <PostsListItem key={item.id} post={item}/>
            ))}
        </div>
    )
}
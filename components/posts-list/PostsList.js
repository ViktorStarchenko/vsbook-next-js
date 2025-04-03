import PostsListItem from "./PostsListItem";

export default function PostsList({posts, layout = 'col-1'}) {

    return (
        <div className={`posts-list ${layout}`}>
            {posts && posts.map((item, index) => (
                <PostsListItem key={item.id} post={item}/>
            ))}
        </div>
    )
}
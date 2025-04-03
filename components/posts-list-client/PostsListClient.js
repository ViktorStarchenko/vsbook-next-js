import PostsListItemClient from "./PostsListItemClient";

export default function PostsListClient({posts, layout = 'col-1'}) {

    return (
        <div className={`posts-list ${layout}`}>
            {posts && posts.map((item, index) => (
                <PostsListItemClient key={item.id} post={item}/>
            ))}
        </div>
    )
}
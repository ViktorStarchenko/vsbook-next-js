import Link from "next/link";

export default function CreatePostSuccess({post}) {

    return (
        <div className="create-post-success">
            <h3 className="h1 create-post-title">New post {post.title.rendered} was successfully created</h3>
            <div className="create-post-content">
                <div className="create-post-buttons">
                    {post.slug && (
                        <Link className="btn" href={`/books/${post.slug}`}>Go to new book</Link>
                    )}
                    <Link className="btn" href={`/books/`}>Go to all books</Link>
                </div>
            </div>
        </div>
    )
}
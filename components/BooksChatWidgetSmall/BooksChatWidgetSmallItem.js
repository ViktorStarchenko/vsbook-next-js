import Link from "next/link";

export default function BooksChatWidgetSmallItem({item, post, assistantResponse}) {


    return (
        <div className="helper-chat-result--item">
            <Link className="helper-chat-result--item-title h4" href={`/books/${post.slug}`}>
                {post.title.rendered}
            </Link>
            <div>
                <p>{assistantResponse.reason}</p>
            </div>
        </div>
    )
    // return (
    //     <div className="helper-chat-result--item">
    //         {(() => {
    //             const matchedPost = posts.find(post => post.id == assistantResponse.id);
    //             if (matchedPost) {
    //                 return (
    //                     <Link className="helper-chat-result--item-title h4" href={`/books/${matchedPost.slug}`}>
    //                         {matchedPost.title.rendered}
    //                     </Link>
    //                 );
    //             }
    //             return 'nope';
    //         })()}
    //         <div>
    //             <p>{assistantResponse.reason}</p>
    //         </div>
    //     </div>
    // )
}
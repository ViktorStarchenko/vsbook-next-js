import FavoutiresButton from "../FavoutiresIcon/FavoutiresButton";
import PostSingleViews from "../post-single/PostSingleViews";
import Link from "next/link";

export default function PostEntryActions({post, enableGoto = false, gotoText = 'Detail'}) {

    return (
        <div className="entry-action">
            <div className="entry-share">
                <ul className="social-links clearfix">
                    <li>
                        <FavoutiresButton post={post}/>
                    </li>
                    <li>
                        <PostSingleViews post={post}/>
                    </li>
                    <li>
                        <a href="http://pinterest.com/pin/create/button/?url=http://demo.amytheme.com/movie/demo/elementor-movie-news/amy_movie/kubo-and-the-two-strings/"
                           className="fab fa-pinterest" target="_blank"></a>
                    </li>
                </ul>
            </div>
            {enableGoto && (
                <div className="entry-goto">
                    <Link className="post-link" href={`/books/${post.slug}`}>
                        <span>ℹ</span>
                        {gotoText}
                    </Link>
                </div>
            )}
        </div>
    )
}
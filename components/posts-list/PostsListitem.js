'use client'

// import {fetchPostTaxonomies} from "../../lib/posts-loader";
import PostInfoTaxonomies from "../PostEntryInfo/PostInfoTaxonomies";
import PostEntryActions from "../PostEntryActions/PostEntryActions";
import PostEntryTitle from "../PostEntryTitle/PostEntryTitle";
import {getExcerpt} from "../../lib/utils";
import PostEntryPoster from "../PostEntryPoster/PostEntryPoster";
import PostEntryDescription from "../PostEntryDescription/PostEntryDescription";
import {useEffect, useState} from "react";

export default function PostsListItem({post}) {
    const [taxonomies, setTaxonomies] = useState([]);
    const terms = post._links['wp:term'];
    // const taxonomies = await fetchPostTaxonomies({postId: post.id, terms});
    const excerpt = getExcerpt(post.content.rendered, 100);

    useEffect(() => {
        async function loadTaxonomies() {
            try {
                const response = await fetch(`/api/post-taxonomies?postId=${post.id}&terms=${JSON.stringify(terms)}`);
                const data = await response.json();
                setTaxonomies(data);
            } catch (error) {
                console.error("Failed to fetch taxonomies:", error);
            }
        }

        if (terms.length > 0) {
            loadTaxonomies();
        }
    }, [terms, post]);

    return (
        <div className={`posts-list-item`}>
            <div className="posts-list-item-front">
                <PostEntryPoster post={post}/>
            </div>
            <div className={`posts-list-item-back posts-list-item-${post.id}`} id={`posts-list-item-${post.id}`}>
                <div className="posts-list-item-back-inner">
                    <div className="posts-list-item-content">
                        <PostEntryTitle url={`/books/${post.slug}`} title={post.title.rendered}/>
                        <PostEntryDescription description={excerpt}/>
                        <PostInfoTaxonomies taxonomies={taxonomies} wordWrap={true}/>
                    </div>
                    <PostEntryActions post={post} enableGoto={true} gotoText="Details"/>
                </div>
            </div>
        </div>
    )
}
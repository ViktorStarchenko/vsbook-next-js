import PostInfoTaxonomiesItem from "./PostInfoTaxonomiesItem";
import {fetchPostTaxonomies} from "../../lib/posts-loader";

export default async function PostInfoTaxonomies({post, showTerms = {
    'Genre': 'genre',
    'Language': 'language',
    'Writer': 'wrirer',
    'Release': 'release',
    'Country': 'country',
    'Reading Status': 'reading_status'
}, wordWrap = false}) {
    console.log("PostInfoTaxonomies post ", post)
    const terms = post._links['wp:term'];
    const taxonomies = await fetchPostTaxonomies({postId: post.id, terms});
    return (
        <ul className="info-list">
            {taxonomies &&
            Object.entries(showTerms).map(([label, slug]) => {
                const termData = taxonomies[slug];
                if (!termData) return null;

                return (
                    <PostInfoTaxonomiesItem
                        key={slug}
                        termName={label}
                        term={termData}
                        wordWrap={wordWrap}
                    />
                );
            })}
        </ul>
    )
}
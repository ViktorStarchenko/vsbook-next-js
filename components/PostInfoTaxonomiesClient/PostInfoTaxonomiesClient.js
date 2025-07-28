'use client';

import PostInfoTaxonomiesItemClient from "./PostInfoTaxonomiesItemClient";
import {usePostTaxonomies} from "../../hooks/usePostTaxonomies";

export default function PostInfoTaxonomiesClient({post, showTerms = {
    'Genre': 'genre',
    'Language': 'language',
    'Writer': 'wrirer',
    'Release': 'release',
    'Country': 'country',
    'Reading Status': 'reading_status'
}, wordWrap = false}) {
    const {data: taxonomies, isLoading, isError, error} = usePostTaxonomies(post);

    return (
        <ul className="info-list">
            {taxonomies &&
            Object.entries(showTerms).map(([label, slug]) => {
                const termData = taxonomies[slug];
                if (!termData) return null;

                return (
                    <PostInfoTaxonomiesItemClient
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
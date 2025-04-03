'use client';

import PostInfoTaxonomiesItemClient from "./PostInfoTaxonomiesItemClient";
import {usePostTaxonomies} from "../../hooks/usePostTaxonomies";

export default function PostInfoTaxonomiesClient({post, wordWrap = false}) {
    const {data: taxonomies, isLoading, isError, error} = usePostTaxonomies(post);

    return (
        <ul className="info-list">
            {taxonomies && taxonomies.genre && <PostInfoTaxonomiesItemClient termName="Genre" term={taxonomies.genre} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.language && <PostInfoTaxonomiesItemClient termName="Language" term={taxonomies.language} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.wrirer && <PostInfoTaxonomiesItemClient termName="Writer" term={taxonomies.wrirer} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.release && <PostInfoTaxonomiesItemClient termName="Release" term={taxonomies.release} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.country && <PostInfoTaxonomiesItemClient termName="Country" term={taxonomies.country} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.reading_status && <PostInfoTaxonomiesItemClient termName="Reading Status" term={taxonomies.reading_status} wordWrap={wordWrap}/>}
        </ul>
    )
}
import PostSingleTaxonomy from "./PostSingleTaxonomy";

export default function PostSingleTaxonomies({taxonomies}) {

    return (
        <ul className="info-list">
            {taxonomies && taxonomies.genre && <PostSingleTaxonomy termName="Genre" term={taxonomies.genre} />}
            {taxonomies && taxonomies.language && <PostSingleTaxonomy termName="Language" term={taxonomies.language} />}
            {taxonomies && taxonomies.wrirer && <PostSingleTaxonomy termName="Writer" term={taxonomies.wrirer} />}
            {taxonomies && taxonomies.release && <PostSingleTaxonomy termName="Release" term={taxonomies.release} />}
            {taxonomies && taxonomies.country && <PostSingleTaxonomy termName="Country" term={taxonomies.country} />}
            {taxonomies && taxonomies.reading_status && <PostSingleTaxonomy termName="Reading Status" term={taxonomies.reading_status} />}
        </ul>
    )
}
import Section from "../../../components/section/Section";
import CreatePostForm from "../../../components/CreatePostForm/CreatePostForm";
import {fetchTaxonomy} from "../../../lib/posts-loader";

export default async function CreatePost() {
    const genre = await fetchTaxonomy({taxonomyName: 'genre'});
    const language = await fetchTaxonomy({taxonomyName: 'language'});
    const country = await fetchTaxonomy({taxonomyName: 'country'});
    const release = await fetchTaxonomy({taxonomyName: 'release'});
    const wrirer = await fetchTaxonomy({taxonomyName: 'wrirer'});
    const reading_status = await fetchTaxonomy({taxonomyName: 'reading_status'});
    return (
        <Section contentWrapper="wrapper-890">
            <h1 className="h1 color-accent">Create Post</h1>
            <CreatePostForm genre={genre} language={language} country={country} release={release} wrirer={wrirer} reading_status={reading_status}/>
        </Section>
    )
}
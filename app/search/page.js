import Section from "../../components/section/Section";
import SearchResult from "../../components/SearchResult/SearchResult";

export default async function SearchPage({searchParams}) {
    const {search_bar} = await searchParams || null;

    console.log("searchBar", search_bar)

    return (
        <Section>
            <h1>Search Page</h1>
            <p>Your search params is <strong>{search_bar}</strong></p>
            {search_bar && <SearchResult searchBar={search_bar}/>}
        </Section>
    )
}
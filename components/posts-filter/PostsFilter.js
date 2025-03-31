import {fetchTaxonomy} from "../../lib/posts-loader";
import PostsFilterItems from "./PostsFilterItems";
import ResetFiltersButton from "./ResetFiltersButton";
import Accordion from "../accordion/Accordion";
import AccordionItem from "../accordion/AccordionItem";
import AccordionTitle from "../accordion/AccordionTitle";
import AccordionContent from "../accordion/AccordionContent";


export default async function PostsFilter() {
    const genre = await fetchTaxonomy({taxonomyName: 'genre'});
    const language = await fetchTaxonomy({taxonomyName: 'language'});
    const country = await fetchTaxonomy({taxonomyName: 'country'});
    const release = await fetchTaxonomy({taxonomyName: 'release'});
    const wrirer = await fetchTaxonomy({taxonomyName: 'wrirer'});
    return (
        <div className="filters">
            <Accordion>
                <AccordionItem id="genre">
                    <AccordionTitle className="title btn">Genre</AccordionTitle>
                    <AccordionContent contentAbsolute={true}>
                        <PostsFilterItems taxonomyName="genre" taxonomy={genre}/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion>
                <AccordionItem id="language">
                    <AccordionTitle className="title btn">language</AccordionTitle>
                    <AccordionContent contentAbsolute={true}>
                        <PostsFilterItems taxonomyName="language" taxonomy={language}/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion>
                <AccordionItem id="country">
                    <AccordionTitle className="title btn">country</AccordionTitle>
                    <AccordionContent contentAbsolute={true}>
                        <PostsFilterItems taxonomyName="country" taxonomy={country}/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion>
                <AccordionItem id="release">
                    <AccordionTitle className="title btn">release</AccordionTitle>
                    <AccordionContent contentAbsolute={true}>
                        <PostsFilterItems taxonomyName="release" taxonomy={release}/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion>
                <AccordionItem id="wrirer">
                    <AccordionTitle className="title btn">wrirer</AccordionTitle>
                    <AccordionContent contentAbsolute={true}>
                        <PostsFilterItems taxonomyName="wrirer" taxonomy={wrirer}/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <ResetFiltersButton />
        </div>
    )
}
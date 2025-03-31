import Section from "../../components/section/Section";
import PostsGrid from "../../components/posts-grid/PostsGrid";
import {fetchPosts} from "../../lib/posts-loader";
import Pagination from "../../components/pagination/Pagination";
import LoadingIndicator from "../../components/loadingIndicator/LoadingIndicator";
import Test from "../../components/Test";
import PostsFilter from "../../components/posts-filter/PostsFilter";
import PostsSorting from "../../components/posts-sorting/PostsSorting";

export default async function Books({searchParams}) {
    const page = Number(searchParams?.page ?? "1");
    const filtersArray = Array.from(await searchParams).toString();
    const params = new URLSearchParams(searchParams.toString())
    const filters = await searchParams


    const posts = await fetchPosts({
        page: page,
        perPage: 10,
        sortOrder: "desc",
        filtersArray: filters,
        idsArray: null
    });

    return (
        <>
            <Test filtersArray={filters}/>
            <Section paddingTopDesktop="0" paddingBottomDesktop="0">
                <PostsFilter />
            </Section>
            <Section paddingTopDesktop="0" paddingBottomDesktop="0">
                <PostsSorting />
            </Section>
            <Section>
                <h1>Books</h1>
                {posts.posts.length === 0 ? <h1>No posts found</h1> : <PostsGrid posts={posts.posts} />}
            </Section>
            <Section>
                {posts.posts.length === 0 ? <h1>No posts found</h1> : <Pagination currentPage={page} posts={posts}/>}
            </Section>
        </>
    );
}

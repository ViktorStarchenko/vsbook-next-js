import Section from "../components/section/Section";

import PostsGrid from "../components/posts-grid/PostsGrid";
import {fetchPosts} from "../lib/posts-loader";
import PostsList from "../components/posts-list/PostsList";

// export async function Posts() {
//     const posts = await fetchPosts({page: 1, perPage: 4, sortOrder: "desc", filtersArray: null, idsArray: null});
//
//     return <PostsGrid posts={posts.posts}/>;
// }

export default async function Home({searchParams}) {

    const page = Number(searchParams?.page ?? "1");
    const filtersArray = Array.from(await searchParams).toString();
    const params = new URLSearchParams(searchParams.toString())
    const filters = await searchParams


    const posts = await fetchPosts({
        page: page,
        perPage: 4,
        sortOrder: "desc",
        filtersArray: filters,
        idsArray: null
    });

  return (
      <>
        <Section>
          <h1>Home Page</h1>
            {/*<PostsGrid posts={posts.posts}/>*/}
            <PostsList posts={posts.posts} layout="col-2"/>
        </Section>
      </>
  );
}

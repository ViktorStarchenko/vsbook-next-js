import Section from "../components/section/Section";

import PostsGrid from "../components/posts-grid/PostsGrid";
import {fetchPosts} from "../lib/posts-loader";

export async function Posts() {
    const posts = await fetchPosts({page: 1, perPage: 4, sortOrder: "desc", filtersArray: null, idsArray: null});

    return <PostsGrid posts={posts.posts}/>;
}

export default function Home() {
  return (
      <>
        <Section>
          <h1>Section 1</h1>
            <Posts/>
        </Section>
      </>
  );
}

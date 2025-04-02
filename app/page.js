import Section from "../components/section/Section";

import PostsGrid from "../components/posts-grid/PostsGrid";
import {fetchPosts} from "../lib/posts-loader";
import PostsList from "../components/posts-list/PostsList";
import SearchComponent from "../components/SearchComponent";
import KeenSlider from "../components/KeenSlider/KeenSlider";
import KeenSliderSlide from "../components/KeenSlider/KeenSliderSlide";
import PostsListItem from "../components/posts-list/PostsListitem";
import PostsGridItem from "../components/posts-grid/PostsGridItem";

// export async function Posts() {
//     const posts = await fetchPosts({page: 1, perPage: 4, sortOrder: "desc", filtersArray: null, idsArray: null});
//
//     return <PostsGrid posts={posts.posts}/>;
// }

export default async function Home({searchParams}) {

    const page = Number(await searchParams?.page ?? "1");
    const filtersArray = Array.from(await searchParams).toString();
    const params = new URLSearchParams(await searchParams.toString())
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
        </Section>
          <Section>
              <SearchComponent />
          </Section>
          <Section>
              <PostsList posts={posts.posts} layout="col-2"/>
          </Section>
          <Section>

              <KeenSlider layout="grid">
                  {posts.posts.map(item => (
                    <KeenSliderSlide key={`slide-${item.id}`}>
                        <PostsGridItem post={item}/>
                    </KeenSliderSlide>
                  ))}
              </KeenSlider>
          </Section>
      </>
  );
}

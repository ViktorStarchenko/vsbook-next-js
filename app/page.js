import Section from "../components/section/Section";

import {fetchPosts} from "../lib/posts-loader";
import PostsList from "../components/posts-list/PostsList";
import SearchBar from "../components/SearchBar/SearchBar";
import KeenSlider from "../components/KeenSlider/KeenSlider";
import KeenSliderSlide from "../components/KeenSlider/KeenSliderSlide";
import PostsGridItem from "../components/posts-grid/PostsGridItem";

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
          {/*<Section>*/}
          {/*    <SearchBar />*/}
          {/*</Section>*/}
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

import {fetchPost} from "../../../lib/posts-loader";
import Section from "../../../components/section/Section";
import PostSingle from "../../../components/post-single/PostSingle";

export default async function BookDetail({params}) {
    const postSlug = params?.slug ?? null;
    const post = await fetchPost(postSlug);
    return (
        <>
            <Section>
                <PostSingle post={post}/>
            </Section>
        </>
    );
}
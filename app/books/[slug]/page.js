import {fetchPost, fetchPostTaxonomies} from "../../../lib/posts";
import Section from "../../../components/section/Section";
import Image from "next/image";
import PostSingleTaxonomies from "../../../components/post-single/PostSingleTaxonomies";
import PostSingleImage from "../../../components/post-single/PostSingleImage";
import LinkPreviousPage from "../../../components/LinkPreviousPage";
import Link from "next/link";

export default async function BookDetail({params}) {
    const postSlug = params?.slug ?? null;
    const post = await fetchPost(postSlug);

    const terms = post._links['wp:term'];
    const taxonomies = await fetchPostTaxonomies({postId: post.id, terms});
    return (
        <>
            <Section>
                <div className="post-container sidebar-enabled sidebar-right">
                    <div className="post-single">
                        <div>
                            <LinkPreviousPage>
                                <div className="btn">Back to Books</div>
                            </LinkPreviousPage>
                        </div>
                        <article id={`post-${post.id}`}
                                 className={`post-${post.id} categories`}>
                            <div className="entry-top">
                                <PostSingleImage post={post}/>
                                <div className="entry-info">
                                    <h1 className="entry-title p-name" itemProp="name headline" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
                                    <div className="entry-pg">
                                        <span className="pg">G</span>

                                        <span className="duration">
			<i className="fa fa-clock-o"></i>
			02 hours 00 minutes		</span>
                                    </div>

                                    <PostSingleTaxonomies taxonomies={taxonomies}/>

                                    <div className="entry-action">
                                        <div className="mrate  no-rate">
                                        </div>
                                        <div className="entry-share">
                                            <label>Actions:</label>
                                            <ul className="amy-social-links clearfix">
                                                <li>
                                                    <a href="https://www.facebook.com/sharer.php?u=http://demo.amytheme.com/movie/demo/elementor-movie-news/amy_movie/kubo-and-the-two-strings/"
                                                       className="fab fa-facebook" target="_blank"></a>
                                                </li>
                                                <li>
                                                    <a href="http://www.twitter.com/share?url=http://demo.amytheme.com/movie/demo/elementor-movie-news/amy_movie/kubo-and-the-two-strings/"
                                                       className="fab fa-twitter" target="_blank"></a>
                                                </li>
                                                <li>
                                                    <a href="http://pinterest.com/pin/create/button/?url=http://demo.amytheme.com/movie/demo/elementor-movie-news/amy_movie/kubo-and-the-two-strings/"
                                                       className="fab fa-pinterest" target="_blank"></a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <div className="entry-content e-content" itemProp="description articleBody">
                                <h3 className="info-name amy-title">Synopsis</h3>
                                <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
                            </div>

                            <div className="entry-media">
                                <h3 className="info-name amy-title">Video &amp; Photo</h3>
                                <div className="number-media">
                                    <span className="gallery"><i></i>7 photos</span>
                                </div>
                                {/*<div className="media-carousel">*/}
                                {/*    <div className="amy-slick slick-initialized slick-slider"*/}
                                {/*         data-slick="{&quot;slidesToShow&quot;:4,&quot;slidesToScroll&quot;:4,&quot;autoplay&quot;:true,&quot;autoplaySpeed&quot;:3000,&quot;arrows&quot;:true,&quot;infinite&quot;:true,&quot;responsive&quot;: [{&quot;breakpoint&quot;: 480,&quot;settings&quot;: {&quot;slidesToShow&quot;: 1,&quot;slidesToScroll&quot;: 1}},{&quot;breakpoint&quot;: 979,&quot;settings&quot;: {&quot;slidesToShow&quot;: 3,&quot;slidesToScroll&quot;: 3}}],&quot;dots&quot;:false}">*/}
                                {/*        <button className="slick-prev slick-arrow" aria-label="Previous" type="button"*/}
                                {/*                >Previous*/}
                                {/*        </button>*/}


                                {/*        <div className="slick-list draggable">*/}
                                {/*            <div className="slick-track">*/}
                                {/*                <div className="media-item slick-slide slick-cloned" tabIndex="-1" data-slick-index="-4" id="" aria-hidden="true">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_33.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="-1">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-cloned"*/}
                                {/*                     tabIndex="-1" data-slick-index="-3" id="" aria-hidden="true">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_31.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="-1">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-cloned"*/}
                                {/*                     tabIndex="-1" data-slick-index="-2" id="" aria-hidden="true">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_32.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="-1">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-cloned"*/}
                                {/*                     tabIndex="-1" data-slick-index="-1" id="" aria-hidden="true">*/}
                                {/*                    <a href="https://player.vimeo.com/video/51834631"*/}
                                {/*                       className="fancybox.iframe amy-fancybox" tabIndex="-1"><Image*/}
                                {/*                        src={ImagePlaceholder} alt="alt" fill/><i*/}
                                {/*                        className="fa fa-play"></i></a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-current slick-active"*/}
                                {/*                      tabIndex="0" data-slick-index="0"*/}
                                {/*                     aria-hidden="false">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_37.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="0">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-active"*/}
                                {/*                     tabIndex="0" data-slick-index="1" aria-hidden="false">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_36.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="0">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-active"*/}
                                {/*                     tabIndex="0" data-slick-index="2" aria-hidden="false">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_35.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="0">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-active"*/}
                                {/*                     tabIndex="0" data-slick-index="3" aria-hidden="false">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_34.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="0">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide"  tabIndex="-1"*/}
                                {/*                     data-slick-index="4" aria-hidden="true">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_33.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="-1">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide"  tabIndex="-1"*/}
                                {/*                     data-slick-index="5" aria-hidden="true">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_31.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="-1">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide"  tabIndex="-1"*/}
                                {/*                     data-slick-index="6" aria-hidden="true">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_32.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="-1">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide"  tabIndex="-1"*/}
                                {/*                     data-slick-index="7" aria-hidden="true">*/}
                                {/*                    <a href="https://player.vimeo.com/video/51834631"*/}
                                {/*                       className="fancybox.iframe amy-fancybox" tabIndex="-1"><Image*/}
                                {/*                        src={ImagePlaceholder} alt="alt" fill/><i*/}
                                {/*                        className="fa fa-play"></i></a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-cloned"*/}
                                {/*                     tabIndex="-1" data-slick-index="8" id="" aria-hidden="true">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_37.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="-1">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-cloned"*/}
                                {/*                     tabIndex="-1" data-slick-index="9" id="" aria-hidden="true">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_36.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="-1">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-cloned"*/}
                                {/*                     tabIndex="-1" data-slick-index="10" id="" aria-hidden="true">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_35.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="-1">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-cloned"*/}
                                {/*                     tabIndex="-1" data-slick-index="11" id="" aria-hidden="true">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_34.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="-1">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-cloned"*/}
                                {/*                     tabIndex="-1" data-slick-index="12" id="" aria-hidden="true">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_33.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="-1">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-cloned"*/}
                                {/*                     tabIndex="-1" data-slick-index="13" id="" aria-hidden="true">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_31.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="-1">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-cloned"*/}
                                {/*                     tabIndex="-1" data-slick-index="14" id="" aria-hidden="true">*/}
                                {/*                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/wp-content/uploads/sites/8/2022/05/img_32.jpg"*/}
                                {/*                       className="amy-fancybox" rel="movie-gallery" tabIndex="-1">*/}
                                {/*                        <Image*/}
                                {/*                            src={ImagePlaceholder} alt="alt" fill/>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="media-item slick-slide slick-cloned"*/}
                                {/*                     tabIndex="-1" data-slick-index="15" id="" aria-hidden="true">*/}
                                {/*                    <a href="https://player.vimeo.com/video/51834631"*/}
                                {/*                       className="fancybox.iframe amy-fancybox" tabIndex="-1"><Image*/}
                                {/*                        src={ImagePlaceholder} alt="alt" fill/><i*/}
                                {/*                        className="fa fa-play"></i></a>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*        <button className="slick-next slick-arrow" aria-label="Next" type="button">Next*/}
                                {/*        </button>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>

                            <div className="entry-comment">

                                <div className="amy-comment-form">
                                    <div id="respond" className="comment-respond">
                                        <h3 id="reply-title" className="comment-reply-title amy-title">

                                        </h3>
                                    </div>
                                </div>

                            </div>

                        </article>
                    </div>
                    <div className="sidebar sidebar-left">
                        <h2>Sidebar</h2>
                    </div>
                </div>
            </Section>
        </>
    );
}
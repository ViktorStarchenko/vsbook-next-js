import axios from "axios";
import {console} from "next/dist/compiled/@edge-runtime/primitives";
// import {getAuthToken} from "./auth";


//*******************************************
// Fetch Posts
//*******************************************
export async function fetchPosts({ page = 1, perPage = 10, sortOrder = "desc", filtersArray = null, idsArray = null }) {
    // let url = `https://a.vsbookcollection.space/wp-json/wp/v2/book?page=${page}&order=${sortOrder}&per_page=${perPage}`;
    let url = `https://a.vsbookcollection.space/wp-json/wp/v2/book?`;
    if (filtersArray) {
        console.log("filtersArray", filtersArray)
        const queryString = new URLSearchParams(filtersArray).toString();

        // url += filtersArray.reduce((acc, [key, value]) => (key && value ? `${acc}&${key}=${value}` : acc), "");
        url += `${queryString}`;
    }
    if (perPage) {
        url += `&per_page=${perPage}`;
    }
    if (idsArray && idsArray.length > 0) {
        url += `&include=${idsArray.join(",")}`;
    }

    console.log(`Fetching Posts: ${url}`);

    try {
        const res = await fetch(url, {
            cache: 'force-cache',
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch posts: ${res.statusText}`);
        }

        const posts = await res.json();
        return {
            success: true,
            posts,
            totalPosts: res.headers.get("x-wp-total"),
            totalPages: res.headers.get("x-wp-totalpages")
        };
    } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to fetch books");
    }
}

//*******************************************
// Fetch Single Post
//*******************************************
export async function fetchPost(slugOrId) {
    let url = 'https://a.vsbookcollection.space/wp-json/wp/v2/book';
    if(!slugOrId) {
        throw new Error("Invalid argument provided");
    }
    let isId = !isNaN(slugOrId) ;

    url = isId ? `${url}/${slugOrId}` : `${url}?slug=${slugOrId}`

    console.log(`Fetching: ${url}`);

    try {
        const res = await fetch(url, {
            next: { revalidate: 60 }
        })

        if (!res.ok) {
            throw new Error("Failed to fetch Single post");
        }

        const post = await res.json()
        return Array.isArray(post) ? post[0] : post;
    } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to fetch post");
    }
}

//*******************************************
// Fetch Post Image
//*******************************************
const imageCache = new Map();
export async function fetchPostImage({ post }) {
    if (!post) {
        throw new Error("Invalid post data is missing");
    }

    const imageUrl = post?._links?.['wp:featuredmedia']?.[0]?.href;
    if (!imageUrl) return null;

    if (imageCache.has(imageUrl)) {
        return imageCache.get(imageUrl);
    }

    console.log(`Fetching Post Image: ${imageUrl}`);

    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const data = await response.json();
        if (data?.source_url) {
            imageCache.set(imageUrl, data.source_url); // Кэшируем результат
            return data.source_url;
        }
    } catch (error) {
        console.error("Error fetching image:", error);
        return null;
    }
}


//*******************************************
// Fetch Taxonomy By Name
//*******************************************
const taxonomyCache = new Map();
export async function fetchTaxonomy({taxonomyName}) {
    if (!taxonomyName) {
        throw new Error("Invalid taxonomyName data");
    }

    let url = `https://a.vsbookcollection.space/wp-json/wp/v2/${taxonomyName}?per_page=100`;

    // if (taxonomyCache.has(url)) {
    //     return taxonomyCache.get(url);
    // }

    console.log(`Fetching Taxonomy: ${url}`);

    try {
        const res = await fetch(url, {
            next: {
                revalidate: 60,
                tags: ['taxonomies']
            }
        })

        if (!res.ok) {
            throw new Error("Failed to fetch taxonomy");
        }

        const data = await res.json()
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.message || "Failed to fetch taxonomy");
    }
}


//*******************************************
// Fetch All Post Taxonomies
//*******************************************
const taxonomiesCache = new Map();
export async function fetchPostTaxonomies({ postId, terms }) {
    if (!terms || terms.length === 0) return {};

    const results = await Promise.all(
        terms.map(async (item) => {
            const cacheKey = `${postId}-${item.taxonomy}`;

            // Проверяем кэш
            if (taxonomiesCache.has(cacheKey)) {
                return { taxonomy: item.taxonomy, data: taxonomiesCache.get(cacheKey) };
            }

            try {
                const response = await fetch(item.href);
                if (!response.ok) {
                    throw new Error(`Failed to fetch taxonomy: ${response.statusText}`);
                }

                const data = await response.json();
                taxonomiesCache.set(cacheKey, data); // Кэшируем результат
                return { taxonomy: item.taxonomy, data };
            } catch (error) {
                console.error(`Error fetching taxonomy (${item.taxonomy}):`, error);
                return { taxonomy: item.taxonomy, data: null };
            }
        })
    );

    return results.reduce((acc, curr) => {
        if (curr.data) {
            acc[curr.taxonomy] = curr.data;
        }
        return acc;
    }, {});
}

//*******************************************
// Fetch Post Taxonomy
//*******************************************
const postTaxonomyCache = new Map();
export async function fetchPostTaxonomy({taxonomyName, postId}) {
    if (!taxonomyName || !postId) {
        throw new Error("Invalid taxonomyName or postId data");
    }
    // "https://a.vsbookcollection.space/wp-json/wp/v2/genre?post=3109"
    const urlParams = `${taxonomyName}?post=${postId}`;

    let url = `https://a.vsbookcollection.space/wp-json/wp/v2/${urlParams}`

    if (postTaxonomyCache.has(url)) {
        return postTaxonomyCache.get(url)
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        postTaxonomyCache.set(url, data);
        return data;
    } catch (error) {
        console.error("Error fetching taxonomy:", error);
        return null;
    }
}

import axios from "axios";
// import {getAuthToken} from "./auth";

export async function fetchPosts({ page = 1, perPage = 10, sortOrder = "desc", filtersArray = null, idsArray = null }) {
    let url = `https://a.vsbookcollection.space/wp-json/wp/v2/book?page=${page}&order=${sortOrder}&per_page=${perPage}`;

    if (filtersArray) {
        url += filtersArray.reduce((acc, [key, value]) => (key && value ? `${acc}&${key}=${value}` : acc), "");
    }

    if (idsArray && idsArray.length > 0) {
        url += `&include=${idsArray.join(",")}`;
    }

    console.log(`Fetching: ${url}`);

    try {
        const res = await fetch(url, {
            cache: 'force-cache',
            next: { revalidate: 60 },
            // Кешируем запрос на 60 секунд
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


// export async function fetchPosts({page = 1, perPage = 10, sortOrder = "desc", filtersArray = null, idsArray = null}) {
//     // console.log(page)
//     // console.log(sortOrder)
//     // console.log(filtersArray)
//
//     let paramPage = page || 1;
//     const sort = sortOrder || "desc";
//     const paramPerPage = perPage || 10
//
//     let url = `https://a.vsbookcollection.space/wp-json/wp/v2/book?page=${paramPage}&order=${sort}&per_page=${paramPerPage}`;
//
//     if (filtersArray) {
//         url += filtersArray.reduce((acc, [key, value]) => {
//             if (key && value) {
//                 return `${acc}&${key}=${value}`;
//             }
//             return acc;
//         }, "");
//     }
//
//     if (idsArray && idsArray.length > 0) {
//         const idsString = idsArray.join(',');
//         url += `&include=${idsString}`
//     }
//
//     console.log(url)
//     let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: url
//     };
//
//     try {
//         const response = await axios.request(config);
//         console.log(response)
//         if (response.status != 200) {
//             throw new Error(`Failed to fetch posts: ${response.statusText}`);
//         }
//
//         return {
//             success: true,
//             posts: response.data,
//             totalPosts: response.headers['x-wp-total'],
//             totalPages: response.headers['x-wp-totalpages']
//         }; // Returning success data
//     } catch (error) {
//         // If the error came from axios
//         console.log(error)
//         if (error.response) {
//             const status = error.response.status;
//             const errorMessage = error.response.data?.message || error.response.statusText;
//
//             // We bring the error to the line with a detailed description
//             throw new Error(
//                 `Error ${status}: ${errorMessage || "Something went wrong while fetching posts"}`
//             );
//         }
//
//         // If it is another error (for example, with the network)
//         throw new Error(error.message || "Failed to fetch books");
//     }
// }

export async function fetchRelativePosts({signal, filtersArray, perPage}) {
    // console.log(page)
    // console.log(sortOrder)
    console.log(filtersArray)

    let url = `https://a.vsbookcollection.space/wp-json/wp/v2/book?order=desc`;

    if (perPage) {
        url += `&per_page=${perPage}`;
    }

    if (filtersArray) {
        url += filtersArray.reduce((acc, [key, value]) => {
            if (key && value) {
                return `${acc}&${key}=${value}`;
            }
            return acc;
        }, "");
    }

    console.log(url)
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        signal: signal
    };

    try {
        const response = await axios.request(config);

        if (response.status != 200) {
            throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        // console.log(response)
        return response.data; // Returning success data
    } catch (error) {
        throw new Error(error.message || "Failed to fetch books");
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        return null;
    }
}

export async function fetchPost({siganl, slugOrId}) {
    // if (!params.bookId) {
    //     throw new Error("Invalid argument provided");
    // }
    if(!slugOrId) {
        throw new Error("Invalid argument provided");
    }
    let isId = !isNaN(slugOrId) ;
    let url = 'https://a.vsbookcollection.space/wp-json/wp/v2/book';
    url = isId ? `${url}/${slugOrId}` : `${url}?slug=${slugOrId}`


    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        siganl: siganl
    }

    try {
        const response = await axios.request(config);

        if (response.status != 200) {
            throw new Error("Failed to fetch book with id " + id);
        }

        return Array.isArray(response.data) ? response.data[0] : response.data;
    } catch (error) {
        throw new Error("Failed to fetch book with id " + id);
        if (error.response && error.response.status === 404) {
            throw new Error("I can't find a post with this ID " + id);
        }
        return null;
    }
}

export async function fetchPage({signal, slugOrId}) {
    console.log(slugOrId)
    let errors = {};
    if (!slugOrId) {
        errors.fetchPage = "Invalid argument provided"
        throw new Error("Invalid argument provided");
    }

    const isId = !isNaN(slugOrId);

    let url = 'https://a.vsbookcollection.space/wp-json/wp/v2/pages';
    url = isId ? `${url}/${slugOrId}` : `${url}?slug=${slugOrId}`;

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        signal: signal
    }

    try {
        const response = await axios.request(config);

        if (response.status != 200 && response.status != 201) {
            throw new Error("Failed to fetch page with id " + id);
        }

        return Array.isArray(response.data) ? response.data[0] : response.data

    } catch (error) {
        throw new Error("Failed to fetch page with id " + id);
        // if (error.response && error.response.status === 404) {
        //     throw new Error("I can't find a page with this ID " + id);
        // }
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }

        return null;
    }
}

export async function fetchPostImage({post}) {
    if (!post) {
        throw new Error("Invalid post data is missing");
    }

    try {
        const response = await axios.get(post?._links['wp:featuredmedia'][0]?.href);

        if (response.status != 200) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        if (response.data && response.data.source_url) {
            return response.data.source_url;
        }
    } catch(error) {
        if (error.response && error.response.status === 404) {
            // If the image is missing, return null
            return null;
        }
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        return null;
    }
}


export async function fetchTaxonomy({taxonomyName}) {
    if (!taxonomyName) {
        throw new Error("Invalid taxonomyName data");
    }

    try {
        const response = await axios.get(`https://a.vsbookcollection.space/wp-json/wp/v2/${taxonomyName}?per_page=100`);
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch image");
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        return null
    }
}

export async function fetchPostTaxonomy({signal, taxonomyName, postId}) {
    if (!taxonomyName || !postId) {
        throw new Error("Invalid taxonomyName or postId data");
    }
    // "https://a.vsbookcollection.space/wp-json/wp/v2/genre?post=3109"
    let url = `https://a.vsbookcollection.space/wp-json/wp/v2/${taxonomyName}?post=${postId}`

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url
    }

    try {
        const response = await axios.request(config);

        if (response.status != 200) {
            throw new Error(`Failed to fetch taxonomy: ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch post taxonomy " + taxonomyName);
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        return null;
    }
}

export async function fetchPostTaxonomies({postId, terms}) {
    if (!terms || terms.length === 0) return {};

    try {
        const results = await Promise.all(
            terms.map(async (item) => {
                try {
                    const config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: item.href
                    };
                    const response = await axios.request(config);
                    return { taxonomy: item.taxonomy, data: response.data };
                } catch (error) {
                    return { taxonomy: item.taxonomy, data: null };
                }
            })
        );

        // Collect data into an object
        const data = results.reduce((acc, curr) => {
            if (curr.data) {
                acc[curr.taxonomy] = curr.data;
            }
            return acc;
        }, {});

        return data;
    } catch (error) {
        console.error("Error fetching taxonomies:", error);
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        return null;
    }
}

export async function fetchHeaderSettings() {
    const config = {
        method: 'get',
        url: 'https://a.vsbookcollection.space/wp-json/canopy/v2/header-settings-acf',
        maxBodyLength: Infinity,
    }

    try {
        const response = await axios.request(config);
        if (response.status != 200 && response.status != 201) {
            throw new Error(response.data.message || `Failed to create term ${name}`);
        }
        return response.data
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }

        return null;
    }

}


export async function createTaxonomyTerm({taxonomy, name}) {
    if (!name || !taxonomy) {
        throw new Error("Wrong or empty term name");
    }

    const token = getAuthToken();

    if (!token) {
        throw new Error("Wrong Auth token");
    }

    const slug = createSlug(name);
    const encodedText = encodeURIComponent(name);

    let url = `https://a.vsbookcollection.space/wp-json/wp/v2/${taxonomy}?slug=${slug}&name=${encodedText}`;

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await axios.request(config);
        if (response.status != 200 && response.status != 201) {
            throw new Error(response.data.message || `Failed to create term ${name}`);
        }
        return response.data
    } catch (error) {

        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Catch error: Failed to create term " + name);

        return null;
    }
}

export async function uploadMedia(file) {

    let token = getAuthToken();
    if (!token || !file) {
        return null;
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://a.vsbookcollection.space/wp-json/wp/v2/media',
        headers: {
            'Content-Type': 'image/png',
            'Authorization': `Bearer ${token}`,
            'Content-Disposition': `attachment; filename="${file.name}"`,
        },
        data: file
    };

    try {
        const response = await axios.request(config);
        return response.data; // Returning success data
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Catch error: upload image error");
        return null; // In case of error we return null
    }
}

export async function postBook(formData) {
    let data = {};
    let errors = {};
    if (!formData) {
        errors.empty = "The Content must not be empty"
        throw {errors}
    }

    // Create an object and manually collect `genre` as an array
    formData.forEach((value, key) => {
        // If the key already exists (e.g. `genre`), add it to the array
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value); // Append to existing array
            } else {
                data[key] = [data[key], value]; // Convert to array
            }
        } else {
            data[key] = value; // Add the first value
        }
    });

    let file = formData.get("featured_image");
    let featuredMedia = undefined;
    if (file.size > 0) {
        featuredMedia = await uploadMedia(file);
    }

    // Managing errors
    if (!data['title']) {
        errors.title = "The Title must not be empty"
    }
    if (!data['content']) {
        errors.content = "The Content must not be empty"
    }
    if (!featuredMedia || !featuredMedia.id) {
        errors.featured_media = "Failed to upload featured media.";
    } else {
        data.featured_media = featuredMedia.id;
    }

    // Convert `data` to a URL parameter string
    let urlParams = new URLSearchParams();

    // Adding data to `URLSearchParams`, correctly handling arrays
    for (const key in data) {
        if (Array.isArray(data[key])) {
            // For arrays (e.g. `genre`), concatenate values ​​separated by spaces
            urlParams.append(key, data[key].join(" "));
        } else {
            // For the remaining parameters, add one value
            urlParams.append(key, data[key]);
        }
    }

    console.log(data); // Now `genre` will be an array of all selected values
    console.log(urlParams); // Now `genre` will be an array of all selected values

    // let token = await getBearerToken();
    let token = getAuthToken();
    console.log(token)

    if (!token) {
        errors.token = "Token not available.";
    }

    // If there are errors, we return them
    if (Object.keys(errors).length > 0) {
        throw { errors }
    }

    let url = 'https://a.vsbookcollection.space/wp-json/wp/v2/book?'
    url += urlParams;

    console.log(url)

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://a.vsbookcollection.space/wp-json/wp/v2/book?' + urlParams,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await axios.request(config);
        // return response.data; // Returning response date
        return { success: true, post: response.data }; // Returning success data
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        console.error("Error posting book:", error);
        return null; // In case of error we return null
    }

}

export function createSlug(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export function truncateContentByWords(content, maxLength) {
    if (content.length <= maxLength) {
        return content;
    }
    const truncated = content.slice(0, maxLength).split(' ');
    truncated.pop(); // Удаляем незавершённое слово
    return truncated.join(' ') + '...';
}

export function cleanAndTruncate(content, maxLength) {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    const text = doc.body.textContent || '';
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
}

export function fetchBooks({ signal, page, sortOrder, filtersArray }) {
    return fetchPosts({ signal, page, sortOrder, filtersArray });
}
// export async function booksLoader({params, request}) {
//     // const response = await fetch('https://a.vsbookcollection.space/wp-json/wp/v2/book');
//     const url = new URL(request.url);
//     let page = params.page || 1; // Get the page number from the parameters or use 1 by default
//     const sort = url.searchParams.get("sort") || "desc";
//
//     const genre = url.searchParams.get("genre");
//     const country = url.searchParams.get("country");
//     const language = url.searchParams.get("language");
//     const release = url.searchParams.get("release");
//     const wrirer = url.searchParams.get("wrirer");
//     const readingStatus = url.searchParams.get("reading_status");
//
//     const genreParam = genre ? `&genre=${genre}` : '';
//     const countryParam = country ? `&country=${country}` : '';
//     const languageParam = language ? `&language=${language}` : '';
//     const releaseParam = release ? `&release=${release}` : '';
//     const wrirerParam = wrirer ? `&wrirer=${wrirer}` : '';
//     const readingStatusParam = readingStatus ? `&reading_status=${readingStatus}` : '';
//
//
//     const response = await fetch(`https://a.vsbookcollection.space/wp-json/wp/v2/book?page=${page}&order=${sort}${genreParam}${countryParam}${languageParam}${releaseParam}${wrirerParam}${readingStatusParam}`);
//
//
//     if (!response.ok) {
//         throw new Response(
//             "could not fetch books",
//             {status: 500}
//         )
//     } else {
//         const resData = await response.json();
//         return resData;
//     }
// }
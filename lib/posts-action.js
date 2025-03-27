'use server'

import { getAuthToken } from "./auth";
import { createSlug } from "./utils";
import {revalidatePath} from "next/cache";
import { revalidateTag } from 'next/cache'

/****************************************
Create Taxonomy
*****************************************/
const taxonomyCache = new Map();
export async function createTaxonomyTerm({ taxonomy, name }) {
    if (!name || !taxonomy) {
        throw new Error("Wrong or empty term name");
    }

    const token = await getAuthToken();
    if (!token) {
        throw new Error("Wrong Auth token");
    }

    const slug = createSlug(name);
    const encodedText = encodeURIComponent(name);
    const url = `https://a.vsbookcollection.space/wp-json/wp/v2/${taxonomy}?slug=${slug}&name=${encodedText}`;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to create term ${name}`);
        }
        revalidateTag('taxonomies')
        return await response.json();
    } catch (error) {
        throw new Error(error.message || `Catch error: Failed to create term ${name}`);
    }
}

/*******************************************
Upload Image
********************************************/
export async function uploadMedia(file) {
    const token = await getAuthToken();
    if (!token || !file) {
        return null;
    }

    const url = 'https://a.vsbookcollection.space/wp-json/wp/v2/media';
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Disposition': `attachment; filename="${file.name}"`,
    };

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Upload image error");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || "Catch error: upload image error");
    }
}

/***********************************************
Create post Post Bool
************************************************/
export async function postBook(prevState, formData) {
    let data = {};
    let errors = {};

    const token = await getAuthToken();
    if (!token) {
        errors.token = "Token not available.";
    }

    console.log("POST BOOK FORM DATA", formData)
    if (!formData) {
        errors.empty = "The Content must not be empty";
        throw { errors };
    }
    if (!(formData instanceof FormData)) {
        formData = new FormData(Object.entries(formData));
    }

    // Перетворюємо FormData у об'єкт та обробляємо масиви значень
    formData.forEach((value, key) => {
        if (data[key]) {
            data[key] = Array.isArray(data[key]) ? [...data[key], value] : [data[key], value];
        } else {
            data[key] = value;
        }
    });

    // Завантаження зображення
    let file = formData.get("featured_image");
    let featuredMedia;
    if (file.size > 0) {
        featuredMedia = await uploadMedia(file);
    }

    // Перевірка на помилки
    if (!data['title']) errors.title = "The Title must not be empty";
    if (!data['content']) errors.content = "The Content must not be empty";
    if (!featuredMedia || !featuredMedia.id) {
        errors.featured_media = "Failed to upload featured media.";
    } else {
        data.featured_media = featuredMedia.id;
    }

    const urlParams = new URLSearchParams();
    for (const key in data) {
        if (Array.isArray(data[key])) {
            urlParams.append(key, data[key].join(" "));
        } else {
            urlParams.append(key, data[key]);
        }
    }

    if (Object.keys(errors).length > 0) {
        return {success: false, errors: errors}
        // throw { errors };
    }

    const url = `https://a.vsbookcollection.space/wp-json/wp/v2/book?${urlParams}`;
    console.log("data" , data);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {success: false, errors: errorData.message}
            // throw new Error(errorData.message || "Error posting book");
        }
        revalidatePath('/books')
        return { success: true, post: await response.json() };
    } catch (error) {
        return {success: false, errors: error}

        // throw new Error(error.message || "Catch error: posting book error");
    }
}


// import {getAuthToken} from "./auth";
// import {createSlug} from "./utils";
//
// export async function createTaxonomyTerm({ taxonomy, name }) {
//     if (!name || !taxonomy) {
//         throw new Error("Wrong or empty term name");
//     }
//
//     const token = getAuthToken();
//     if (!token) {
//         throw new Error("Wrong Auth token");
//     }
//
//     const slug = createSlug(name);
//     const encodedText = encodeURIComponent(name);
//     const url = `https://a.vsbookcollection.space/wp-json/wp/v2/${taxonomy}?slug=${slug}&name=${encodedText}`;
//
//     const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//     };
//
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers,
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || `Failed to create term ${name}`);
//         }
//
//         return await response.json();
//     } catch (error) {
//         if (error.message) {
//             throw error;
//         }
//         throw new Error("Catch error: Failed to create term " + name);
//     }
// }
//
//
// export async function uploadMedia(file) {
//
//     let token = getAuthToken();
//     if (!token || !file) {
//         return null;
//     }
//
//     let config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'https://a.vsbookcollection.space/wp-json/wp/v2/media',
//         headers: {
//             'Content-Type': 'image/png',
//             'Authorization': `Bearer ${token}`,
//             'Content-Disposition': `attachment; filename="${file.name}"`,
//         },
//         data: file
//     };
//
//     try {
//         const response = await axios.request(config);
//         return response.data; // Returning success data
//     } catch (error) {
//         if (error.response && error.response.data && error.response.data.message) {
//             throw new Error(error.response.data.message);
//         }
//         throw new Error("Catch error: upload image error");
//         return null; // In case of error we return null
//     }
// }
//
// export async function postBook(formData) {
//     let data = {};
//     let errors = {};
//     if (!formData) {
//         errors.empty = "The Content must not be empty"
//         throw {errors}
//     }
//
//     // Create an object and manually collect `genre` as an array
//     formData.forEach((value, key) => {
//         // If the key already exists (e.g. `genre`), add it to the array
//         if (data[key]) {
//             if (Array.isArray(data[key])) {
//                 data[key].push(value); // Append to existing array
//             } else {
//                 data[key] = [data[key], value]; // Convert to array
//             }
//         } else {
//             data[key] = value; // Add the first value
//         }
//     });
//
//     let file = formData.get("featured_image");
//     let featuredMedia = undefined;
//     if (file.size > 0) {
//         featuredMedia = await uploadMedia(file);
//     }
//
//     // Managing errors
//     if (!data['title']) {
//         errors.title = "The Title must not be empty"
//     }
//     if (!data['content']) {
//         errors.content = "The Content must not be empty"
//     }
//     if (!featuredMedia || !featuredMedia.id) {
//         errors.featured_media = "Failed to upload featured media.";
//     } else {
//         data.featured_media = featuredMedia.id;
//     }
//
//     // Convert `data` to a URL parameter string
//     let urlParams = new URLSearchParams();
//
//     // Adding data to `URLSearchParams`, correctly handling arrays
//     for (const key in data) {
//         if (Array.isArray(data[key])) {
//             // For arrays (e.g. `genre`), concatenate values ​​separated by spaces
//             urlParams.append(key, data[key].join(" "));
//         } else {
//             // For the remaining parameters, add one value
//             urlParams.append(key, data[key]);
//         }
//     }
//
//     console.log(data); // Now `genre` will be an array of all selected values
//     console.log(urlParams); // Now `genre` will be an array of all selected values
//
//     // let token = await getBearerToken();
//     let token = getAuthToken();
//     console.log(token)
//
//     if (!token) {
//         errors.token = "Token not available.";
//     }
//
//     // If there are errors, we return them
//     if (Object.keys(errors).length > 0) {
//         throw { errors }
//     }
//
//     let url = 'https://a.vsbookcollection.space/wp-json/wp/v2/book?'
//     url += urlParams;
//
//     console.log(url)
//
//     let config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'https://a.vsbookcollection.space/wp-json/wp/v2/book?' + urlParams,
//         headers: {
//             'Authorization': 'Bearer ' + token,
//             'Content-Type': 'application/json',
//         }
//     };
//
//     try {
//         const response = await axios.request(config);
//         // return response.data; // Returning response date
//         return { success: true, post: response.data }; // Returning success data
//     } catch (error) {
//         if (error.response && error.response.data && error.response.data.message) {
//             throw new Error(error.response.data.message);
//         }
//         console.error("Error posting book:", error);
//         return null; // In case of error we return null
//     }
//
// }
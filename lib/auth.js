'use server'
import { cookies } from "next/headers";
import {validateField, validateForm} from "./validation";
import {redirect} from "next/navigation";

export async function userLogin(prevState, formData) {
    'use server'

    const username = formData.get('username');
    const password = formData.get('password');
    const fields = {
        username: username,
        password: password
    };

    const validationRules = {
        username: [
            { type: "required", message: "Username is required" },
            { type: "regex", value: /^[a-zA-Z0-9_-]{3,}$/, message: "Invalid username format" }
        ],
        password: [
            { type: "required", message: "Password is required" },
            { type: "minLength", value: 6, message: "Password must be at least 6 characters" }
        ]
    };

    const errors = validateForm(fields, validationRules);
    if (errors) {
        console.log(errors)
        return { success: false, errors };
    }
    console.log("username", username)
    console.log("password", password)
    try {
        const response = await fetch(`https://a.vsbookcollection.space/wp-json/jwt-auth/v1/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error(`Invalid username or password`);
        }

        const result = await response.json();

        const cookieStore = await cookies();
        await cookieStore.set("token", result.token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 60 * 60,
            path: "/"
        });
        console.log(cookieStore.get("token"));

        return { success: true };
    } catch (error) {
        console.error('Error fetching token:', error);
        return {status: false, errors: error}
    }
}

export async function getAuthToken() {
    const cookieStore = await cookies();
    return await cookieStore.get("token")?.value || null;
}

export async function logout() {
    'use server'
    const cookieStore = await cookies();
    await cookieStore.set("token", "", { maxAge: 0, path: "/" });
    console.log('User clicked logout button');
}

// export function getTokenDuration() {
//     const storedExpirationDate = localStorage.getItem('expiration');
//     const expirationDate = new Date(storedExpirationDate);
//     const now = new Date();
//     const duration = expirationDate.getTime() - now.getTime();
//     return duration;
// }



// export function getAuthToken() {
//     const token = localStorage.getItem('token');
//
//     if (!token) {
//         return null;
//     }
//
//     const tokenDuration = getTokenDuration();
//
//     if (tokenDuration < 0) {
//         return 'EXPIRED';
//     }
//
//     return token;
// }

// export function tokenLoader() {
//     return getAuthToken();
// }
//
// export function checkAuthLoader() {
//     const token = getAuthToken();
//
//     if (!token) {
//         return redirect('/auth');
//     } else {
//         return null;
//     }
// }
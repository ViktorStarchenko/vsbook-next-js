'use client'

import {usePathname, useSearchParams, useRouter} from "next/navigation";
import {useCallback} from 'react'

export function getQueryStringWithParams(name, value) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString());
            const valueStr = value.toString();
            // We get the current value of the parameter (separated by commas)
            const currentValues = params.get(name)?.split(',') || [];

            if (currentValues.includes(valueStr)) {
                // If the value already exists, remove it
                const newValues = currentValues.filter(v => v !== valueStr);
                if (newValues.length) {

                    params.set(name, newValues.join(','));
                } else {
                    params.delete(name);
                }
            } else {
                // If there is no value, add it
                currentValues.push(value);
                params.set(name, currentValues.join(','));
            }
            params.set('page', 1);
            return params.toString();
        },
        [searchParams]
    );

    return searchParams;
}

export function getFormattedDateTime() {
    const now = new Date();

    // Формат: DD:MM:YYYY HH:mm (24 години)
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const hours24 = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const time24 = `${day}:${month}:${year} ${hours24}:${minutes}`;

    // Формат: DD:MM:YYYY hh:mm AM/PM (12 години)
    let hours12 = now.getHours() % 12 || 12;
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    hours12 = String(hours12).padStart(2, '0');
    const time12 = `${day}:${month}:${year} ${hours12}:${minutes} ${ampm}`;

    return { time24, time12 };
}

export function generateId() {
    const now = new Date();
    return now.getTime(); // Unix timestamp (унікальний)
}


export function getOrCreateUserId() {
    let userId = localStorage.getItem("user_id");
    if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem("user_id", userId);
    }
    return userId;
}



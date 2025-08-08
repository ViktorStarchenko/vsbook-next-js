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


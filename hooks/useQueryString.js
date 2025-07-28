'use client';

import { useCallback } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export function useQueryString() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString());
            const valueStr = value.toString();

            const currentValues = params.get(name)?.split(',') || [];

            if (currentValues.includes(valueStr)) {
                const newValues = currentValues.filter(v => v !== valueStr);
                if (newValues.length) {
                    params.set(name, newValues.join(','));
                } else {
                    params.delete(name);
                }
            } else {
                currentValues.push(value);
                params.set(name, currentValues.join(','));
            }

            params.set('page', 1);
            return params.toString();
        },
        [searchParams]
    );

    return { createQueryString, searchParams, router, pathname };
}
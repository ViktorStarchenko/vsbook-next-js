'use client'

import {usePathname, useSearchParams, useRouter} from "next/navigation";
import {useCallback} from "react";

export default function PostsSorting() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString());
            // We get the current value of the parameter (separated by commas)
            const currentValues = params.get(name)?.split(',') || [];

            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const activeSort = searchParams.get('order');

    return (
        <div className="posts-sorting">
            <div className="posts-sorting-list">
                <div
                    className={`posts-sorting-item btn ${activeSort === 'desc' ? 'active' : ''}`}
                    onClick={() => {
                        router.push(pathname + '?' + createQueryString('order', 'desc'))
                    }}
                >
                    DESC</div>
                <div
                    className={`posts-sorting-item btn ${activeSort === 'asc' ? 'active' : ''}`}
                    onClick={() => {
                        router.push(pathname + '?' + createQueryString('order', 'asc'))
                    }}
                >
                    ASC</div>
            </div>
        </div>
    )
}
'use client'

import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import { useCallback } from 'react'
export default function PaginationItem({currentPage, targetPage, text, className}) {
    const searchParams = useSearchParams();
    // const router = useRouter();
    const pathname = usePathname();

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const newSearchParams = createQueryString("page", targetPage);
    const newUrl = `${pathname}?${newSearchParams}`;

    return (
        <div className="pagination-item">
            <Link
                href={newUrl}
                className={`${className} `}
                // onClick={() => {
                //     router.push(pathname + '?' + createQueryString('page', targetPage))
                // }}
            >{text}</Link>
        </div>
    )
}
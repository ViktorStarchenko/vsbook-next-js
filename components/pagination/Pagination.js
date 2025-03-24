'use client'
// import {usePathname, useSearchParams, useRouter} from "next/navigation";
// import { useCallback } from 'react'
import Link from "next/link";
import PaginationItem from "./PaginationItem";

export default function Pagination({currentPage, posts}) {

    let totalPosts;
    if (posts && posts.totalPosts) {
        totalPosts = posts.totalPosts;
    }
    let totalPages;
    if (posts && posts.totalPages) {
        totalPages = posts.totalPages;
    }

    // const searchParams = useSearchParams();
    // const router = useRouter();
    // const pathname = usePathname();
    //
    // const createQueryString = useCallback(
    //     (name, value) => {
    //         const params = new URLSearchParams(searchParams.toString())
    //         params.set(name, value)
    //
    //         return params.toString()
    //     },
    //     [searchParams]
    // )

    return (
        <div className="pagination">
            <div className="pagination-list">
                {currentPage > 1 && (
                    <PaginationItem currentPage={currentPage} targetPage={currentPage-1} text="Prev"/>
                )}
                {currentPage > 1 && (
                    <PaginationItem currentPage={currentPage} targetPage={1} text="1"/>
                )}
                <PaginationItem className="active" currentPage={currentPage} targetPage={currentPage} text={currentPage}/>
                {posts &&
                posts.totalPages &&
                posts.totalPages != currentPage && (
                    <PaginationItem currentPage={currentPage} targetPage={posts.totalPages} text={posts.totalPages}/>
                )}
                {currentPage < totalPages && (
                    <PaginationItem currentPage={currentPage} targetPage={currentPage+1} text="Next"/>
                )}
            </div>

            {/*<div className="pagination-list">*/}
            {/*    {currentPage > 1 && (*/}
            {/*        <div className="pagination-item">*/}
            {/*            <Link href={`/books?page=${(currentPage-1) != 0 ? currentPage-1 : 1}`}>Prev</Link>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*    {currentPage > 1 && (*/}
            {/*        <div className="pagination-item">*/}
            {/*            <Link href="/books">1</Link>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*    <div className="pagination-item">*/}
            {/*        <Link href="#">{currentPage}</Link>*/}
            {/*    </div>*/}
            {/*    {posts &&*/}
            {/*    posts.totalPages &&*/}
            {/*    posts.totalPages != currentPage && (*/}
            {/*        <div className="pagination-item">*/}
            {/*            <Link href={`/books?page=${posts && posts.totalPages}`}>{posts && posts.totalPages}</Link>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*    {currentPage < totalPages && (*/}
            {/*        <div className="pagination-item">*/}
            {/*            <Link href={`/books?page=${currentPage+1}`}>Next</Link>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    )
}
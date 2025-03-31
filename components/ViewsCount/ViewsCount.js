'use client';

import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import SvgIcon from "../SvgIcon/SvgIcon";

export default function ViewsCount({post, className}) {
    const [isClient, setIsClient] = useState(false);
    const viewedPosts = useSelector(state => state.views.items || []);
    const isViewed = viewedPosts.find(item => item.id === post.id) || null;

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || !isViewed) {
        return null;
    }
    return (
        <div className={`views-count ${className ? className : ''}`}>
            <SvgIcon className="views-count-icon">
                {isViewed && isViewed.viewsCount && <span>{isViewed.viewsCount}</span>}
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 110.0">
                    <path d="m90.746 47.383c-0.73828-0.91016-18.301-22.383-40.746-22.383s-40.008 21.473-40.746 22.383c-1.2305 1.5312-1.2305 3.7031 0 5.2344 0.73828 0.91016 18.301 22.383 40.746 22.383s40.008-21.473 40.746-22.383c1.2266-1.5312 1.2266-3.7031 0-5.2344zm-56.23-9.9141c3.0977-1.5938 6.4492-2.8828 9.9648-3.5742 3.2031 1.1562 5.5195 4.1719 5.5195 7.7734 0 4.5938-3.7383 8.332-8.332 8.332-4.5977 0-8.332-3.7383-8.332-8.332-0.003907-1.5391 0.44531-2.9648 1.1797-4.1992zm15.484 29.199c-14.234 0-26.828-11.395-31.895-16.668 1.6367-1.707 4.0703-4.0508 7.0859-6.4414 0.95312 8.293 7.9336 14.773 16.477 14.773 9.1914 0 16.668-7.4766 16.668-16.668 0-2.7383-0.69922-5.293-1.8828-7.5586 11.484 2.6289 21.156 11.438 25.441 15.895-5.0664 5.2734-17.66 16.668-31.895 16.668z"/>
                </svg>
            </SvgIcon>
        </div>
    )
}
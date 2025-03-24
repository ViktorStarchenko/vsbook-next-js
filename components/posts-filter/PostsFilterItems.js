'use client'

import PostsFilterItem from "./PostsFilterItem";

export default function PostsFilterItems({taxonomy, taxonomyName}) {
    return (
        <div className="filters-items">
            {Array.isArray(taxonomy) && taxonomy.map(item => (
                <PostsFilterItem key={item.id} taxonomyName={taxonomyName} item={item}/>
            ))}
        </div>
    )
}
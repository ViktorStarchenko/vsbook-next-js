'use client'

import {usePathname, useSearchParams, useRouter} from "next/navigation";
import {useCallback} from 'react'
import Checkbox from "../checkbox/checkbox";

export default function PostsFilterItem({taxonomyName, item}) {
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
    const isChecked = searchParams.get(taxonomyName)?.split(",").includes(item.id.toString()) || false;

    return (
        <div className="filters-item">
            <Checkbox
                id={`genre-${item.id}`}
                name={`genre-${item.id}`}
                label={item.name}
                value={item.id}
                checked={isChecked}
                onChange={() => {
                    router.push(pathname + '?' + createQueryString(taxonomyName, item.id))
                }}
            />
            {/*<input*/}
            {/*    type="checkbox"*/}
            {/*    id={`genre-${item.id}`}*/}
            {/*    name={`genre-${item.id}`}*/}
            {/*    value={item.id}*/}
            {/*    checked={isChecked}*/}
            {/*    onChange={() => {*/}
            {/*        // <pathname>?sort=asc*/}
            {/*        router.push(pathname + '?' + createQueryString(taxonomyName, item.id))*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<label htmlFor={`genre-${item.id}`}>{item.name}</label>*/}
        </div>
    )
}
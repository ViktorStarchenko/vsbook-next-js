import {useQueryString} from "../../hooks/useQueryString";

export default function PostInfoTaxonomiesItem({termName, term, wordWrap = false}) {

    const { createQueryString } = useQueryString();

    let values = <span>
                {term && term.map(item => {
                    const taxonomyUrl = '/books?' + createQueryString(item.taxonomy, item.id)
                    return (<a href={taxonomyUrl}
                       key={item.id}>{item.name}</a>);
                })}
            </span>

    if (wordWrap) {
        values = term.map(item => {
            const taxonomyUrl = '/books?' + createQueryString(item.taxonomy, item.id)
            return (<a href={taxonomyUrl}
                       key={item.id}>{item.name}</a>);
        })
    }

    return (
        <li className={`info-list-item ${wordWrap ? 'word-wrap' : ''}`}>
            <label>
                {termName}:
            </label>
            {values}
        </li>
    )
}
export default function PostsGridToolTipTaxonomy({termName, term}) {

    return (
        <div className="posts-grid-tooltip-taxonomies-item">
            <div className="term-name">{termName}</div>
            <div className="term-values">
                {term && term.map(item => (
                    <div key={item.id} className="term-value">{item.name}</div>
                ))}
            </div>
        </div>
    )
}
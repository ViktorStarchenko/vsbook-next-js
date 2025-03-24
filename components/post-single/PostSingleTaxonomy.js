export default function PostSingleTaxonomy({termName, term}) {

    return (
        <li>
            <label>
                {termName}:
            </label>
            <span>
                {term && term.map(item => (
                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/amy_actor/alexander-cattly/" key={item.id}>{item.name}</a>
                ))}
            </span>
        </li>
    )
}
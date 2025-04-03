'use client'

export default function PostInfoTaxonomiesItem({termName, term, wordWrap = false}) {

    let values = <span>
                {term && term.map(item => (
                    <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/amy_actor/alexander-cattly/" key={item.id}>{item.name}</a>
                ))}
            </span>

    if (wordWrap) {
        values = term.map(item => (
            <a href="http://demo.amytheme.com/movie/demo/elementor-movie-news/amy_actor/alexander-cattly/" key={item.id}>{item.name}</a>
        ))
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
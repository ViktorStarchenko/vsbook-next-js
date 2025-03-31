export default function PostEntryTitle({url, title}) {
    if (!title) {
        return null;
    }
    let content = <h3 className="entry-title">{title}</h3>;
    if (url) {
        content = <h3 className="entry-title"><a
            href={url}>{title}</a>
        </h3>
    }

    return (
        <>
            {content}
        </>
    )
}
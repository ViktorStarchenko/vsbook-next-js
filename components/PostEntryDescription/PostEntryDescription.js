export default function PostEntryDescription({description}) {

    return (
        <div className="posts-list-field-desc" dangerouslySetInnerHTML={{ __html: description }}></div>
    )
}
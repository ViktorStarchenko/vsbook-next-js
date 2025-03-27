export default function ModalSuccess({book}) {
    return (
        <>
            {book && <div>New Book {book.title.rendered} was created.</div>}
            {book && <p>Go to new <a href={`/books/${book.id}`}>{book.title.rendered}</a> book.</p>}
            {book && <p>Go to <a href="/books">All books</a> page.</p>}
        </>
    )
}
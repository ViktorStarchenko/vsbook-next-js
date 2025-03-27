import classes from '../BookSingle/BookSingle.module.css'

export default function ModalBookDetail({book}) {
    return (
        <>
            <h2>Name: {book.title.rendered}</h2>
            <p className={classes.bookSingleBody}  dangerouslySetInnerHTML={{ __html: book.content.rendered }}></p>
        </>
    )
}
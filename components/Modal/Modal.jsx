import { forwardRef, useImperativeHandle, useRef } from 'react'

import classes from './Modal.module.css'


const Modal = forwardRef(function Modal({title, children}, ref) {

    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            }
        }
    });

    function handleBackdropClick(event) {
        console.log(event.target === dialog.current)
        if (event.target === dialog.current) {
            dialog.current.close();
        }
    }

    return (
        <>
            <dialog ref={dialog} className={classes.resultModal} onClick={handleBackdropClick}>
                <div className={classes.modalContent}>
                    <h2>{title}</h2>
                    {children}
                    <form method="dialog">
                        <button>Close</button>
                    </form>
                </div>
            </dialog>
        </>
    )
});

export default Modal;
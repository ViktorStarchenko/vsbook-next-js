import {mainMenuSliceActions} from "../../store/main-menu-slice";
import {useDispatch} from "react-redux";
import Modal from "../Modal/Modal";
import {useRef} from "react";

export default function MenuItemActionRemove({item}) {
    const dispatch = useDispatch();
    const modalRef = useRef();

    function handleOpenModal() {
        modalRef.current.open()
    }

    function handleRemove(item) {
        dispatch(mainMenuSliceActions.removeMenuItem(item))
    }

    return (
        <>
            <span onClick={handleOpenModal}>
                Remove
            </span>
            <Modal ref={modalRef} title={`Are You sure You want to remove this ${item.title} item?`}>
                <div>
                    <div className='btn' onClick={() => handleRemove(item)}>Confirm remove</div>
                </div>
            </Modal>
        </>

    )
}
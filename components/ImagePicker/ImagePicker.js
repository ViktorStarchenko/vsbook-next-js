import {useState, useRef} from 'react'

import Image from "next/image";
import blankImage from '@/public/placeholder.jpg'

export default function ImagePicker({id, name, placeholder}) {
    const [pickedImage, setPickedImage] = useState('');
    const imageInput = useRef();

    function handleImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    function handlePickClick() {
        imageInput.current.click()
    }

    return (
        <div className="image-picker-container">
            <div className="image-picker">
                <Image src={`${pickedImage ? pickedImage : blankImage.src}`} alt="imagePicker" fill/>
            </div>
            <div
                className="btn image-picker-button"
                onClick={handlePickClick}
            >{placeholder ?? 'Pick up the image'}</div>
            <input
                className="image-picker-input"
                type="file"
                name={name}
                id={id}
                onChange={handleImageChange}
                ref={imageInput}
            />
        </div>
    )

}
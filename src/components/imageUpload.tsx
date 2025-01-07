'use client';
import { ChangeEvent, useRef, useState } from 'react';
import { Icon, IconTypes, Label } from "@robperezl/cm-ui";

type ImageUploadProps = {
    name: string,
    isRequired: boolean,
    formName?: string,
    baseImageURL?: string,
}
const ImageUpload = (props: ImageUploadProps) => {
    const [selectedImage, setSelectedImage] = useState<string>(props.baseImageURL ? props.baseImageURL : '');
    // const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isChanged, setIsChanged] = useState('false');
    

    const imageInput: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

    const handleClick = () => {
        if (imageInput.current) {
            imageInput.current.click()
        }
    };

    const handleRemove = () => {
        if (imageInput.current) {
            setSelectedImage('');
            setIsChanged('true');
            imageInput.current.value = ""
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // console.log(file);
        setSelectedImage(
            file ? URL.createObjectURL(file) : ''
        )
        setIsChanged('true');

    };

    return (
        <div>
            <label htmlFor={props.name}>
                <strong>Upload Image:</strong>
            </label>
            <input 
            type='file'
            name={props.name}
            id={props.name}
            form={props.formName}
            ref={imageInput}
            required = {props.isRequired}
            className='hidden'
            accept=".jpg, .jpeg, .png"
            onChange={handleChange}
            />
            <input type='hidden' value={isChanged} name='imageChanged'/>
            {selectedImage ? (
                <img
                className='w-28 h-28 sm:w-40 sm:h-40 cursor-pointer rounded-[1.071rem] flex items-center justify-center hover:opacity-50'
                src={selectedImage}
                alt='Uploaded Image'
                onClick={handleRemove}
                />
            ) : (
                <button
                type='button' 
                className="bg-grey1 hover:bg-pink1 text-grey6 border-2 rounded-xl border-grey6 flex items-center justify-center p-4 sm:p-10"
                onClick={handleClick}
                >
                    <Icon type={IconTypes.Image} fill="none" width={64} height={64}/>
                </button>
            )

            }
            
        </div>
    )
}

export default ImageUpload;
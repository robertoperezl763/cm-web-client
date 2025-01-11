'use client';
import {useDialog, Button, DialogFooter, Input, MultiRow, TextArea, UploadImage, IconTypes, Dialog,  } from "@robperezl/cm-ui";
import { FormEvent, useEffect, useRef } from "react";
import ImageUpload from "@/src/components/imageUpload";
import { createNewItems } from "@/src/actions/item-action";
import DialogInput from "@/src/components/dialogInput";
import DialogTextArea from "@/src/components/formattedTextarea";
type ItemsDialogProps = {
    user: any,
    token: string,
    title: string, 
    id: string,
    collectionHasAuthor: boolean | null,
    collectionHasSeries: boolean | null,
    collectionId: string | null
}

const initialState = {
    message: ''
}




const ItemsDialog = (props: ItemsDialogProps) => {
    const [isOpen, setIsOpen, onKeyDown] = useDialog(false);

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const form = event.currentTarget;

        createNewItems(formData, props.collectionId || '999');

        setIsOpen(false);

    }
    const formRef: React.MutableRefObject<HTMLFormElement | null> = useRef(null)

    useEffect(() => {
        formRef.current?.reset();
    }, [isOpen])



    return (
        <div id="item-dialog">
            <Button icon={IconTypes.Plus} onClick={() => setIsOpen(true)}>Add New Item</Button>
            
            <Dialog isOpen={isOpen}
            hasCloseBtn={true}
            onClose={() => setIsOpen(false)}
            onKeyDown={onKeyDown}
            title={props.title}
            >
                <form ref={formRef} method="dialog" onSubmit={handleFormSubmit} id='my-form'>
                    <MultiRow>
                        <div className="flex flex-col gap-0 p-0 m-0 w-80">
                            <DialogInput maxLength={32} type="Text" required={true} placeholder="Enter Item Name"
                            name="item-name" id="item-name" />
                            <input type="hidden" name="collectionID" id="collectionID" value={props.collectionId ? props.collectionId: ''} />
                            {props.collectionHasAuthor ? 
                            <DialogInput maxLength={32} className="mt-10" type="text" required placeholder="Enter Author"
                            name="item-author" id="item-author" />
                            : null}
                            {props.collectionHasSeries ? 
                            <DialogInput maxLength={32} type="text" required placeholder="Enter Series"
                            name="item-series" id="item-series" />
                            : null}
                            <div className="mt-3">    
                                <DialogTextArea maxLength={128} extraClassName='' placeholder='Enter Item Description' 
                                name="item-description" id="item-description"/>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <ImageUpload name="itemImage" isRequired={false} />
                        </div>
                    </MultiRow>
                    <DialogFooter classname="justify-between">
                        <Button type="submit" >Save</Button>
                    </DialogFooter>
                </form>

            </Dialog>
        </div>
    )
};

export default ItemsDialog;
'use client';
import {useDialog, Button, DialogFooter, Input, MultiRow, TextArea, Dialog,  } from "@robperezl/cm-ui";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ImageUpload from "@/src/components/imageUpload";
import { editItems } from "@/src/actions/item-action";
import DialogInput from "@/src/components/dialogInput";
import DialogTextArea from "@/src/components/formattedTextarea";

type ItemEditDialogProps = {
    id: string,
    collectionHasAuthor: boolean | null,
    collectionHasSeries: boolean | null,
    collectionId: string | null,
    item : {
        id: number,
        name: string,
        description: string,
        imageURL: string,
        imageUID: string,
        author: string,
        series: string,
        createdDate: Date,
        collectionId: number,
    }
}

const initialState = {
    message: ''
}



const ItemsEditDialog = (props: ItemEditDialogProps) => {
    // const [user, token] = useAuth();
    const [isOpen, setIsOpen, onKeyDown] = useDialog(false);
    const [refreshImage, setRefreshImage] = useState(0);

    useEffect(() => {
            setRefreshImage(refreshImage+1)
        }, [isOpen])

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const form = event.currentTarget;

        editItems(formData, props.collectionId || '', props.item.id, props.item.imageUID)
        
        form.reset();
        //redirect back to page to force refresh
        setIsOpen(false);
        
        

    };

    interface FormValues {
        itemName: string,
        itemAuthor: string,
        itemSeries: string,
        itemDescription: string,
        itemImage: String,
    }
    const [defaultValues, setDefaultValues] = useState<FormValues>({
        itemName: props.item.name,
        itemAuthor: props.item.author,
        itemSeries: props.item.series,
        itemDescription: props.item.description,
        itemImage: props.item.imageURL
    });

    const handleChange = (event: ChangeEvent<any>) => {
        const { name, value } = event.currentTarget;
        setDefaultValues({
            ...defaultValues,
            [name]: value
        });

    };



    return (
        <div>
            <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-pink1"
            onClick={()=> setIsOpen(true)}
            > Edit
            </button>
            <Dialog isOpen={isOpen}
            hasCloseBtn={true}
            onClose={() => setIsOpen(false) }
            onKeyDown={onKeyDown}
            title={`Edit Item: ${props.item.name}`}
            >
                <form method="dialog" onSubmit={handleFormSubmit} id={props.id}>
                    <MultiRow>
                        <div className="flex flex-col gap-0 p-0 m-0 w-80">
                            <DialogInput maxLength={32} className="m-0" type="Text" required placeholder="Enter Item Name" value={defaultValues.itemName} onChange={handleChange}
                            name="itemName" id="itemName" />
                            <input type="hidden" name="collectionID" id="collectionID" value={props.collectionId ? props.collectionId: ''} />
                            {props.collectionHasAuthor ? 
                            <DialogInput maxLength={32} className="mt-10" type="text" required placeholder="Enter Author"
                            name="itemAuthor" id="itemAuthor" value={defaultValues.itemAuthor} onChange={handleChange} />
                            : null}
                            {props.collectionHasSeries ? 
                            <DialogInput maxLength={32} type="text" required placeholder="Enter Series"
                            name="itemSeries" id="itemSeries" value={defaultValues.itemSeries} onChange={handleChange}/>
                            : null}
                            <div className="mt-3">    
                                <DialogTextArea maxLength={128} placeholder='Enter Item Description' 
                                name="itemDescription" id="itemDescription" value={defaultValues.itemDescription} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="flex items-center"> 
                            <ImageUpload name="itemImage" isRequired={false} baseImageURL={props.item.imageURL} refresh={refreshImage}/>

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

export default ItemsEditDialog;
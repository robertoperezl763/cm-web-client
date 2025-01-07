'use client';
import {useDialog, Label, Button, DialogFooter, Input, MultiRow, TextArea, Dialog } from "@robperezl/cm-ui";
import { ChangeEvent, FormEvent, useState } from "react";
import ImageUpload from "@/src/components/imageUpload";
import { updateCollection } from "@/src/actions/collection-actions";
import DialogInput from "@/src/components/dialogInput";
import DialogTextArea from "@/src/components/formattedTextarea";

type CollectionEditDialogProps = {
    id: string,
    collection : {
        id: number,
        name: string,
        description: string,
        imageURL: string,
        imageUID: string,
        hasAuthor: boolean,
        hasSeries: boolean,
        isPublic: boolean,
        createdDate: Date,
        userId: number,
    }
};
const initialState = {
    message: ''
}
const CollectionEditDialog = (props: CollectionEditDialogProps) => {
    const [isOpen, setIsOpen, onKeyDown] = useDialog(false);
    // const [state, formAction] = useFormState(editSubmitCollection, initialState)

    const [defaultValues, setDefaultValues] = useState<any>({
        collectionName: props.collection.name,
        collectionHasAuthor: props.collection.hasAuthor,
        collectionHasSeries: props.collection.hasSeries,
        collectionIsPublic: props.collection.isPublic,
        collectionDescription: props.collection.description,
        collectionImage: props.collection.imageURL
    });

    const handleChange = (event: ChangeEvent<any>) => {
        const { name, type, checked, value } = event.currentTarget;

        setDefaultValues({
            ...defaultValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const form = event.currentTarget;

        updateCollection(formData, props.collection.id.toString());

        form.reset();
        setIsOpen(false);

    };



    return (
        <div>
            <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-pink1"
            onClick={()=> setIsOpen(true)}
            > Edit
            </button>
            <Dialog 
            isOpen={isOpen}
            hasCloseBtn={true}
            onClose={() => setIsOpen(false)}
            onKeyDown={onKeyDown}
            title={`Edit Collection: ${props.collection.name}`}
            >
                <form
                method="dialog"
                onSubmit={handleSubmit}
                // action={formAction}
                id={props.id}
                >
                <MultiRow>

                    <div className="flex flex-col justify-end gap-4 w-80">
                        <DialogInput 
                        required={true} 
                        type='text' 
                        placeholder='Enter Collection Name' 
                        name="collectionName" 
                        id="collectionName"
                        value={defaultValues.collectionName}
                        onChange={handleChange}

                        />
                        <DialogTextArea 
                        placeholder='Enter Collection Description' 
                        name="collectionDescription" 
                        id="collectionDescription"
                        value={defaultValues.collectionDescription} 
                        onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center"> 
                        <ImageUpload name="imageUpload" isRequired={false} baseImageURL={props.collection.imageURL}/>
                        <input type="hidden" value={props.collection.id} name="collectionID" />
                        <input type="hidden" value={props.collection.imageUID} name="currentImageUID"/>
                    </div>
                </MultiRow>
                <div className="flex flex-row gap-3 justify-between mt-2" >
                <Label htmlFor="collectionHasAuthor">
                    <Input 
                    type='checkbox' 
                    id="collectionHasAuthor" 
                    name="collectionHasAuthor" 
                    value='true' 
                    checked={defaultValues.collectionHasAuthor}
                    onChange={handleChange}/>
                    Has Authors
                </Label>
                <Label htmlFor="collectionHasSeries">
                    <Input 
                    type='checkbox' 
                    id="collectionHasSeries" 
                    name="collectionHasSeries" 
                    value='true' 
                    checked={defaultValues.collectionHasSeries}
                    onChange={handleChange}
                    />
                    Has Series
                </Label>
                <Label htmlFor="collectionIsPublic">
                    <Input 
                    type='checkbox' 
                    id="collectionIsPublic" 
                    name="collectionIsPublic" 
                    value='true' 
                    checked={defaultValues.collectionIsPublic}
                    onChange={handleChange}
                    />
                    Public Collection
                </Label>
                </div>
                <DialogFooter classname="justify-between">
                    <Button type='submit'>Save</Button>
                    
                </DialogFooter>

                </form>

            </Dialog>
        </div>
    )
};

export default CollectionEditDialog
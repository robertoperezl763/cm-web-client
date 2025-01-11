'use client';
import {useDialog, Label, Button, DialogFooter, DialogForm, Input, MultiRow, TextArea, UploadImage, IconTypes } from "@robperezl/cm-ui";
import SubmissionDialog from "./submission-dialog";
import ImageUpload from "@/src/components/imageUpload";
import { FormEvent, useEffect, useRef } from "react";
import { createNewCollection } from "@/src/actions/collection-actions";
import DialogInput from "@/src/components/dialogInput";
import DialogTextArea from "@/src/components/formattedTextarea";


type CollectionsDialogProps = {
    token: string,
    title: string, 
    id: string,
}


const initialState = {
    message: ''
}


const CollectionDialog = (props: CollectionsDialogProps) => {  
    const [isOpen, setIsOpen, onKeyDown] = useDialog(false);
    // const [state, formAction] = useFormState(collectionSubmit, initialState)

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const form = event.currentTarget;

        createNewCollection(formData);

        setIsOpen(false);
    };

        const formRef: React.MutableRefObject<HTMLFormElement | null> = useRef(null)
    
        useEffect(() => {
            formRef.current?.reset();
        }, [isOpen])

    return(
        <div>
        <Button icon={IconTypes.Plus} onClick={() => setIsOpen(true)}>
            Add New
        </Button>
        <SubmissionDialog id = {props.id}
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(false)}
        onKeyDown={onKeyDown}
        title={props.title}
        >
            {/*REMOVE SUBMISSION DIALOG COMPONENT CONTAIN EVERYTHING IN HERE!*/}
            <form ref={formRef} method="dialog" onSubmit={handleFormSubmit} id={props.id}>
                <MultiRow>
                    <div className="flex flex-col justify-end gap-4 w-80">
                        <DialogInput maxLength={32} required={true} type='text' placeholder='Enter Collection Name' 
                            name="collection-name" id="collection-name"/>
                        <DialogTextArea maxLength={128} placeholder='Enter Collection Description' 
                            name="collection-description" id="collection-description"/>
                    </div>

                    <ImageUpload name="imageUpload" isRequired={false}/>

                    {/* <UploadImage id="collection-image" isReq={true} formId={props.id}/> */}

                </MultiRow>
                <div className="flex flex-row gap-3 justify-between mt-2" >
                    <Label htmlFor="hasAuthor">
                        <Input type='checkbox' id="hasAuthor" name="hasAuthor" value='true'/>
                        Has Authors
                    </Label>
                    <Label htmlFor="hasSeries">
                        <Input type='checkbox' id="hasSeries" name="hasSeries" value='true'/>
                        Has Series
                    </Label>
                    <Label htmlFor="isPublic">
                        <Input type='checkbox' id="isPublic" name="isPublic" value='true'/>
                        Public Collection
                    </Label>
                </div>
                <DialogFooter classname="justify-between">
                    <Button type='submit'>Save</Button>
                    
                </DialogFooter>                        
            
            </form>
            </SubmissionDialog>
        </div>
    )
};

export default CollectionDialog;


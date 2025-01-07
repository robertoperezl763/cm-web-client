'use client';

import { itemDelete } from "@/src/actions/item-action";
import { DeleteFileFromS3 } from "@/src/utils/s3";
import { Button, Dialog, useDialog } from "@robperezl/cm-ui";

type DeleteDialogProps = {
    itemName: string,
    itemId: string,
    imageUID: string,
    collectionId: string | null,

};

const DeleteDialogItems = (props: DeleteDialogProps) => {
    const [isOpen, setIsOpen, onKeyDown] = useDialog();

    const handleClick = async () => {
        if(props.imageUID) {
            await DeleteFileFromS3(props.imageUID);
        }
        
        await itemDelete(
            props.itemId,
            props.collectionId ? props.collectionId : '999'
        );

        setIsOpen(false)

    };

    return(
        <div>
            <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-pink1"
            onClick={()=> setIsOpen(true)}
            > Delete
            </button>
            <Dialog
            isOpen={isOpen}
            title={`Are you sure you want to Delete? "${props.itemName}"`}
            hasCloseBtn={true}
            onClose={() => setIsOpen(false) }
            onKeyDown={onKeyDown}
            >
                <div className="flex flex-row justify-between">
                    <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleClick}>Confirm</Button>
                </div>
            </Dialog>
        </div>
    )
};

export default DeleteDialogItems;
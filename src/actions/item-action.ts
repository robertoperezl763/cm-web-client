'use server'

import { redirect } from "next/navigation";
import { serviceUrl } from "../config";
import { useAuth } from "../helpers/auth";
import { DeleteFileFromS3, UploadFileToS3 } from "../utils/s3";
import { toBool } from "../helpers/helperFunctions";


export const createNewItems = async (formData: FormData, collectionID: string) => {
    // console.log(formData.get('itemImage'));
    // console.log(collectionID);

    const [user, token] = useAuth();
    let imageUID = '';



    const imageData = new FormData();
    const imageFile = formData.get("itemImage");

    if(imageFile && imageFile instanceof File && imageFile.size > 0){
        imageUID = crypto.randomUUID();
        await UploadFileToS3(imageUID, imageFile);
    }

    const reqOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            item: {
                name: formData.get('item-name')?.toString() || '',
                description: formData.get('item-description')?.toString(),
                imageURL: '',
                imageUID: imageUID,
                author: formData.get('item-author')?.toString(),
                series: formData.get('item-series')?.toString(),
            },
        }),
    };

    let req;

    try  {
        req = await fetch(`${serviceUrl}/items/${collectionID}`, reqOptions);
    } catch (error: any) {
        if (error.message) {
            return {
                message: error.message
            };
        }
        return {
            message: error.toString()
        }
    }
    
    const response = await req.json();
    // console.log(response);
    
    redirect(`/collections/${collectionID}`);

}

export const editItems = async (formData: FormData, collectionID: string, itemID: number, currentImageUID: string,  ) => {
    const [user, token] = useAuth();
    // console.log('THE FOLLOWING IS HAPPENING WHEN i CLICK SUBMIT ON THE ITEMS!!!');

    let imageUID = currentImageUID;
    const imageFile = formData.get('itemImage');

    const hasImageChanged = toBool(formData.get('imageChanged')?.toString());    
    // console.log(`----this is the imageUID before change: ${imageUID}`);
    // console.log(`----this is the hasImageChanged thing: ${hasImageChanged}`);

    if(imageFile instanceof File && imageFile.size > 0) {
        // console.log(`----this is the image size: ${imageFile?.size}`);
        if(!imageUID){
            imageUID = crypto.randomUUID();
            // console.log(`----This means that this item needs a new generated ID: ${imageUID}`);
        }
    } else if (imageFile instanceof File && imageFile.size === 0) {
        // console.log(`----this is the image size: ${imageFile?.size}`);
        if(imageUID && hasImageChanged){
            // console.log(`----This ID is being deleted!: ${imageUID}`);
            try {
                DeleteFileFromS3(imageUID);
            }catch(error: any){ console.log('error deleting');}
            imageUID='';
        }
    }

    if (imageFile && imageFile instanceof File && imageUID && hasImageChanged) {
        try{
            await UploadFileToS3(imageUID, imageFile);
        } catch(error: any){
            imageUID = '';
        }
    }


    const reqOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            item: {
                id: itemID,
                name: formData.get('itemName')?.toString(),
                description: formData.get('itemDescription')?.toString(),
                imageURL: '',
                imageUID: imageUID,
                author: formData.get('itemAuthor')?.toString(),
                series: formData.get('itemSeries')?.toString(),
            },
        }),
    };

    let req;

    try  {
        req = await fetch(`${serviceUrl}/items/`, reqOptions);
    } catch (error: any) {
        if (error.message) {
            return {
                message: error.message
            };
        }
        return {
            message: error.toString()
        }
    }
    
    const response = await req.json();

    // console.log(response);

    
    redirect(`/collections/${collectionID}`);
};


export const itemDelete = async (
    itemId: string,
    collectionId: string) => {

    const [user, token] = useAuth();

    const reqOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            item: {
                id: itemId
            },
        }),
    };

    let req;

    try  {
        req = await fetch(`${serviceUrl}/items/${itemId}`, reqOptions);
    } catch (error: any) {
        if (error.message) {
            return {
                message: error.message
            };
        }
        return {
            message: error.toString()
        }
    }
    
    const response = await req.json();
    
    redirect(`/collections/${collectionId}`);
};
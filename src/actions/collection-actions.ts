'use server';

import { redirect } from "next/navigation";
import { serviceUrl } from "../config";
import { useAuth } from "../helpers/auth";
import { DeleteFileFromS3, UploadFileToS3 } from "../utils/s3";
import { toBool } from "../helpers/helperFunctions";

export const createNewCollection = async (formData: FormData,) => {
    const [user, token] = useAuth();
    
    const hasAuthor = formData.get('hasAuthor') === 'true';
    const hasSeries = formData.get('hasSeries') === 'true';
    const isPublic = formData.get('isPublic') === 'true';
    
    let imageUID = '';
    const imageFile = formData.get('imageUpload');

    if(imageFile instanceof File && imageFile.size > 0) {
        imageUID = crypto.randomUUID();
        try{ 
            UploadFileToS3(imageUID, imageFile); 
        } catch(error: any) {
            console.log(error);
        }
    } 


    const reqOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            collection: {
                name: formData.get('collection-name')?.toString(),
                description: formData.get('collection-description')?.toString(),
                imageURL: "",
                imageUID: imageUID,
                hasAuthor: hasAuthor,
                hasSeries: hasSeries,
                isPublic: isPublic,
            },
        }),
    };

    let req; 

    try  {
        req = await fetch(`${serviceUrl}/collections`, reqOptions);
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

    const newCollectionID = response.collection.id;

    redirect(`/collections/${newCollectionID}`);

};

export const updateCollection = async (formData: FormData, currentCollectionID: string,  ) => {
    const [user, token] = useAuth();

    let imageUID = formData.get("currentImageUID")?.toString();
    const imageFile = formData.get('imageUpload');
    const hasImageChanged = toBool(formData.get('imageChanged')?.toString());

    if(imageFile instanceof File && imageFile.size > 0) {
        console.log(imageFile?.size)
        if(!imageUID){
            imageUID = crypto.randomUUID();
        }
    } else if (imageFile instanceof File && imageFile.size === 0) {
        if(imageUID && hasImageChanged){
            DeleteFileFromS3(imageUID);
            imageUID='';
        }
    }

    const hasAuthor = toBool(formData.get('collectionHasAuthor')?.toString());
    const hasSeries = toBool(formData.get('collectionHasSeries')?.toString());
    const isPublic = toBool(formData.get('collectionIsPublic')?.toString());

    if (imageFile && imageFile instanceof File && imageUID && hasImageChanged) {
        try{
            UploadFileToS3(imageUID, imageFile);
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
            collection: {
                id: formData.get('collectionID')?.toString(),
                name: formData.get('collectionName')?.toString(),
                description: formData.get('collectionDescription')?.toString(),
                imageUID: imageUID,
                hasAuthor: hasAuthor,
                hasSeries: hasSeries,
                isPublic: isPublic,
            },
        }),
    };

    let req;

    try  {
        req = await fetch(`${serviceUrl}/collections`, reqOptions);
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

    redirect(`/collections-by/${user.id}`);

};


export const collectionDelete = async (collectionId: string) => {

    const [user, token] = useAuth();

    const reqOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    let req;

    try  {
        req = await fetch(`${serviceUrl}/collections/${collectionId}`, reqOptions);
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

    console.log(response);

    
    redirect(`/collections-by/${user.id}`);


};
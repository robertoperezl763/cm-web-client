import { headers } from "next/headers";
import { s3_config, serviceUrl } from "../config";

import { CollectionObj, CollectionReturn, NewCollectionReturn } from "../global/collection.types";
import { ItemObj, ItemReturn } from "../global/item.types";
import { userObj } from "../global/user.types";
import { redirect } from "next/navigation";

import { getFileFromS3 } from "../utils/s3";

const addImageURl = async (iterable: any) => {

    for (const iteration of iterable){
        if(iteration.imageUID) {
            const url = await getFileFromS3(iteration.imageUID);
            iteration.imageURL = url
        }
        //appends a new imageURL that was retrieved from AMAZON S3 to the image url of colleciton or items.
    }
};


export const fetchCollectionList = async (token:string | undefined, findPublicOnly: boolean = true, userID?: string): Promise<NewCollectionReturn> => {
    

    const reqOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    let uri = findPublicOnly ? `${serviceUrl}/collections/public` : `${serviceUrl}/collections/`; 

    if (userID && findPublicOnly) {
        uri = uri + `?user=${userID}`
    }

    let req;

    try {
        req = await fetch(uri, reqOptions);
    } catch (error: any) {
        console.log('An Error Occured: ', error.message);
        throw new Error(`An Error Occured: ${error.message}`);
    }

    const response = await req.json();

    if (req.status !== 200) {
        throw new Error(`Invlaid Status code... ${req.status}`);
    }

    await addImageURl(response.collections);

    return { 
        objArray: response.collections
    };

};

const fetchSingleCollectionData = async(collectionID: string): Promise<CollectionObj> => {
    const reqOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    let req;

    try {
        req = await fetch(`${serviceUrl}/collections/public/${collectionID}`, reqOptions);
    } catch (error: any) {
        throw new Error('SOMETHING WENT WRONG');
    }

    const response = await req.json();


    return response.collection;


};

export const fetchItemsData = async(collectionID: string, userId?: number): Promise<ItemReturn> => {
    const reqOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let collectionData = await fetchSingleCollectionData(collectionID)

    if (!collectionData.isPublic && collectionData.userId !== userId) {
        console.log('##############################\nTHIS DOES NOT BELONG TO YOU\nYOU CAN NOT SEE THIS\n###################################');
        redirect('/Error');
    }

    let req;

    try {
        req = await fetch(`${serviceUrl}/items/public/${collectionID}`, reqOptions);
    } catch (error: any) {
        return {
            message: 'Something went wrong with the server'
        };
    }

    const response = await req.json();

    if (req.status !== 200) {
        return {
            message: 'something went wrong with req'
        };
    }

    await addImageURl(response.items);

    return {
        itemsArray : response.items,
        collectionData: collectionData,
        message: ''
    };
};


export const fetchUserInfo = async(userId: string, token: string): Promise<userObj> => {
    const reqOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    let req;

    try {
        req = await fetch(`${serviceUrl}/users/${userId}`, reqOptions);
    } catch (error: any) {
        throw new Error('SOMETHING WENT WRONG');
    }
    const response = await req.json();

    return response.user;
};
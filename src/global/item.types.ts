import { CollectionObj } from "./collection.types";

export type ItemObj = {
    id: number,
    name: string,
    description: string,
    imageURL: string,
    author: string,
    series: string,
    createdDate: Date,
    collectionId: number,
    imageUID: string,
    itemURL: string,
};

export interface ItemReturn {
    itemsArray?: Array<ItemObj>,
    collectionData?: CollectionObj,
    message?: string
};
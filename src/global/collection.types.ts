export type CollectionObj = {
    id: number,
    name: string,
    description: string,
    imageURL: string,
    hasAuthor: boolean,
    hasSeries: boolean,
    isPublic: boolean,
    createdDate: Date,
    userId: number,
    imageUID: string,
};

export interface CollectionReturn {
    objArray?: Array<CollectionObj>,
    message?: string
};

export interface NewCollectionReturn {
    objArray: Array<CollectionObj>
};
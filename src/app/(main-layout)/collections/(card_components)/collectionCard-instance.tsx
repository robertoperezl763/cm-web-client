'use client'
import { Button, CollectionCard, Icon, IconTypes } from "@robperezl/cm-ui";
import Chips from "./chips";
import { defaultImageUrl } from "@/src/config";
import Link from "next/link";
import StyledLink from "@/src/components/formattedLink";

type CollectionProps = {
    id: number,
    name: string
    imageUrl?: string | null,
    description: string,
    isPublic?: boolean | null,
    children?: React.ReactNode
};

const CollectionCardInstance = (props: CollectionProps) => {

    return (
        <CollectionCard key={props.id} className="w-10/12 sm:w-64"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-grey6 m-0 pt-4 pb-4 font-bold">
                    {props.name}
                </h1>
                { props.isPublic !== null ? 
                <Chips>
                    {props.isPublic ? 'Public' : 'Private'}
                </Chips>
                : null}
            </div>
            <hr className="border-none clear-both block w-full bg-black h-px mt-0 mb-4"/>
            <img src={props.imageUrl ? props.imageUrl : defaultImageUrl} 
            className="max-w-96 w-full h-auto max-h-52 block rounded-2xl self-center"
            />
            <p className="max-h-24 overflow-y-auto">
                {props.description} 
            </p>
            <div className="flex items-center justify-between flex-wrap mt-2">
                <StyledLink href={`../collections/${props.id.toString()}`}>
                    View Collection
                </StyledLink>
            {/* </div>
            <div className="flex items-center justify-between"> */}
                
                {props.children}
            </div>
            
            
            
        </CollectionCard>
    );

};

export default CollectionCardInstance;
import VerticalMore from "@/src/components/verticalMoore";
import { ItemCard } from "@robperezl/cm-ui";
import ItemsEditDialog from "./item-edit-dialog";

type ItemsProps = {
    itemID: string,
    imageURL: string,
    hasAuthor: boolean,
    hasSeries: boolean,
    itemName: string,
    description?: string,
    author?: string,
    series?: string,
    children?: React.ReactNode

};

const ItemCardInstance = (props: ItemsProps) => {
    let itemBody = {
        author: (props.hasAuthor) ? <p className='flex-nowrap'>
                                        <strong>Author: </strong> 
                                        {props.author}
                                    </p> :
                                        <></>,
        series: (props.hasSeries) ? <p className='flex-nowrap'>
                                        <strong>Series: </strong> 
                                        {props.series}
                                    </p> : 
                                    <></>,
    }
    return(
        
    <ItemCard key={props.itemID} itemid={props.itemID} className="mx-2">
        <img src={props.imageURL} />
        <div className="flex  flex-col">
            <p className="font-bold text-grey6 m-1 max-h-12 overflow-y-auto">
                {props.itemName}
            </p>
            <p className="font-bold text-grey6 m-1 max-h-12 overflow-y-auto">
                {props.description}
            </p>
        </div>
        <div className="">
            {itemBody.author}
            {itemBody.series}
        </div>
        {props.children}

    </ItemCard>
    )
};

export default ItemCardInstance;

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
        <div className="w-full flex flex-nowrap justify-between max-w-screen-md gap-2">
            <div className="min-w-20 self-center">
                <img src={props.imageURL} />
            </div>
            <div className="min-w-0 flex flex-nowrap justify-evenly items-center gap-2 flex-grow ">
                <div className="flex flex-col flex-wrap min-w-0 overflow-auto self-stretch">
                    <p className="font-bold text-grey6">
                        {props.itemName}
                    </p>
                    <p className="text-grey6 max-h-24">
                        {props.description}
                    </p>
                </div>
                <div className="flex flex-wrap flex-col items-center min-w-0 overflow-auto">
                    {itemBody.author}
                    {itemBody.series}
                </div>
            </div>
            {props.children}
        </div>

    </ItemCard>
    )
};

export default ItemCardInstance;

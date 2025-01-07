import { fetchItemsData, fetchUserInfo } from "@/src/actions/data"
import { ItemCard } from "@robperezl/cm-ui"
import { useAuth} from "@/src/helpers/auth"
import { defaultImageUrl } from "@/src/config"
import Chips from "../(card_components)/chips"
import ItemsDialog from "../(items-crud)/item-dialog"
import VerticalMore from "@/src/components/verticalMoore"
import ItemsEditDialog from "../(items-crud)/item-edit-dialog"
import DeleteDialogItems from "../(card_components)/delete-dialog"
import { Suspense } from "react"

import ItemsSkeletonLoading from "@/src/skeletons/items-skeleton"
import ItemCardInstance from "../(items-crud)/itemsCard-instance"
import ItemsGrid from "../(items-crud)/items-grid"



const CollectionByID = async ({params,

}: {
  params: Promise<{ id: string }>
}) => {
    const [user, token] = useAuth();
    const id = (await params).id
    
    const data = (await fetchItemsData(id, user.id));
    const itemsData = data?.itemsArray;
    const collectionData = data?.collectionData;
    const collectionOwnerID = collectionData?.userId.toString();

    let userOwner;
    
  

    if (collectionOwnerID && token) {
      userOwner = await fetchUserInfo(collectionOwnerID, token); 
    }
    
    let owner;
    if (Number(collectionOwnerID) === user.id) {
      owner = true;
    } else {
      owner = false;
    }

    return (
      <Suspense fallback={<ItemsSkeletonLoading />}>
      <div key={1}>
        <div id="collection_Component">
          {/* THIS IS WHERE A COLLECTION COMPONENT WOULD BE */}
          <div className="flex flex-row justify-between pt-2">
            <h1 className="text-xl ml-2">Viewing: {collectionData?.name}</h1>
            <div className="mx-3">
              <Chips>
                      {collectionData?.isPublic ? 'Public Collection' : 'Private Collection'}
              </Chips>
            </div>
          </div>
          <div className="flex justify-between items-center pb-2 pt-1 mx-2">
            <div>
              <h3>Description: {collectionData?.description}</h3>
              <div className="flex">
                <p className="pr-1">Created By:</p>
                <a href={`../collections-by/${userOwner?.id}`} className="text-blue2 underline hover:opacity-55">
                  {userOwner?.firstName} {userOwner?.lastName}
                </a>
              </div>
            </div>
            {owner ? 
            <ItemsDialog user={user} token={token} title="Create a New Item" id="Items-Create" collectionId={collectionData?.id ? collectionData.id.toString() : null}
            collectionHasAuthor={collectionData?.hasAuthor ? collectionData.hasAuthor : null} collectionHasSeries={collectionData?.hasSeries ? collectionData.hasSeries : null}/>
            : null}

            
          </div>
          <hr />

          
        </div>
        <div className="flex flex-col gap-8 mb-6">
          <ItemsGrid key={collectionData?.id}>

            {itemsData?.map((item) => {
              let hasAuthor = (item.author !== null) ? true : false;
              let hasSeries = (item.series !== null) ? true : false;

              return (
                // USE THIS KEY VALUE FOR SORTING STUFF LATER 
                <div key={item.id} id={item.id.toString()}>
                  <ItemCardInstance key={item.id}
                  hasAuthor={hasAuthor}
                  hasSeries={hasSeries}
                  imageURL={item.imageURL ? item.imageURL : defaultImageUrl}
                  itemName={item.name}
                  author={item.author}
                  series={item.series}
                  description={item.description}
                  itemID={item.id.toString()}
                  >
                    <div className="flex justify-center items-center">
                    {owner &&
                    <VerticalMore className="w-8 h-8">
                        <li key={1}>
                          <ItemsEditDialog 
                          id="item-edit"
                          collectionHasAuthor={hasAuthor}
                          collectionHasSeries={hasSeries}
                          collectionId={collectionData?.id ? collectionData.id.toString() : null}
                          item={item}
                          />
                        </li>
                        <li key={2}>
                          <DeleteDialogItems
                          itemName={item.name} 
                          itemId={item.id.toString()}
                          imageUID={item.imageUID}
                          collectionId={collectionData?.id ? collectionData.id.toString() : null}
                          />
                        </li>
                    </VerticalMore>
                    }
                    </div>

                  </ItemCardInstance>
                </div>
              )
            }

            )}
            </ItemsGrid>
        </div>


      </div>
      </Suspense>
    )
}

export default CollectionByID;
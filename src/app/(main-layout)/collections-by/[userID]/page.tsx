import { fetchCollectionList, fetchUserInfo } from "@/src/actions/data";
import { useAuth } from "@/src/helpers/auth"
import CollectionDialog from "../../collections/(collection-crud)/collection-dialog";
import CollectionGrid from "../../collections/(card_components)/collection-grid";
import CollectionCardInstance from "../../collections/(card_components)/collectionCard-instance";
import VerticalMore from "@/src/components/verticalMoore";
import CollectionEditDialog from "../../collections/(collection-crud)/collection-edit-dialog";
import DeleteDialogCollection from "../../collections/(collection-crud)/delete-collection";
import { Suspense } from "react";
import CollectionsScreenSkeleton from "@/src/skeletons/collections-skeleton";

const UserByID = async ({params}: {
    params: Promise<{ userID: string}>
}) => {
    const [user, token] = useAuth();
    const selectedUserID = (await params).userID;

    let viewingPublicProfile = true;

    if(selectedUserID === user.id.toString()) {
      viewingPublicProfile = false  
    }

    const collectionsData = (await fetchCollectionList(token , viewingPublicProfile, selectedUserID)).objArray;

    let amIOwner;
    let userData;
    if(user.id.toString() === selectedUserID) {
        amIOwner = true;
        userData = await fetchUserInfo(user.id, token);
    } else {
        amIOwner = false;
        userData = await fetchUserInfo(selectedUserID, token);
    }


    
    return (
        <Suspense fallback={<CollectionsScreenSkeleton />}>
            <div className="flex items-center justify-between mx-4 pt-2"> {/* THIS IS WHERE MY HEADER GOES MAKE NEW COMPONENT */}
                <h1 className="text-xl font-bold">
                    All Collections for {userData?.firstName} {userData?.lastName}:
                </h1>

                {amIOwner ? <CollectionDialog token={token} 
                title="Create New Collection" 
                id="collection-CRUD"/>: null}
            </div>
            <hr />
            <CollectionGrid>
                {collectionsData?.map((col) => {
                    const uniqueId = `${col.name.split(' ').join('_')}__id_${col.id}`
                    return(
                        <div key={col.id} id={uniqueId}> 
                        <CollectionCardInstance id={col.id}
                        name={col.name}
                        imageUrl={col.imageURL}
                        description={col.description}
                        isPublic={col.isPublic}
                        >
                            {amIOwner ?
                            <VerticalMore>
                                <li>
                                    <CollectionEditDialog 
                                    id={uniqueId}
                                    collection={col}
                                    />
                                </li>
                                <li>
                                    <DeleteDialogCollection 
                                    collectionId={col.id.toString()} 
                                    collectionName={col.name}
                                    imageUID={col.imageUID}/>
                                </li>
                            </VerticalMore>
                            : null}
                        </CollectionCardInstance>
                    </div>
                    )}
                )}    
            </CollectionGrid>
        </Suspense>


    );   
}


export default UserByID
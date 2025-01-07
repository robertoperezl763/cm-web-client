import { useAuth } from "@/src/helpers/auth";
import { fetchCollectionList } from "@/src/actions/data";
import CollectionCardInstance from "./(card_components)/collectionCard-instance";
import CollectionGrid from "./(card_components)/collection-grid";
import { Suspense } from "react";

import CollectionsScreenSkeleton from "@/src/skeletons/collections-skeleton";



const PublicCollections = async () => {
    const [user, token] = useAuth();

    const collectionsData = (await fetchCollectionList(token ,true)).objArray;
    
    return (
        <div key={'collection_list'}>
            <Suspense fallback={<CollectionsScreenSkeleton />}>
                <CollectionGrid>
                    {collectionsData?.map((col) => (
                        <div key={col.id}> 
                            <CollectionCardInstance id={col.id}
                            name={col.name}
                            imageUrl={col.imageURL} //'/assets/placeholder.jpg'
                            description={col.description}
                            isPublic={null}
                            />
                        </div>)
                    )}    
                </CollectionGrid>
            </Suspense>
        </div>



    );
}

export default PublicCollections;
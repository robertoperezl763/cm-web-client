
const ItemsSkeletonLoading = () => (
    <div>
        <div className="p-6 animate-pulse">
                    {/* Header Section */}
                    <div className="space-y-4 mb-6">
                        {/* Title Placeholder */}
                        <div className="flex justify-between">

                        <div className="h-6 bg-grey4 rounded w-3/4"></div>
                            <div className="flex justify-end">
                                <div className="h-8 bg-grey4 rounded-full w-24"></div>
                            </div>
                        </div>
                        

                        {/* Description Placeholder */}
                        <div className="h-4 bg-grey4 rounded w-5/6"></div>

                        {/* User Placeholder */}
                        <div className="h-4 bg-grey4 rounded w-1/2"></div>
                    </div>

                    <hr/>


                    {/* Chip Section (right-aligned) */}
                    
                </div>

        <div className="p-4 grid flex-col gap-2 w-3/4">
        {[...Array(7)].map((_, index) => (
            <div key={index} className="bg-grey1 rounded-lg p-3 gap-1">
            <div className="animate-pulse flex">
                {/* Image Placeholder */}
                <div className="bg-grey4 h-16 w-16 rounded-lg mr-2"></div>

                    {/* Title Placeholder */}
                    <div className="flex flex-col w-full">
                        <div className="h-4 bg-grey4 rounded w-3/4 mb-2"></div>

                        {/* Description Placeholder */}
                        <div className="h-4 bg-grey4 rounded w-2/3 mb-2"></div>

                        {/* Author Placeholder */}
                        <div className="h-4 bg-grey4 rounded w-1/2 mb-2"></div>
                    </div>
                    <div className="flex flex-col m-0 gap-1 self-center">
                        <div className="bg-grey4 h-2 w-2 rounded-full"></div>
                        <div className="bg-grey4 h-2 w-2 rounded-full"></div>
                        <div className="bg-grey4 h-2 w-2 rounded-full"></div>
                    </div>
            </div>
            </div>
        ))}
        </div>
    </div>
);

export default ItemsSkeletonLoading;
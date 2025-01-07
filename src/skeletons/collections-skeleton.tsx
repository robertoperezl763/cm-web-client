
const CollectionsScreenSkeleton = () => (
    <div>
            <div className="p-6">
                {/* Header Section */}
                <div className="space-y-4 mb-6">
                    {/* Title Placeholder */}
                    <div className="flex justify-between">

                    <div className="h-6 bg-grey1 rounded w-3/4"></div>
                        <div className="flex justify-end">
                            <div className="h-8 bg-grey1 rounded-full w-24"></div>
                        </div>
                    </div>
                    

                    {/* Description Placeholder */}
                    <div className="h-4 bg-grey1 rounded w-5/6"></div>

                    {/* User Placeholder */}
                    <div className="h-4 bg-grey1 rounded w-1/2"></div>
                </div>

                <hr/>


                {/* Chip Section (right-aligned) */}
                
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
                <div key={index} className="bg-grey1 rounded-lg p-4">
                <div className="animate-pulse">
                    {/* Image Placeholder */}
                    <div className="bg-grey4 h-48 w-full rounded-lg mb-4"></div>

                    {/* Title Placeholder */}
                    <div className="h-4 bg-grey4 rounded w-3/4 mb-2"></div>

                    {/* Description Placeholder */}
                    <div className="h-4 bg-grey4 rounded w-2/3 mb-2"></div>

                    {/* Author Placeholder */}
                    <div className="h-4 bg-grey4 rounded w-1/2 mb-2"></div>

                    {/* Dots Placeholder */}
                    <div className="bg-grey4 h-6 w-6 rounded-full mt-4"></div>
                </div>
                </div>
            ))}
            </div>
        </div>
);

export default CollectionsScreenSkeleton
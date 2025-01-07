import { LayoutProps } from "@/src/global/global.types";

const CollectionGrid = (props: LayoutProps) => (
    <div className="container m-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 sm:mb-10">
        {props.children}
    </div>
);

export default CollectionGrid;
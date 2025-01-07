import { LayoutProps } from "@/src/global/global.types";

const ItemsGrid = (props: LayoutProps) => (
    <div className="container m-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {props.children}
    </div>
);

export default ItemsGrid;
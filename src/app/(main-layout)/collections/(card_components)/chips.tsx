import { LayoutProps } from "@/src/global/global.types";

const Chips = (props: LayoutProps) => {

    return(
        <div className="rounded-md bg-pink2 py-0.5 px-2.5 border-transparent text-sm text-white transition-all shadow-sm">
            {props.children}
        </div>

    )
};

export default Chips;
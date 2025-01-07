import Link from "next/link";

type linkProps = {
    href: string,
    children: React.ReactNode
};

const StyledLink = (props: linkProps) => {
    return(
        <Link href={props.href}
        className="flex items-center  justify-center appearance-none border-none m-0 p-0 bg-pink5 text-white text-base font-bold rounded-xl cursor-pointer overflow-hidden transition hover:bg-pink7 active:bg-pink2 focus:outline focus:outline-2 focus:outline-pink5/30"
        > 
            <div className="p-2.75">
                {props.children} 
            </div>
        </Link>
    )
};

export default StyledLink;
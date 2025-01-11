import Link from "next/link";

type linkProps = {
    href: string,
    children: React.ReactNode,
    className?: string,
};

const StyledLink = (props: linkProps) => {
    const presetClassName = ' flex items-center text-sm sm:text-base justify-center appearance-none border-none m-0 p-0 bg-pink5 text-white font-bold rounded-xl cursor-pointer overflow-hidden transition hover:bg-pink7 active:bg-pink2 focus:outline focus:outline-2 focus:outline-pink5/30'
    const className = props.className ? props.className + presetClassName: presetClassName;

    return(
        <Link href={props.href}
        className={className}
        > 
            <div className="py-2.75 px-0.5 sm:px-2.75">
                {props.children} 
            </div>
        </Link>
    )
};

export default StyledLink;
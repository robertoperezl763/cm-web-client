'use client';
import { Icon, IconTypes } from "@robperezl/cm-ui";
import { useEffect, useRef, useState } from "react";
import { LayoutProps } from "../global/global.types";
import Link from "next/link";
import ItemsEditDialog from "../app/(main-layout)/collections/(items-crud)/item-edit-dialog";
import { escape } from "querystring";

type VerticalMoreProps = {
    children?: React.ReactNode,
    className?: string,

}

const VerticalMore = (props: VerticalMoreProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (isOpen && event.key === 'Escape') {
            console.log('clicked escape');
            setIsOpen(false);
        }
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
            }

            if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
                console.log('clicked inside!')
            }

        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`${props.className} relative justify-self-center`} ref={dropdownRef}> 

            <button
                type="button"
                className={`${props.className} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center justify-end self-center`}
                onClick={toggleDropdown}
            >
                <Icon className="" type={IconTypes.VerticalMore} width={16} height={16} />
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5" onKeyDown={onKeyDown}>
                    <ul role="menu" aria-orientation="vertical" aria-labelledby="option-menu">
                        {props.children}
                    </ul>
                </div>
            )}
        </div>



    )

};

export default VerticalMore;
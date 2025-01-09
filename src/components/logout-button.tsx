'use client';
import { Button } from "@robperezl/cm-ui"
import { logout } from "@/src/actions/user-actions";
type LogoutProps = {
    children: React.ReactNode,
    styled?: boolean,
}
const LogoutButton = (props:LogoutProps ) => {
    let className = "";
    if(props.styled){
        className = "flex items-center justify-center appearance-none px-3 border-none m-0 p-0 bg-pink5 text-white text-base font-bold rounded-xl cursor-pointer overflow-hidden transition hover:bg-pink7 active:bg-pink2 focus:outline focus:outline-2 focus:outline-pink5/30"
    }
    return ( <button onClick={() => { logout() }} className={className}>{props.children}</button> )
};

export default LogoutButton;
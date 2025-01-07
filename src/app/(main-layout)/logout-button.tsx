'use client';
import { Button } from "@robperezl/cm-ui"
import { logout } from "@/src/actions/user-actions";
type LogoutProps = {
    children: React.ReactNode
}
const LogoutButton = (props:LogoutProps ) => {
    return ( <button onClick={() => { logout() }}>{props.children}</button> )
};

export default LogoutButton;
'use client';

import { Button } from "@robperezl/cm-ui";


type buttonProps = Readonly<{
    href?: string
    children?: React.ReactNode,
    icon?: any
    onClickFunction?: React.EventHandler<any>
}>;



const ClientButton = (props: buttonProps) => {
    return( <Button icon={props.icon} onClick={props.onClickFunction}>{props.children}</Button> )
}

export default ClientButton;
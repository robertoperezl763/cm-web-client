'use client';
import { updateUser } from "@/src/actions/account-actions";
import { defaultImageUrl } from "@/src/config";
import { Button, Input } from "@robperezl/cm-ui";
import Link from "next/link";
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
type UserProfileProps = {
        image: string; // URL for the user's profile image
        userName: string;
        email: string;
        firstName: string;
        lastName: string;
        userID: string;
}

const EditButtonIcon = () => {

    return (
            <svg className="active:ring-2" width="24px" height="24px" viewBox="-2.56 0 89.725 89.725" xmlns="http://www.w3.org/2000/svg">
                <g id="Group_11" data-name="Group 11" transform="translate(-1020.3 -668.175)">
                    <path id="Path_53" data-name="Path 53" d="M1066.1,682.8l-34.8,34.8a3.858,3.858,0,0,0-1.1,2.2l-.8,10.1a2.488,2.488,0,0,0,2.8,2.8l9.8-.8a3.857,3.857,0,0,0,2.2-1.1l35-35a3.041,3.041,0,0,0,.3-4.3l-9.1-9.1A3.052,3.052,0,0,0,1066.1,682.8Z" fill="none" stroke="black" stroke-miterlimit="10" stroke-width="3"/>
                    <path id="Path_54" data-name="Path 54" d="M1079.6,690.2l-7.8-7.8a3.684,3.684,0,0,1,0-5.3l5.8-5.8a3.684,3.684,0,0,1,5.3,0l7.8,7.8a3.684,3.684,0,0,1,0,5.3l-5.8,5.8A3.869,3.869,0,0,1,1079.6,690.2Z" fill="none" stroke="black" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/>
                    <path id="Path_55" data-name="Path 55" d="M1098.6,755.9h-72a4.268,4.268,0,0,1-4.3-4.3v-3.3a4.268,4.268,0,0,1,4.3-4.3h72a4.268,4.268,0,0,1,4.3,4.3v3.3A4.268,4.268,0,0,1,1098.6,755.9Z" fill="none" stroke="black" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/>
                    <path id="Path_56" data-name="Path 56" d="M1103.5,739.8" fill="none" stroke="black" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4"/>
                </g>
            </svg>

    )
};

//BREAK THIS AWAY

const UserLineItem = (props: {
    children?: React.ReactNode,
    isActive?: boolean,
    customButton?:boolean,
    uniqueName: string,
    keyName: string,
    value: string,
    id: string,

}) => {
    const [value, setValue] = useState(props.value);
    
    const handleChange = (event: ChangeEvent<any>) => {
        const { name, value } = event.currentTarget;
        setValue(value);
    }

    return (
        <div className="border py-2 px-2 border-pink1">
            <li className="flex justify-between my-2" key={props.uniqueName} id={props.id}>
                <div>
                    <h2 className="font-bold text-md"> {props.keyName} </h2>
                    {props.isActive ?
                        <div>
                            <input 
                            className="p-4 text-base font-medium leading-none text-black border border-grey1 rounded-lg bg-grey1 appearance-none m-0"
                            name={props.uniqueName}
                            type="text"  
                            value={value} 
                            onChange={handleChange}/>
                        </div>
                     : <p className="text-md">{props.value}</p>}
                    
                </div>
                {props.customButton ? props.children 
                :null}
                
            </li>
        </div>
    )
};

export const UserContainer = (props: UserProfileProps ) => {
    

    const handleCancel = () => {
        setIsEdit(false);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);

        await updateUser(formData, props.userID);

        setIsEdit(false);

    };
    

    const [isEdit, setIsEdit] = useState(false);

    return (
        <div>
            <div className="flex justify-between m-2">
                <h1 className="text-xl font-bold">Account Details</h1>
                
                <button onClick={() => setIsEdit(!isEdit)}> 
                    <EditButtonIcon />
                </button>
            </div>
                <hr />
            <form
            onSubmit={handleSubmit}
            >

                <ul className="">
                    <UserLineItem 
                    id="0"
                    uniqueName="firstName"
                    keyName="First Name"
                    value={props.firstName}
                    isActive={isEdit}
                    />
                    <UserLineItem
                    id="1"
                    uniqueName="lastName"
                    keyName="Last Name"
                    value={props.lastName}
                    isActive={isEdit}
                    />
                    <UserLineItem
                    id="2"
                    uniqueName="email"
                    keyName="Email"
                    value={props.email}
                    isActive={isEdit}
                    />
                    <UserLineItem
                    id="3"
                    uniqueName="password"
                    keyName="Password"
                    value="**********"
                    customButton={true}>
                        {!isEdit ?
                        <Link
                        href={'/user/change-password'}
                        className="px-4 py-2 text-pink8 border border-pink3 rounded-md active:bg-pink2 hover:bg-pink4 focus:outline-none focus:ring-2 focus:ring-pink8 focus:ring-offset-2 transition duration-200"
                        >
                            Edit Password
                        </Link> : null
                        
                    }
                    </UserLineItem>
                    {isEdit ?
                    <div className="flex justify-between my-2">
                        <Button onClick={handleCancel} type="button">Cancel</Button>
                        <Button type="submit"> Submit</Button>
                    </div> 
                    : null}
                    
                </ul>
            </form>

        </div>
    )
}
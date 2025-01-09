'use client';
import { FormEvent, useEffect, useState } from "react";
import UserModalOutline from "../user-modal";
import { Button } from "@robperezl/cm-ui";
import { cancelChangePassword, changePassword, takeMeBack } from "@/src/actions/account-actions";
import { useFormState } from "react-dom";
import { toast, ToastContainer } from "react-toastify";

const initialState = {
    message: '',
    isSuccess: false,
}

const ChangePassword = () => {

    const [messageState, setMessageState] = useState(initialState); 

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setMessageState(await changePassword(formData));

        
    };

    useEffect(() => {
        if(messageState.isSuccess === true) {
            
            // console.log('if is working');
            toast.success('Password Changed Successfully', {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                progress: undefined,
                theme: "light",
                onClose: () => takeMeBack('/user')
            });
            // takeMeBack('/user');   
        } 
    }, [messageState]);

    
    const handleCancel = () => {
        cancelChangePassword();
    };

    

    return(
        <div>
        <UserModalOutline>
            <h1 className="text-xl font-bold">Account Details</h1>
            <hr />
            <form
            onSubmit={handleSubmit}
            // action={formAction}
            >
                <ul>
                    <div className="border py-2 px-2 border-pink1">
                        <li className="flex justify-between my-2 flex-col">
                            <h2 className="font-bold text-md">Current Password</h2>
                            <input 
                                className="p-4 text-base font-medium leading-none text-black border border-grey1 rounded-lg bg-grey1 appearance-none m-0"
                                name="currentPassword"
                                type="password" 
                                />
                        </li>

                        <li className="flex justify-between my-2 flex-col">
                            <h2 className="font-bold text-md">New Password</h2>
                            <input 
                                className="p-4 text-base font-medium leading-none text-black border border-grey1 rounded-lg bg-grey1 appearance-none m-0"
                                name="newPassword"
                                type="password" 
                                />
                        </li>

                        <li className="flex justify-between my-2 flex-col">
                            <h2 className="font-bold text-md">Re-enter New Password</h2>
                            <input 
                                className="p-4 text-base font-medium leading-none text-black border border-grey1 rounded-lg bg-grey1 appearance-none m-0"
                                name="newPasswordReenter"
                                type="password" 
                                />
                        </li>
                    </div>
                </ul>
                <div className="flex justify-between my-2">
                    <Button type="button" onClick={handleCancel}>Cancel</Button>
                    <Button type="submit"> Submit</Button>
                </div> 
                {!messageState?.isSuccess ?    
                <p className="text-red5">
                    {messageState?.message}
                </p>
                :null}
            </form>
        </UserModalOutline>
        <ToastContainer />
        </div>
    )
};

export default ChangePassword;
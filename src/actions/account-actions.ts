'use server';
import { redirect } from "next/navigation";
import { serviceUrl } from "../config";
import { useAuth } from "../helpers/auth";



export const updateUser = async (formData: FormData, userID: string) => {
    const [user, token] = useAuth();

    const reqOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            user: {
                id: userID,
                firstName: formData.get('firstName')?.toString(),
                lastName: formData.get('lastName')?.toString(),
                email: formData.get('email')?.toString(),
            },
        }),
    };

    let req;

    try {
        req = await fetch(`${serviceUrl}/users/`, reqOptions);
    } catch (error: any) {
        if (error.message) {
            return {
                message: error.message
            };
        }
        return {
            message: error.toString()
        }
    }

    const response = await req.json();

    
    if(req.status === 200) {
        
    }

    redirect('/user');
};

export const cancelChangePassword = () => {
    redirect('/user');
};


export const changePassword = async (formData: FormData) => {
    const [user, token] = useAuth();
    
    const currentPassword = formData.get('currentPassword')?.toString();
    const newPass = formData.get('newPassword');
    const newPassReenter = formData.get('newPasswordReenter');

    //check that new password matches
    if(newPass !== newPassReenter) {
        return {
            message: 'The New Password Does Not Match. Try Again',
            isSuccess: false
        }
    };

    if(currentPassword === newPass) {
        return {
            message: 'Existing Password Can Not Match New Password. Try Again',
            isSuccess: false
        }
    }

    // console.log(currentPassword);
    // console.log(user.id);
    // console.log(typeof(user.id));

    const reqOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPass,
        }),
    };

    // console.log(reqOptions);

    let req;
    try {
        req = await fetch(`${serviceUrl}/users/change-password`, reqOptions);
    } catch (error: any) {
        if (error.message) {
            return {
                message: error.message,
                isSuccess: false
            };
        }
        return {
            message: error.toString(),
            isSuccess: false
        }
    }

    const response = await req.json();
    
    // console.log(response);

    if (response[0]?.constraints?.matches) {
        return {
            message: response[0].constraints.matches,
            isSuccess: false
        }
    }

    if (response.statusCode === 500){
        return {
            message: response.message, //'SOMETHING WENT HORRIBLY WRONG',
            isSuccess: false
        }
    }


    return{
        message: response.message,
        isSuccess: true
    }

}

export const takeMeBack = (url: string) => {
    
    redirect(url);
}
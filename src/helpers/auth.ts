import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const useAuth = () => {

    const token = cookies().get('token')?.value;
    let userCookie = cookies().get('user')?.value;


    if (!token || !userCookie) {
        redirect('/login');
    }
    
    const user = JSON.parse(userCookie);
    // console.log(user)
    return [user, token]
};

export const isSignedIn = () => {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if(!token){
        return false
    } else {
        return true
    }
}

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const useAuth = () => {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    let userCookie = cookieStore.get('user')?.value;

    // console.log('AUTH ============');
    // console.log("token: ", token);
    // console.log("user: ", user);

    // if (!token) {
    //     console.log("########### NO TOKEN FOUND - Redirecting ############");
    //     return redirect('/login');
    // }

    // // if (!user) {
    // //     console.log("########### NO USER FOUND - Redirecting ############");
    // //     return redirect('/login');
    // // }
    if (!token || !userCookie) {
        return redirect('/login');
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

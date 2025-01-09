import Link from "next/link";
import { Button } from "@robperezl/cm-ui";
import { logoNoBg } from "../config";
import FooterComponent from "./footer";
import { isSignedIn, useAuth } from "../helpers/auth";
import { fetchUserInfo } from "../actions/data";
import LogoutButton from "../components/logout-button";
import ClientButton from "../components/clientButton";

const Home = async () => {


let signedIn: boolean = false;
let userData = null;

if (isSignedIn()) {
    const [user, token] = useAuth();
    signedIn = true
    userData = await fetchUserInfo(user.id, token);
}

  return(
    <main className="flex flex-col min-h-screen">
        <div className="flex-nowrap flex-1 px-2 justify-center content-center">
            <div className="flex flex-col items-center justify-center h-full">
                <div className="flex items-center justify-self-center">
                    <img className="opacity-50 h-12 w-12 rounded-none" src={logoNoBg}></img>
                    <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold">Welcome to Collection Manager - New User</h1>
                    <img className="opacity-50 h-12 w-12 rounded-none" src={logoNoBg}></img>
                </div>
                <div className="flex items-center justify-center">
                    {signedIn ? 
                        <h2 className="text-lg">
                            Welcome Back: {userData?.firstName} {userData?.lastName}!
                        </h2> : null}
                </div>
                    
                <div key={0} className="flex gap-2 pt-5 justify-between">
                    {signedIn ?
                        <Link href='/collections'>
                            <Button className="w-50">View Collections</Button>    
                        </Link> : null}
                    {signedIn ? null:
                        <Link href="/sign-up">
                            <Button className="w-50">Sign Up</Button>
                        </Link>}
                    {signedIn ?
                        <LogoutButton styled={true}>
                            Logout
                        </LogoutButton>
                        :
                        <Link href="/login">
                            <Button className="w-50">Log In</Button>
                        </Link>}
                </div>
            </div>

        </div>

        <FooterComponent/>
    </main>
  );
}



export default Home;
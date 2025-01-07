import Link from "next/link";
import ClientButton from "../components/clientButton";
import { takeMe } from "../actions/user-actions";
import { Button } from "@robperezl/cm-ui";
import { logoNoBg } from "../config";
import FooterComponent from "./footer";
import CollectionsScreenSkeleton from "../skeletons/collections-skeleton";

const Home = () => {
  return(
    <main className="flex flex-col min-h-screen">
        <div className="flex-nowrap flex-1 self-center justify-self-center items-center px-2">
            <div className=" translate-y-full">
                <div className="flex items-center justify-self-center">
                    <img className="opacity-50 h-12 w-12 rounded-none" src={logoNoBg}></img>
                    <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold">Welcome to Collection Manager</h1>
                    <img className="opacity-50 h-12 w-12 rounded-none" src={logoNoBg}></img>
                </div>
                <div key={0} className="flex gap-2 pt-10 justify-between">
                    <Link href='/collections'>
                        <Button className="w-50">View Collections</Button>    
                    </Link>
                    <Link href="/sign-up">
                        <Button className="w-50">Sign Up</Button>
                    </Link>
                    <Link href="/login">
                        <Button className="w-50">Log In</Button>
                    </Link>
                    
                </div>
            </div>

        </div>

        <FooterComponent/>
    </main>
  );
}



export default Home;
import { 
    MainLayout,
    MainLayoutContainer,
    HeaderNav,
    HeaderNavBtn,
    IconTypes,
    Icon,
    Label
    // HeaderNavLogo
 } from "@robperezl/cm-ui";
import Link from "next/link";
import LogoutButton from "../../components/logout-button";
import { LayoutProps } from "@/src/global/global.types";
import { useAuth } from "@/src/helpers/auth";
import Image from "next/image";
import { logoNoBg } from "@/src/config";
import FooterComponent from "../footer";

const RootLayout = (props:LayoutProps) => {
    const [user, token] = useAuth();
    return (
        <main className="flex flex-col min-h-screen">
            <div className="flex-1">
                    <nav className="relative z-10">
                        <HeaderNav >
                            <ul className="flex justify-between items-center w-full">
                                <div className="flex ml-2 md:ml-8 lg:ml-12 gap-2 sm:gap-3 md:gap-4 items-center">
                                    <li id="logo_link">    
                                        <Link href='/'>
                                            <Image
                                                src={logoNoBg}
                                                width={230}
                                                height={230}
                                                alt="Collection Manager Logo"
                                                className="rounded-none w-8 h-8 xl:w-10 xl:h-10 "
                                            />
                                        </Link>
                                    </li>
                                    <li id="my_collections_link">
                                        <Link 
                                        href={`/collections-by/${user.id.toString()}`}
                                        className="h-auto"
                                        >
                                            <Label className="hover:cursor-pointer hover:opacity-50 hover:text-pink7 gap-1" >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <line x1="3" y1="8" x2="21" y2="8" />
                                                <line x1="3" y1="16" x2="21" y2="16" />
                                                <line x1="6" y1="10" x2="6" y2="14" />
                                                <line x1="10" y1="10" x2="10" y2="14" />
                                                <line x1="14" y1="10" x2="14" y2="14" />
                                            </svg>
                                                My Collections
                                            </Label>
                                        </Link>
                                    </li>
                                    <li id="all_collections_link">
                                        <Link href="/collections">
                                            <Label className="hover:cursor-pointer hover:opacity-50 hover:text-pink7 gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M2 12h20" />
                                                <path d="M12 2a15.3 15.3 0 0 1 0 20" />
                                                <path d="M12 2a15.3 15.3 0 0 0 0 20" />
                                            </svg>

                                                <p>Public Collections</p>
                                            </Label>
                                        </Link>
                                    </li>
                                </div>
                                <div className="flex mr-2 md:mr-8 lg:mr-12 items-center gap-2 sm:gap-3 md:gap-4">
                                    <li id="myuser">
                                    <Link href={`/user`}>
                                        {/* <HeaderNavBtn label="" icon={IconTypes.NewUser} /> */}
                                        <Label className="hover:cursor-pointer hover:opacity-50 hover:text-pink7 gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <circle cx="12" cy="7" r="5" />
                                                <path d="M4 21v-2c0-2.21 3.58-4 8-4s8 1.79 8 4v2" />
                                            </svg>
                                            <p>View Account</p>
                                        </Label>
                                    </Link>
                                    </li>

                                    <li id="logout_link" className="max-h-7">
                                        <LogoutButton>
                                            <Label className="hover:cursor-pointer hover:opacity-50 hover:text-pink7 gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" width="24px" version="1.1" viewBox="0 0 384.971 384.971">
                                                <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03C192.485,366.299,187.095,360.91,180.455,360.91z"/>
                                                <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/>
                                            </svg>
                                            Logout
                                            </Label>
                                        </LogoutButton>
                                    </li>
                                </div>
                            </ul>

                        </HeaderNav>
                    </nav>
                        <MainLayoutContainer>
                            {props.children}
                        </MainLayoutContainer>
            </div>
        <FooterComponent/>
        </main>
    )
};

export default RootLayout;
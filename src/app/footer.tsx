import { HeaderNav } from "@robperezl/cm-ui"
import Link from "next/link";

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    );
const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" width="16" height="16" viewBox="0 0 24 24"><path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"/></svg>
    );


const FooterComponent = () => {

    return(
        <footer className="flex flex-row items-center justify-center py-8 px-0 bottom-0 left-0 w-full bg-grey3 gap-14 clear-both relative">
            <div className="">
                <p className="font-bold self-center">Created by</p>
                <p>Roberto Perez Lopez</p>
            </div>

            <div className="flex flex-col gap-1">
                <p className="font-bold self-center">Socials</p>
                <div className="flex flex-row gap-2">
                    <Link href='https://x.com/perezl761'>
                        <TwitterIcon />
                    </Link>
                    <Link href='https://www.linkedin.com/in/roberto-perezl/'>
                        <LinkedInIcon />                 
                    </Link>
                </div>
            </div>

            

        </footer>
    )
};

export default FooterComponent;


// display: flex
// flex-direction: row
// align-items: center
// // justify-content: space-evenly
// position: fixed
// padding: 1em 0
// top: 0
// left: 0
// width: 100%
// height: 60px
// background-color: var(--cm-ui-header-nav-bgColor, #ddd)
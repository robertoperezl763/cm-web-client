import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import "./globals.sass";
import ToastProvider from "../components/toastProvider";
import 'react-toastify/dist/ReactToastify.css';
import {clsx} from "clsx";
const lato = Lato({ 
  weight: ["400"],
  subsets: ["latin"]
 });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Collection Manager",
  description: "Store all of your Collections and show them off to friends!",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>;

const RootLayout = (props: RootLayoutProps) => (
  <html lang="en">
    <body className={clsx(
      lato.className,
      'bg-grey2'    
    )
      }>
      <ToastProvider>
        {props.children}
      </ToastProvider>
    </body>
  </html>
);

export default RootLayout;



// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }

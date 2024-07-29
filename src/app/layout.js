
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import UserContextProvider from "@/context/userContexProvider";


const roboto = Poppins({ weight: '300',subsets: ["latin"] });

export const metadata = {
  title: "OnAppX",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
    
      <body suppressHydrationWarning={true} className={roboto.className}>
        <UserContextProvider>
         <Navbar/>
        {children}
        </UserContextProvider>
        </body>
    </html>
  );
}

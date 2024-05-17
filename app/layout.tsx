import { SessionProvider } from "next-auth/react";
import "./globals.css";
import "./styles/auth.modules.css"

import ProgressLoader from "@/components/progress-bar";
import {Toaster} from "react-hot-toast"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <SessionProvider>
        <ProgressLoader/>
        <Toaster/>
      
            {children}
     
        </SessionProvider>
       
      </body>
    </html>
  );
}

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import "./styles/auth.modules.css"

import ProgressLoader from "@/components/progress-bar";
import {Toaster} from "react-hot-toast"
import { ThemeProvider } from "@/components/theme";
import { ConfettiProvider } from "@/components/confetti-provider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
    <html lang="en">
      <body >
        <SessionProvider>
        <ProgressLoader/>
        <ConfettiProvider/>
        <Toaster/>
      
            {children}
     
        </SessionProvider>
       
      </body>
    </html>
    </ThemeProvider>
  );
}

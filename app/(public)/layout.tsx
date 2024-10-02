import '../styles/courses.modules.css'
import "../styles/about.modules.css"

import NavBar from "@/components/navbar";
import Footer from "@/components/footer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <> 
        <NavBar/>
        {children}
        <Footer/>
      </>
  );
}

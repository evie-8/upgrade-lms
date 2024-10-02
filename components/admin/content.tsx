"use client";

import { useContext, useState } from "react";
import SideBar from "@/components/admin/admin-sidebar";
import Header from "@/components/admin/header";
import { ChevronRight } from "lucide-react";

import Animation from "@/components/ui/animation";
import { themeContext } from "@/components/theme";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}
const Content: React.FC<Props> = ({ children }) => {
  const [collapse, setCollapse] = useState(true);
  const pathname = usePathname();
  const isCoursesPath =
    pathname.startsWith("/student/courses") && pathname !== "/student/courses";
  const handleCollapse = () => {
    if (isCoursesPath) {
      setCollapse(true);
    } else {
      setCollapse((prev: boolean) => !prev);
    }
  };

  const { theme } = useContext(themeContext);
  return (
    <>
      <div
        className={`hidden h-full sm:flex flex-col fixed z-20 inset-y-0 bg-white transition-all  ${
          collapse ? "w-20" : "w-56"
        }`}
      >
        <SideBar collapse={collapse} />
        <button
          className={`hidden absolute -right-2 sm:top-[3%] lg:top-[4%] w-5 h-5 sm:flex items-center justify-center rounded-full border bg-white border-transparent ${
            theme === "light" ? "shadow-xs" : "shadow-xs-dark"
          } z-30`}
          onClick={handleCollapse}
        >
          <ChevronRight
            size={20}
            className={`transition-all duration-[0.2s]  ${
              collapse ? "" : "transform rotate-180"
            }`}
          />
        </button>
      </div>

      <main
        className={`relative h-full min-h-screen bg-white ${
          collapse ? "sm:pl-20" : "sm:pl-56"
        } relative`}
      >
        {!isCoursesPath && <Header collapse={collapse} />}

        <Animation>{children}</Animation>
      </main>
    </>
  );
};

export default Content;

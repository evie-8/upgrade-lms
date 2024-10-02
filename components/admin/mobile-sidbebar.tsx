"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";
import SideBar from "./admin-sidebar";
import { usePathname } from "next/navigation";

const MobileSideBar = () => {
  const pathname = usePathname();
  const coursePath =
    pathname.includes("/student/courses") && pathname !== "/student/courses";

  return (
    <Sheet>
      <SheetTrigger className="sm:hidden pr-4 hover:opacity-75 transition">
        <Menu size={25} className="font-bold" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;

"use client";

import MobileSideBar from "@/components/admin/mobile-sidbebar";
import ProfileImage from "@/components/admin/avartar";
import { usePathname } from "next/navigation";
import SearchButton from "@/components/student/search-button";

interface Props {
  collapse: boolean;
}
const Header: React.FC<Props> = ({ collapse }) => {
  const pathname = usePathname();
  const studentPath = pathname === "/student/courses";

  return (
    <>
      <div
        className={`${
          collapse ? " h-[71px]" : "h-[73px]"
        } z-10 p-8 border-b border-grey flex items-center bg-white sticky top-0 left-0`}
      >
        {studentPath && (
          <div className="sm:block hidden">
            <SearchButton />
          </div>
        )}
        <MobileSideBar />

        <ProfileImage />
      </div>
    </>
  );
};

export default Header;

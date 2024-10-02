import { logout } from "@/action-server/logout";
import { cn } from "@/lib/utils";
import { Tooltip } from "@mui/material";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { themeContext } from "@/components/theme";

interface Props {
  icon: LucideIcon;
  label: string;
  href: string;
  collapse?: boolean;
  signout?: boolean;
}
const MenuItem: React.FC<Props> = ({
  icon: Icon,
  label,
  href,
  collapse,
  signout = false,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useContext(themeContext);

  const isActive = pathname === href || pathname.startsWith(`${href}`);
  const onClick = () => {
    if (signout) {
      logout();
    } else {
      router.push(href, {}, { showProgressBar: true });
    }
  };
  return (
    <Tooltip
      title={
        collapse ? (
          <span
            className={`${
              theme === "dark" ? "text-gray" : "text-white"
            } text-xs`}
          >
            {label}
          </span>
        ) : (
          ""
        )
      }
      arrow={true}
      placement="right"
    >
      <button
        onClick={onClick}
        type="button"
        className={cn(
          `relative group flex items-center  gap-x-2 text-gray text-sm font-normal transition-all rounded-lg hover:text-primary hover:bg-primary/10 border border-transparent `,
          isActive && `text-primary bg-primary/10`,
          `${collapse ? "justify-center" : "pl-6"}`
        )}
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={22}
            className={cn(
              "group-hover:text-primary text-gray font-light",
              isActive && "text-primary"
            )}
          />
          <span className={`${collapse ? "hidden" : "inline"}`}> {label} </span>
        </div>
        {/*  <div className={cn(`ml-auto opacity-0 border-2 border-primary h-full transition-all  rounded-lg ${collapse ? "absolute left-0" : "group-hover:opacity-100"}`, isActive &&  'opacity-100')}/>
         */}
      </button>
    </Tooltip>
  );
};

export default MenuItem;

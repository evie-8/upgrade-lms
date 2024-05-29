"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";
import qs from 'query-string';
import { IconType } from "react-icons";

interface Props {
    value?: string;
    label: string
    icon?: IconType;

}

const CategoryItem = ({label, value, icon: Icon}: Props) => {
    const pathname = usePathname();
    const router = useRouter();

    const searchParams = useSearchParams();
    const categoryId = searchParams.get("categoryId");
    const title = searchParams.get("title");

    const isSelected = categoryId === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: title,
                categoryId: isSelected ? null : value
            }
        }, {skipNull: true, skipEmptyString: true});

        router.push(url, {}, {showProgressBar: true});
    }

  return (
   <button  onClick={onClick}
   className={cn("py-2 px-3 text-sm border border-grey rounded-full flex items-center gap-x-1 hover:border-primary transition",
    isSelected && "border-primary/10 bg-primary/10 text-primary"
   )}>
        {
            Icon && <Icon size={20}/>
        }
        <div className="truncate">
            {label}
        </div>
   </button>
  )
}

export default CategoryItem
"use client"
import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { useDebouncedValue } from "@/hooks/use-debounce"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next-nprogress-bar"
import qs from "query-string"
import path from "path"
import { title } from "process"

const SearchButton = () => {
    const [value, setValue] = useState('');
    const debounceValue = useDebouncedValue(value, 500);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const categoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: categoryId,
                title: debounceValue
            },
        }, {skipNull: true, skipEmptyString: true});
        router.push(url);
    }, [debounceValue, router, categoryId, pathname]);
    
    
    return (
    <div className="relative">
       <Search className="h-4 w-4 absolute right-4 top-4 text-gray/60"/>
       <Input 
       onChange={(e) => setValue(e.target.value)}
       value={value}
       className="w-full py-2 bg-purple2/10  max-w-md pr-9 rounded-full focus-visible:ring-primary/35" placeholder="Search courses..."/>
    </div>
  )
}

export default SearchButton
import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {

    const [visible, setVisible] = React.useState(false);    
        if (type === "password") {return (
         <div tabIndex={0} className={`group flex justify-between items-center h-12 w-full rounded-md border border-grey  bg-transparent px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary${props.disabled ? "cursor-not-allowed opacity-50" : ""}`}>
                <input
        type={type === "password" ? visible ? "text" : "password": type}
        className={cn(
          "placeholder:text-gray/60 bg-transparent focus-visible:outline-none border-none disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...props}
      />
      
      {visible ? <Eye size={18}   onClick={() => setVisible(current => !current)}/> : <EyeOff size={18} onClick={() => setVisible(current => !current)}/>}
         </div>   
        )
    }
else {
    return (
      
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border border-grey  bg-transparent px-3 py-2 text-base  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray/60 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
}
  }
)
Input.displayName = "Input"

export { Input }

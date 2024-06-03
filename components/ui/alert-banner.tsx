"use client";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { AlertTriangle, CheckCircle, X } from "lucide-react";
import { useState } from "react";


const alertBannerVariants = cva("relative border text-center  p-4 text-sm flex items-center w-full",
    {
        variants: {
            variant: {
                warning: 'bg-yellow border-yellow text-gray',
                success: 'bg-success border-success text-white'
            }
        },
        defaultVariants: {
            variant: 'warning'
        }
    }

    
);



interface AlertBannerProps extends VariantProps<typeof alertBannerVariants> {
    label: string;
    className?: string

}
const icons = {
    warning: AlertTriangle,
    success: CheckCircle
}

export const AlertBanner = ({label, variant, className}: AlertBannerProps) => {
    const Icon = icons[variant || "warning"];
    const [remove, setRemove] = useState(false);
    const onClick = () => {
        setRemove(true);
    } 
    return (
        <div className={cn(alertBannerVariants({variant}), className, remove && 'hidden')}>
            <Icon className='h-4 w-4 mr-2'/>
            {label}

           <button onClick={onClick} className={`ml-auto`}>
           <X className="w-4 h-4  "/>
           </button>
        </div>
        
    )
}
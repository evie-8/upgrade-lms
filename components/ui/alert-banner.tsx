import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { AlertTriangle, CheckCircle } from "lucide-react";


const alertBannerVariants = cva("border text-center  p-4 text-sm flex items-center w-full",
    {
        variants: {
            variant: {
                warning: 'bg-yellow border-yellow text-gray',
                success: 'bg-success/20 border-success text-gray'
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
    return (
        <div className={cn(alertBannerVariants({variant}), className)}>
            <Icon className='h-4 w-4 mr-2'/>
            {label}
        </div>
        
    )
}
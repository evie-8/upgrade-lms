import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const backgroundVariants = cva("rounded-full flex items-center justify-center", 
    {
        variants: {
            variant: {
                default: 'bg-primary/10',
                success:  "bg-success/10",
            }, 
        
            iconVariant: {
                default: 'text-primary',
                success: "text-success"
            }, 
                size: {
                    default:"p-2",
                    sm: 'p-1',
                },   
        }, 
        defaultVariants: {
            variant: "default",
            size: 'default'
        }
    }
);

const iconVariants = cva("", 
    {
        variants: {
            
        
            variant: {
                default: 'text-primary',
                success: "text-success"
            }, 
            size: {
                default: 'h-6 w-6',
                sm: 'h-4 w-4'
            }
        },            

        defaultVariants: {
            variant: "default",
            size: 'default'
        }
    
    }
);

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
    icon: LucideIcon;
};

export const IconTag = ({icon: Icon, variant, size}: IconBadgeProps) => {
 return (
    <div className={cn(backgroundVariants({variant, size}))}>
    <Icon className={cn(iconVariants({variant, size}))}/>

 </div>
 )
}
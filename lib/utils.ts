import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = (price: number) => {
  return  new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'UGX'
  }).format(price)
}
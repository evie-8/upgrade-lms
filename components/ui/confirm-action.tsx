"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

interface Props {
    children: React.ReactNode;
    onConfirm: () => void;
    action?: string;
    description?: string;
}

const ConfirmAction: React.FC<Props> = ({children, onConfirm, action='Delete', description=' This action cannot be undone.'}) => {
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
    
       <AlertDialogContent className='max-sm:max-w-[330px]'>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                   {description}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm} className='bg-destructive hover:bg-destructive hover:opacity-90'>
                    {action}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
       
    </AlertDialog>
  )
}

export default ConfirmAction
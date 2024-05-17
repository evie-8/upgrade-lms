"use client";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";


interface FileUploaderProps {
    endpoint: keyof typeof ourFileRouter;
    onChange: (url?: string) => void;
}

export const FileUploader = ({onChange, endpoint}: FileUploaderProps) => {

    return (
        <UploadDropzone endpoint={endpoint} onClientUploadComplete={(res) => {
            
                onChange(res?.[0].url);
            
            console.log(res)
        }}
        
        onUploadError={(error: Error) => {
            toast.error(`${error?.message}`);
        }}
        />
    )
}
interface FileProps {
    endpoint: keyof typeof ourFileRouter;
    onChange: (url?: {}) => void;
}

export const FileUploaderResources = ({onChange, endpoint}: FileProps) => {

    return (
        <UploadButton  endpoint={endpoint} onClientUploadComplete={(res) => {
            
                onChange(res);
            
            console.log('',res)
        }}
        
        onUploadError={(error: Error) => {
            toast.error(`${error?.message}`);
        }}
        />
    )
}
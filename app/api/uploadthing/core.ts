import { currentRole, currentUser } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handleAuth = async() => {

    const user = await  currentUser();
    const role = await currentRole();

    if (!user?.id || role !== 'TUTOR') {
        throw new Error("Unauthorized");
    } ;

    return {userId: user.id};

};
 

export const ourFileRouter = {
 
    courseImage: f({ image: {maxFileSize: '4MB', maxFileCount: 1}})
    .middleware(async() => await handleAuth())
    .onUploadComplete(() => {}),

    courseResources: f(["text", 'image', "video", "audio", "pdf"])
    .middleware(async() => await handleAuth())
    .onUploadComplete(() => {}),

    chapterVideo: f({ video: {maxFileSize: '512MB', maxFileCount: 1}})
    .middleware(async() => await handleAuth())
    .onUploadComplete(() => {}),

 
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
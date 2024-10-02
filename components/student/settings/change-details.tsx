"use client";

import * as z from 'zod';
import Container from '@/components/ui/container'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCurrentUser } from '@/hooks/use-current-user';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditProfileSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { useRef, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';
import { FormError, FormSuccess } from '@/components/auth/form-message';
import toast from 'react-hot-toast';
import axios from 'axios';
import ChangePassword from './change-password';

const ChangeSettingsCard = () => {
    const user = useCurrentUser();
    const [newProfileImage, setNewProfileImage] = useState(user?.image);
    const ImageRef = useRef<any>();
  
    const [loading, setLoading] = useTransition();
    const [errorMessage, setErrorMessage] = useState<string | undefined>("");
    const [successMessage, setSucessMessage] = useState<string | undefined>("");
   

    const  form  = useForm<z.infer<typeof  EditProfileSchema>>({
        resolver: zodResolver(EditProfileSchema),
        defaultValues: {
            name: user?.name || undefined,
            image: user?.image ||  undefined,
            email: user?.email || undefined,
          
        }
      });

      const uploadProfileImagePreview = (event: any) => {

        let image = event.target.files[0];
     
        ImageRef.current.src = URL.createObjectURL(image);
       
          setNewProfileImage(image);
      };

      const uploadProfileImage = async (event: any) => {
        event.preventDefault();
        console.log(event.target)
        if (newProfileImage) {
            const loading = toast.loading("Uploading ...");
            
            event.target.setAttribute("disabled", true)

            const forms = new FormData();
            forms.append('file', newProfileImage);
            forms.append('upload_preset', 'qayh85jr');
        
            await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, 
            forms)
                .then((result) =>
                {
                    if (result && result.data && result.data.secure_url) {
                       
                        form.setValue('image', result.data.secure_url)
                        toast.dismiss(loading);
                        toast.success("New profile image loaded 🎉🎉");
                        event.target.setAttribute("disabled", false);
                                          
                    }

                })
                .catch((error) => {
                    toast.dismiss(loading);
                    toast.error("Failed to upload new profile image 😔");
                    event.target.setAttribute("disabled", false);
                   
                    console.log(error);
                })

     
        }
      }
  return (
    
        <section>
       
        
            <Form {...form}>
                 <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">

            <FormField
                control={form.control}
                name="image"
                render={( { field }) => (
                    
                    <FormItem className="max-lg:center mb-5">
                    
                            <label htmlFor="uploadImage" className="relative flex flex-col items-center justify-center w-48 h-48 bg-black2 rounded-full overflow-hidden">
                              
                               {
                                user?.image ?
                                <img src={user?.image }   alt="profile Image" ref={ImageRef}/>  :
                                <UserRound className='w-36 h-36 text-white'/>
                               }
                              
                                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/80 opacity-0 hover:opacity-100 cursor-pointer">
                                    Upload Image
                                </div>

                            </label>
                                
                            <Input id="uploadImage" className="hidden"   type="file" accept=".jpeg, .jpg, .png"  disabled={loading} onChange={uploadProfileImagePreview} />
                                <FormControl>
                                    <Input id='imageload' className='hidden'  {...field} defaultValue={field.value} disabled={loading} />
                                  </FormControl>
                     
                                <FormLabel htmlFor="imageload">
                                  <Button  className="btn-light mt-5 max-lg:center lg:w-full px-10"  onClick={uploadProfileImage} disabled={loading}>Upload</Button>
                                </FormLabel>
                                    
                                <FormMessage />
                    </FormItem>
                )}
                />
                <div className="w-full">
                
                <FormError message={errorMessage}/>
                <FormSuccess message={successMessage}/>

           
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
                  <FormField
                  control={form.control}
                  name="name"
                  render={( { field }) => (
                  <FormItem >
                  
                      <FormControl>
                          <Input placeholder="Name"  {...field} defaultValue={field.value}  />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
              )}
              />

              <FormField
              control={form.control}
              name="email"
              render={( { field }) => (
                  <FormItem >
                  
                      <FormControl>
                          <Input placeholder="Email"  type="email" {...field}  defaultValue={field.value}  />
                        
                      </FormControl>
                      <FormMessage />
                  </FormItem>
              )}
              />
                </div>
   
                </div>

               


                </div>
               <div className='flex flex-col items-end justify-end'>
               <Button>
                    Save Changes
                </Button>
               </div>
            </Form>
        

        </section>
   
  )
}

export default ChangeSettingsCard
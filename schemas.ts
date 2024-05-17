import * as z from "zod";
import { PaymentStatus, SkillLevel } from '@prisma/client';

export const SignUpSchema=  z.object({
     
      email: z.string().min(1, 'Email is required').email('Invalid email'),
      name:  z.string().min(1, 'Name is required').max(100),
      password: z
        .string()
        .min(1, 'Password is required')
        .min(10, 'Password must have atleast 10 characters')
        .regex(/[A-Z]/, 'Password must contain at least one capital letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
       .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol'),
      confirmPassword: z.string().min(1, 'Password confirmation is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Password do not match',
    });

export const SignInSchema = z.object({
 
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(10, 'Invalid password')
      .regex(/[A-Z]/, 'Invalid password')
      .regex(/[0-9]/, 'Invalid password')
     .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Invalid password'),
     code: z.optional(z.string().max(6))
})

export const ResetSchema = z.object({
 
  email: z.string().min(1, 'Email is required').email('Invalid email'),
 
})

export const NewPasswordSchema = z.object({
 
  password: z
      .string()
      .min(1, 'Password is required')
      .min(10, 'Password must have atleast 10 characters')
      .regex(/[A-Z]/, 'Password must contain at least one capital letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
     .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol'),
     confirmPassword: z.string().min(1, 'Password confirmation is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Password do not match',
    });

export const CourseCreationSchema = z.object({
  name: z.string().min(1, 'A course must have a name'),
  level: z.enum([SkillLevel.Beginner, SkillLevel.Intermediate, SkillLevel.Expert]),
  payment: z.enum([PaymentStatus.Free, PaymentStatus.Paid]),
  unit: z.string().min(1, 'units required'),
  duration: z.string().min(1, 'value should be atleast 1'),
  combined: z.optional(z.string().default('')),
  
}).refine((data) => {
  
  if (data.duration === "1") {
      data.unit = data.unit.slice(0,-1);
  }
 
  data.combined = data.duration + ' ' + data.unit
  return true

});

export const QuizShema = z.object({
  name: z.string().min(1, 'Topic is required'),
  topic: z.string().min(1, 'Topic is required'),
  length: z.string().refine((value) => Number(value) >= 10, {
    message: 'length should be atleast 10'
  }
  
),
  difficulty: z.enum(["easy", "medium", "hard"])
})
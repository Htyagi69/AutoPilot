"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import Image  from "next/image"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import {toast} from "sonner"
import {email, z} from "zod"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


import {Input} from "@/components/ui/input"
import {cn} from "@/lib/utils"
import { authClient } from "@/lib/auth-client"


 const registerSchema=z.object({
    email:z.email("Please enter a valid email"),
    password:z.string().min(1,"Password is  required"),
    confirmPassword:z.string(),
 }).refine((data)=>data.password===data.confirmPassword,{
    message:"Password don't match",
    path:["confirmPassword"]   //this will only show the conform password as  error
})

 type RegisterFormValues =z.infer<typeof registerSchema>

 export function RegisterForm() {
  const router = useRouter();
    const form=useForm<RegisterFormValues>({
        resolver:zodResolver(registerSchema),
        defaultValues:{
            email:"",
            password:"",
            confirmPassword:"",
        }
    });

    const onSubmit=async (values:RegisterFormValues)=>{
        // console.log(values); 
        await authClient.signUp.email({
          name:values.email,
          email:values.email,
          password:values.password,
          callbackURL:"/"
        },
       { onSuccess:()=>{
           router.push("/");
        },
        onError:(ctx)=>{
          toast.error(ctx.error.message); 
        }}
        )
      };
    const isPending=form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-12">
             <Card>
                  <CardHeader className="text-center">
                    <CardTitle>
                       Get Started 
                    </CardTitle>
                        <CardDescription>
                           Create your account to get started  
                        </CardDescription>
                  </CardHeader>    
                  <CardContent>
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>

                            <div className="grid gap-6">
                                 <div className="flex flex-col gap-4">
                                      <Button variant={"destructive"} 
                                      className="w-full"
                                      type="button"
                                      disabled={isPending}>
                                         <Image alt="Github" src="/images/github.svg" width={20} height={20}/>
                                        Continue with Github 
                                      </Button>
                                      <Button variant={"destructive"} 
                                      className="w-full"
                                      type="button"
                                      disabled={isPending}>
                                    <Image alt="Google" src="/images/google.svg" width={20} height={20}/>
                                        Continue with Google 
                                      </Button>
                                 </div>
                            <div className="grid gap-6">
                                <FormField  control={form.control}
                                name="email"
                                render={({field})=>(
                                    <FormItem>
                                          <FormLabel>Email</FormLabel>
                                          <FormControl>
                                            <Input type="email"
                                            placeholder="example@gmail.com"
                                            {...field}
                                            />
                                          </FormControl>
                                          <FormMessage/>
                                    </FormItem>
                                )}/>
                                <FormField  control={form.control}
                                name="password"
                                render={({field})=>(
                                    <FormItem>
                                          <FormLabel>Password</FormLabel>
                                          <FormControl>
                                            <Input type="password"
                                            placeholder="........."
                                            {...field}
                                            />
                                          </FormControl>
                                          <FormMessage/>
                                    </FormItem>
                                )}/>
                                <FormField  control={form.control}
                                name="confirmPassword"
                                render={({field})=>(
                                    <FormItem>
                                          <FormLabel>Conform Password</FormLabel>
                                          <FormControl>
                                            <Input type="password"
                                            placeholder="........."
                                            {...field}
                                            />
                                          </FormControl>
                                          <FormMessage/>
                                    </FormItem>
                                )}/>
                                <Button  type="submit" 
                                className="w-full" disabled={isPending}>
                                    Sign up
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link href="/login"
                                    className="hover:underline hover:underline-offset-4 ">
                                        login
                                    </Link>
                            </div>
                            </div> 
                        </form>

                     </Form>
                  </CardContent>
            </Card>  
        </div>
    )
 }
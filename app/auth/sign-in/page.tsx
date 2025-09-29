import SignInForm from '@/components/auth/sign-in'
import MetaData from "@/components/ui/meta-data"

const SignInPage = () => {
  return (
    <>
    <MetaData title='upgrade | sign in' description='Login into acccount'  keywords='e-learning platform,account'/>
    <SignInForm/>
    </>
   
  )
}

export default SignInPage
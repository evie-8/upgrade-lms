import SignUpForm from "@/components/auth/sign-up";
import MetaData from "@/components/ui/meta-data";

const SignUp = () => {
  return (
    <>
      <MetaData
        title="upgrade | sign up"
        description="Create an account"
        keywords="e-learning platform,account"
      />
      <SignUpForm />
    </>
  );
};

export default SignUp;

import AuthError from "@/components/auth/auth-error";
import MetaData from "@/components/ui/meta-data";

const AuthErrorPage = () => {
  return (
    <>
      <MetaData
        title="upgrade | auth error"
        description="Authentication error occurred"
        keywords="e-learning platform,account"
      />
      <AuthError />
    </>
  );
};

export default AuthErrorPage;

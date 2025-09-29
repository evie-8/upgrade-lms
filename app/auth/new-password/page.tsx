import NewPasword from "@/components/auth/new-password";
import MetaData from "@/components/ui/meta-data";

const NewPasswordPage = () => {
  return (
    <>
      <MetaData
        title="upgrade | set new password"
        description="Create new password"
        keywords="e-learning platform,account"
      />
      <NewPasword />
    </>
  );
};

export default NewPasswordPage;

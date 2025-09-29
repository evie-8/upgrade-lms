import Reset from "@/components/auth/reset";
import MetaData from "@/components/ui/meta-data";

const ResetPage = () => {
  return (
    <>
      <MetaData
        title="upgrade | forgot password"
        description="Request for password reset"
        keywords="e-learning platform,account"
      />
      <Reset />
    </>
  );
};

export default ResetPage;

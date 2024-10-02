"use client";

import AuthCard from "@/components/auth/auth-card";
import { TriangleAlert } from "lucide-react";

const AuthError = () => {
  return (
    <AuthCard
      headerLabel="Auth Error"
      backref="/auth/sign-in"
      backrefMessage="Back to sign in"
      messageLabel="Oops! Something went wrong!"
    >
      <TriangleAlert
        size={30}
        className="text-danger text-center mx-auto mb-7"
      />
    </AuthCard>
  );
};

export default AuthError;

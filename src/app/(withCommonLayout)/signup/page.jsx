import SignupForm from "@/components/auth/SignupForm";
import React, { Suspense } from "react";

const signup = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm></SignupForm>
      </Suspense>
    </div>
  );
};

export default signup;

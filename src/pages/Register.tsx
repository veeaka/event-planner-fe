import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContainer } from "../components/utils/CustomComponents";

export const Register = () => {
  return (
    <AuthContainer>
      <RegisterForm />
    </AuthContainer>
  );
};

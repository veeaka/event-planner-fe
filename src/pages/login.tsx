import LoginForm from "../components/auth/LoginForm";
import React from "react";
import { AuthContainer } from "../components/utils/CustomComponents";

export const Login = () => {
  return (
    <AuthContainer>
      <LoginForm />
    </AuthContainer>
  );
};

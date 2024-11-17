import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button, FormGroup, Grid, Typography } from "@mui/material";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  StyledAsterisk,
  StyledButton,
  StyledFormGroup,
  StyledLabel,
  StyledSpaceBetween,
  TextInput,
} from "../utils/CustomComponents";
import { textColors } from "../../assets/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/slices/authSlice";

export interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required("Work Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data, "data");
    dispatch(loginUser(data));
  };

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Typography variant="h4">Login</Typography>
        <div>
          <label htmlFor="email">
            Work Email <span>*</span>
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                type="email"
                fullWidth
                {...field}
                placeholder="Enter work email here"
                size="small"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </div>

        <StyledFormGroup>
          <StyledSpaceBetween>
            <StyledLabel htmlFor="password">
              Password <StyledAsterisk>*</StyledAsterisk>
            </StyledLabel>
          </StyledSpaceBetween>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                type="password"
                fullWidth
                {...field}
                placeholder="Enter password here"
                size="small"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </StyledFormGroup>

        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop={5}
        >
          <Typography
            variant="body2"
            margin={1}
            sx={{ color: textColors.textHelperLabel }}
          >
            Don't have an account?&nbsp;
            <Typography
              onClick={handleRegisterClick}
              variant="body2"
              style={{
                color: textColors.brandColor,
                textDecoration: "none",
                display: "inline",
                cursor: "pointer",
              }}
              className="primary"
            >
              Register Now
            </Typography>
          </Typography>
          <StyledButton type="submit">Login</StyledButton>
        </Grid>
      </form>
    </div>
  );
};

export default LoginForm;

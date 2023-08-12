import { useForm } from "react-hook-form";

import { FormContainer, PasswordInput, TextInput } from "../shared";

import { RouterService } from "../services";

import { useNavigate } from "react-router-dom";

import { setCredential } from "../store/slices/authSlice";

import { useDispatch } from "react-redux";

import { useLoginMutation } from "../store/slices/userApiSlice";

import { useCallback, useEffect } from "react";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const loginValidation = yup.object({
  email: yup.string().trim().required(),
  password: yup.string().trim().required(),
});

const Login = () => {
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation),
  });

  // Navigation
  const navigate = useNavigate();

  // Api Call
  const [login, { isLoading }] = useLoginMutation();

  const isUserLogin = useAuth();

  const dispatch = useDispatch();

  // To Submit
  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();

      dispatch(setCredential(res));

      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.data.msg);
    }
  };

  useEffect(() => {
    if (isUserLogin) {
      RouterService.navigate(navigate, "/");
    }
  }, [navigate, isUserLogin]);

  return (
    <FormContainer>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Text Input  */}
        <TextInput
          type="email"
          name="email"
          register={register}
          error={errors?.email?.message}
          label="Email"
          mandatory={true}
          placeholder="Email goes here"
        />
        {/* Password Input */}
        <PasswordInput
          name="password"
          register={register}
          mandatory={true}
          label="password"
          error={errors?.password?.message}
        />

        {/* Action Button */}
        <button className="btn btn-primary mt-3 w-100" disabled={isLoading}>
          Submit {isLoading && <Spinner size="sm" />}
        </button>
        <div className="row justify-content-end">
          <div className="col-auto">
            <button
              className="btn btn-link text-black-50 fs-6"
              type="button"
              onClick={() => RouterService.navigate(navigate, "/register")}
            >
              New Customer ? Sign up here
            </button>
          </div>
        </div>
      </form>
    </FormContainer>
  );
};

export default Login;

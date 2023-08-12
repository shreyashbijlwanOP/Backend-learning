import { useForm } from "react-hook-form";

import { FormContainer, PasswordInput, TextInput } from "../shared";

import { RouterService } from "../services";

import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../store/slices/userApiSlice";
import { setCredential } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const registerValidationSchema = yup.object({
  name: yup.string().trim().required("User Name is Required"),
  email: yup.string().email().trim().required("Email address is Required"),
  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 character")
    .required("password is Required"),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Password Must Match")
    .required("Confirm Password is Required"),
});

const Register = () => {
  // React Hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  // React-Hook-Form
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isUserLogged = useAuth();

  const [registerUser, { isLoading }] = useRegisterMutation();
  // To Submit Form
  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data).unwrap();
      dispatch(setCredential(res));
      toast.success("User created and logged in Successfully");
      RouterService.navigate(navigate, "/");
    } catch (error) {
      toast.error(error.data.msg);
    }
  };

  useEffect(() => {
    if (isUserLogged) {
      RouterService.navigate(navigate, "/");
    }
  }, [isUserLogged, navigate]);

  return (
    <FormContainer>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* User Name */}
        <TextInput
          type="text"
          name="name"
          register={register}
          error={errors?.name?.message}
          label="Name"
          mandatory={true}
          placeholder="Name goes here"
        />
        {/* Email */}
        <TextInput
          type="email"
          name="email"
          register={register}
          error={errors?.email?.message}
          label="Email"
          mandatory={true}
          placeholder="Email goes here"
        />
        {/* Password */}
        <PasswordInput
          name="password"
          register={register}
          mandatory={true}
          label="password"
          error={errors?.password?.message}
        />
        {/* Confirm Password */}
        <PasswordInput
          name="confirmPassword"
          register={register}
          mandatory={true}
          label="Confirm password"
          error={errors?.confirmPassword?.message}
        />

        {/* Action Button */}
        <button className="btn btn-primary mt-3 w-100" disabled={isLoading}>
          Register {isLoading && <Spinner size="sm" />}
        </button>
        <div className="row justify-content-end">
          <div className="col-auto">
            <button
              className="btn btn-link text-black-50 fs-6"
              type="button"
              onClick={() => RouterService.navigate(navigate, "/login")}
            >
              Already had account ? Sign In here
            </button>
          </div>
        </div>
      </form>
    </FormContainer>
  );
};

export default Register;

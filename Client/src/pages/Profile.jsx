import { Controller, useForm, useWatch } from "react-hook-form";

import { FormContainer, PasswordInput, TextInput } from "../shared";

import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch } from "react-redux";
import * as yup from "yup";

import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../store/slices/userApiSlice";

import { removeCredential, setCredential } from "../store/slices/authSlice";

import { toast } from "react-toastify";

import { useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";
import BooleanCheckbox from "../shared/form-inputs/BooleanCheckboxInput";

const registerValidationSchema = yup.object({
  name: yup.string().trim(),
  email: yup.string().email().trim(),
  updatePassword: yup.boolean().default(false),
});

const Profile = () => {
  // React Hook form
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
    defaultValues: {
      updatePassword: false,
    },
  });

  // React-Hook-Form
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { data, isLoading, isSuccess, isError } = useGetUserQuery();

  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

  // const isUpdatePassword = useWatch({
  //   name: "updatePassword",
  //   control,
  // });

  const errorHandler = () => {
    const timer = setTimeout(() => {
      navigate("/login", {
        replace: true,
      });
      dispatch(removeCredential());
      clearTimeout(timer);
    }, 2000);
  };

  // To Submit Form
  const onSubmit = async (d) => {
    const values = Object.values(getValues());

    if (!values.length) {
      toast.error("please fill at Least one Field");
    }
    try {
      const res = await updateUser({
        _id: data._id,
        ...d,
      }).unwrap();

      // Updating  Data to React Hook Form
      ["name", "email"].forEach((x) => {
        setValue(x, res[x]);
      });

      dispatch(setCredential(res));
      toast.success("User Updated Successfully");
    } catch (error) {
      toast.error(error.data.msg);
      errorHandler();
    }
  };

  if (isError) {
    errorHandler();
  }

  useEffect(() => {
    if (isSuccess) {
      ["name", "email"].forEach((x) => {
        setValue(x, data[x]);
      });
    }
  }, [isSuccess, setValue]);

  return (
    <FormContainer>
      {isLoading && (
        <div className="text-center">
          <Spinner size="lg" />
        </div>
      )}

      {isSuccess && (
        <>
          <div className="row justify-content-between">
            <div className="col-auto">
              <h2>Update Profile</h2>
            </div>
            <div className="col-auto align-self-center">
              <Controller
                name="updatePassword"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <BooleanCheckbox
                    register={register}
                    name="updatePassword"
                    value={value}
                    callback={onChange}
                    label="Change Password ? "
                  />
                )}
              />
            </div>
          </div>
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

            {/* Action Button */}
            <button className="btn btn-primary mt-3 w-100" disabled={updating}>
              Update Profile {updating && <Spinner size="sm" />}
            </button>
          </form>
        </>
      )}

      {isError && (
        <>
          <Alert variant="danger">
            <Alert.Heading>Your session is expired </Alert.Heading>
            <p>Please login again </p>
          </Alert>
        </>
      )}
    </FormContainer>
  );
};

export default Profile;

/*
{isUpdatePassword && (
              <>

                <PasswordInput
                  name="newPassword"
                  register={register}
                  mandatory={true}
                  label="password"
                  error={errors?.password?.message}
                />
                <PasswordInput
                  name="confirmPassword"
                  register={register}
                  mandatory={true}
                  label="Confirm password"
                  error={errors?.confirmPassword?.message}
                />
              </>
            )}
*/

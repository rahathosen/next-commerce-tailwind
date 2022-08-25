import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import { getError } from "../utils/error";
import axios from "axios";
import Layout from "../components/Layout";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
export default function ProfileScreen() {
  const { data: session } = useSession();
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", session.user.name);
    setValue("email", session.user.email);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put("/api/auth/update", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (!result.error) {
        toast.success("Profile updated successfully");
      }
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const [open, setOpen] = useState(false);

  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <Layout title="Profile">
      <Toaster />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        {/* <div className="border-t border-gray-200 pb-5"></div> */}
        {/*  */}
        <div className="bg-white py-8 px-4 pt-2 shadow sm:rounded-lg sm:px-10">
          <div className="pb-5 ">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 mb-5 text-sm text-gray-500">
              Provide your information and update.
            </p>
            <h4>Name: {session.user.name}</h4>
            <h4>Email: {session.user.email}</h4>
          </div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Update Information
            </h3>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  autoFocus
                  {...register("name", {
                    required: "Please enter name",
                  })}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>
            </div>

            {/* <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div> */}

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Please enter email",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "Please enter valid email",
                    },
                  })}
                  autoComplete="email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>
            </div>

            <div className="relative sm:col-span-4 ">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  type={open === false ? "password" : "text"}
                  // placeholder="Enter your password"
                  id="password"
                  {...register("password", {
                    minLength: {
                      value: 6,
                      message: "password is more than 5 chars",
                    },
                  })}
                  autoComplete="password"
                  className="block  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.password && (
                  <div className="text-red-500 ">{errors.password.message}</div>
                )}
              </div>
              <div className="absolute top-[35px] right-5 text-2xl text-gray-600">
                {open === false ? (
                  <EyeIcon className="h-5 w-5" onClick={toggle} />
                ) : (
                  <EyeOffIcon className="h-5 w-5" onClick={toggle} />
                )}
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    validate: (value) => value === getValues("password"),
                    minLength: {
                      value: 6,
                      message: "confirm password is more than 5 chars",
                    },
                  })}
                  autoComplete="password"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.confirmPassword && (
                  <div className="text-red-500 ">
                    {errors.confirmPassword.message}
                  </div>
                )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "validate" && (
                    <div className="text-red-500 ">Password do not match</div>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-black py-2 px-4 text-base font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            update
          </button>
        </div>
        {/*  */}
      </form>
    </Layout>
  );
}

ProfileScreen.auth = true;

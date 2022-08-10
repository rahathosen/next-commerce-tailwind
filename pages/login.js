import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginScreen() {
  const router = useRouter();
  const { redirect } = router.query;
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl font-bold text-neutral-700">Login</h1>
        <div className="mb-4 font-semibold">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "enter the email address",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+$/i,
                message: "invalid email address",
              },
            })}
            id="email"
            className="w-full"
            autoFocus
          />
          {errors.email && (
            <div className="font-normal text-red-500">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="mb-4 font-semibold">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "enter the password",
              minLength: {
                value: 6,
                message: "password is more than 5 character",
              },
            })}
            id="password"
            className="w-full"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4 font-semibold">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4 font-semibold">
          Don&apos;t have an account ? &nbsp;
          <Link href="register">
            <span className="cursor-pointer text-blue-600 hover:text-blue-800">
              Register
            </span>
          </Link>
        </div>
      </form>
    </Layout>
  );
}

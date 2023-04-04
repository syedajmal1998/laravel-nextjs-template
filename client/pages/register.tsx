import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { GoogleIcon } from "icons";
import {
  Input,
  Label,
  Button,
  WindmillContext,
} from "@roketid/windmill-react-ui";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store/store";
import Loading from "~/components/Loading";
import Alert from "~/components/Alert";
import Guest from "~/containers/Guest";
import { useAuth } from "~/hooks/auth";

function CrateAccount() {
  const { mode } = useContext(WindmillContext);
  const imgSource =
    mode === "dark"
      ? "/assets/img/create-account-office-dark.jpeg"
      : "/assets/img/create-account-office.jpeg";
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState<string | null>(null);
  const authHook = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });
  const { login, apiLoading } = authHook;
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      terms: false,
    },
  });
  function onRegister(data) {
    authHook.register({
      ...data,
      setErrors,
      setStatus,
    });
  }
  return (
    <Guest>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="relative h-32 md:h-auto md:w-1/2">
              <Image
                aria-hidden="true"
                className="object-cover w-full h-full"
                src={imgSource}
                alt="Office"
                fill
              />
            </div>
            <main className="relative flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <Loading message="Registering..." show={apiLoading} />
              <form onSubmit={handleSubmit(onRegister)} className="w-full">
                <Alert
                  type="error"
                  message={errors}
                  show={Object.values(errors).length != 0}
                />
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Create account
                </h1>
                <Label>
                  <span>Name</span>
                  <Input
                    {...register("name", { required: true })}
                    className="mt-1"
                    placeholder="John Doe"
                  />
                </Label>
                <Label className="mt-4">
                  <span>Email</span>
                  <Input
                    {...register("email", { required: true })}
                    className="mt-1"
                    type="email"
                    placeholder="john@doe.com"
                  />
                </Label>
                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    {...register("password", { required: true })}
                    className="mt-1"
                    placeholder="***************"
                    type="password"
                  />
                </Label>
                <Label className="mt-4">
                  <span>Confirm password</span>
                  <Input
                    {...register("password_confirmation", { required: true })}
                    className="mt-1"
                    placeholder="***************"
                    type="password"
                  />
                </Label>

                <Label className="mt-6" check>
                  <Input
                    type="checkbox"
                    {...register("terms", { required: true })}
                  />
                  <div className="ml-2">
                    I agree to the{" "}
                    <a
                      target="_blank"
                      href="/terms-of-service"
                      className="text-sm text-gray-600 underline hover:text-gray-900"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      target="_blank"
                      href="/privacy-policy"
                      className="text-sm text-gray-600 underline hover:text-gray-900"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </Label>

                <Button type="submit" block className="mt-4">
                  Create account
                </Button>

                <hr className="my-8" />

                <p className="mt-4">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Already have an account? Login
                  </Link>
                </p>
              </form>
            </main>
          </div>
        </div>
      </div>
    </Guest>
  );
}

export default CrateAccount;

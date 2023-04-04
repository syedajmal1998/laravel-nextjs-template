import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Label,
  Input,
  Button,
  WindmillContext,
} from "@roketid/windmill-react-ui";
import { GoogleIcon } from "icons";
import Guest from "~/containers/Guest";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
// import { loadUser, login } from '~/store/auth/authActions'
import Loading from "~/components/Loading";
import { RootState } from "~/store/store";
import Alert from "~/components/Alert";
import { useAuth } from "~/hooks/auth";

// export const getServerSideProps = wrapper.getServerSideProps(store => ({ req, res }: any) => {
//   console.log(req.cookies, 'all Cookies');
// });
function Login() {
  const { mode } = useContext(WindmillContext);
  const imgSource =
    mode === "dark"
      ? "/assets/img/login-office-dark.jpeg"
      : "/assets/img/login-office.jpeg";
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "admin@me.com",
      password: "password",
      remember: false,
    },
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState<string | null>(null);
  const { login, apiLoading } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });
  function onLogin(data) {
    // return console.log(data);
    login({
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
              <Loading message="Authenticating..." show={apiLoading} />
              <div className="w-full">
                <Alert
                  type="error"
                  message={errors}
                  show={Object.values(errors).length != 0}
                />
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>
                <form onSubmit={handleSubmit(onLogin)}>
                  <Label>
                    <span>Email</span>
                    <Input
                      className="mt-1"
                      type="email"
                      placeholder="john@doe.com"
                      {...register("email", { required: true })}
                    />
                  </Label>
                  <Label className="mt-4">
                    <span>Password</span>
                    <Input
                      className="mt-1"
                      type="password"
                      placeholder="***************"
                      {...register("password", { required: true })}
                    />
                  </Label>
                  <Label className="mt-6" check>
                    <Input type="checkbox" {...register("remember")} />
                    <div className="ml-2">Stay Logged In</div>
                  </Label>
                  <Button className="mt-4" block type="submit">
                    Log in
                  </Button>
                </form>
                <hr className="my-8" />
                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    href="/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </p>
                <p className="mt-1">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    href="/register"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Guest>
  );
}

// Define PropTypes.
Login.propTypes = {
  props: PropTypes.object,
  login: PropTypes.func,
};

export default Login;

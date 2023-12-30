"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { notification, Space } from "antd";
const page = () => {
  const router = useRouter();
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = ({ error }) => {
    api.error({
      message: error,
      description: "Try again",
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className=" animate-ping">Loading...</div>
      </div>
    );
  }
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password: pass,
      redirect: false,
    });
    if (!res.ok) {
      openNotificationWithIcon({ error: res.error });
    }
  };

  return (
    <section className="h-full mt-6">
      <div className="flex justify-center ">
        <div className=" min-w-[35%]">
          <div className="flex min-h-full shadow-lg flex-1 flex-col justify-center px-6 py-11 lg:px-8 bg-white dark:bg-secondary rounded-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              {contextHolder}
              <Space></Space>
              <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                Sign In to Your Account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={loginUser}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@example.com"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={pass}
                      onChange={(e) => {
                        setPass(e.target.value);
                      }}
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Sign In
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500 dark:text-white">
                Don&#39; t have an account?{" "}
                <a
                  href="/signup"
                  className="font-semibold leading-6 text-orange-500 hover:text-orange-300 cursor-pointer"
                >
                  Sign Up
                </a>
              </p>
            </div>
            <div className=" flex flex-row items-center mt-2 ">
              <div className="w-[40%] h-[1px] bg-black dark:bg-white"></div>
              <span className="mx-auto text-black dark:text-white">OR</span>
              <div className="w-[40%] h-[1px] bg-black dark:bg-white"></div>
            </div>
            <div className="mt-3 space-y-3">
              <button
                onClick={(e) => signIn("google")}
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign in with Google
              </button>
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-[#2563EB]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </span>
                Sign in with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;

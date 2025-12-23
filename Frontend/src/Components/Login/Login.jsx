import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "@/Slices/authSlice"; // Import the login action
import Signup from "../Signup/Signup";
import { Dialog, DialogTrigger } from "../ui/dialog";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseSignup = () => setIsSignupOpen(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      if (result.token) {
        localStorage.setItem("authToken", result.token);
        reset();
        navigate("/");
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-white dark:bg-black">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-300 rounded-md shadow-lg md:p-8 dark:bg-black dark:border-gray-500">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className="px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white dark:border-gray-500"
            disabled={isLoading}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:text-white dark:border-gray-500"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Signup Section */}
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
            <DialogTrigger asChild>
              <button
                className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => setIsSignupOpen(true)}
                disabled={isLoading}
              >
                Register
              </button>
            </DialogTrigger>
            <Signup onClose={handleCloseSignup} />
          </Dialog>
        </p>
      </div>
    </div>
  );
}

export default Login;

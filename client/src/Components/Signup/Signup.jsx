import React, { useState } from "react";
import { useForm } from "node_modules/react-hook-form/dist";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom"; // Import navigate

function Signup({ onClose }) {
  // Add onClose prop
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate(); // Initialize navigate
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    reset(); // Clear the form
    setIsLoading(true);
    // onClose(); // Close the dialog
    try {
      const response = await axiosInstance.post("/api/auth/register", data);
      console.log(response);

      // if (response.data && response.data.error) {
      //   return;
      // }

      if (response.data) {
        // localStorage.setItem("token", response.data.accessToken);
        navigate("/"); // Navigate to home
        onClose(); // Close the dialog
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      } else {
        console.log("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="w-11/12 p-8 bg-white rounded-sm dark:bg-black dark:text-white">
      <DialogHeader>
        <DialogTitle className="mb-4 text-2xl text-center text-black dark:text-white">
          Create Account
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label
          htmlFor="username"
          className="font-medium text-black dark:text-white"
        >
          Create a Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          className="px-4 py-2 border border-gray-300 rounded-md dark:bg-black dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}

        <label
          htmlFor="password"
          className="mt-4 font-medium text-black dark:text-white"
        >
          Create a Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="px-4 py-2 border border-gray-300 rounded-md dark:bg-black dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

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
            "Sign Up"
          )}
        </button>
      </form>
    </DialogContent>
  );
}

export default Signup;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import http from "../lib/http";
import { useMutation } from "@tanstack/react-query";
import Urls from "../../config/urls";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../store/useAuth";
import { Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { setLoading, setAuth, setAuthenticated } = useAuth();

  const loginMutation = useMutation({
    mutationFn: (data) => {
      return http.post(Urls.signin, data);
    },
    onSuccess: (res) => {
      const { user, token } = res.data;
      setAuth(user, token);
      setAuthenticated(true);
      localStorage.setItem("authData", JSON.stringify({ user, token }));
      setLoading(false);
      navigate('/app/dashboard');
    },
    onError: (error) => {
      console.log("Login Failed:", error);
      setLoading(false);
    }
  });

  const onSubmit = (data) => {
    setLoading(true);
    loginMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-sm">
                Sign in to continue to your account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 
                      ${errors.email 
                        ? "border-red-500 ring-2 ring-red-100" 
                        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      } outline-none`}
                  />
                  {errors.email && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 pr-10
                      ${errors.password 
                        ? "border-red-500 ring-2 ring-red-100" 
                        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      } outline-none`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent 
                  rounded-lg shadow-sm text-sm font-medium text-white 
                  bg-blue-600 hover:bg-blue-700 focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                  transition-all duration-300 ease-in-out transform 
                  active:scale-95"
              >
                Sign In
              </button>
            </form>

            {/* Signup Link */}
            {/* <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/auth/signup"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
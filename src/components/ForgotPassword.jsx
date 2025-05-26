import React from "react";
import { useForm } from "react-hook-form";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Password reset link sent to:", data.email);
    alert(`Password reset link sent to ${data.email}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-emerald-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center text-emerald-800">
          Forgot Password
        </h2>
        <p className="mt-2 text-sm text-center text-emerald-600">
          Enter your email, and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          {/* Email Input */}
          <div className="mb-4">
            <label className="block mb-1 text-emerald-700">E-mail</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.email ? "border-red-500" : "border-emerald-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login Link */}
        <p className="mt-4 text-sm text-center text-emerald-600">
          Remember your password?{" "}
          <a
            href="/login"
            className="text-emerald-600 hover:underline focus:outline-none"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;

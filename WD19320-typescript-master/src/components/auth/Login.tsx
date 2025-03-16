import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { authServices } from "../../services/auth";
import toast, { Toaster } from "react-hot-toast";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginType = z.infer<typeof LoginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginType>({ resolver: zodResolver(LoginSchema) });

  const handleLogin = async (data: LoginType) => {
    try {
      const dangnhap = await authServices.login(data);
      toast.success("Đăng nhập thanh cong");
   
      // Lưu token vào localStorage
      localStorage.setItem("token", dangnhap.token);

      // Chuyển hướng về trang chủ admin
      navigate("/admin");
    } catch (error) {
      toast.error("Dang nhap that bai. Vui lòng đăng nhập lại");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center">Login</h2>
          <form className="mt-4" onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="w-full p-2 mt-2 border rounded"
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full p-2 mt-2 border rounded"
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <button className="w-full p-2 mt-4 text-white bg-blue-500 rounded">Login</button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;

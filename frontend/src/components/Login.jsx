import React from "react";
import { useForm } from "react-hook-form";
import axios from "../axios.config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/auth/login", data);
      localStorage.setItem("token", response.data.accessToken);
      navigate("/products");
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Credenciales invalidas",
        text: "Probablemente hayas ingresado incorrectamente tu email y/o contraseña.",
      });
    }
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="my-4 text-2xl font-bold">Bienvenido a Lexart Phones</h1>
      <div className="w-96 mx-auto p-4 border  bg-white rounded-lg shadow-md ">
        <h2 className="text-sm mb-4">Ingresa tus credenciales</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { useForm } from "react-hook-form";
import axios from "../axios.config";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    try {
      await axios.post("/products", { ...data, userId });
      await Swal.fire({
        icon: "success",
        title: "Producto creado",
        text: "El producto se ha creado con éxito.",
      });
      reset();
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error al crear el producto",
        text: "Hubo un error al crear el producto. Por favor, inténtalo de nuevo.",
      });
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col justify-center items-center gap-8">
      <Navbar />
      <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Crear Producto</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Modelo
            </label>
            <input
              type="text"
              {...register("model", { required: "El modelo es requerido" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.model && (
              <p className="text-red-500 text-sm">{errors.model.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marca
            </label>
            <input
              type="text"
              {...register("brand", { required: "La marca es requerida" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              {...register("description", {
                required: "La descripción es requerida",
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "El precio es requerido" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Crear Producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;

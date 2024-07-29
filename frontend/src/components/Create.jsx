import React, { useState } from "react";
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

  const [isCreating, setIsCreating] = useState(false);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    try {
      setIsCreating(true);
      await axios.post("/products", { ...data, userId });
      await Swal.fire({
        icon: "success",
        title: "Producto creado",
        text: "El producto se ha creado con éxito.",
      });
      setIsCreating(false);
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
    <div className="max-w-6xl mx-auto flex flex-col justify-center items-center gap-24">
      <Navbar />
      <div className="w-96 border mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Agregar nuevo producto</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700"
            >
              Modelo
            </label>
            <input
              id="model"
              type="text"
              {...register("model", { required: "El modelo es requerido" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.model && (
              <p className="text-red-500 text-sm">{errors.model.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Marca
            </label>
            <input
              id="brand"
              type="text"
              {...register("brand", { required: "La marca es requerida" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <textarea
              rows={3}
              id="description"
              {...register("description", {
                required: "La descripción es requerida",
              })}
              className="resize-none mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Precio
            </label>
            <input
              min={1}
              id="price"
              type="number"
              {...register("price", {
                required: "Precio es requerido",
                min: { value: 1, message: "Precio debe ser mayor o igual a 1" },
              })}
              className="input input-bordered w-full"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
          <button
            disabled={isCreating}
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {isCreating ? "Agregando producto..." : "Agregar producto"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;

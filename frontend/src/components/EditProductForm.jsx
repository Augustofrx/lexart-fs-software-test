import { useForm } from "react-hook-form";
import axios from "../axios.config";
import Swal from "sweetalert2";

const EditProductForm = ({ product, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: product,
  });

  const onSubmit = async (data) => {
    try {
      await axios.put(`/products/${data.id}`, data);

      await Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        text: "El producto se ha actualizado correctamente.",
      });
      onSave();
      onClose();
    } catch (error) {
      console.error("Ocurrio un error al actualizar el producto:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar el producto.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-lg font-bold mb-4">Editar producto</h3>

      <div className="mb-4">
        <label htmlFor="model" className="block text-sm font-medium">
          Modelo
        </label>
        <input
          id="model"
          type="text"
          {...register("model", { required: "Modelo es requerido" })}
          className="input input-bordered w-full"
        />
        {errors.model && (
          <p className="text-red-500 text-sm">{errors.model.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="brand" className="block text-sm font-medium">
          Marca
        </label>
        <input
          id="brand"
          type="text"
          {...register("brand", { required: "Marca es requerida" })}
          className="input input-bordered w-full"
        />
        {errors.brand && (
          <p className="text-red-500 text-sm">{errors.brand.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Descripción
        </label>
        <textarea
          id="description"
          rows={3}
          {...register("description", { required: "Descripción es requerida" })}
          className="textarea textarea-bordered w-full resize-none"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium">
          Precio
        </label>
        <input
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

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="btn btn-error text-white"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn bg-green-400 hover:bg-green-500 text-white"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;

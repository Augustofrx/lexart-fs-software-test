import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "../axios.config";
import Modal from "./Modal";
import EditProductForm from "./EditProductForm";
import Swal from "sweetalert2";
import Navbar from "./Navbar";

const fetchProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
};

const Products = () => {
  const {
    data: products,
    error,
    isLoading,
    refetch,
  } = useQuery("products", fetchProducts);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    refetch();
  };

  const handleDeleteAll = async () => {
    await axios.put(`/products/deleteAll`);
    refetch();
    await Swal.fire({
      icon: "success",
      title: "Productos eliminados",
      text: "Los productos se han eliminado correctamente.",
    });
  };

  const handleLoadTests = async () => {
    await axios.post(`/products/loadTestProducts`);
    refetch();
  };

  const handleDelete = async (productId) => {
    try {
      await axios.put(`/products/deleteOne/${productId}`);
      await Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        text: "El producto se ha eliminado correctamente.",
      });
      refetch();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products?.filter((product) =>
    [product.model, product.brand].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedProducts = filteredProducts?.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (isLoading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error al cargar los productos
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Navbar />
      <div className="max-w-6xl mx-auto border p-4 rounded-lg shadow-md my-4 bg-gray-50">
        <section className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Lista de Smartphones</h2>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteAll}
              className="btn btn-sm btn-error text-white"
            >
              Eliminar todos
            </button>
            <button
              onClick={handleLoadTests}
              className="btn btn-sm btn-success text-white"
            >
              Cargar 50 productos
            </button>
          </div>
        </section>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por modelo o marca..."
            className="input input-bordered w-full mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <section className="w-full flex justify-between items-end">
            <button
              className="btn btn-sm bg-green-500 hover:bg-green-400 border-none text-white"
              onClick={toggleSortOrder}
            >
              Ordenar por precio (
              {sortOrder === "asc" ? "Ascendente ⬆️" : "Descendente ⬇️"})
            </button>
            <span className="text-xs">
              Listando: {sortedProducts.length} productos
            </span>
          </section>
        </div>
        <div className="overflow-x-auto lg:h-[700px]">
          {sortedProducts.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Modelo</th>
                  <th>Marca</th>
                  <th>Descripción</th>
                  <th>
                    Precio
                    <button
                      className="btn btn-sm btn-link ml-2"
                      onClick={toggleSortOrder}
                    >
                      {sortOrder === "asc" ? "⬆️" : "⬇️"}
                    </button>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.model}</td>
                    <td>{product.brand}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-primary mr-2"
                        onClick={() => handleEdit(product)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-error text-white"
                        onClick={() => handleDelete(product.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full h-full relative flex justify-center items-center">
              <span className="text-error font-semibold">
                No se han encontrado productos
              </span>
            </div>
          )}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {selectedProduct && (
            <EditProductForm
              product={selectedProduct}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSave}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Products;

import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "../axios.config";
import Modal from "./Modal";
import EditProductForm from "./EditProductForm";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import DeleteConfirmationForm from "./DeleteConfirmationForm";
import io from "socket.io-client";

const fetchProducts = async (isDeleted) => {
  const response = await axios.get(`/products?isDeleted=${isDeleted}`);
  return response.data;
};

const Products = () => {
  const {
    data: products,
    error,
    isLoading,
    refetch,
  } = useQuery(["products"], () => fetchProducts(false));

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [deleteProgress, setDeleteProgress] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);

  useEffect(() => {
    const socket = io("https://lexart-fs-software-test.vercel.app", {
      transports: ["websocket"],
    });
    socket.on("deleteProgress", ({ progress }) => {
      setDeleteProgress(progress);
      setProgressVisible(true);

      if (progress === 100) {
        setTimeout(() => {
          setProgressVisible(false);
        }, 500);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    refetch();
  };

  const handleDeleteAll = async () => {
    try {
      setIsDeleteAllModalOpen(false);
      await axios.put(`/products/deleteAll`);
      refetch();
    } catch (error) {
      console.error("Error deleting all products:", error);
    }
  };

  const openDeleteAllConfirmModal = () => {
    setIsDeleteAllModalOpen(true);
  };

  const handleLoadTests = async () => {
    await axios.post(`/products/loadTestProducts`);
    refetch();
  };

  const handleDelete = async (productId) => {
    setProductIdToDelete(productId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.put(`/products/deleteOne/${productIdToDelete}`);
      await Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        text: "El producto se ha eliminado correctamente.",
      });
      refetch();
      setIsDeleteModalOpen(false);
      setProductIdToDelete(null);
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
        <section className="flex flex-col justify-between items-center md:items-start mb-4 md:mb-0">
          <div className="flex justify-between items-center md:items-start mb-4 md:mb-0 w-full">
            <h2 className="text-2xl mb-4">Lista de Smartphones</h2>

            <div className="flex gap-2">
              <button
                disabled={sortedProducts.length === 0}
                onClick={openDeleteAllConfirmModal}
                className="btn btn-sm btn-error text-white"
              >
                Eliminar todos
              </button>
              <button
                onClick={handleLoadTests}
                className="btn btn-sm btn-warning"
              >
                Cargar productos de prueba
              </button>
            </div>
          </div>
          {progressVisible && deleteProgress > 0 && (
            <div className="mb-2 rounded-md w-full bg-blue-500 text-white text-center">
              Progreso de eliminación: {deleteProgress}%
            </div>
          )}
        </section>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por modelo o marca..."
            className="input input-bordered w-full mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <section className="w-full flex justify-between items-center md:items-end">
            <button
              className="btn btn-xs md:btn-sm bg-green-500 hover:bg-green-400 border-none text-white"
              onClick={toggleSortOrder}
              disabled={sortedProducts.length === 0}
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
                    <span>Precio</span>
                    <button
                      className="btn btn-sm btn-link ml-2"
                      onClick={toggleSortOrder}
                      disabled={sortedProducts.length === 0}
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
            <div className="w-full h-full flex justify-center items-center text-center">
              <span>No se encontraron productos.</span>
            </div>
          )}
        </div>
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

      <DeleteConfirmationForm
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        context={
          "¿Estás seguro de que deseas eliminar este producto? Esta acción es irreversible."
        }
      />

      <DeleteConfirmationForm
        isOpen={isDeleteAllModalOpen}
        onClose={() => setIsDeleteAllModalOpen(false)}
        onConfirm={handleDeleteAll}
        context={
          "¿Estás seguro de que deseas eliminar todos los productos? Esta acción es irreversible."
        }
      />
    </div>
  );
};

export default Products;

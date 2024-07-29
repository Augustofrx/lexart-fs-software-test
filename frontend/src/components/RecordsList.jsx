import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "../axios.config";
import Navbar from "./Navbar";

const fetchProducts = async (isDeleted) => {
  const response = await axios.get(`/products?isDeleted=${isDeleted}`);
  return response.data;
};

const RecordsList = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery(["products"], () => fetchProducts(true));

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

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
          <h2 className="text-2xl  mb-4">Lista de productos eliminados</h2>
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
              disabled={sortedProducts?.length === 0}
            >
              Ordenar por precio (
              {sortOrder === "asc" ? "Ascendente ⬆️" : "Descendente ⬇️"})
            </button>
            <span className="text-xs">
              Listando: {sortedProducts?.length} productos
            </span>
          </section>
        </div>
        <div className="overflow-x-auto lg:h-[700px]">
          {sortedProducts?.length > 0 ? (
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
                      disabled={sortedProducts?.length === 0}
                    >
                      {sortOrder === "asc" ? "⬆️" : "⬇️"}
                    </button>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts?.map((product) => (
                  <tr key={product.id}>
                    <td>{product.model}</td>
                    <td>{product.brand}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : isLoading ? (
            <div className="w-full h-full flex justify-center items-center text-center">
              <span>Cargando productos...</span>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-center">
              <span>No se encontraron productos.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordsList;

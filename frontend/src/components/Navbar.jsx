import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full mt-1 py-4 bg-gray-50 rounded-lg shadow-md flex items-center justify-between px-4">
      <div>
        <p className="text-xl font-semibold text-blue-900">Lexart</p>
      </div>
      <div className="flex gap-4 font-semibold">
        <a href="/products" className=" text-blue-600">
          Productos
        </a>
        |
        <a className="  text-blue-600" href="/create">
          Agregar Producto
        </a>
        |
        <a className="  text-blue-600" href="/records-list">
          Registros
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

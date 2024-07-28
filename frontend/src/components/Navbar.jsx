import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full md:mt-1 py-2 md:py-4 bg-gray-50 rounded-b-lg md:rounded-lg shadow-md flex items-center justify-between px-4">
      <div>
        <p className="text-xl font-semibold">Lexart</p>
      </div>
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <div
        className={`lg:flex lg:gap-4 font-semibold ${
          isMenuOpen
            ? "absolute flex justify-center rounded-md shadow-md bg-gray-50 top-9 py-2 left-0 w-full gap-2"
            : "hidden"
        } lg:relative flex gap-2`}
      >
        <a
          href="/products"
          className="text-blue-700 text-sm md:text-md flex gap-2 justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="blue"
              d="M10 20h4v-1h-4zm-3 3q-.825 0-1.412-.587T5 21V3q0-.825.588-1.412T7 1h10q.825 0 1.413.588T19 3v18q0 .825-.587 1.413T17 23zm0-7h10V6H7z"
            ></path>
          </svg>
          Productos
        </a>
        <span className="text-gray-300 inline">|</span>
        <a
          className="text-blue-700 text-sm md:text-md flex gap-2 justify-center items-center"
          href="/create"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path fill="blue" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path>
          </svg>
          Agregar Producto
        </a>
        <span className="text-gray-300 inline">|</span>
        <a
          className="text-blue-700 text-sm md:text-md flex gap-2 justify-center items-center"
          href="/records-list"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="blue"
              d="M7 6v13zm4.25 15H7q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v4.3q-.425-.125-.987-.213T17 10V6H7v13h3.3q.15.525.4 1.038t.55.962M9 17h1q0-1.575.5-2.588L11 13.4V8H9zm4-5.75q.425-.275.963-.55T15 10.3V8h-2zM17 22q-2.075 0-3.537-1.463T12 17t1.463-3.537T17 12t3.538 1.463T22 17t-1.463 3.538T17 22m1.65-2.65l.7-.7l-1.85-1.85V14h-1v3.2z"
            ></path>
          </svg>
          Registros
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

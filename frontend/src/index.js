import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import "./index.css";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

root.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);

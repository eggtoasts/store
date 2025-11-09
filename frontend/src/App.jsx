import { useState } from "react";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { useThemeStore } from "./store/useThemeStore";
import PracticeUser from "./PracticeUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PracticeUser />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
]);

function App() {
  const { theme } = useThemeStore();
  return (
    <div
    // className="min-h-screen bg-base-200 transition-colors"
    // data-theme={theme}
    >
      <RouterProvider router={router} />
    </div>
  );
}
export default App;

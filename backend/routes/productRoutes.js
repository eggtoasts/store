import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRoutes = express.Router();

//get and post methods
productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProduct);
productRoutes.post("/", createProduct);
productRoutes.post("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;

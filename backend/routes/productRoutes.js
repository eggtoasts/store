import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";

const productRoutes = express.Router();

//get
productRoutes.get("/", createProduct);

//post
productRoutes.post("/", getAllProducts);

export default productRoutes;

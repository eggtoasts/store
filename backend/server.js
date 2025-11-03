import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
console.log(PORT);

app.use(express.json());
app.use(cors());
app.use(helmet()); // security middleware to protect the app by setting HTTP headers
app.use(morgan("dev")); //log requests to console

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});

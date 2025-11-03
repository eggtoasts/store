import { sql } from "../config/db.js";

//All the CRUD operations for our DB
export const getProducts = async (req, res) => {
  try {
    //We select all items in product table ordered by latest creation date
    const products = await sql`SELECT * FROM products
        ORDER BY created_at DESC
        `;

    console.log("get products", products);
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.log("Error getProducts", err);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const createProduct = async (req, res) => {
  //User will put these info in the request body.
  const { name, price, image } = req.body;
  console.log(name, price, image);

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newProduct = await sql`INSERT INTO products (name,price,image)
    VALUES (${name},${price},${image})
    RETURNING *
    `;

    console.log("new product added: ", newProduct);
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.log("Error createProduct", err);
    res.status(500).json({ success: false, message: "server error" });
  }
};

//Gets product w/ specified id
export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`SELECT * FROM products WHERE id = ${id}`;

    res.status(200).json({ success: true, data: product[0] });
  } catch (err) {
    console.log("Error getProduct", err);
    res.status(500).json({ success: false, message: "server error" });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const updateProduct = await sql`
        UPDATE products
        SET name=${name}, price = ${price}, image = ${image}
        WHERE id=${id}
        RETURNING *
    `;

    console.log(updateProduct.length);

    if (updateProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({ success: true, data: updateProduct });
  } catch (err) {
    console.log("Error updateProduct", err);
    res.status(500).json({ success: false, message: "server error" });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await sql`
        DELETE FROM products WHERE id = ${id}
        RETURNING *
        `;

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (err) {
    console.log("Error deleteProduct", err);
    res.status(500).json({ success: false, message: "server error" });
  }
};

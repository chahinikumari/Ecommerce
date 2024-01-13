import express from "express";
const router = express.Router();
import { getProducts, getProductDetails, newProducts,updateProduct, deleteProduct } from "../controller/productController.js";

router.route("/products").get(getProducts);
router.route("/admin/products").post(newProducts);
router.route("/products/:id").get(getProductDetails);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProduct);



export default router;
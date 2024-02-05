import express from "express";
const router = express.Router();
import { getProducts, getProductDetails, newProducts,updateProduct, deleteProduct } from "../controller/productController.js";
import { isAuthenticate,authorizeRoles } from "../middlewares/auth.js";
//import{getProducts,newProducts,getProductDetails, updateProduct, deleteProduct } from "../controller/productController.js"
router.route("/products").get(getProducts);
//router.route("/admin/products").post(newProducts)
router.route("/admin/products").post(isAuthenticate,authorizeRoles("admin"),newProducts);
router.route("/products/:id").get(getProductDetails);
//router.route("/admin/products/:id").put(updateProduct);
//router.route("/admin/products/:id").delete(deleteProduct);
router.route("/admin/products/:id").put(isAuthenticate,authorizeRoles("admin"),updateProduct);
router.route("/admin/products/:id").delete(isAuthenticate,authorizeRoles("admin"),deleteProduct);



export default router;
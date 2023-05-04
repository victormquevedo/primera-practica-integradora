import { Router } from "express";
import {
	createNewProduct,
	deleteProduct,
	getAll,
	getProductById,
	updateProduct,
} from "../../controllers/productController.js";

const router = Router();

router
	.get("/", (req, res) => {
		getAll(req, res);
	})
	.get("/:id", (req, res) => {
		getProductById(req, res);
	})
	.post("/", (req, res) => {
		createNewProduct(req, res);
	})
	.put("/:id", (req, res) => {
		updateProduct(req, res);
	})
	.delete("/:id", (req, res) => {
		deleteProduct(req, res);
	});

export default router;

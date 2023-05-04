import { Router } from "express";
import {
	createNewCart,
	createProductInCart,
	deleteCart,
	getAll,
	getCartById,
	updateCart,
} from "../../controllers/cartController.js";

const router = Router();

router
	.get("/", (req, res) => {
		getAll(req, res);
	})
	.get("/:cid", (req, res) => {
		getCartById(req, res);
	})
	.post("/", (req, res) => {
		createNewCart(req, res);
	})
	.post("/:cid/products/:pid", (req, res) => {
		createProductInCart(req, res);
	})
	.put("/:cid", (req, res) => {
		updateCart(req, res)
	})
	.put("/:cid/products/:pid", (req, res) => {
		updateCart(req, res)
	})
	.delete("/:cid/products/:pid", (req, res) => {
		deleteCart(req, res);
	})
	.delete("/:cid", (req, res) => {
		deleteCart(req, res);
	});

export default router;

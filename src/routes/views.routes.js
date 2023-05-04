import { Router } from "express";
import ProductManager from "../dao/filesystem/productManager.js";
// import { fetchProducts } from "../public/js/product.js";
import { productsMongo } from "../dao/models/products.model.js";
import { createProductInCart } from "../controllers/cartController.js";
import CartManager from "../dao/db/cartsManager.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get("/", async (request, response) => {
	const products = await productManager.getProducts();
	response.render("home", { products });
});

router.get("/realtimeproducts", async (request, response) => {
	const products = await productManager.getProducts();
	response.render("realTimeProducts", { products });
});

router.get("/products", async (req, res) => {
	try {
		const { page = 1, limit = 10 } = req.query;
		const products = await productsMongo.paginate(
			{},
			{ page, limit, lean: true }
		);
		res.render("products", { products });
	} catch (error) {
		console.error(error);
		res.status(500).send("Error fetching products");
	}
});

router.get("/carts/:cid", async (req, res) => {
	// probar :cid = 644d9bd2ec8f54b9724acf3c
	try {
		const { cid } = req.params;
		let cart = await cartManager.getCartById(cid);
		res.render("carts", { cart: cart.toJSON() });
	} catch {}
});

export default router;

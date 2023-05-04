import { Router } from "express";
import ProductManager from "../../dao/filesystem/productManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (request, response) => {
	const { limit } = request.query;
	const products = await productManager.getProducts();
	const limitProducts = products.slice(0, limit);
	limit ? response.send(limitProducts) : response.send(products);
});

router.get("/:pid", async (request, response) => {
	const product = await productManager.getProductById(
		Number.parseInt(request.params.pid)
	);
	response.send(product);
});

router.post("/", async (request, response) => {
	const {
		title,
		description,
		code,
		price,
		status,
		stock,
		category,
		thumbnail,
	} = request.body;
	const product = await productManager.addProduct({
		title: title,
		description: description,
		code: code,
		price: price,
		status: status,
		stock: stock,
		category: category,
		thumbnail: thumbnail,
	});
	response.send(product);
});

router.put("/:pid", async (request, response) => {
	const {
		title,
		description,
		code,
		price,
		status,
		stock,
		category,
		thumbnail,
	} = request.body;
	const product = await productManager.updateProduct(
		Number.parseInt(request.params.pid),
		{
			title: title,
			description: description,
			code: code,
			price: price,
			status: status,
			stock: stock,
			category: category,
			thumbnail: thumbnail,
		}
	);
	response.send(product);
});

router.delete("/:pid", async (request, response) => {
	const product = await productManager.deleteProduct(
		Number.parseInt(request.params.pid)
	);
	response.send(product);
});

export default router;

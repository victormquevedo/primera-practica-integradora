import { Router } from "express";
import CartManager from "../../dao/filesystem/cartsManager.js";
import { getCartById } from "../../controllers/cartController.js";

const router = Router();
const cartsRouter = new CartManager();

router.post("/", async (request, response) => {
	try {
		const cart = await cartsRouter.createCart();
		response
			.status(200)
			.send({ status: "success", message: "Cart created", carts: cart });
	} catch (error) {
		response.status(400).send({ status: "error", message: error.message });
	}
});

router.get("/:cid", () => {
	getCartById();
});

router.post("/:cid/product/:pid", async (request, response) => {
	try {
		const cartProduct = await cartsRouter.addProductToCart(
			request.params.cid,
			request.params.pid
		);
		response
			.status(200)
			.send({ status: "success", message: "Cart founded", carts: cartProduct });
	} catch (error) {
		response.status(400).send({ status: "error", message: error.message });
	}
});

export default router;

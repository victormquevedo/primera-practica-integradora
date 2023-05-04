import CartManager from "../dao/db/cartsManager.js";

const cartManager = new CartManager();

const createNewCart = async (req, res) => {
	try {
		const cart = await cartManager.createNewCart();
		res
			.status(200)
			.send({ status: "success", message: "Cart created", carts: cart });
	} catch (error) {
		res.status(400).send({ status: "error", message: error.message });
	}
};

const getAll = async (req, res) => {
	try {
		const cart = await cartManager.getAll();
		res.status(200).send(cart);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

const getCartById = async (req, res) => {
	try {
		const cartId = await cartManager.getCartById(req.params.cid);
		if (!cartId) {
			throw new Error(`Cart wiht ID: ${req.params.cid} not founded`);
		}
		res
			.status(200)
			.send({ status: "success", message: "Cart founded", cart: cartId });
	} catch (error) {
		console.log(error);
		res.status(404).send({ status: "error", message: error.message });
	}
};

const createProductInCart = async (req, res) => {
	try {
		const cartProduct = await cartManager.createProductInCart(
			req.params.cid,
			req.params.pid
		);
		res
			.status(200)
			.send({ status: "success", message: "Cart founded", carts: cartProduct });
	} catch (error) {
		console.log(error);
		res.status(400).send({ status: "error", message: error.message });
	}
};

const deleteCart = async (req, res) => {
	try {
		if (req.params.pid && req.params.cid) {
			const productDeleted = await cartManager.deleteCart(
				req.params.cid,
				req.params.pid
			);
			res.status(200).send(productDeleted);
		} else if (!req.params.pid && req.params.cid) {
			const productDeleted = await cartManager.deleteCart(req.params.cid);
			res.status(200).send(productDeleted);
		} else {
			throw new Error(`Product ID: ${req.params.pid} not found`);
		}
	} catch (error) {
		console.log(error);
		res.status(400).send({ status: "error", message: error.message });
	}
};

const updateCart = async (req, res) => {
	try {
		if (!req.params.pid) {
			const cart = await cartManager.updateCart(req.params.cid, req.body);
			console.log(cart);
			res
				.status(200)
				.send({ status: "success", message: "Cart updated", carts: cart });
		} else if (req.params.pid && req.params.cid) {
			const cart = await cartManager.updateQuantityCart(req.params, req.body);
			res
				.status(200)
				.send({ status: "success", message: "Cart updated", carts: cart });
		} else {
			throw new Error(
				`Product ID: ${req.params.pid} in Cart ID: ${req.params.cid} not found`
			);
		}
	} catch (error) {
		res.status(400).send({ status: "error", message: error.message });
	}
};

export {
	getAll,
	getCartById,
	createNewCart,
	createProductInCart,
	deleteCart,
	updateCart,
};

import { productsMongo } from "../dao/models/products.model.js";

const getAll = async (req, res) => {
	const {
		limit = 10,
		page = 1,
		sort,
		_id,
		title,
		description,
		code,
		status,
		price,
		stock,
		category,
	} = req.query;
	const filter = {};
	_id && (filter._id = _id);
	title && (filter.title = title);
	description && (filter.description = description);
	code && (filter.code = code);
	price && (filter.price = price);
	status && (filter.status = status);
	stock && (filter.stock = stock);
	category && (filter.category = category);
	const option = {
		limit: parseInt(limit),
		page: parseInt(page),
		sort: sort && { price: sort === "asc" ? 1 : -1 },
	};

	try {
		const products = await productsMongo.paginate(filter, option);
		const objeto = products.docs.map((producto) => producto);

		const responseObj = {
			status: "success",
			message: "Query finished",
			payload: objeto,
			totalPages: products.totalPages,
			prevPage: products.prevPage,
			nextPage: products.nextPage,
			page: products.page,
			hasPrevPage: products.hasPrevPage,
			hasNextPage: products.hasNextPage,
			prevLink: products.hasPrevPage,
			nextLink: products.hasNextPage,
		};
		res.status(200).send(responseObj);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: "No se pudo obtener los datos con Mongoose",
			message: error,
		});
	}
};

const getProductById = async (req, res) => {
	try {
		let product = await productsMongo.findById(req.params.id);
		res.send(product);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: "No se pudo obtener los datos de ese producto con Mongoose",
			message: error,
		});
	}
};

const createNewProduct = async (req, res) => {
	try {
		const {
			title,
			description,
			code,
			price,
			status,
			stock,
			category,
			thumbnail,
		} = req.body;
		const product = await productsMongo.create({
			title,
			description,
			code,
			price,
			status,
			stock,
			category,
			thumbnail,
		});
		res.status(201).send(product);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: "No se pudo crear el producto con Mongoose",
			message: error,
		});
	}
};

const updateProduct = async (req, res) => {
	try {
		const productUpdated = req.body;
		const product = await productsMongo.updateOne(
			{ _id: req.params.id },
			productUpdated
		);
		console.log(product);
		res.status(202).send(product);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: "No se pudo actualizar el producto con Mongoose",
			message: error,
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		const productDeleted = await productsMongo.deleteOne({
			_id: req.params.id,
		});
		res.status(200).send(productDeleted);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: "No se pudo eliminar el producto con Mongoose",
			message: error,
		});
	}
};

export {
	getAll,
	getProductById,
	createNewProduct,
	updateProduct,
	deleteProduct,
};

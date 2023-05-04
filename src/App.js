import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import productsRouter from "./routes/products/productsMongo.routes.js";
import cartsRouter from "./routes/carts/cartsMongo.routes.js";
import messageView from "./routes/messages/messages.routes.js";
import MessageManager from "./controllers/messageManager.js";
import views from "./routes/views.routes.js";

const app = express();
const messageManager = new MessageManager();

app.set("port", process.env.PORT || 8080);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = handlebars.create({ allowProtoMethodsByDefault: true });
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/messages", messageView);
app.use("/", views);

const httpServer = app.listen(app.get("port"), () => {
	console.log(`Server PORT: ${app.get("port")}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
	console.log("Nuevo cliente conectado");

	socket.on("dataUser", async (data) => {
		try {
			await messageManager.createData(data);
		} catch (error) {
			console.log(error);
		}
	});
});

const DB =
	"mongodb+srv://papu:OnoNAezfs2siorXy@ecommerce.6g4ke0l.mongodb.net/ecommerce?retryWrites=true&w=majority";
const connectMongoDB = async () => {
	try {
		await mongoose.connect(DB);
		console.log("Conectado a MongoDB con Mongoose");
	} catch (error) {
		console.log("No se pudo conectar a la BD con Mongoose");
		process.exit();
	}
};

connectMongoDB();

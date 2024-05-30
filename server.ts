import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: true,
		methods: ["GET", "POST"]
	}
});

let data = "";

app.get("/", (req, res) => {
	console.count("client connected");
});

io.on("connection", socket => {
	socket.emit("text-update", data);
	socket.on("text-update", data => {
		socket.broadcast.emit("text-update", data);
	});
});

httpServer.listen(3001, () => {
	console.log("Server is running on http://localhost:3001");
});

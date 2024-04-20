import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

throw new Error();

const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
	const httpServer = createServer(handler);

	const io = new Server(httpServer);

	io.on("connection", (socket) => {
		console.log("connection");
		// ...
		setTimeout(() => {
			console.log("data");
			io.emit("scan", "0");
		}, 1000);
	});

	console.error("hi");
	httpServer
		.once("error", (err) => {
			console.error(err);
			process.exit(1);
		})
		.listen(port, () => {
			console.log(`> Ready on http://${hostname}:${port}`);
		});
});

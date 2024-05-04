import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { DataType, close, load, open } from "ffi-rs";
import { feed, users } from "./controllers";

const app = new Elysia()
	.get("/", () => "Hello Elysia")
	.get("/sum/:a/:b", ({ params: { a, b } }) => {
		const platform = process.platform;
		const dynamicLib = platform === "win32" ? "./sum.dll" : "./libsum.so";

		open({
			library: "libsum",
			path: dynamicLib,
		});

		const sum = load({
			library: "libsum",
			funcName: "get_harddisk_avail",
			retType: DataType.I32,
			paramsType: [],
			paramsValue: [],
		});

		close("libsum");

		return `${Math.abs(sum / 1024)}`;
	})
	.use(swagger())
	.use(cors())
	.use(users)
	.use(feed)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

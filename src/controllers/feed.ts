import { Elysia, t } from "elysia";

const feed = new Elysia().get("/json", {
	hello: "world",
});

export default feed;

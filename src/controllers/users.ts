import { Elysia, t } from "elysia";

const users = new Elysia()
	.get("/id/:id", ({ params: { id } }) => id)
	.post(
		"/profile",
		// ↓ hover me ↓
		({ body }) => body,
		{
			body: t.Object({
				username: t.String(),
			}),
		},
	);

export default users;

import { createApp } from "./app";

const port = Number(process.env.PORT ?? 3000);
const app = createApp().listen(port)

console.log(`🦊 Chat server on ws://${app.server?.hostname}:${app.server?.port}/ws`);
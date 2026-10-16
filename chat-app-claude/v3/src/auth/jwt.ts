import { Elysia } from "elysia";
import { jwt } from "@elysia/jwt";

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("JWT_SECRET is not set");

export const jwtSetup = new Elysia().use(
  jwt({
    name: "jwt",
    secret,
    exp: "1h",
  }),
);

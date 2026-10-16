import { connect } from "./helpers";

export function post(url: string, data: unknown) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function registerAndLogin(httpUrl: string, username: string, password = "password123") {
  await post(`${httpUrl}/auth/register`, { username, password });
  const res = await post(`${httpUrl}/auth/login`, { username, password });
  const body = await res.json();
  return body.token as string;
}

export async function connectAs(port: number, username: string) {
  const token = await registerAndLogin(`http://localhost:${port}`, username);
  const client = await connect(`ws://localhost:${port}/ws?access_token=${token}`);
  await client.next(); // welcome
  return client;
}
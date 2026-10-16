export class UnauthorizedError extends Error {
  status = 401;

  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }

  // When this error is thrown, Elysia calls toResponse() to build the reply.
  toResponse() {
    return Response.json({ error: this.message }, { status: 401 });
  }
}
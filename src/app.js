import dotenv from "dotenv";
dotenv.config();

import fastify from "fastify";
import { createUser, loginUser } from "./controllers/user-controller.js";

const makeApp = (options = {}) => {
  const app = fastify(options);

  app.get("/", async (request, reply) => {
    return { message: "Hello, World" };
  });

  app.route({
    method: "POST",
    url: "/api/users",
    handler: createUser,
  });

  app.route({
    method: "POST",
    url: "/api/users/login",
    handler: loginUser,
  });

  return app;
};

export { makeApp };

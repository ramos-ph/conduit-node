require("dotenv").config();

const fastify = require("fastify");
const userController = require("./controllers/user-controller");

const makeApp = (options = {}) => {
  const app = fastify(options);

  app.get("/", async (request, reply) => {
    return { message: "Hello, World" };
  });

  app.route({
    method: "POST",
    url: "/api/users",
    handler: userController.create,
  });

  app.route({
    method: "POST",
    url: "/api/users/login",
    handler: userController.login,
  });

  return app;
};

module.exports = makeApp;

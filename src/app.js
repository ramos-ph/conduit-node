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

  return app;
};

module.exports = makeApp;

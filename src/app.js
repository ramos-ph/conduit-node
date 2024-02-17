const fastify = require("fastify");

const makeApp = (options = {}) => {
  const app = fastify(options);

  app.get("/", async (request, reply) => {
    return { message: "Hello, World" };
  });

  return app;
};

module.exports = makeApp;

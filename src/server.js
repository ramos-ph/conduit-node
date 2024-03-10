import { sequelize } from "./database/sequelize.js";
import { makeApp } from "./app.js";

const start = async () => {
  const server = makeApp({ logger: true });
  try {
    await sequelize.authenticate();
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

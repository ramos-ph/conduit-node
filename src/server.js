const sequelize = require("./database/sequelize");

const server = require("./app")({ logger: true });

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

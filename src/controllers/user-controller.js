const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { Profile } = require("../models/profile");

module.exports = {
  async create(request, reply) {
    const { username, email, password } = request.body.user;

    const passwordHash = crypto
      .pbkdf2Sync(password, process.env.SALT, 100_000, 64, "sha512")
      .toString("hex");

    const user = await Profile.create({ username, email, passwordHash });

    reply.status(201);

    return {
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        image: user.image,
        token: jwt.sign({ sub: user.id }, process.env.ACCESS_TOKEN_SECRET),
      },
    };
  },

  async login(request, reply) {
    const { email, password } = request.body.user;

    const passwordHash = crypto
      .pbkdf2Sync(password, process.env.SALT, 100_000, 64, "sha512")
      .toString("hex");

    const user = await Profile.findOne({ where: { email, passwordHash } });

    if (!user) {
      reply.status(404);

      return {
        error: {
          message: "Incorrect e-mail or password",
        },
      };
    }

    return {
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        image: user.image,
        token: jwt.sign({ sub: user.id }, process.env.ACCESS_TOKEN_SECRET),
      },
    };
  },
};

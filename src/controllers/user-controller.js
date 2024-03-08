const jwt = require("jsonwebtoken");

const { Profile } = require("../models/profile");

module.exports = {
  async create(request, reply) {
    const { username, email, password } = request.body.user;

    // temporarily encoding it as base64
    const passwordHash = Buffer.from(password).toString("base64");

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
};

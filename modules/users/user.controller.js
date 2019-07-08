const config = require("config");
const { ObjectId } = require("mongoose").Types;

const appSecret = config.get("app.secret");
const Token = require("../../utils/tokenManager");
const SecureCrypto = require("../../utils/encrypt_decrypt");
const UserModel = require("./user.model");

const tokenManager = new Token({ appSecret });

const throwErr = err => {
  throw Error(err);
};

class UserController {
  constructor() {
    this.jwtDuration = 1000 * 60 * 2;
  }

  async authenticate({ username, password }) {
    let user = await this.verifyLogin({ username, password });
    let token = await this.generateToken(user);
    user.token = token;
    return user;
  }

  async createUsingEmail(userPayload) {
    if (!userPayload.email) throwErr("Email is required for registration");

    userPayload = Object.assign(
      {},
      {
        name: userPayload.name,
        password: userPayload.password,
        gender: userPayload.gender,
        email: userPayload.email,
        phone: userPayload.phone,
        username: userPayload.email
      }
    );

    let password = await SecureCrypto.saltAndHash(userPayload.password);
    userPayload.password = {
      hash: password.hash.toString("base64"),
      salt: password.salt.toString("base64")
    };

    return UserModel.create(userPayload);
  }

  async getByUsername({ username }) {
    return UserModel.findOne({ username: username });
  }

  async generateToken(user) {
    let data = {
      user_id: user._id,
      roles: user.roles,
      name: user.name
    };
    return tokenManager.generate(data, this.jwtDuration);
  }

  login({ username, password }) {
    return this.authenticate({ username, password });
  }

  validateToken(token) {
    return tokenManager.validate(token);
  }

  async verifyLogin({ username, password, type }) {
    try {
      if (!username) throw "UserName is required";
      if (!password) throw "Password is required";
      let user = await this.getByUsername({ username });
      password = await SecureCrypto.hash(password, Buffer.from(user.password.salt, "base64"));
      if (user.password.hash !== password.hash.toString("base64"))
        throw Error("Invalid Login Options");
      user.password = null;

      return user;
    } catch (e) {
      return e;
    }
  }
}

module.exports = new UserController();

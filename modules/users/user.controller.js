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
}

module.exports = new UserController();

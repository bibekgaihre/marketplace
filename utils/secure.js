const jwt = require("jsonwebtoken");
const config = require("config");

const { ERR } = require("./error");
const UserController = require("../modules/users/user.controller");

//please update based on permissions

const SecureAPI = (...roles) => {
  return (req, res, next) => {
    let token = req.body.access_token || req.query.access_token || req.headers["access_token"];
    if (!token) throw ERR.TOKON_REQ;
    console.log(token);

    UserController.validateToken(token)
      .then(token => {
        req.tokenData = token.data;
        let user_roles = token.data.roles || [];
        if (roles.length > 0) {
          if (!checkPermission(user_roles, roles)) throw ERR.UNAUTHORIZED;
        }
        next();
      })
      .catch(next);
  };
};

const SecureUI = (...roles) => {
  return (req, res, next) => {
    var token =
      req.cookies.access_token ||
      req.query.access_token ||
      req.body.access_token ||
      req.headers["access_token"];
    if (!token) {
      res.redirect("/login");
      return;
    }

    UserController.validateToken(token)
      .then(token => {
        req.tokenData = token.data;
        let user_roles = token.data.roles || [];
        if (perms.length > 0) {
          if (!checkPermission(user_roles, roles)) {
            res.redirect("/unauthorized");
            return;
          }
        }
        next();
      })
      .catch(err => {
        res.clearCookie("redirect_url");
        res.redirect("/login");
        return;
      });
  };
};

const checkPermission = (user_roles, access_roles) => {
  if (access_roles.length == 0) return true;
  return user_roles.some(v => access_roles.indexOf(v) !== -1);
};

module.exports = { SecureUI, SecureAPI };

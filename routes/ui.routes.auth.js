const router = require("express").Router();
const UserController = require("../modules/users/user.controller");

router.post("/login_process", async (req, res, next) => {
  try {
    let user = await UserController.login(req.body);
    let tokenData = await UserController.validateToken(user.token);
    res.cookie("access-token", user.token);
    res.cookie("user", JSON.stringify(user));
    res.json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

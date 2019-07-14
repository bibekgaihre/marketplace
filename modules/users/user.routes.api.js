const router = require("express").Router();
const UserController = require("./user.controller");

const { SecureAPI } = require("../../utils/secure");

router.post("/", SecureAPI(), (req, res, next) => {
  let payload = req.body;
  UserController.createUsingEmail(payload)
    .then(d => res.json(d))
    .catch(e => next(e));
});

module.exports = router;

const router = require("express").Router();
const UserController = require("./user.controller");

router.post("/", (req, res, next) => {
  let payload = req.body;
  UserController.createUsingEmail(payload)
    .then(d => res.json(d))
    .catch(e => next(e));
});

module.exports = router;

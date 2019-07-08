const router = require("express").Router();
const { SecureUI } = require("../utils/secure");

const AuthRouter = require("./ui.routes.auth");

router.use("/", AuthRouter);

module.exports = router;

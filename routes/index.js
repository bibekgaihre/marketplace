const router = require("express").Router();

const apiRouter = require("./api");
const uiRouter = require("./ui");

router.use("/api/v1", apiRouter);
router.use("/", uiRouter);

router.get("/login", (req, res, next) => {});

router.get("/logout", (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;

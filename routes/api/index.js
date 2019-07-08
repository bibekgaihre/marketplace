const apiRouter = require("express").Router();
const usersRouter = require("../../modules/users/user.routes.api");

apiRouter.use("/users", usersRouter);

module.exports = apiRouter;

const apiRouter = require("express").Router();
const usersRouter = require("../../modules/user/user.routes.api");
const productRouter = require("../../modules/products/products.routes.api");

apiRouter.use("/products", productRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;

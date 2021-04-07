const {Router} = require("express");
const UsersController = require("../controllers/UsersController");

let defaultRouter = Router();

defaultRouter.post("/register", UsersController.register);
defaultRouter.post("/login", UsersController.login);

module.exports = defaultRouter;

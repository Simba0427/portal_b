const {Router} = require("express");
const UserController = require("../controllers/UsersController");
const MiddlewareLogin = require("../middleware/MidLogin");

let defaultRouter = Router();
defaultRouter.use(MiddlewareLogin);

defaultRouter.post("/", UserController.getUsers);
defaultRouter.get("/${id}", UserController.getUserById);
defaultRouter.post("/update", UserController.updateUser);
defaultRouter.post("/reset-password", UserController.resetPassword);
defaultRouter.post("/recover-password", UserController.recoverPassword);
defaultRouter.post("/delete", UserController.deleteUser);
defaultRouter.post("/email-send", UserController.emailSend);

// active member router

module.exports = defaultRouter;

const {Router} = require("express");
const ReportController = require("../controllers/ReportsController");
const MiddlewareLogin = require("../middleware/MidLogin");

let defaultRouter = Router();
defaultRouter.use(MiddlewareLogin);

defaultRouter.post("/", ReportController.getReports);
defaultRouter.get("/${id}", ReportController.getReportById);
defaultRouter.post("/create", ReportController.createReport);
defaultRouter.post("/update", ReportController.updateReport);
defaultRouter.post("/delete", ReportController.deleteReport);
defaultRouter.post("/uploadFile", ReportController.uploadFiles);

module.exports = defaultRouter;

const {Router} = require("express");
const OfficerndController = require("../controllers/OfficerndController");
const MemberController = require("../controllers/MemberController");
const OfficesController = require("../controllers/OfficesController");
const ReportsApiController = require("../controllers/ReportsApiController");
const PaymentsController = require("../controllers/PaymentsController");
const MembershipsController = require("../controllers/MembershipController");
const LeadsController = require("../controllers/LeadsController");
const MiddlewareLogin = require("../middleware/MidLogin");

let defaultRouter = Router();
// defaultRouter.use(MiddlewareLogin);

defaultRouter.get("/getAccessToken", OfficerndController.getAccessToken);
defaultRouter.post("/plans", OfficerndController.getPlans);
defaultRouter.post("/accounts", OfficerndController.getAccounts);
defaultRouter.post("/planTypes", OfficerndController.getLabels);
defaultRouter.post("/members", MemberController.getMembers);
defaultRouter.post("/offices", OfficesController.getOffices);
defaultRouter.post("/offices/teams", OfficesController.getTeams);
defaultRouter.post("/billing/invoices", PaymentsController.getPaymentsInvoice);
defaultRouter.post("/memberships", MembershipsController.getMemberships);
defaultRouter.post("/leads", LeadsController.getLeads);


defaultRouter.post("/report/memberships", ReportsApiController.getReportMemberships);
defaultRouter.post("/report", ReportsApiController.getReport);
defaultRouter.post("/report/revenue/details", ReportsApiController.getProjectedRevenueDetails);
defaultRouter.post("/report/revenue/rows", ReportsApiController.getProjectedRevenueRows);

module.exports = defaultRouter;
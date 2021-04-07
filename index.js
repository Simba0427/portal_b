
const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config();

/**
 * routes imported
 */
const DefaultRouter = require("./routes/default");
const UserRouter = require("./routes/users");
const ReportRouter = require("./routes/reports");
const OfficerndRouter = require("./routes/officernd");


var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true,limit:'50mb' }))
app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());

app.use(DefaultRouter);
app.use("/users", UserRouter);
app.use("/reports", ReportRouter);
app.use("/officernd", OfficerndRouter);
app.use('/static', express.static(__dirname + '/static'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.APP_PORT}`)
});


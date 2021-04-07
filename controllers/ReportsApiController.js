const { request, response } = require("express");
var httpRequest = require("request");
const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const RequestURL = process.env.API_URL;

module.exports = {
    getReport:async(req = request, res= response) => {
        const data = req.body.data;
        const payload = {
            kind: "projected-revenue",
            params: {
                accounts: data.accounts,
                from: data.startDate,
                groupBy: "customer",
                office: data.officeId,
                to: data.endDate,
            }
        }
        // console.log(payload);

        await httpRequest.get({
            url: RequestURL + '/leads?start=' + data.startDate + '&end=' + data.endDate + '&plans=' + data.plans + + '&accounts=' + data.accounts + '&planTypes' + data.planTypes + '&office=' + data.officeId,
            headers: {
                'Authorization': 'Bearer ' + req.body.accessToken
            }
        },function(error, response, body) {
            //console.log(response.body);
            if (!error && response.statusCode == 200) {
                const resBody = JSON.parse(response.body)
                res.json({status: response.statusCode, result: resBody});
            } else {
                res.json({status: response.statusCode, result: response.body});
            }
        });
        
        // await httpRequest.post({
        //     url: RequestURL + '/reports',
        //     headers: {
        //         'Authorization': 'Bearer ' + req.body.accessToken
        //     },
        //     form: payload,
        // },function(error, response, body) {
        //     console.log(response.body)
        //     if (!error && response.statusCode == 200) {
        //         const resBody = JSON.parse(response.body)
        //         const report_id = response.body._id;

        //         res.json({status: response.statusCode, result: resBody})

        //     } else {
        //         res.json({status: response.statusCode, result: response.body});
        //     }
        // });
    },
    getProjectedRevenueDetails:async(req = request, res= response) => {
        const reportId = req.body.reportId;
        await httpRequest.get({
            url: RequestURL + '/reports/' + reportId + '/details',
            headers: {
                'Authorization': 'Bearer ' + req.body.accessToken
            },
        },function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const resBody = JSON.parse(response.body)
                res.json({status: response.statusCode, result: resBody});
            } else {
                res.json({status: response.statusCode, result: response.body});
            }
        });
    },
    getProjectedRevenueRows:async(req = request, res= response) => {
        let reportId = req.body.reportId;
        await httpRequest.get({
            url: RequestURL + '/reports/' + reportId + '/rows',
            headers: {
                'Authorization': 'Bearer ' + req.body.accessToken
            }
        },function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const resBody = JSON.parse(response.body)
                res.json({status: response.statusCode, result: resBody});
            } else {
                res.json({status: response.statusCode, result: response.body});
            }
        });
    },
    getReportMemberships:async(req = request, res= response) => {
        let data = req.body.data;

        // console.log(data);

        await httpRequest.get({
            url: RequestURL + 'reports/memberships/memberships-report?office=' + data.officeId + 'start=' + data.startDate + '&end=' + data.endDate + '&plans=' + data.plans + + '&accounts=' + data.accounts + '&planTypes' + data.planTypes,
            headers: {
                'Authorization': 'Bearer ' + req.body.accessToken
            }
        },function(error, response, body) {
            //console.log(response.body);
            if (!error && response.statusCode == 200) {
                const resBody = JSON.parse(response.body)
                res.json({status: response.statusCode, result: resBody});
            } else {
                res.json({status: response.statusCode, result: response.body});
            }
        });
    },
}
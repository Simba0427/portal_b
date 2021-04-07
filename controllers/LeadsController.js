const { request, response } = require("express");
const moment = require("moment");
const { async } = require("crypto-random-string");
var httpRequest = require("request");
const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const RequestURL = process.env.API_URL;

module.exports = { 
    getLeads:async(req = request, res= response) => {
        let data = req.body.data;
        let url = RequestURL + '/memberships';
        
        if (data.officeId !== null || data.startDate !== "" || data.endDate !== "" || data.plans !== "" || data.accounts !== "" || data.planTypes !== "") {
            url = url + '?';
        }
        if (data.officeId) {
            url = url + 'office=' + data.officeId;
        }
        // if (data.startDate) {
        //     url = url + 'start=' + data.startDate;
        // }
        // if (data.endDate) {
        //     url = url + 'end=' + data.endDate;
        // }
        // if (data.plans) {
        //     url = url + 'plans=' + data.plans;
        // }
        // if (data.accounts) {
        //     url = url + 'accounts=' + data.accounts;
        // }
        // if (data.planTypes) {
        //     url = url + 'planTypes=' + data.planTypes;
        // };
        
        await httpRequest.get({
            url: url,
            headers: {
                'Authorization': 'Bearer ' + req.body.accessToken
            }
        },function(error, response, body) {
            // console.log("office : " + response.body)
            if (!error && response.statusCode == 200) {
                const resBody = JSON.parse(response.body)
                res.json({status: response.statusCode, result: resBody});
            } else {
                res.json({status: response.statusCode, result: response.body});
            }
        });
    },
}
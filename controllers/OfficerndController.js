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
const OAuthBody = {
    'client_id': 'CF7uYFzU2fiAnGeN',
    'client_secret': 'tScLlMYDQ4Upa2fr95rmHnjGmG7l1RgD',
    'grant_type': 'client_credentials',
    'scope': 'officernd.api.read'
}

module.exports = { 
    getAccessToken:async(req = request, res= response) => {
        await httpRequest.post({
            url:"https://identity.officernd.com/oauth/token",
            form: OAuthBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
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
    // plans
    getPlans:async(req = request, res= response) => {
        await httpRequest.get({
            url: RequestURL + '/plans',
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
    // accounts
    getAccounts:async(req = request, res= response) => {
        await httpRequest.get({
            url: RequestURL + '/accounts',
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
    // planType
    getLabels:async(req = request, res= response) => {
        await httpRequest.get({
            url: RequestURL + '/labels',
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
}
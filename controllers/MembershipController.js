const { request, response } = require("express");
const { async } = require("crypto-random-string");
var httpRequest = require("request");
const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const RequestURL = process.env.API_URL;

module.exports = { 
    getMemberships:async(req = request, res= response) => {
        let data = req.body.data;

        let url = RequestURL + '/memberships';
        
        if (data.officeId !== null || data.startDate !== "" || data.endDate !== "" || data.plans !== "" || data.accounts !== "" || data.planTypes !== "") {
            url = url + '?';
        }
        if (data.officeId) {
            url = url + 'office=' + data.officeId;
        }
       
        await httpRequest.get({
            url: url,
            headers: {
                'Authorization': 'Bearer ' + req.body.accessToken
            }
        }, async function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const resBody = JSON.parse(response.body);
                res.json({status: response.statusCode, result: resBody});
            } else {
                res.json({status: response.statusCode, result: response.body});
            }
        });

        function getOfficeById(id) {
            return new Promise(async(resolve, reject) => {
                await httpRequest.get({
                        url: RequestURL + '/offices/' + id,
                        headers: {
                            'Authorization': 'Bearer ' + req.body.accessToken
                        }
                    }, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            const resBody = JSON.parse(response.body);

                            reject(JSON.parse(response.body));
                        } else {
                            reject(JSON.parse(response.body));
                        }
                    });
                });
        }

        function getMemberById(id) {
            // await httpRequest.get({
            //     url: RequestURL + '/members/' + id,
            //     headers: {
            //         'Authorization': 'Bearer ' + req.body.accessToken
            //     }
            // }, async function(error, response, body) {
            //     if (!error && response.statusCode == 200) {
            //         const resBody = JSON.parse(response.body);
            //         res.json({status: response.statusCode, result: resBody});
            //     } else {
            //         res.json({status: response.statusCode, result: response.body});
            //     }
            // });
        }
    },
}
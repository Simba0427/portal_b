const { request, response } = require("express");
var httpRequest = require("request");

const RequestURL = process.env.API_URL;

module.exports = { 
    getOffices:async(req = request, res= response) => {
        await httpRequest.get({
            url: RequestURL + '/offices',
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
    getTeams:async(req = request, res= response) => {
        let data = req.body.data;

        let url = RequestURL + '/teams';
        if (data.officeId) {
            url = url + '?office=' + data.officeId
        }

        await httpRequest.get({
            url: url,
            headers: {
                'Authorization': 'Bearer ' + req.body.accessToken
            }
        },function(error, response, body) {
            // console.log("team : " + response.body)
            if (!error && response.statusCode == 200) {
                const resBody = JSON.parse(response.body)
                res.json({status: response.statusCode, result: resBody});
            } else {
                res.json({status: response.statusCode, result: response.body});
            }
        });
    },
    getOfficeById:async(req = request, res= response) => {
        await httpRequest.get({
            url: RequestURL + '/offices/' + req.body.id,
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
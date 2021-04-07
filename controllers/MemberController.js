const { request, response } = require("express");
const { async } = require("crypto-random-string");
var httpRequest = require("request");

var _ = require('lodash');

const RequestURL = process.env.API_URL;

function callToGetMembers(req){
    return new Promise(resolve => {
        let data = req.body.data;

        let url = RequestURL + '/members';
        if (data.officeId) {
            url = url + '?office=' + data.officeId
        }
    
        httpRequest.get({
            url: url,
            headers: {
                'Authorization': 'Bearer ' + req.body.accessToken
            }
        }, async function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const resBody = JSON.parse(response.body);
                resolve({status: response.statusCode, result: resBody});
            } else {
                resolve({status: response.statusCode, result: response.body});
            }
        });
    });
}

function callToMembership(req) {

    return new Promise(resolve => {
        let data = req.body.data;

        let url = RequestURL + '/memberships';
        
        if (data.officeID !== null || data.startDate !== "" || data.endDate !== "" || data.plans !== "" || data.accounts !== "" || data.planTypes !== "") {
            url = url + '?';
        }
        if (data.officeId) {
            url = url + 'office=' + data.officeId;
        }
        
        httpRequest.get({
            url: url,
            headers: {
                'Authorization': 'Bearer ' + req.body.accessToken
            }
        }, async function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const resBody = JSON.parse(response.body);
                resolve({status: response.statusCode, result: resBody});
            } else {
                resolve({status: response.statusCode, result: response.body});
            }
        });
    });
}

function callToOffices(req) {
    return new Promise(resolve => {
        httpRequest.get({
            url: RequestURL + '/offices',
            headers: {
                'Authorization': 'Bearer ' + req.body.accessToken
            }
        },function(error, response, body) {
            if (!error && response.statusCode == 200) {
                const resBody = JSON.parse(response.body)
                resolve({status: response.statusCode, result: resBody});
            } else {
                resolve({status: response.statusCode, result: response.body});
            }
        });
    });
}

function callToTeam(req = request) {
    
    return new Promise(resolve => {
        let data = req.body.data;

        let url = RequestURL + '/teams';
        if (data.officeId) {
            url = url + '?office=' + data.officeId
        }

        httpRequest.get({
            url: url,
            headers: {
                'Authorization': 'Bearer ' + req.body.accessToken
            }
        },function(error, response, body) {
            // console.log("team : " + response.body)
            if (!error && response.statusCode == 200) {
                const resBody = JSON.parse(response.body)
                resolve({status: response.statusCode, result: resBody});
            } else {
                resolve({status: response.statusCode, result: response.body});
            }
        });
    });
}

module.exports = { 
    getMembers:async(req = request, res= response) => {
        var members = await callToGetMembers(req);
        var memberships = await callToMembership(req);
        var offices = await callToOffices(req);

        var teams = await callToTeam(req);
        // console.log(members)
        members.result = _.filter(members.result, function(o){return o['calculatedStatus'] == 'active'});
        // console.log(members)
        members.result.map(member => {
            membershipIndex = _.findIndex(memberships.result, function(o){return o.member == member._id});
            if(membershipIndex == -1) {
                member['membership'] = null;
            } else {
                member['membership'] = memberships.result[membershipIndex];
            }

            officeIndex = _.findIndex(offices.result, function(o){return o._id == member.office});
            if(officeIndex == -1) {
                member['address'] = null;
            } else {
                member['address'] = offices.result[officeIndex];
            }

            teamIndex = _.findIndex(teams.result, function(o){return o._id == member.team});
            if(teamIndex == -1) {
                member['team'] = null;
            } else {
                member['team'] = teams.result[teamIndex];
            }
            return member;
        });
        res.json(members);
        // console.log(members.result);
        
    },
   
}
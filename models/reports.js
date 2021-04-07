const {connection} = require("../config");
let fs = require("fs");
const cryptoRandomString = require('crypto-random-string');
var ba64 = require("ba64")


module.exports = {
    getReports:(data) => {
        if (data.officeId) {
            return connection.table("reports").where("location_id", data.officeId).select("*");
        }
        return connection.table("reports").select("*");
    },
    getReportById:(id) => {
        return connection.table("reports").where("report_id", id).select("*");
    },
    createReport:(reportObj) => {
        return connection.table("reports").insert(reportObj);
    },
    updateReport:(reportObj) => {
        return connection.table("reports").where("report_id", reportObj.report_id).update(reportObj);
    },
    deleteReport:(id) => {
        return connection.table("reports").where("report_id", id).delete();
    },
    uploadImages:async(base64) => {
        let random = cryptoRandomString({length: 45, type: 'alphanumeric'});
    
        await fs.writeFile(__dirname + "/../uploads/" + random + ".pdf", base64, {encoding: 'base64'}, function(err) {
            console.log('File created');
        });
        return random + ".pdf";  
    },
}
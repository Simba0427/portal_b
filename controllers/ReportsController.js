const {connection} = require("../config");
const { request, response } = require("express");
const moment = require("moment");
const { async } = require("crypto-random-string");

const Reports = require("../models/reports");

module.exports = {
    getReports:async(req = request, res= response) => {
        let data = req.body.data;
        let reports = await Reports.getReports(data);
        res.json(reports);
    },
    getReportById:async(req = request, res= response) => {
        let reportId = req.body.report_id;
        let report = await Reports.getReportById(reportId);
        res.json(report)
    },
    createReport:async(req = request, res= response) => {
        let result = await Reports.createReport(req.body.createdReport);
        res.json(result);
    },
    updateReport:async(req = request, res= response) => {
        let result = await Reports.updateReport(req.body.updatedReport);
        res.json(result);
    },
    deleteReport:async(req = request, res= response) => {
        let result = await Reports.deleteReport(req.body.report_id);
        res.json(result);
    },
    uploadFiles:async(req = request, res = response) => {

        let resFile = req.body.base64File;
        let base64File = resFile.split(';base64,').pop();
        let result = await Reports.uploadImages(base64File);
    
        return res.json({
            state:true,
            value:result
        });
    },
};
const { connection } = require("../config");
const { request, response } = require("express");
var sha256 = require("js-sha256");
const { async } = require("crypto-random-string");

const Users = require("../models/users");
const { sendEmail } = require("../sendEmail");
var generator = require("generate-password");
const pug = require("pug");
const fs = require("fs");
const ejs = require("ejs");

module.exports = {
    register: async (req = request, res = response) => {
        var password = generator.generate({
            length: 10,
            numbers: true,
        });

        let params = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email.toLowerCase(),
            phone: req.body.phone ? req.body.phon : null,
            password: sha256.sha256(password),
            user_role: req.body.user_role ? req.body.user_role : null,
            locations: req.body.locations,
            location_id: req.body.location_id,
        };

        if ((await Users.getUserByEmail(req.body.email)) === undefined) {
            let result = await Users.createUsers(params);
            if (result) {
                fs.readFile(
                    "email/template/register.ejs",
                    "utf-8",
                    function (err, html) {
                        params.password = password;
                        var mail = {
                            from: "frank@localworks.us",
                            to: params.email,
                            subject: `LocalWorks Property Owner Portal Access`,
                            message: ejs.render(html, params),
                        };

                        sendEmail(mail);

                        res.json({
                            msg: "Create user successfully.",
                            state: true,
                        });
                    }
                );
            } else {
                res.json({
                    msg: "Create user failed.",
                    state: false,
                });
            }
        } else {
            res.json({
                msg: "This user already exist with this email.",
                state: false,
            });
        }
    },
    login: async (req = request, res = response) => {
        let params = {
            email: req.body.email,
            password: sha256.sha256(req.body.password),
        };
        let result = await Users.LoggedIn(params);

        res.json(result);
    },
    getUsers: async (req = request, res = response) => {
        let data = req.body.data;
        let users = await Users.getUsers(data);
        res.json(users);
    },
    getUserById: async (req = request, res = response) => {
        let userId = req.body.user_id;
        let user = await Users.getUserById(userId);
        res.json(user);
    },
    updateUser: async (req = request, res = response) => {
        console.log(req.body.updatedUser);
        let result = await Users.updateUser(req.body.updatedUser);
        res.json(result);
    },
    resetPassword: async (req = request, res = response) => {
        let param = {
            user_id: req.body.user_id,
            oldPwd: sha256.sha256(req.body.oldPwd),
            newPwd: sha256.sha256(req.body.newPwd),
        };

        let result = await Users.resetPassword(param);
        res.json(result);
    },
    deleteUser: async (req = request, res = response) => {
        let result = await Users.deleteUser(req.body.user_id);
        res.json(result);
    },
    emailSend: async (req = request, res = response) => {
        const fromEmail = req.body.from;
        const toEmail = req.body.to;
        const message = req.body.message;

        const subject = `${fromEmail} has invited you to collaborate`;
        const content = `email: ${toEmail} \n message: ${message} `;

        var mail = {
            from: fromEmail,
            to: toEmail,
            subject: subject,
            message: content,
        };
        sendEmail(mail);

        // console.log(mail)

        // transporter.sendMail(mail, (err, data) => {
        //   if (err) {
        //     res.json({
        //       status: 'fail'
        //     })
        //   } else {
        //     res.json({
        //      status: 'success'
        //     })
        //   }
        // })
    },
};

const db = require('../config/db.config.js');
const User = db.users;
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const config = require('../config/token.config.json');
const resMessages = require('../config/response.messages');
var winston = require('../config/winston');
// Fetch all Customers
exports.findOne = (req, res) => {
    try {
        User.findOne({ where: { 'email': req.body.email, 'stakeholder':req.body.stakeholder} }).then(user => {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    var token = jwt.sign({ username: user.name }, config.secret, {
                        expiresIn: config.tokenLife
                    });
                    if (token) {
                        res.json({
                            success: true,
                            userInfo: user,
                            message: 'authenticated',
                            accessToken: token,
                        })
                        res.render("route");
                    }
                  
                } else {
                   
                    res.json('Authentication Fail')
                }
                res.json(user);
            })
            
        }).catch(function(err) {
            res.json('Authentication Fail')
        })
    } catch (err) {
        var error = resMessages.errors;
        res.json({ errorCode: error.error_500.errorCode, errorMessage: error.error_500.errorMessage });
        winston.info(`${err.status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    }
};
exports.checkToken = (req, res) => {
    var info = resMessages.auth.token.info;
    res.json({
        errorCode: info.statusCode,
        errorMessage: info.successMessage
    })
}
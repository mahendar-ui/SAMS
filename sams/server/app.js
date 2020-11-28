const express = require('express')
const resMessages = require('./app/config/response.messages');
var app = express();
//logger
var winston = require('./app/config/winston');

//session
const session = require('express-session');
app.use(session({
  resave: false,
    saveUninitialized: true,
    secret: "anyrandomstring",
}));

var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
app.use(bodyParser.json())
const port = 3000;
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
//config
const db = require('./app/config/db.config.js');
const config = require('./app/config/response.messages');

app.use(function(req,res,err,next){
winston.info(`${req.err} - 'Db Connection' - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})
require('./app/route/auth.router.js')(app);
require('./app/route/account.application.route.js')(app);
require('./app/route/user.route.js')(app);
require('./app/route/employee.route.js')(app);
require('./app/route/client.route.js')(app);
require('./app/route/project.route.js')(app);
require('./app/route/invoice.route.js')(app);
require('./app/route/jobportal.router.js')(app);
require('./app/route/timesheet.router.js')(app);
require('./app/route/fileupload.route.js')(app);
require('./app/route/contract.router.js')(app);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
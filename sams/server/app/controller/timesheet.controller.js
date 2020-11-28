const db = require('../config/db.config.js');
const Timesheet = db.timesheets;
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Invoice",
    link: 'http://example.com',
  },
});
exports.create = (req, res, next) => {
let transporter = nodemailer.createTransport({
	service:'gmail',
	secure: true,
	auth:{
		user:'', 
		pass:''
	}
});
// var content  = req.body.content;
// console.log(content);
//const invoicepdf = req.body.invoicepdf;
  // then send the email
  let response = {
    body: {
	  name:'dhanush',
    intro: "Welcome to invoice!",
    },
  };
  let mail = MailGenerator.generate(response);
  let message = {
    from: 'invoice',
    to: 'nishith@pixehub.com',
    subject: "Invoice",
    html: mail,
    attachments: [{
      filename: 'invoice.pdf',
      content: req.body,
      contentType: 'application/pdf'
    }],
  };
  console.log(message);
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .json({ msg: "you should receive an email from us" });
    })
    .catch((error) => console.error(error));   
};
// Fetch all Timesheets
exports.findAll = (req, res) => {
	Timesheet.findAll().then(timesheets => {
	  res.json(timesheets);
	});
};
// Find a timesheet by Id
exports.findByPk = (req, res) => {	
	Timesheet.findByPk(req.params.timesheetId).then(timesheets => {
		res.json(timesheets);
	})
};